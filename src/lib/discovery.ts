/**
 * ClearPathTrader discovery registry — honest status only.
 * Ranked by how much each helps users find clearpathtrader.com
 * (veterans + neurodivergent learners), not by Zapier popularity.
 */

export type DiscoveryStatus = "connected" | "partial" | "not_yet";
export type DiscoveryTier = "critical" | "high" | "medium" | "later";

export type DiscoveryCategory =
  | "Search & Indexing"
  | "AI Answer Engines"
  | "Video & Education"
  | "Community Trust"
  | "Veterans & Disability"
  | "Professional & Social"
  | "Audio & Low-Stimulus"
  | "Regional Discovery"
  | "Email & CRM"
  | "Analytics & Ops"
  | "Directories & Authority"
  | "Content Syndication";

export interface DiscoveryIntegration {
  id: string;
  rank: number;
  name: string;
  tier: DiscoveryTier;
  category: DiscoveryCategory;
  status: DiscoveryStatus;
  why: string;
  nextStep: string;
  setupUrl?: string;
  missionNote?: string;
  /** Source of truth for "connected" — zapier MCP, site, or manual verify */
  evidence: "zapier" | "site" | "manual" | "none";
}

/** Critical 1–20 + already-live social that feeds discovery */
export const DISCOVERY_INTEGRATIONS: DiscoveryIntegration[] = [
  {
    id: "google-search-console",
    rank: 1,
    name: "Google Search Console",
    tier: "critical",
    category: "Search & Indexing",
    status: "not_yet",
    why: "Primary organic discovery. Verify domain, submit sitemap, fix crawl errors.",
    nextStep: "Open Search Console → Add property clearpathtrader.com → Verify DNS or HTML tag → Submit sitemap.xml",
    setupUrl: "https://search.google.com/search-console",
    evidence: "none",
  },
  {
    id: "bing-indexnow",
    rank: 2,
    name: "Bing Webmaster + IndexNow",
    tier: "critical",
    category: "Search & Indexing",
    status: "not_yet",
    why: "Powers Bing, DuckDuckGo, Yahoo, Ecosia. IndexNow speeds new education pages live.",
    nextStep: "Add site in Bing Webmaster → Import from Google or verify → Enable IndexNow API key on the site",
    setupUrl: "https://www.bing.com/webmasters",
    evidence: "none",
  },
  {
    id: "youtube",
    rank: 3,
    name: "YouTube",
    tier: "critical",
    category: "Video & Education",
    status: "connected",
    why: "Largest education search engine after Google. Calm, captioned lessons beat ticker flash.",
    nextStep: "Publish calm explainers with captions; link every video description to clearpathtrader.com",
    setupUrl: "https://studio.youtube.com",
    missionNote: "Prefer static charts + voiceover; avoid strobing candles and rapid zooms.",
    evidence: "zapier",
  },
  {
    id: "ga4",
    rank: 4,
    name: "Google Analytics 4",
    tier: "critical",
    category: "Analytics & Ops",
    status: "not_yet",
    why: "Shows which queries and pages bring real learners — not vanity traffic.",
    nextStep: "Create GA4 property → Install tag on clearpathtrader.com → Link to Search Console",
    setupUrl: "https://analytics.google.com",
    evidence: "none",
  },
  {
    id: "gmail",
    rank: 5,
    name: "Gmail",
    tier: "critical",
    category: "Email & CRM",
    status: "connected",
    why: "Trust, ops briefing, and nurture for paced learning.",
    nextStep: "Keep clearpathcharts@gmail.com as ops inbox; use MYEYES ops briefing skill",
    evidence: "zapier",
  },
  {
    id: "schema-sitemap",
    rank: 6,
    name: "Sitemap + Schema.org",
    tier: "critical",
    category: "Search & Indexing",
    status: "partial",
    why: "Course/Article/FAQ/Organization schema tells search + AI you are education, not a broker.",
    nextStep: "Audit sitemap.xml live → Add Organization + FAQ + Article JSON-LD → Re-submit in GSC/Bing",
    evidence: "manual",
  },
  {
    id: "reddit",
    rank: 7,
    name: "Reddit",
    tier: "critical",
    category: "Community Trust",
    status: "connected",
    why: "Veterans, ADHD, autism, and trading subs are high-intent discovery.",
    nextStep: "Answer helpfully in relevant subs; never spam. Link encyclopedia pages when useful.",
    evidence: "zapier",
  },
  {
    id: "discord",
    rank: 8,
    name: "Discord",
    tier: "critical",
    category: "Community Trust",
    status: "connected",
    why: "Peer support for neurodivergent learners; referral loop back to the terminal.",
    nextStep: "Pin clearpathtrader.com + calm-learning rules; fan out hub announces carefully",
    evidence: "zapier",
  },
  {
    id: "linkedin",
    rank: 9,
    name: "LinkedIn",
    tier: "critical",
    category: "Professional & Social",
    status: "connected",
    why: "Partnerships, VA/nonprofit referrals, educators, journalists.",
    nextStep: "Publish weekly mission posts; engage veteran + accessibility orgs",
    evidence: "zapier",
  },
  {
    id: "facebook-pages",
    rank: 10,
    name: "Facebook Pages",
    tier: "critical",
    category: "Professional & Social",
    status: "connected",
    why: "Still where many veterans and caregivers discover support tools.",
    nextStep: "Post calm education cards; join veteran caregiver groups as a resource (not ads)",
    evidence: "zapier",
  },
  {
    id: "perplexity",
    rank: 11,
    name: "Perplexity citation readiness",
    tier: "critical",
    category: "AI Answer Engines",
    status: "not_yet",
    why: "Users ask AI for accessible trading education — quotable pages get cited.",
    nextStep: "Strengthen About, FAQ, and encyclopedia pages with clear facts and no brokerage claims",
    evidence: "none",
  },
  {
    id: "chatgpt",
    rank: 12,
    name: "ChatGPT / OpenAI web presence",
    tier: "critical",
    category: "AI Answer Engines",
    status: "not_yet",
    why: "Same citation game: accurate public pages increase correct recommendations.",
    nextStep: "Ensure About + mission + 'not a brokerage' are crawlable and explicit",
    evidence: "none",
  },
  {
    id: "gemini-ai-overviews",
    rank: 13,
    name: "Google Gemini / AI Overviews",
    tier: "critical",
    category: "AI Answer Engines",
    status: "not_yet",
    why: "Google blends classic results with AI summaries; authoritative education wins both.",
    nextStep: "After GSC is live, track AI Overview appearances for accessibility + market literacy queries",
    evidence: "none",
  },
  {
    id: "apple-podcasts",
    rank: 14,
    name: "Apple Podcasts",
    tier: "critical",
    category: "Audio & Low-Stimulus",
    status: "not_yet",
    why: "Audio-first discovery avoids flashing screens — PTSD / photosensitivity aligned.",
    nextStep: "Create show → Host RSS (Spotify for Podcasters or Transistor) → Submit to Apple",
    setupUrl: "https://podcasters.apple.com",
    missionNote: "Mission-aligned: learning without visual overload.",
    evidence: "none",
  },
  {
    id: "spotify-podcasts",
    rank: 15,
    name: "Spotify for Podcasters",
    tier: "critical",
    category: "Audio & Low-Stimulus",
    status: "not_yet",
    why: "Huge reach for calm market literacy episodes.",
    nextStep: "Create podcast on Spotify for Podcasters → Publish first 3 calm episodes → Cross-submit to Apple",
    setupUrl: "https://creators.spotify.com",
    missionNote: "Mission-aligned channel.",
    evidence: "none",
  },
  {
    id: "telegram",
    rank: 16,
    name: "Telegram",
    tier: "high",
    category: "Community Trust",
    status: "connected",
    why: "International hubs and low-noise announcements (@clearpathtraderfreeaccount).",
    nextStep: "Use clearpath-hub-announce for verified fan-out only",
    evidence: "zapier",
  },
  {
    id: "bing-copilot",
    rank: 17,
    name: "Bing Copilot",
    tier: "high",
    category: "AI Answer Engines",
    status: "not_yet",
    why: "Fed by Bing index quality — unlocks after Bing Webmaster + IndexNow.",
    nextStep: "Complete Bing Webmaster (#2), then test Copilot answers for ClearPath queries",
    evidence: "none",
  },
  {
    id: "yandex-webmaster",
    rank: 18,
    name: "Yandex Webmaster",
    tier: "high",
    category: "Regional Discovery",
    status: "not_yet",
    why: "Russian-language hub discovery.",
    nextStep: "Verify RU hub URLs in Yandex Webmaster → Submit sitemap",
    setupUrl: "https://webmaster.yandex.com",
    evidence: "none",
  },
  {
    id: "baidu",
    rank: 19,
    name: "Baidu discovery stack",
    tier: "high",
    category: "Regional Discovery",
    status: "not_yet",
    why: "Required if China hub content must be found inside China.",
    nextStep: "Only after China hub is staffed and compliant — then register Baidu resources",
    evidence: "none",
  },
  {
    id: "duckduckgo-brave",
    rank: 20,
    name: "DuckDuckGo / Brave Search",
    tier: "high",
    category: "Search & Indexing",
    status: "not_yet",
    why: "Privacy-first users (common in ND communities) often ride Bing index quality.",
    nextStep: "Improve Bing index (#2); no separate console required for most coverage",
    evidence: "none",
  },
  {
    id: "instagram",
    rank: 21,
    name: "Instagram Business",
    tier: "high",
    category: "Professional & Social",
    status: "connected",
    why: "Calm carousels of chart explanations; avoid rapid flash Reels.",
    nextStep: "Post static carousels with captions linking to Learn / Encyclopedia",
    missionNote: "Cap motion; prefer static carousels.",
    evidence: "zapier",
  },
  {
    id: "buffer",
    rank: 22,
    name: "Buffer",
    tier: "high",
    category: "Analytics & Ops",
    status: "connected",
    why: "Consistent multi-channel publishing without daily chaos.",
    nextStep: "Schedule calm education posts across connected socials",
    evidence: "zapier",
  },
  {
    id: "zapier-mcp",
    rank: 23,
    name: "Zapier MCP (ops fabric)",
    tier: "high",
    category: "Analytics & Ops",
    status: "connected",
    why: "MYEYES glue: ops briefing + hub announce across real ClearPath apps.",
    nextStep: "Keep apps authenticated at mcp.zapier.com; run clearpath-ops-briefing weekly",
    setupUrl: "https://mcp.zapier.com",
    evidence: "zapier",
  },
];

export function getDiscoveryStats() {
  const total = DISCOVERY_INTEGRATIONS.length;
  const connected = DISCOVERY_INTEGRATIONS.filter((i) => i.status === "connected").length;
  const partial = DISCOVERY_INTEGRATIONS.filter((i) => i.status === "partial").length;
  const notYet = DISCOVERY_INTEGRATIONS.filter((i) => i.status === "not_yet").length;
  const critical = DISCOVERY_INTEGRATIONS.filter((i) => i.tier === "critical");
  const criticalOpen = critical.filter((i) => i.status !== "connected").length;
  const criticalConnected = critical.filter((i) => i.status === "connected").length;
  return {
    total,
    connected,
    partial,
    notYet,
    criticalTotal: critical.length,
    criticalOpen,
    criticalConnected,
  };
}

export function groupByCategory(items: DiscoveryIntegration[] = DISCOVERY_INTEGRATIONS) {
  const map = new Map<DiscoveryCategory, DiscoveryIntegration[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return Array.from(map.entries()).map(([category, entries]) => ({
    category,
    items: entries.sort((a, b) => a.rank - b.rank),
  }));
}

export function statusLabel(status: DiscoveryStatus): string {
  if (status === "connected") return "Connected";
  if (status === "partial") return "Partial";
  return "Not yet";
}

export function getNextActions(limit = 5): DiscoveryIntegration[] {
  return DISCOVERY_INTEGRATIONS.filter((i) => i.status !== "connected")
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit);
}
