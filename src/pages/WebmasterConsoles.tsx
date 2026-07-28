import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, AlertTriangle, Clock, RefreshCw, ExternalLink } from "lucide-react";

const consoles = [
  {
    name: 'Google Search Console',
    status: 'Connected',
    verification: 'Valid',
    sitemap: 'Submitted',
    coverage: 'Healthy',
    errors: 0,
    lastCrawl: '2 hours ago',
    type: 'primary'
  },
  {
    name: 'Bing Webmaster',
    status: 'Connected',
    indexNow: 'Running',
    lastCrawl: '4 hours ago',
    type: 'primary'
  },
  {
    name: 'Yandex Webmaster',
    status: 'Connected',
    verification: 'Valid',
    indexing: 'Active',
    robots: 'Valid',
    sitemap: 'Submitted',
    indexNow: 'Running',
    type: 'regional'
  },
  {
    name: 'Baidu Webmaster',
    status: 'Needs Verification',
    chinesePages: 'Indexed',
    crawlStatus: 'Pending',
    robots: 'Warning',
    encoding: 'UTF-8',
    type: 'regional'
  },
  {
    name: 'Brave Search',
    status: 'Pending',
    siteSubmission: 'Complete',
    crawlerActivity: 'Low',
    type: 'privacy'
  },
  {
    name: 'DuckDuckGo',
    status: 'Indirect',
    crawlerActivity: 'Bing Dependent',
    type: 'privacy'
  }
];

export function WebmasterConsoles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Webmaster Consoles</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// DIRECT SEARCH ENGINE INTEGRATIONS"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {consoles.map((console, idx) => (
          <Card key={idx} className="hover:-translate-y-1 transition-transform duration-300">
            <CardHeader className="border-b border-cyber-border/50 bg-cyber-bg-darker/50 pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-tech tracking-wider text-cyber-text">{console.name}</CardTitle>
                <div className={`px-2 py-1 rounded text-[10px] font-code font-bold uppercase border ${
                  console.status === 'Connected' || console.status === 'Indirect'
                    ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/30'
                    : console.status === 'Pending'
                    ? 'bg-cyber-secondary/10 text-cyber-secondary border-cyber-secondary/30'
                    : 'bg-cyber-warning/10 text-cyber-warning border-cyber-warning/30'
                }`}>
                  {console.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 font-code text-sm">
              {Object.entries(console).map(([key, value]) => {
                if (key === 'name' || key === 'status' || key === 'type') return null;
                return (
                  <div key={key} className="flex justify-between items-center py-1 border-b border-cyber-border/30 last:border-0">
                    <span className="text-cyber-text-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={`font-bold ${
                      value === 0 || value === 'Valid' || value === 'Submitted' || value === 'Healthy' || value === 'Running' || value === 'Active' || value === 'Complete' || value === 'Indexed'
                        ? 'text-cyber-success'
                        : value === 'Warning' || value === 'Pending' || value === 'Needs Verification'
                        ? 'text-cyber-warning'
                        : 'text-cyber-text'
                    }`}>
                      {value}
                    </span>
                  </div>
                );
              })}
              
              <button className="w-full mt-4 flex items-center justify-center gap-2 text-xs font-code text-cyber-primary border border-cyber-primary/30 rounded py-2 hover:bg-cyber-primary/10 transition-colors">
                OPEN CONSOLE <ExternalLink className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
