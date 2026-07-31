/**
 * ClearPath hashtag packs for education posts (not brokerage spam).
 */

function slugTag(text: string): string {
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

export const HASHTAG_SECTORS = [
  "data centers",
  "AI infrastructure",
  "B2B technology",
  "cybersecurity",
  "veteran education",
  "neurodivergent learning",
] as const;

export type CommunityHashtagGroup = {
  id: string;
  label: string;
  note: string;
  packs: { name: string; focus: string; tags: string }[];
};

/** Quick ready-to-grab packs for forums, Reddit, Discord, sentiment feeds */
export const COMMUNITY_HASHTAG_GROUPS: CommunityHashtagGroup[] = [
  {
    id: "forums",
    label: "Trading forums",
    note: "Niche discovery tags when posting education that speaks to these communities",
    packs: [
      {
        name: "BabyPips",
        focus: "forex-focused",
        tags: "#BabyPips #ForexEducation #ForexTrading #RetailForex #FXBasics #CurrencyMarkets #LearnForex #ClearPathTrader",
      },
      {
        name: "Trade2Win",
        focus: "UK's largest trading forum",
        tags: "#Trade2Win #UKTrading #TradingForum #MarketEducation #DiscretionaryTrading #ClearPathTrader",
      },
      {
        name: "MQL5 Community",
        focus: "largest forex / automated trading forum",
        tags: "#MQL5 #MetaTrader #AlgoTrading #ExpertAdvisors #AutomatedTrading #ForexBots #MQL4 #ClearPathTrader",
      },
      {
        name: "SteadyOptions",
        focus: "options-focused",
        tags: "#SteadyOptions #OptionsTrading #OptionsEducation #DefinedRisk #IronCondor #OptionsStrategies #ClearPathTrader",
      },
      {
        name: "Aussie Stock Forums",
        focus: "ASX / Australia",
        tags: "#AussieStockForums #ASX #ASXStocks #AustralianInvesting #ASXEducation #ClearPathTrader",
      },
      {
        name: "MyPivots",
        focus: "day trading",
        tags: "#MyPivots #DayTrading #IntradayTrading #PivotPoints #PriceAction #DayTradingEducation #ClearPathTrader",
      },
      {
        name: "NinjaTrader Community",
        focus: "futures",
        tags: "#NinjaTrader #FuturesTrading #OrderFlow #ESFutures #NQFutures #FuturesEducation #ClearPathTrader",
      },
    ],
  },
  {
    id: "reddit",
    label: "Reddit",
    note: "Use sparingly — education framing only; never meme-pump or broker CTAs",
    packs: [
      {
        name: "r/wallstreetbets",
        focus: "14.8M members",
        tags: "#WallStreetBets #WSB #RetailInvestors #MarketEducation #NotFinancialAdvice #ClearPathTrader",
      },
      {
        name: "r/stocks",
        focus: "7.2M members",
        tags: "#Stocks #StockMarket #InvestingEducation #EquityMarkets #LongTermInvesting #ClearPathTrader",
      },
      {
        name: "r/Trading",
        focus: "active traders",
        tags: "#Trading #TradingCommunity #TechnicalAnalysis #TradingEducation #RiskManagement #ClearPathTrader",
      },
    ],
  },
  {
    id: "discord",
    label: "Discord communities",
    note: "Hashtags for social cross-posts that mention or target these rooms",
    packs: [
      {
        name: "Investors Underground",
        focus: "Discord",
        tags: "#InvestorsUnderground #DayTradingEducation #SmallCapEducation #ClearPathTrader",
      },
      {
        name: "Warrior Trading",
        focus: "Discord",
        tags: "#WarriorTrading #DayTrading #MomentumTrading #TradingEducation #ClearPathTrader",
      },
      {
        name: "Bear Bull Traders",
        focus: "Discord",
        tags: "#BearBullTraders #DayTradingCommunity #TradingRoom #ClearPathTrader",
      },
      {
        name: "For Traders",
        focus: "prop-firm / funded-account focused",
        tags: "#ForTraders #PropFirm #FundedTrader #PropTradingEducation #RiskRules #ClearPathTrader",
      },
      {
        name: "Bull Trading Community",
        focus: "Discord",
        tags: "#BullTradingCommunity #TradingCommunity #MarketEducation #ClearPathTrader",
      },
      {
        name: "Humbled Trader",
        focus: "Discord",
        tags: "#HumbledTrader #TradingMindset #RetailTrading #TradingEducation #ClearPathTrader",
      },
      {
        name: "Elite Trading Community",
        focus: "Discord",
        tags: "#EliteTradingCommunity #TradingEducation #MarketStructure #ClearPathTrader",
      },
      {
        name: "SMB Capital",
        focus: "Discord",
        tags: "#SMBCapital #PropTrading #TradingDesk #ProfessionalTrading #ClearPathTrader",
      },
      {
        name: "HighStrike Trading Room",
        focus: "Discord",
        tags: "#HighStrike #OptionsTrading #TradingRoom #OptionsEducation #ClearPathTrader",
      },
      {
        name: "Market Masters",
        focus: "Discord",
        tags: "#MarketMasters #TradingCommunity #MarketEducation #ClearPathTrader",
      },
      {
        name: "Disruptive Investments",
        focus: "Discord",
        tags: "#DisruptiveInvestments #GrowthInvesting #InvestingEducation #ClearPathTrader",
      },
      {
        name: "FLI Capital",
        focus: "Discord",
        tags: "#FLICapital #TradingCommunity #CapitalMarketsEducation #ClearPathTrader",
      },
    ],
  },
  {
    id: "sentiment",
    label: "Sentiment / social",
    note: "StockTwits + eToro feed — keep CalmPath / education-only voice",
    packs: [
      {
        name: "StockTwits",
        focus: "sentiment / social",
        tags: "#StockTwits #FinTwit #MarketSentiment #StockTalk #TradingIdeas #InvestingEducation #ClearPathTrader #NotABrokerage",
      },
      {
        name: "eToro USA community feed",
        focus: "social / copy-trading audience",
        tags: "#eToro #eToroUSA #SocialTrading #CopyTrading #InvestingCommunity #FinancialLiteracy #ClearPathTrader #NotABrokerage",
      },
    ],
  },
];

export function formatCommunityHashtagCatalog(): string {
  const lines: string[] = [
    "CLEARPATH — READY-TO-GRAB COMMUNITY HASHTAGS",
    "Education / analytics only. Not a brokerage.",
    "",
  ];
  for (const group of COMMUNITY_HASHTAG_GROUPS) {
    lines.push(`=== ${group.label.toUpperCase()} ===`);
    lines.push(group.note);
    lines.push("");
    for (const pack of group.packs) {
      lines.push(`${pack.name} (${pack.focus})`);
      lines.push(pack.tags);
      lines.push("");
    }
  }
  lines.push("RULES");
  lines.push("- Grab 3–8 tags max per post");
  lines.push("- Always keep #ClearPathTrader + #NotABrokerage on public social");
  lines.push("- Never use pump, signal, or deposit CTAs");
  return lines.join("\n");
}

export function generateHashtagPack(
  topic: string,
  sector: string,
  keyword: string,
): string {
  const safeTopic = topic.trim() || "Calm market education";
  const safeSector = sector.trim() || "B2B technology";
  const safeKeyword = keyword.trim() || safeTopic.toLowerCase();
  const topicTag = slugTag(safeTopic) || "CalmMarkets";
  const sectorTag = slugTag(safeSector) || "B2BTechnology";
  const keywordTag = slugTag(safeKeyword) || topicTag;

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

  return `CLEARPATH HASHTAG PACK
Topic: ${safeTopic}
Sector: ${safeSector}
Keyword: ${safeKeyword}

CORE SET
${core.join(" ")}

BY CHANNEL
Instagram:
${[...core, "#LearnOnInstagram", "#CalmLearning", "#EducationCarousel"].join(" ")}

LinkedIn:
${[...core, "#B2B", "#ThoughtLeadership", "#DataCenters", "#Cybersecurity", "#AIInfrastructure"].join(" ")}

Facebook:
${[...core, "#CommunityLearning", "#ClearPathEducation"].join(" ")}

YouTube:
${[...core, "#YouTubeEducation", "#MarketExplained"].join(" ")}

TikTok:
${["#ClearPathTrader", `#${topicTag}`, `#${keywordTag}`, "#LearnOnTikTok", "#CalmFinance", "#MarketBasics"].join(" ")}

Douyin:
${["#ClearPath", `#${sectorTag}`, "#FinanceEducation", "#CalmCharts"].join(" ")}

Lemon8:
${["#ClearPathTrader", `#${topicTag}`, "#LifestyleLearning", "#CalmFocus"].join(" ")}

Reddit:
Tags/flair ideas: ${safeKeyword} | ${safeSector} | accessible education | ClearPathTrader
Also see ready packs: r/stocks · r/Trading · r/wallstreetbets (education tone only)

Mastodon:
${[...core, "#A11y", "#Neurodiversity", "#FinLit"].join(" ")}

Snapchat:
${["#ClearPathTrader", `#${topicTag}`, "#MarketEducation"].join(" ")}

WhatsApp:
No hashtags needed — use plain lesson link + short caption.

WeChat:
Use topic keywords in caption; hashtags are limited on WeChat.

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
