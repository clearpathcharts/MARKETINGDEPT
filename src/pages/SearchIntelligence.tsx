import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, ExternalLink, ListOrdered, Search } from "lucide-react";
import { DISCOVERY_INTEGRATIONS } from "../lib/discovery";

const STEPS_GSC = [
  "Go to Google Search Console and sign in with the ClearPath Google account.",
  "Add property: clearpathtrader.com (Domain property preferred via DNS TXT).",
  "Complete verification (DNS at your registrar, or HTML tag if needed).",
  "Submit https://clearpathtrader.com/sitemap.xml (confirm the live URL first).",
  "Come back here and tell Cursor: “GSC verified” so we mark #1 Connected.",
];

const STEPS_BING = [
  "Open Bing Webmaster Tools and sign in.",
  "Add clearpathtrader.com — Import from Google Search Console if GSC is done, or verify manually.",
  "Submit the same sitemap.",
  "Generate an IndexNow API key and add it to the site (we’ll wire this in code next).",
  "Tell Cursor: “Bing verified” so we mark #2 Connected.",
];

export function SearchIntelligence() {
  const gsc = DISCOVERY_INTEGRATIONS.find((i) => i.id === "google-search-console");
  const bing = DISCOVERY_INTEGRATIONS.find((i) => i.id === "bing-indexnow");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">
            Search Intelligence
          </h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">
            {"// CRITICAL #1–2 · GOOGLE + BING · REAL SETUP ONLY"}
          </p>
        </div>
        <Link
          to="/integrations"
          className="px-4 py-2 rounded border border-cyber-border text-xs font-code text-cyber-text-secondary hover:text-cyber-text hover:border-cyber-primary/40 transition-colors"
        >
          Full discovery registry →
        </Link>
      </div>

      <Card className="bg-cyber-bg-darker/40 border-cyber-primary/30">
        <CardContent className="p-5 font-code text-sm text-cyber-text-secondary leading-relaxed">
          Without Search Console and Bing, social posts cannot fix organic discovery. Do these two
          before podcasts, AI citation work, or more Zapier apps.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-cyber-bg border-cyber-border">
          <CardHeader className="border-b border-cyber-border/50 pb-4">
            <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
              <Search className="h-5 w-5 text-cyber-primary" />
              #1 GOOGLE SEARCH CONSOLE
            </CardTitle>
            <p className="font-code text-xs text-cyber-warning mt-2">
              Status: {gsc ? gsc.status.replace("_", " ").toUpperCase() : "NOT YET"}
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <ol className="space-y-3">
              {STEPS_GSC.map((step, i) => (
                <li key={i} className="flex gap-3 font-code text-sm text-cyber-text-secondary">
                  <span className="text-cyber-primary font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-primary/10 border border-cyber-primary/50 text-cyber-primary text-sm font-code font-bold rounded hover:bg-cyber-primary/20 transition-colors"
            >
              Open Search Console <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>

        <Card className="bg-cyber-bg border-cyber-border">
          <CardHeader className="border-b border-cyber-border/50 pb-4">
            <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-cyber-primary" />
              #2 BING + INDEXNOW
            </CardTitle>
            <p className="font-code text-xs text-cyber-warning mt-2">
              Status: {bing ? bing.status.replace("_", " ").toUpperCase() : "NOT YET"}
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <ol className="space-y-3">
              {STEPS_BING.map((step, i) => (
                <li key={i} className="flex gap-3 font-code text-sm text-cyber-text-secondary">
                  <span className="text-cyber-primary font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href="https://www.bing.com/webmasters"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-primary/10 border border-cyber-primary/50 text-cyber-primary text-sm font-code font-bold rounded hover:bg-cyber-primary/20 transition-colors"
            >
              Open Bing Webmaster <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-cyber-bg border-cyber-border">
        <CardHeader className="border-b border-cyber-border/50 pb-4">
          <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#39FF14]" />
            WHEN YOU FINISH
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 font-code text-sm text-cyber-text-secondary leading-relaxed space-y-2">
          <p>
            Reply in this chat with{" "}
            <span className="text-cyber-primary">GSC verified</span> and/or{" "}
            <span className="text-cyber-primary">Bing verified</span>.
          </p>
          <p>
            I will flip those rows to Connected in the discovery registry — only then. No fake
            badges.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
