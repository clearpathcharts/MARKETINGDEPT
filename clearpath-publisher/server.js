/**
 * ClearPath Publisher backend
 * Phase 2: persistent queue + scheduler (this server, JSON store)
 * Phase 3: direct platform dispatch (Telegram, Discord, Reddit, YouTube)
 * Meta / LinkedIn stay on the Cursor bridge until their API approvals land.
 */
import "dotenv/config";
import express from "express";
import { loadJobs, getJob, upsertJob, patchJob, deleteJob, replaceAll } from "./lib/store.js";
import { dispatchJob, guardrailErrors, channelStatus } from "./lib/dispatch.js";
import { startScheduler } from "./lib/scheduler.js";

const app = express();
const PORT = process.env.PORT || 8787;

app.use(express.json({ limit: "1mb" }));

// Console may be opened from file:// — allow it.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    name: "ClearPath Publisher",
    time: new Date().toISOString(),
    channels: channelStatus(),
  });
});

app.get("/api/channels", (_req, res) => res.json(channelStatus()));

app.get("/api/queue", (_req, res) => res.json(loadJobs()));

app.post("/api/queue", (req, res) => {
  const job = req.body;
  if (!job?.id || !job?.title) return res.status(400).json({ error: "id and title required" });
  res.status(201).json(upsertJob({ approved: false, ...job }));
});

// Full-queue sync from the console (console remains usable offline).
app.post("/api/queue/sync", (req, res) => {
  const incoming = Array.isArray(req.body?.jobs) ? req.body.jobs : null;
  if (!incoming) return res.status(400).json({ error: "jobs array required" });
  const existing = new Map(loadJobs().map((j) => [j.id, j]));
  const merged = incoming.map((j) => {
    const prev = existing.get(j.id);
    // Never let a sync erase server-side send results/approval.
    return prev ? { ...j, approved: prev.approved, results: prev.results, sentAt: prev.sentAt, status: prev.status === "sent" || prev.status === "partial" ? prev.status : j.status } : { approved: false, ...j };
  });
  res.json(replaceAll(merged));
});

app.patch("/api/queue/:id", (req, res) => {
  const job = patchJob(req.params.id, req.body || {});
  if (!job) return res.status(404).json({ error: "job not found" });
  res.json(job);
});

app.delete("/api/queue/:id", (req, res) => {
  res.json({ deleted: deleteJob(req.params.id) });
});

app.post("/api/queue/:id/approve", (req, res) => {
  const job = patchJob(req.params.id, { approved: true });
  if (!job) return res.status(404).json({ error: "job not found" });
  res.json(job);
});

// Founder clicked Dispatch — that click IS the approval.
app.post("/api/queue/:id/dispatch", async (req, res) => {
  const job = getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "job not found" });

  const errors = guardrailErrors(job);
  if (errors.length) return res.status(422).json({ error: "guardrails", details: errors });

  patchJob(job.id, { approved: true, status: "sending" });
  const { status, results } = await dispatchJob(job);
  const updated = patchJob(job.id, { status, results, sentAt: new Date().toISOString() });
  res.json(updated);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`ClearPath Publisher backend → http://127.0.0.1:${PORT}`);
  const ready = channelStatus().filter((c) => c.ready).map((c) => c.name);
  console.log(
    ready.length
      ? `Direct channels ready: ${ready.join(", ")}`
      : "No direct channels configured yet — copy .env.example to .env and add credentials.",
  );
  startScheduler();
});
