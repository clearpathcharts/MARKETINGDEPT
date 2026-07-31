/**
 * ClearPath Automation Console
 * Local Buffer-style queue for education posts.
 * Live social sends = Cursor + Zapier after you approve a package.
 */

const STORAGE_KEY = "clearpath-automation-queue-v1";
const API_BASE = "http://127.0.0.1:8787";

let backendOnline = false;
let backendChannels = [];

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ? `${body.error}${body.details ? ": " + body.details.join(", ") : ""}` : `HTTP ${res.status}`);
  }
  return res.json();
}

async function initBackend() {
  const statusEl = document.getElementById("backend-status");
  try {
    const health = await api("/api/health");
    backendOnline = true;
    backendChannels = health.channels || [];
    const direct = backendChannels.filter((c) => c.mode === "direct" && c.ready).map((c) => c.name);
    if (statusEl) {
      statusEl.textContent = direct.length
        ? `Backend: ONLINE — direct send ready: ${direct.join(", ")}`
        : "Backend: ONLINE — add credentials in clearpath-publisher/.env to enable direct sends";
    }
    const serverQueue = await api("/api/queue");
    if (Array.isArray(serverQueue)) {
      const changed = JSON.stringify(serverQueue) !== JSON.stringify(queue);
      queue = serverQueue;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
      updateStats();
      // Only re-render the queue view; never clobber the composer mid-typing.
      if (changed && view === "queue") render();
    }
  } catch {
    backendOnline = false;
    if (statusEl) {
      statusEl.textContent = "Backend: offline — using local queue + copy-package mode. Start it: npm start in clearpath-publisher.";
    }
  }
}

function syncToBackend() {
  if (!backendOnline) return;
  api("/api/queue/sync", { method: "POST", body: JSON.stringify({ jobs: queue }) })
    .then((serverQueue) => {
      if (Array.isArray(serverQueue)) queue = serverQueue;
    })
    .catch(() => {});
}

async function dispatchNow(jobId) {
  const job = queue.find((j) => j.id === jobId);
  if (!job) return;
  const directTargets = job.channels.filter((id) =>
    backendChannels.some((c) => c.id === id && c.mode === "direct" && c.ready),
  );
  const bridgeTargets = job.channels.filter((id) => !directTargets.includes(id));
  const msg = [
    `Dispatch "${job.title}" now?`,
    directTargets.length ? `Direct send: ${directTargets.join(", ")}` : "No direct channels ready — nothing will send.",
    bridgeTargets.length ? `Bridge (via Cursor package): ${bridgeTargets.join(", ")}` : "",
    "This click is your founder approval.",
  ].filter(Boolean).join("\n");
  if (!confirm(msg)) return;
  try {
    const updated = await api(`/api/queue/${jobId}/dispatch`, { method: "POST" });
    const idx = queue.findIndex((j) => j.id === jobId);
    if (idx >= 0) queue[idx] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    updateStats();
    render();
    const sent = (updated.results || []).filter((r) => r.ok).map((r) => r.channel);
    const failed = (updated.results || []).filter((r) => !r.ok && !r.skipped).map((r) => `${r.channel} (${r.error})`);
    const bridged = (updated.results || []).filter((r) => r.skipped).map((r) => r.channel);
    alert(
      [
        sent.length ? `SENT: ${sent.join(", ")}` : "",
        failed.length ? `FAILED: ${failed.join("; ")}` : "",
        bridged.length ? `VIA CURSOR BRIDGE: ${bridged.join(", ")} — copy the package for these.` : "",
      ].filter(Boolean).join("\n") || "No results.",
    );
  } catch (err) {
    alert(`Dispatch error: ${err.message}`);
  }
}

const CHANNELS = [
  { id: "facebook", name: "Facebook", engine: "ClearPath Publisher", status: "connected", note: "CLEAR PATH Markets Science page" },
  { id: "youtube", name: "YouTube", engine: "ClearPath Publisher", status: "connected", note: "Education video uploads" },
  { id: "whatsapp", name: "WhatsApp", engine: "ClearPath Publisher", status: "not_yet", note: "Channels & Communities" },
  { id: "instagram", name: "Instagram", engine: "ClearPath Publisher", status: "connected", note: "Calm carousels preferred" },
  { id: "wechat", name: "WeChat", engine: "ClearPath Publisher", status: "not_yet", note: "China hub when staffed" },
  { id: "tiktok", name: "TikTok", engine: "ClearPath Publisher", status: "not_yet", note: "Calm edits only — flash risk" },
  { id: "douyin", name: "Douyin", engine: "ClearPath Publisher", status: "not_yet", note: "China short-video hub" },
  { id: "reddit", name: "Reddit", engine: "ClearPath Publisher", status: "connected", note: "ClearMarketScience" },
  { id: "snapchat", name: "Snapchat", engine: "ClearPath Publisher", status: "not_yet", note: "Story / Spotlight education" },
  { id: "linkedin", name: "LinkedIn", engine: "ClearPath Publisher", status: "connected", note: "Partners & thought leadership" },
  { id: "lemon8", name: "Lemon8", engine: "ClearPath Publisher", status: "not_yet", note: "Lifestyle + education discovery" },
  { id: "mastodon", name: "Mastodon", engine: "ClearPath Publisher", status: "not_yet", note: "Federated / privacy-first" },
  { id: "telegram", name: "Telegram", engine: "ClearPath Publisher", status: "connected", note: "@clearpathtraderfreeaccount" },
  { id: "discord", name: "Discord", engine: "ClearPath Publisher", status: "connected", note: "Community + announcements" },
];

const DISCOVERY = [
  { rank: 1, name: "Google Search Console", status: "not_yet" },
  { rank: 2, name: "Bing Webmaster + IndexNow", status: "not_yet" },
  { rank: 3, name: "YouTube", status: "connected" },
  { rank: 4, name: "GA4", status: "not_yet" },
  { rank: 5, name: "Gmail", status: "connected" },
  { rank: 14, name: "Apple Podcasts", status: "not_yet" },
  { rank: 15, name: "Spotify Podcasts", status: "not_yet" },
];

const FOOTER =
  "\n\nClearPath Trader — market education for calm learning.\nNot a brokerage. https://clearpathtrader.com";

const app = document.getElementById("app");
const viewRoot = document.getElementById("view-root");
const currentTitle = document.querySelector(".current");
const searchLabel = document.querySelector(".search label");
const queueFilter = document.getElementById("queue-filter");

let view = "publish";
let queue = loadQueue();
let selectedChannels = ["facebook", "youtube", "instagram", "linkedin", "reddit"];

document.addEventListener("touchstart", () => {}, true);

searchLabel.addEventListener("click", () => app.classList.toggle("search"));

document.querySelectorAll("#main-nav .menu-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll("#main-nav .menu-item").forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    view = item.dataset.view;
    currentTitle.textContent = item.querySelector(".desc").textContent;
    render();
  });
});

queueFilter.addEventListener("input", () => {
  if (view === "queue") render();
});

document.getElementById("btn-export-all").addEventListener("click", exportAll);
document.getElementById("btn-clear-queue").addEventListener("click", () => {
  if (confirm("Clear the entire local queue?")) {
    queue = [];
    saveQueue();
    render();
  }
});

function loadQueue() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveQueue() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  updateStats();
  syncToBackend();
}

function uid() {
  return `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function updateClock() {
  const now = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const pad = (n) => (n < 10 ? "0" + n : n);
  document.getElementById("side-date").textContent =
    `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
  document.getElementById("side-time").textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function updateStats() {
  document.getElementById("stat-queued").textContent = String(
    queue.filter((j) => j.status === "queued").length
  );
  document.getElementById("stat-ready").textContent = String(
    queue.filter((j) => j.status === "ready").length
  );
  document.getElementById("stat-channels").textContent = String(selectedChannels.length);
}

function buildPackage(job) {
  const lines = [
    "CLEARPATH AUTOMATION PACKAGE",
    `Job: ${job.id}`,
    `Title: ${job.title}`,
    `When: ${job.scheduledFor || "ASAP after confirmation"}`,
    `Status: ${job.status}`,
    "",
    "MISSION",
    `Calm / no flash: ${job.calm ? "YES" : "NO"}`,
    `Education only: ${job.educationOnly ? "YES" : "NO"}`,
    "",
    "CAPTION",
    job.caption,
    "",
    `Video URL: ${job.videoUrl || "(none)"}`,
    `File note: ${job.fileName || "(none)"}`,
    "",
    "CHANNELS",
  ];
  job.channels.forEach((id) => {
    const ch = CHANNELS.find((c) => c.id === id);
    if (!ch) return;
    lines.push(`- ${ch.name} → ${ch.engine} → ${ch.note}`);
  });
  lines.push(
    "",
    "CLEARPATH PUBLISHER INSTRUCTIONS",
    "1. Confirm this exact package with the founder.",
    "2. Dispatch through ClearPath Publisher only after approval.",
    "3. Report success/fail per channel.",
    "4. Never claim brokerage or post flashy ticker creatives."
  );
  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function exportAll() {
  if (!queue.length) {
    alert("Queue is empty.");
    return;
  }
  const blob = new Blob([queue.map(buildPackage).join("\n\n-----\n\n")], {
    type: "text/plain",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `clearpath-queue-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function wireChannelPicks() {
  const picks = document.getElementById("channel-picks");
  if (!picks) return;
  picks.innerHTML = CHANNELS.map((ch) => `
    <button type="button" class="chip ${selectedChannels.includes(ch.id) ? "on" : ""}" data-ch="${ch.id}">
      ${ch.name}
    </button>
  `).join("");
  picks.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.ch;
      if (selectedChannels.includes(id)) {
        selectedChannels = selectedChannels.filter((x) => x !== id);
        btn.classList.remove("on");
      } else {
        selectedChannels.push(id);
        btn.classList.add("on");
      }
      updateStats();
    });
  });
}

function addFromForm() {
  const title = document.getElementById("f-title").value.trim();
  const caption = document.getElementById("f-caption").value.trim();
  const videoUrl = document.getElementById("f-url").value.trim();
  const fileName = document.getElementById("f-file").value.trim();
  const when = document.getElementById("f-when").value;
  const calm = document.getElementById("f-calm").checked;
  const educationOnly = document.getElementById("f-edu").checked;

  if (!title || !caption) {
    alert("Title and caption are required.");
    return;
  }
  if (!selectedChannels.length) {
    alert("Pick at least one channel.");
    return;
  }
  if (!calm || !educationOnly) {
    alert("Both mission checks are required before queueing.");
    return;
  }

  const job = {
    id: uid(),
    createdAt: new Date().toISOString(),
    title,
    caption,
    videoUrl,
    fileName,
    scheduledFor: when ? new Date(when).toISOString() : null,
    channels: [...selectedChannels],
    calm,
    educationOnly,
    status: "queued",
  };
  queue.unshift(job);
  saveQueue();
  document.getElementById("f-title").value = "";
  document.getElementById("f-url").value = "";
  document.getElementById("f-file").value = "";
  document.getElementById("f-when").value = "";
  document.getElementById("f-calm").checked = false;
  document.getElementById("f-edu").checked = false;
  alert("Queued. Open Queue to copy the publish package.");
  renderLatest();
}

function renderLatest() {
  const box = document.getElementById("latest-queue");
  if (!box) return;
  if (!queue.length) {
    box.innerHTML = `<p class="hint">No jobs yet.</p>`;
    return;
  }
  const j = queue[0];
  box.innerHTML = `
    <p><strong>${escapeHtml(j.title)}</strong></p>
    <p class="hint">${j.channels.join(" · ")} · ${j.status}</p>
    <button type="button" class="btn" data-copy="${j.id}">Copy package</button>
  `;
  box.querySelector("[data-copy]").addEventListener("click", async () => {
    const ok = await copyText(buildPackage(j));
    j.status = "ready";
    saveQueue();
    alert(ok ? "Copied. Paste into Cursor and say PUBLISH THIS." : "Copy failed — open Queue view.");
    renderLatest();
  });
}

function renderQueue() {
  const q = queueFilter.value.trim().toLowerCase();
  const list = queue.filter(
    (j) => !q || j.title.toLowerCase().includes(q) || j.channels.join(" ").includes(q)
  );

  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Automation queue (${list.length})</span></header>
        <div class="content queue-list">
          ${
            list.length
              ? list
                  .map(
                    (j) => `
            <article class="queue-item">
              <div>
                <h3>${escapeHtml(j.title)}</h3>
                <p class="hint">${j.channels.join(" · ")} · ${j.status}${
                      j.scheduledFor ? " · " + new Date(j.scheduledFor).toLocaleString() : ""
                    }</p>
                ${
                  Array.isArray(j.results) && j.results.length
                    ? `<p class="hint">${j.results
                        .map((r) =>
                          r.ok
                            ? `✓ ${r.channel} sent`
                            : r.skipped
                            ? `→ ${r.channel} via Cursor bridge`
                            : `✗ ${r.channel}: ${escapeHtml(String(r.error || "failed"))}`,
                        )
                        .join(" · ")}</p>`
                    : ""
                }
              </div>
              <div class="queue-actions">
                ${
                  backendOnline
                    ? `<button type="button" class="btn btn-primary" data-dispatch="${j.id}">Dispatch now</button>`
                    : ""
                }
                <button type="button" class="btn" data-copy="${j.id}">Copy package</button>
                <button type="button" class="btn btn-danger" data-del="${j.id}">Remove</button>
              </div>
              <pre class="pkg">${escapeHtml(buildPackage(j))}</pre>
            </article>`
                  )
                  .join("")
              : `<p class="hint">Queue empty — use Publish to add an education post.</p>`
          }
        </div>
      </div>
    </div>
  `;

  viewRoot.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const job = queue.find((j) => j.id === btn.dataset.copy);
      if (!job) return;
      const ok = await copyText(buildPackage(job));
      job.status = "ready";
      saveQueue();
      alert(ok ? "Package copied." : "Clipboard blocked — select the text below.");
      render();
    });
  });
  viewRoot.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.del;
      queue = queue.filter((j) => j.id !== id);
      saveQueue();
      if (backendOnline) api(`/api/queue/${id}`, { method: "DELETE" }).catch(() => {});
      render();
    });
  });
  viewRoot.querySelectorAll("[data-dispatch]").forEach((btn) => {
    btn.addEventListener("click", () => dispatchNow(btn.dataset.dispatch));
  });
}

function renderChannelGroup(title, items) {
  if (!items.length) return "";
  return `
    <div class="card channel-group">
      <header><span class="title">${title}</span><span class="count-pill">${items.length}</span></header>
      <div class="content channel-stack">
        ${items
          .map(
            (ch) => `
          <div class="channel-card">
            <div class="channel-card-top">
              <strong class="channel-card-name">${ch.name}</strong>
              <span class="badge ${ch.status}">${ch.status.replace("_", " ")}</span>
            </div>
            <p class="channel-card-engine">${ch.engine || "ClearPath Publisher"}</p>
            <p class="channel-card-note">${ch.note}</p>
          </div>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderChannels() {
  const live = CHANNELS.filter((ch) => ch.status === "connected");
  const pending = CHANNELS.filter((ch) => ch.status !== "connected");
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all channels-wrap">
      ${renderChannelGroup("Connected", live)}
      ${renderChannelGroup("Not yet — separate wiring", pending)}
      <p class="hint channel-foot">Connected = live pipeline ready. Not yet = WhatsApp, WeChat, TikTok, Douyin, Snapchat, Lemon8, Mastodon and any other pending channel.</p>
    </div>
  `;
}

function renderAnalytics() {
  const live = CHANNELS.filter((ch) => ch.status === "connected");
  const pending = CHANNELS.filter((ch) => ch.status !== "connected");
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Site & channel analytics</span></header>
        <div class="content analytics-grid">
          <div class="analytics-stat">
            <span class="label">Live channels</span>
            <strong>${live.length}</strong>
            <p class="hint">${live.map((c) => c.name).join(", ") || "None"}</p>
          </div>
          <div class="analytics-stat">
            <span class="label">Not yet</span>
            <strong>${pending.length}</strong>
            <p class="hint">${pending.map((c) => c.name).join(", ") || "None"}</p>
          </div>
          <div class="analytics-stat">
            <span class="label">Queued posts</span>
            <strong>${queue.filter((j) => j.status === "queued").length}</strong>
            <p class="hint">Waiting in local publisher queue</p>
          </div>
          <div class="analytics-stat">
            <span class="label">Ready packages</span>
            <strong>${queue.filter((j) => j.status === "ready").length}</strong>
            <p class="hint">Copied for ClearPath Publisher dispatch</p>
          </div>
        </div>
        <p class="hint channel-foot">No fake traffic numbers. These counts come from this console only until live analytics are wired.</p>
      </div>
    </div>
  `;
}

function renderSeo() {
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">SEO automation — video release prompts</span></header>
        <div class="content composer">
          <label>Video topic
            <input id="seo-topic" type="text" placeholder="e.g. Reading support without flashing tickers" />
          </label>
          <label>Target sector
            <select id="seo-sector">
              <option value="data centers">Data centers</option>
              <option value="AI infrastructure">AI infrastructure</option>
              <option value="B2B technology">B2B technology</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="veteran education">Veteran education</option>
              <option value="neurodivergent learning">Neurodivergent learning</option>
            </select>
          </label>
          <label>Primary keyword
            <input id="seo-keyword" type="text" placeholder="e.g. accessible trading education" />
          </label>
          <button type="button" class="btn btn-primary" id="btn-seo-gen">Generate ranking prompts</button>
          <pre class="pkg" id="seo-output">Generate prompts for titles, descriptions, chapters, and channel-specific captions.</pre>
        </div>
      </div>
    </div>
  `;
  document.getElementById("btn-seo-gen").addEventListener("click", () => {
    const topic = document.getElementById("seo-topic").value.trim() || "Calm market education";
    const sector = document.getElementById("seo-sector").value;
    const keyword = document.getElementById("seo-keyword").value.trim() || topic.toLowerCase();
    const output = `CLEARPATH SEO VIDEO PROMPT PACK
Topic: ${topic}
Sector: ${sector}
Primary keyword: ${keyword}

YOUTUBE TITLE OPTIONS
1. ${topic}: a calm guide for ${sector}
2. ${keyword} without ticker overload
3. ClearPath education — ${topic}

YOUTUBE DESCRIPTION
${topic} explained in plain language for veterans and neurodivergent learners.
Focus sector: ${sector}.
Keyword focus: ${keyword}.
No flashing charts. No brokerage pitch.
Learn more: https://clearpathtrader.com

CHAPTER PROMPT
0:00 Why calm market education matters
1:00 Core idea — ${topic}
3:00 How to read this without sensory overload
5:00 Practical takeaway for ${sector}
6:30 Next lesson + encyclopedia link

SHORT CAPTIONS
Facebook/LinkedIn: ${topic} — plain-language ${sector} education. Not a brokerage.
Instagram: Calm charts. Clear words. ${keyword}.
Reddit: Discussion: how do you learn ${keyword} without noisy terminals?
TikTok/Douyin/Lemon8: Only if edit stays static + caption-led. Topic: ${topic}.
WhatsApp/WeChat: New ClearPath lesson — ${topic}. https://clearpathtrader.com

HASHTAGS (see Hashtags view for full packs)
${generateHashtags(topic, sector, keyword).split("\n").slice(0, 12).join("\n")}

RANKING RULES
- Put primary keyword in first 50 characters of title
- Repeat keyword once in first 2 description lines
- Link to encyclopedia / learn pages
- No fake urgency, no broker CTAs`;
    document.getElementById("seo-output").textContent = output;
  });
}

function slugTag(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function generateHashtags(topic, sector, keyword) {
  const topicTag = slugTag(topic) || "CalmMarkets";
  const sectorTag = slugTag(sector) || "B2BTechnology";
  const keywordTag = slugTag(keyword) || topicTag;
  const core = [
    "#ClearPathTrader",
    "#ClearPathMarketsScience",
    "#MarketEducation",
    "#AccessibleTrading",
    "#NeurodivergentFriendly",
    "#VeteranEducation",
    "#NoTickerFlash",
    "#FinancialLiteracy",
    `#${topicTag}`,
    `#${sectorTag}`,
    `#${keywordTag}`,
    "#NotABrokerage",
  ];
  const packs = {
    Instagram: [...core, "#LearnOnInstagram", "#CalmLearning", "#EducationCarousel"].join(" "),
    LinkedIn: [...core, "#B2B", "#ThoughtLeadership", "#DataCenters", "#Cybersecurity", "#AIInfrastructure"].join(" "),
    Facebook: [...core, "#CommunityLearning", "#ClearPathEducation"].join(" "),
    YouTube: [...core, "#YouTubeEducation", "#MarketExplained"].join(" "),
    TikTok: ["#ClearPathTrader", `#${topicTag}`, `#${keywordTag}`, "#LearnOnTikTok", "#CalmFinance", "#MarketBasics"].join(" "),
    Douyin: ["#ClearPath", `#${sectorTag}`, "#FinanceEducation", "#CalmCharts"].join(" "),
    Lemon8: ["#ClearPathTrader", `#${topicTag}`, "#LifestyleLearning", "#CalmFocus"].join(" "),
    Reddit: `Tags/flair ideas: ${keyword} | ${sector} | accessible education | ClearPathTrader — also use ready packs for r/stocks · r/Trading · r/wallstreetbets`,
    Mastodon: [...core, "#A11y", "#Neurodiversity", "#FinLit"].join(" "),
    WhatsApp: "No hashtags needed — use plain lesson link + short caption.",
    WeChat: "Use topic keywords in caption; hashtags are limited on WeChat.",
    Snapchat: ["#ClearPathTrader", `#${topicTag}`, "#MarketEducation"].join(" "),
  };
  return `CLEARPATH HASHTAG PACK
Topic: ${topic}
Sector: ${sector}
Keyword: ${keyword}

CORE SET
${core.join(" ")}

BY CHANNEL
Instagram:
${packs.Instagram}

LinkedIn:
${packs.LinkedIn}

Facebook:
${packs.Facebook}

YouTube:
${packs.YouTube}

TikTok:
${packs.TikTok}

Douyin:
${packs.Douyin}

Lemon8:
${packs.Lemon8}

Reddit:
${packs.Reddit}

Mastodon:
${packs.Mastodon}

Snapchat:
${packs.Snapchat}

WhatsApp:
${packs.WhatsApp}

WeChat:
${packs.WeChat}

StockTwits:
#StockTwits #FinTwit #MarketSentiment #ClearPathTrader #NotABrokerage

eToro USA:
#eToro #eToroUSA #SocialTrading #FinancialLiteracy #ClearPathTrader #NotABrokerage

RULES
- Max 8–12 tags on Instagram/TikTok
- 3–5 tags on LinkedIn
- Skip hashtags on WhatsApp
- Never use broker/signal spam tags
- Keep veteran + accessibility tags in every education post`;
}

const COMMUNITY_HASHTAG_GROUPS = [
  {
    id: "forums",
    label: "Trading forums",
    note: "Niche discovery tags for education posts aimed at these communities",
    packs: [
      { name: "BabyPips", focus: "forex-focused", tags: "#BabyPips #ForexEducation #ForexTrading #RetailForex #FXBasics #CurrencyMarkets #LearnForex #ClearPathTrader" },
      { name: "Trade2Win", focus: "UK's largest trading forum", tags: "#Trade2Win #UKTrading #TradingForum #MarketEducation #DiscretionaryTrading #ClearPathTrader" },
      { name: "MQL5 Community", focus: "largest forex / automated trading forum", tags: "#MQL5 #MetaTrader #AlgoTrading #ExpertAdvisors #AutomatedTrading #ForexBots #MQL4 #ClearPathTrader" },
      { name: "SteadyOptions", focus: "options-focused", tags: "#SteadyOptions #OptionsTrading #OptionsEducation #DefinedRisk #IronCondor #OptionsStrategies #ClearPathTrader" },
      { name: "Aussie Stock Forums", focus: "ASX / Australia", tags: "#AussieStockForums #ASX #ASXStocks #AustralianInvesting #ASXEducation #ClearPathTrader" },
      { name: "MyPivots", focus: "day trading", tags: "#MyPivots #DayTrading #IntradayTrading #PivotPoints #PriceAction #DayTradingEducation #ClearPathTrader" },
      { name: "NinjaTrader Community", focus: "futures", tags: "#NinjaTrader #FuturesTrading #OrderFlow #ESFutures #NQFutures #FuturesEducation #ClearPathTrader" },
    ],
  },
  {
    id: "reddit",
    label: "Reddit",
    note: "Education framing only — never meme-pump or broker CTAs",
    packs: [
      { name: "r/wallstreetbets", focus: "14.8M members", tags: "#WallStreetBets #WSB #RetailInvestors #MarketEducation #NotFinancialAdvice #ClearPathTrader" },
      { name: "r/stocks", focus: "7.2M members", tags: "#Stocks #StockMarket #InvestingEducation #EquityMarkets #LongTermInvesting #ClearPathTrader" },
      { name: "r/Trading", focus: "active traders", tags: "#Trading #TradingCommunity #TechnicalAnalysis #TradingEducation #RiskManagement #ClearPathTrader" },
    ],
  },
  {
    id: "discord",
    label: "Discord communities",
    note: "For social cross-posts that mention or target these rooms",
    packs: [
      { name: "Investors Underground", focus: "Discord", tags: "#InvestorsUnderground #DayTradingEducation #SmallCapEducation #ClearPathTrader" },
      { name: "Warrior Trading", focus: "Discord", tags: "#WarriorTrading #DayTrading #MomentumTrading #TradingEducation #ClearPathTrader" },
      { name: "Bear Bull Traders", focus: "Discord", tags: "#BearBullTraders #DayTradingCommunity #TradingRoom #ClearPathTrader" },
      { name: "For Traders", focus: "prop-firm / funded-account focused", tags: "#ForTraders #PropFirm #FundedTrader #PropTradingEducation #RiskRules #ClearPathTrader" },
      { name: "Bull Trading Community", focus: "Discord", tags: "#BullTradingCommunity #TradingCommunity #MarketEducation #ClearPathTrader" },
      { name: "Humbled Trader", focus: "Discord", tags: "#HumbledTrader #TradingMindset #RetailTrading #TradingEducation #ClearPathTrader" },
      { name: "Elite Trading Community", focus: "Discord", tags: "#EliteTradingCommunity #TradingEducation #MarketStructure #ClearPathTrader" },
      { name: "SMB Capital", focus: "Discord", tags: "#SMBCapital #PropTrading #TradingDesk #ProfessionalTrading #ClearPathTrader" },
      { name: "HighStrike Trading Room", focus: "Discord", tags: "#HighStrike #OptionsTrading #TradingRoom #OptionsEducation #ClearPathTrader" },
      { name: "Market Masters", focus: "Discord", tags: "#MarketMasters #TradingCommunity #MarketEducation #ClearPathTrader" },
      { name: "Disruptive Investments", focus: "Discord", tags: "#DisruptiveInvestments #GrowthInvesting #InvestingEducation #ClearPathTrader" },
      { name: "FLI Capital", focus: "Discord", tags: "#FLICapital #TradingCommunity #CapitalMarketsEducation #ClearPathTrader" },
    ],
  },
  {
    id: "sentiment",
    label: "Sentiment / social",
    note: "StockTwits + eToro — keep education-only voice",
    packs: [
      { name: "StockTwits", focus: "sentiment / social", tags: "#StockTwits #FinTwit #MarketSentiment #StockTalk #TradingIdeas #InvestingEducation #ClearPathTrader #NotABrokerage" },
      { name: "eToro USA community feed", focus: "social / copy-trading audience", tags: "#eToro #eToroUSA #SocialTrading #CopyTrading #InvestingCommunity #FinancialLiteracy #ClearPathTrader #NotABrokerage" },
    ],
  },
];

function formatCommunityCatalog() {
  const lines = ["CLEARPATH — READY-TO-GRAB COMMUNITY HASHTAGS", "Education / analytics only. Not a brokerage.", ""];
  for (const group of COMMUNITY_HASHTAG_GROUPS) {
    lines.push(`=== ${group.label.toUpperCase()} ===`, group.note, "");
    for (const pack of group.packs) {
      lines.push(`${pack.name} (${pack.focus})`, pack.tags, "");
    }
  }
  lines.push("RULES", "- Grab 3–8 tags max per post", "- Always keep #ClearPathTrader + #NotABrokerage on public social", "- Never use pump, signal, or deposit CTAs");
  return lines.join("\n");
}

function renderHashtags() {
  const groupsHtml = COMMUNITY_HASHTAG_GROUPS.map(
    (group) => `
      <section class="hash-group">
        <h3 class="hash-group-title">${group.label}</h3>
        <p class="hint">${group.note}</p>
        <div class="hash-grid">
          ${group.packs
            .map(
              (pack) => `
            <button type="button" class="hash-chip" data-tags="${pack.tags.replace(/"/g, "&quot;")}" data-label="${pack.name}">
              <span class="hash-chip-name">${pack.name}</span>
              <span class="hash-chip-focus">${pack.focus}</span>
              <span class="hash-chip-tags">${pack.tags}</span>
            </button>`,
            )
            .join("")}
        </div>
      </section>`,
  ).join("");

  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Hashtag generator</span></header>
        <div class="content composer">
          <label>Video / post topic
            <input id="hash-topic" type="text" placeholder="e.g. Reading support without flashing tickers" />
          </label>
          <label>Target sector
            <select id="hash-sector">
              <option value="data centers">Data centers</option>
              <option value="AI infrastructure">AI infrastructure</option>
              <option value="B2B technology">B2B technology</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="veteran education">Veteran education</option>
              <option value="neurodivergent learning">Neurodivergent learning</option>
            </select>
          </label>
          <label>Primary keyword
            <input id="hash-keyword" type="text" placeholder="e.g. accessible trading education" />
          </label>
          <div class="queue-actions">
            <button type="button" class="btn btn-primary" id="btn-hash-gen">Generate hashtags</button>
            <button type="button" class="btn" id="btn-hash-copy">Copy pack</button>
            <button type="button" class="btn" id="btn-hash-communities">Copy all community packs</button>
          </div>
          <p class="hint hash-status" id="hash-status">Click any community card below to copy its hashtags.</p>
          <div class="hash-ready">
            <h3 class="hash-group-title">Ready to grab</h3>
            ${groupsHtml}
          </div>
          <pre class="pkg" id="hash-output">Generate channel-ready hashtag packs, or grab a community set above.</pre>
        </div>
      </div>
    </div>
  `;
  const status = document.getElementById("hash-status");
  const gen = () => {
    const topic = document.getElementById("hash-topic").value.trim() || "Calm market education";
    const sector = document.getElementById("hash-sector").value;
    const keyword = document.getElementById("hash-keyword").value.trim() || topic.toLowerCase();
    document.getElementById("hash-output").textContent = generateHashtags(topic, sector, keyword);
  };
  document.getElementById("btn-hash-gen").addEventListener("click", gen);
  document.getElementById("btn-hash-copy").addEventListener("click", async () => {
    const text = document.getElementById("hash-output").textContent;
    const ok = await copyText(text);
    status.textContent = ok ? "Hashtag pack copied." : "Clipboard blocked — select the text manually.";
  });
  document.getElementById("btn-hash-communities").addEventListener("click", async () => {
    const ok = await copyText(formatCommunityCatalog());
    status.textContent = ok ? "Full community catalog copied." : "Clipboard blocked — select manually.";
  });
  viewRoot.querySelectorAll(".hash-chip").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const tags = btn.getAttribute("data-tags") || "";
      const label = btn.getAttribute("data-label") || "pack";
      const ok = await copyText(tags);
      status.textContent = ok ? `Copied: ${label}` : "Clipboard blocked — select tags manually.";
      document.getElementById("hash-output").textContent = `${label}\n${tags}`;
    });
  });
}

function renderDiscovery() {
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Discovery priorities</span></header>
        <div class="content channel-table">
          <div class="channel-row channel-head">
            <span>Priority</span>
            <span>Status</span>
            <span></span>
          </div>
          ${DISCOVERY.map(
            (d) => `
            <div class="channel-row">
              <div class="channel-name">
                <strong>#${d.rank} ${d.name}</strong>
              </div>
              <span class="badge ${d.status}">${d.status.replace("_", " ")}</span>
              <span class="channel-note"></span>
            </div>`
          ).join("")}
        </div>
        <p class="hint channel-foot">Next critical opens: Google Search Console, Bing + IndexNow, then podcasts.</p>
      </div>
    </div>
  `;
}

function renderMission() {
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Mission lock</span></header>
        <div class="content howto">
          <p>Clear Path Market Science helps wounded veterans and neurodivergent learners read markets without ticker flash that can trigger PTSD or seizures.</p>
          <p>This console is a private automation tool for education posts only — not a brokerage, not signal spam, not flashy ads.</p>
          <ul>
            <li>Prefer calm video + audio</li>
            <li>Always include “not a brokerage”</li>
            <li>Live posts only after founder confirmation in Cursor</li>
          </ul>
          <p><a class="link" href="https://clearpathtrader.com" target="_blank" rel="noreferrer">clearpathtrader.com</a></p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render() {
  updateStats();
  if (view === "publish") {
    // fixed publish render without chip-driven full wipe loop
    viewRoot.innerHTML = `
      <div class="cardcolumn span-2">
        <div class="card composer-card">
          <header><span class="title">Education post composer</span></header>
          <div class="content composer">
            <label>Title
              <input id="f-title" type="text" placeholder="Calm lesson title" />
            </label>
            <label>Caption / description
              <textarea id="f-caption" rows="6">${FOOTER.trim()}</textarea>
            </label>
            <div class="row-2">
              <label>Video URL (Telegram / Discord / social)
                <input id="f-url" type="url" placeholder="https://..." />
              </label>
              <label>Local file name (YouTube upload later)
                <input id="f-file" type="text" placeholder="lesson-support-levels.mp4" />
              </label>
            </div>
            <label>Schedule (optional)
              <input id="f-when" type="datetime-local" />
            </label>
            <div class="channel-picks" id="channel-picks"></div>
            <label class="check"><input id="f-calm" type="checkbox" /> Calm video — no strobing candles / flash patterns</label>
            <label class="check"><input id="f-edu" type="checkbox" /> Education only — not a brokerage / no signals</label>
            <button type="button" class="btn btn-primary" id="btn-queue">Add to automation queue</button>
            <p class="hint">Saves in this browser. Copy package → paste in Cursor → say PUBLISH THIS.</p>
          </div>
        </div>
      </div>
      <div class="cardcolumn">
        <div class="card">
          <header><span class="title">How this works</span></header>
          <div class="content howto">
            <ol>
              <li>Compose the education post</li>
              <li>Pick channels</li>
              <li>Confirm mission checks</li>
              <li>Queue → copy package</li>
              <li>Approve for live ClearPath Publisher send</li>
            </ol>
          </div>
        </div>
        <div class="card">
          <header><span class="title">Latest in queue</span></header>
          <div class="content" id="latest-queue"></div>
        </div>
      </div>
    `;
    wireChannelPicks();
    document.getElementById("btn-queue").addEventListener("click", addFromForm);
    renderLatest();
    return;
  }
  if (view === "queue") return renderQueue();
  if (view === "channels") return renderChannels();
  if (view === "analytics") return renderAnalytics();
  if (view === "seo") return renderSeo();
  if (view === "hashtags") return renderHashtags();
  if (view === "discovery") return renderDiscovery();
  if (view === "mission") return renderMission();
}

updateClock();
setInterval(updateClock, 30000);
render();
initBackend();
setInterval(initBackend, 60000);
