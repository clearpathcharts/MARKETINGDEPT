/**
 * ClearPath Automation Console
 * Local Buffer-style queue for education posts.
 * Live social sends = Cursor + Zapier after you approve a package.
 */

const STORAGE_KEY = "clearpath-automation-queue-v1";

const CHANNELS = [
  { id: "facebook", name: "Facebook", zapier: "Facebook Pages", status: "connected", note: "CLEAR PATH Markets Science" },
  { id: "youtube", name: "YouTube", zapier: "youtube_upload_video", status: "connected", note: "Upload file via Cursor" },
  { id: "whatsapp", name: "WhatsApp", zapier: "WhatsApp Business", status: "not_yet", note: "Connect Zapier WhatsApp next" },
  { id: "instagram", name: "Instagram", zapier: "Instagram for Business", status: "connected", note: "Calm carousels preferred" },
  { id: "wechat", name: "WeChat", zapier: "WeChat", status: "not_yet", note: "China hub when staffed" },
  { id: "tiktok", name: "TikTok", zapier: "TikTok", status: "not_yet", note: "Calm edits only — flash risk" },
  { id: "douyin", name: "Douyin", zapier: "Douyin", status: "not_yet", note: "China short-video hub" },
  { id: "reddit", name: "Reddit", zapier: "reddit create_post", status: "connected", note: "ClearMarketScience — pick subreddit" },
  { id: "snapchat", name: "Snapchat", zapier: "Snapchat", status: "not_yet", note: "Needs Zapier app + auth" },
  { id: "linkedin", name: "LinkedIn", zapier: "linkedin share", status: "connected", note: "Education posts only" },
  { id: "lemon8", name: "Lemon8", zapier: "Lemon8", status: "not_yet", note: "Needs Zapier app + auth" },
  { id: "mastodon", name: "Mastodon", zapier: "Mastodon", status: "not_yet", note: "Privacy-forward ND communities" },
  { id: "telegram", name: "Telegram", zapier: "telegram_send_message", status: "connected", note: "@clearpathtraderfreeaccount" },
  { id: "discord", name: "Discord", zapier: "discord_send_channel_message", status: "connected", note: "Pick channel at send" },
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
    lines.push(`- ${ch.name} → ${ch.zapier} → ${ch.note}`);
  });
  lines.push(
    "",
    "CURSOR INSTRUCTIONS",
    "1. Show this package to the founder and wait for approval.",
    "2. Run Zapier write actions only after explicit confirmation.",
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
              </div>
              <div class="queue-actions">
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
      queue = queue.filter((j) => j.id !== btn.dataset.del);
      saveQueue();
      render();
    });
  });
}

function renderChannels() {
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Channel map (honest status)</span></header>
        <div class="content channel-table">
          ${CHANNELS.map(
            (ch) => `
            <div class="channel-row">
              <strong>${ch.name}</strong>
              <span class="badge ${ch.status}">${ch.status.replace("_", " ")}</span>
              <span class="hint">${ch.zapier}</span>
              <span class="hint">${ch.note}</span>
            </div>`
          ).join("")}
        </div>
        <p class="hint" style="padding:0 1rem 1rem">Status from ClearPath Zapier MCP session — not fake OAuth badges.</p>
      </div>
    </div>
  `;
}

function renderDiscovery() {
  viewRoot.innerHTML = `
    <div class="cardcolumn span-all">
      <div class="card">
        <header><span class="title">Discovery priorities</span></header>
        <div class="content channel-table">
          ${DISCOVERY.map(
            (d) => `
            <div class="channel-row">
              <strong>#${d.rank} ${d.name}</strong>
              <span class="badge ${d.status}">${d.status.replace("_", " ")}</span>
            </div>`
          ).join("")}
        </div>
        <p class="hint" style="padding:0 1rem 1rem">Next critical opens: Google Search Console, Bing + IndexNow, then podcasts.</p>
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
              <li>Approve in Cursor for live Zapier send</li>
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
  if (view === "discovery") return renderDiscovery();
  if (view === "mission") return renderMission();
}

// remove dead renderPublish reference path
updateClock();
setInterval(updateClock, 30000);
render();
