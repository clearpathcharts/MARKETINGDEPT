import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Trello, Plus, MoreHorizontal, MessageSquare, Paperclip, Clock } from "lucide-react";

const pipelineStages = [
  {
    id: "ideas",
    title: "Ideas",
    color: "border-cyber-text-muted",
    tasks: [
      { id: "t1", title: "Gold Market Analysis Q3", date: "2 days ago", comments: 2, attachments: 0 },
      { id: "t2", title: "Beginner Guide: Moving Averages", date: "4 days ago", comments: 5, attachments: 1 }
    ]
  },
  {
    id: "writing",
    title: "Writing",
    color: "border-cyber-warning",
    tasks: [
      { id: "t3", title: "Risk Management Strategies", date: "In Progress", comments: 1, attachments: 3 }
    ]
  },
  {
    id: "review",
    title: "Review",
    color: "border-cyber-secondary",
    tasks: [
      { id: "t4", title: "Crypto Volatility Index", date: "Needs Approval", comments: 8, attachments: 2 }
    ]
  },
  {
    id: "seo",
    title: "SEO Prep",
    color: "border-cyber-highlight",
    tasks: [
      { id: "t5", title: "Forex Trading Hours Guide", date: "Optimizing", comments: 0, attachments: 0 }
    ]
  },
  {
    id: "publish",
    title: "Published",
    color: "border-cyber-primary",
    tasks: [
      { id: "t6", title: "Understanding Candlesticks", date: "Published 2h ago", comments: 0, attachments: 0 },
      { id: "t7", title: "Top 5 Indicators 2024", date: "Published 5h ago", comments: 2, attachments: 1 }
    ]
  }
];

export function PublishingPipeline() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4 shrink-0">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Publishing Pipeline</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// CONTENT LIFECYCLE AND DEPLOYMENT TRACKING"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 text-xs font-code font-bold shadow-[0_0_15px_rgba(255,90,31,0.1)] transition-all">
            <Plus className="h-4 w-4" />
            NEW CONTENT
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="w-80 flex flex-col">
              <div className={`flex items-center justify-between p-3 border-t-2 ${stage.color} bg-cyber-bg-darker/80 rounded-t-lg`}>
                <h3 className="font-tech font-bold text-cyber-text tracking-wide">{stage.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-code font-bold bg-cyber-bg-dark px-2 py-0.5 rounded text-cyber-text-muted">
                    {stage.tasks.length}
                  </span>
                  <button className="text-cyber-text-muted hover:text-cyber-text transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-cyber-bg-darker/30 p-3 rounded-b-lg border border-t-0 border-cyber-border/50 flex flex-col gap-3">
                {stage.tasks.map((task) => (
                  <Card key={task.id} className="bg-cyber-bg-dark border-cyber-border/80 hover:border-cyber-primary/50 cursor-grab hover:shadow-[0_4px_15px_rgba(255,90,31,0.1)] transition-all group">
                    <CardContent className="p-4">
                      <p className="text-sm text-cyber-text font-bold mb-3 leading-snug group-hover:text-cyber-primary transition-colors">{task.title}</p>
                      
                      <div className="flex items-center justify-between text-xs text-cyber-text-muted font-code">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{task.comments}</span>
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <button className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-cyber-border/80 text-cyber-text-muted hover:text-cyber-primary hover:border-cyber-primary/50 hover:bg-cyber-primary/5 text-sm transition-colors mt-1">
                  <Plus className="h-4 w-4" />
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
