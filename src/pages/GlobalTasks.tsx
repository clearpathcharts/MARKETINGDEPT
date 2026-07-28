import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckSquare, ExternalLink, AlertTriangle } from "lucide-react";

const tasks = [
  { id: 1, title: "Google Search Console", completed: true, priority: "high", docLink: "/docs/gsc-setup" },
  { id: 2, title: "Submit Sitemap", completed: true, priority: "high", docLink: "/docs/sitemaps" },
  { id: 3, title: "Bing Webmaster", completed: true, priority: "high", docLink: "/docs/bing-setup" },
  { id: 4, title: "IndexNow Integration", completed: true, priority: "high", docLink: "/docs/indexnow" },
  { id: 5, title: "Baidu Verification", completed: false, priority: "high", docLink: "/docs/baidu" },
  { id: 6, title: "Brave Submission", completed: false, priority: "high", docLink: "/docs/brave" },
  { id: 7, title: "Cloud Run Secret Configuration", completed: true, priority: "medium", docLink: "/docs/secrets" },
  { id: 8, title: "Regional Sitemaps Split", completed: true, priority: "medium", docLink: "/docs/sitemaps-advanced" },
  { id: 9, title: "Publish More Guides (Q3 Target)", completed: false, priority: "medium", docLink: "/docs/content-calendar" },
  { id: 10, title: "Internal Links Audit", completed: true, priority: "medium", docLink: "/docs/internal-linking" },
  { id: 11, title: "Guest Posts Outreach", completed: false, priority: "low", docLink: "/docs/outreach" },
];

export function GlobalTasks() {
  const highPriority = tasks.filter(t => t.priority === 'high');
  const otherTasks = tasks.filter(t => t.priority !== 'high');

  const renderTask = (task: any) => (
    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-cyber-border bg-cyber-bg-darker/50 hover:bg-cyber-bg-dark hover:border-cyber-primary/50 transition-colors group">
      <div className="flex items-center gap-3">
        <button className={`flex items-center justify-center w-5 h-5 rounded border ${
          task.completed ? 'bg-cyber-success/20 border-cyber-success text-cyber-success' : 'border-cyber-text-muted text-transparent hover:border-cyber-primary'
        }`}>
          {task.completed && <CheckSquare className="w-4 h-4" />}
        </button>
        <span className={`font-code text-sm ${task.completed ? 'text-cyber-text-muted line-through' : 'text-cyber-text font-bold group-hover:text-cyber-primary transition-colors'}`}>
          {task.title}
        </span>
      </div>
      <button className="flex items-center gap-1 text-[10px] font-code uppercase text-cyber-text-muted hover:text-cyber-primary transition-colors border border-cyber-border/50 px-2 py-1 rounded bg-cyber-bg-dark">
        Docs <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Global Task Center</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// STRATEGIC IMPLEMENTATION CHECKLIST"}</p>
        </div>
      </div>

      <Card className="border-cyber-warning/30 shadow-[0_0_15px_rgba(255,176,0,0.05)]">
        <CardHeader className="border-b border-cyber-border/50 bg-cyber-warning/5">
          <CardTitle className="flex items-center gap-2 text-cyber-warning font-tech tracking-wider uppercase text-lg">
            <AlertTriangle className="h-5 w-5" />
            HIGH PRIORITY ACTION ITEMS
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          {highPriority.map(renderTask)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-cyber-border/50">
          <CardTitle className="flex items-center gap-2 text-cyber-secondary font-tech tracking-wider uppercase text-lg">
            <CheckSquare className="h-5 w-5" />
            STANDARD QUEUE
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          {otherTasks.map(renderTask)}
        </CardContent>
      </Card>
    </div>
  );
}
