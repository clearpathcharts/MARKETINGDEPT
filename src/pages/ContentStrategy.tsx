import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { FileText, CheckCircle2, XCircle, Search, ExternalLink } from "lucide-react";

const contentData = [
  { title: "Gold Bar Indicator", status: "Published", internalLinks: 8, externalLinks: 2, traffic: "1.2K", indexing: "Indexed", aiCoverage: 96, qualityScore: 92 },
  { title: "Moving Average Guide", status: "Published", internalLinks: 12, externalLinks: 5, traffic: "3.4K", indexing: "Indexed", aiCoverage: 88, qualityScore: 89 },
  { title: "Crypto Volatility 2024", status: "Review", internalLinks: 4, externalLinks: 0, traffic: "-", indexing: "Pending", aiCoverage: 45, qualityScore: 78 },
  { title: "Forex Trading Hours", status: "Published", internalLinks: 6, externalLinks: 1, traffic: "840", indexing: "Indexed", aiCoverage: 91, qualityScore: 85 },
  { title: "Risk Management Basics", status: "Draft", internalLinks: 2, externalLinks: 0, traffic: "-", indexing: "None", aiCoverage: 12, qualityScore: 65 },
  { title: "Candlestick Patterns", status: "Published", internalLinks: 15, externalLinks: 8, traffic: "5.6K", indexing: "Indexed", aiCoverage: 98, qualityScore: 96 },
];

export function ContentStrategy() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Content Strategy</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// ASSET PERFORMANCE AND OPTIMIZATION METRICS"}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
              <input 
                type="text" 
                placeholder="Search content assets..." 
                className="h-9 w-64 rounded-md border border-cyber-border bg-cyber-bg-darker pl-9 pr-4 text-sm text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary font-code"
              />
           </div>
        </div>
      </div>

      <Card className="bg-cyber-bg-darker/50 border-cyber-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] uppercase font-code tracking-wider text-cyber-text-secondary bg-cyber-bg-dark border-b border-cyber-border">
              <tr>
                <th className="px-6 py-4 font-bold">Content Asset</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Internal Links</th>
                <th className="px-6 py-4 font-bold text-center">External Links</th>
                <th className="px-6 py-4 font-bold text-right">Traffic (30d)</th>
                <th className="px-6 py-4 font-bold text-center">Indexing</th>
                <th className="px-6 py-4 font-bold text-center">AI Coverage</th>
                <th className="px-6 py-4 font-bold text-right">Quality Score</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contentData.map((item, idx) => (
                <tr key={idx} className="border-b border-cyber-border/50 hover:bg-cyber-bg-hover/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-cyber-text-muted group-hover:text-cyber-primary transition-colors" />
                      <span className="font-bold text-cyber-text">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-code font-bold uppercase border ${
                      item.status === 'Published' ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/30' :
                      item.status === 'Review' ? 'bg-cyber-secondary/10 text-cyber-secondary border-cyber-secondary/30' :
                      'bg-cyber-text-muted/10 text-cyber-text-muted border-cyber-border'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-code text-cyber-text-secondary">{item.internalLinks}</td>
                  <td className="px-6 py-4 text-center font-code text-cyber-text-secondary">{item.externalLinks}</td>
                  <td className="px-6 py-4 text-right font-code font-bold text-cyber-text">{item.traffic}</td>
                  <td className="px-6 py-4 text-center">
                    {item.indexing === 'Indexed' ? (
                      <CheckCircle2 className="h-4 w-4 text-cyber-success mx-auto" />
                    ) : item.indexing === 'Pending' ? (
                      <div className="h-4 w-4 rounded-full border-2 border-cyber-warning border-t-transparent animate-spin mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-cyber-text-muted mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-16 h-1.5 bg-cyber-bg-dark rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.aiCoverage > 80 ? 'bg-cyber-success' : item.aiCoverage > 40 ? 'bg-cyber-warning' : 'bg-cyber-danger'}`}
                          style={{ width: `${item.aiCoverage}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-code text-cyber-text-muted w-6">{item.aiCoverage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm font-tech font-bold ${
                      item.qualityScore >= 90 ? 'text-cyber-success text-glow' : 
                      item.qualityScore >= 70 ? 'text-cyber-warning' : 
                      'text-cyber-danger'
                    }`}>
                      {item.qualityScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-cyber-text-muted hover:text-cyber-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
