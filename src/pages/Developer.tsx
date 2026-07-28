import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Terminal, ShieldCheck, Activity, CheckCircle2, AlertTriangle, Zap, GitCommit, Play, Database, FileCode, Check, X, Search } from "lucide-react";

const initialReviews = [
  { id: "salesforce", name: "Salesforce", change: "SDK Updated", risk: "Low", trustScore: 99.8, status: "Pending" },
  { id: "stripe", name: "Stripe", change: "New Webhook Added", risk: "Medium", trustScore: 94.2, status: "Pending" },
  { id: "openai", name: "OpenAI", change: "Added Endpoint", risk: "Low", trustScore: 98.4, status: "Pending" },
  { id: "random-api", name: "Startup API v2", change: "Major Version Update", risk: "Critical", trustScore: 61.0, status: "Pending" },
];

export function Developer() {
  const [activeTab, setActiveTab] = useState("Approvals");
  const [reviews, setReviews] = useState(initialReviews);

  const removeReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Integration Factory</h1>
          <p className="text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] text-sm mt-1 font-code font-bold">
            {"// AUTONOMOUS CODE GENERATION ENGINE (ICG)"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-secondary/30 bg-cyber-secondary/10 text-cyber-secondary text-sm font-code font-bold shadow-[0_0_15px_rgba(255,0,255,0.1)]">
            <GitCommit className="h-4 w-4" />
            {reviews.length} PENDING REVIEWS
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-cyber-border pb-2">
        {["Approvals", "Risk Engine", "Deployment Pipeline", "Discovery Engine"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-code text-sm font-bold uppercase transition-colors ${
              activeTab === tab
                ? 'text-cyber-primary border-b-2 border-cyber-primary'
                : 'text-cyber-text-muted hover:text-cyber-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Approvals" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-4">
            <h3 className="font-tech text-lg text-cyber-text tracking-wider uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyber-primary" />
              Approval Dashboard
            </h3>
            
            {reviews.length === 0 && (
              <div className="p-8 text-center text-cyber-text-muted font-code border border-cyber-border rounded bg-cyber-bg-darker">
                No pending reviews
              </div>
            )}
            {reviews.map((review, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-cyber-bg-darker border border-cyber-border rounded hover:border-cyber-primary/50 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded border ${
                    review.risk === 'Critical' ? 'bg-cyber-danger/10 border-cyber-danger/30 text-cyber-danger' :
                    review.risk === 'Medium' ? 'bg-cyber-warning/10 border-cyber-warning/30 text-cyber-warning' :
                    'bg-[#39FF14]/10 border-[#39FF14]/30 text-[#39FF14]'
                  }`}>
                    {review.risk === 'Critical' ? <AlertTriangle className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-tech font-bold text-cyber-text tracking-wide text-lg">{review.name}</h4>
                    <p className="font-code text-sm text-cyber-text-secondary mt-1">{review.change}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-code text-cyber-text-muted uppercase">Trust Score</span>
                     <span className={`font-tech font-bold text-lg ${review.trustScore > 90 ? 'text-[#39FF14]' : 'text-cyber-warning'}`}>
                       {review.trustScore}%
                     </span>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => removeReview(review.id)} className="px-3 py-1.5 bg-cyber-bg border border-cyber-border rounded text-cyber-text-muted hover:text-cyber-text hover:bg-cyber-bg-dark transition-colors font-code text-sm">
                      Review
                    </button>
                    <button onClick={() => removeReview(review.id)} className="p-1.5 bg-cyber-danger/10 border border-cyber-danger/30 text-cyber-danger rounded hover:bg-cyber-danger/20 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                    <button onClick={() => removeReview(review.id)} className="p-1.5 bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] rounded hover:bg-[#39FF14]/20 transition-colors shadow-[0_0_10px_rgba(57,255,20,0.1)]">
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
             <Card className="bg-cyber-bg border-cyber-border">
               <CardHeader className="border-b border-cyber-border/50 pb-4">
                 <CardTitle className="font-tech text-cyber-text tracking-wider uppercase text-sm">
                   Pending Reviews
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-6">
                  <div className="flex items-end gap-4 mb-6">
                    <span className="text-5xl font-tech font-bold text-cyber-primary">{reviews.length}</span>
                    <span className="text-sm font-code text-cyber-text-muted mb-1">TOTAL</span>
                  </div>
                  <div className="space-y-3 font-code text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-cyber-danger flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Critical</span>
                      <span className="text-cyber-text font-bold">{reviews.filter(r => r.risk === 'Critical').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyber-warning flex items-center gap-2"><Activity className="h-4 w-4" /> Medium</span>
                      <span className="text-cyber-text font-bold">{reviews.filter(r => r.risk === 'Medium').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#39FF14] flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Low</span>
                      <span className="text-cyber-text font-bold">{reviews.filter(r => r.risk === 'Low').length}</span>
                    </div>
                  </div>
               </CardContent>
             </Card>

             <Card className="bg-cyber-bg border-cyber-border">
               <CardHeader className="border-b border-cyber-border/50 pb-4">
                 <CardTitle className="font-tech text-cyber-text tracking-wider uppercase text-sm">
                   Automatic Review Status
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-6">
                 <div className="space-y-3 font-code text-xs text-cyber-text-secondary">
                   <div className="flex justify-between items-center"><span>Registry Validation</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Schema Validation</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Security Scan</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Dependency Scan</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Static Analysis</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Unit Tests</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Integration Tests</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                   <div className="flex justify-between items-center"><span>Risk Analysis</span><CheckCircle2 className="h-3 w-3 text-[#39FF14]" /></div>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      )}

      {activeTab === "Risk Engine" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-cyber-bg-darker border-cyber-border">
            <CardHeader className="border-b border-cyber-border/50 pb-4">
              <CardTitle className="font-tech text-cyber-text tracking-wider uppercase flex items-center gap-2">
                 <Search className="h-5 w-5 text-cyber-secondary" />
                 API Diff Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 font-code text-sm">
              <div className="flex items-center gap-4 text-cyber-text-secondary">
                 <span className="text-cyber-primary">Evaluate:</span> <span>API Changed</span>
              </div>
              <div className="pl-4 border-l border-cyber-border/50 space-y-4">
                <div className="flex items-center gap-4 text-cyber-text-secondary">
                  <span className="text-cyber-primary">Check:</span> <span>Is Breaking?</span> <span className="text-cyber-warning ml-auto">YES</span>
                </div>
                <div className="pl-4 border-l border-cyber-border/50 space-y-4">
                  <div className="flex items-center gap-4 text-cyber-text-secondary">
                    <span className="text-cyber-primary">Check:</span> <span>Major Version?</span> <span className="text-[#39FF14] ml-auto">NO</span>
                  </div>
                  <div className="pl-4 border-l border-cyber-border/50 space-y-4">
                    <div className="flex items-center gap-4">
                       <AlertTriangle className="h-4 w-4 text-cyber-danger" /> 
                       <span className="text-cyber-danger font-bold">Production Blocked</span>
                    </div>
                    <div className="flex items-center gap-4 text-cyber-text-muted">
                       <FileCode className="h-4 w-4" /> <span>Generate Report</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-bg-darker border-cyber-border">
            <CardHeader className="border-b border-cyber-border/50 pb-4">
              <CardTitle className="font-tech text-cyber-text tracking-wider uppercase flex items-center gap-2">
                 <Zap className="h-5 w-5 text-[#39FF14]" />
                 Additive Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 font-code text-sm">
              <div className="flex items-center gap-4 text-cyber-text-secondary">
                 <span className="text-[#39FF14]">Event:</span> <span>New Endpoint Detected</span>
              </div>
              <div className="pl-4 border-l border-[#39FF14]/30 space-y-4">
                <div className="flex items-center gap-4 text-cyber-text-secondary">
                  <span className="text-[#39FF14]">Verify:</span> <span>No Breaking Changes</span> <span className="text-[#39FF14] ml-auto">PASS</span>
                </div>
                <div className="pl-4 border-l border-[#39FF14]/30 space-y-4">
                  <div className="flex items-center gap-4 text-cyber-text-secondary">
                    <FileCode className="h-4 w-4 text-cyber-secondary" />
                    <span>Generate SDK</span>
                  </div>
                  <div className="flex items-center gap-4 text-cyber-text-secondary">
                    <Play className="h-4 w-4 text-cyber-primary" />
                    <span>Run Tests</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <CheckCircle2 className="h-4 w-4 text-[#39FF14]" /> 
                     <span className="text-[#39FF14] font-bold shadow-[0_0_8px_rgba(57,255,20,0.8)]">Autonomous Deploy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "Deployment Pipeline" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-cyber-bg border-cyber-border border-t-4 border-t-cyber-text-muted">
              <CardContent className="p-6">
                <h3 className="font-tech font-bold text-cyber-text tracking-wider mb-2">LEVEL 0</h3>
                <p className="font-code text-sm text-cyber-text-secondary font-bold uppercase mb-4">Sandbox</p>
                <div className="space-y-2 font-code text-xs text-cyber-text-muted">
                  <p>• AI discovers API</p>
                  <p>• Generates connector</p>
                  <p>• Runs tests</p>
                  <p className="text-[#39FF14] pt-2">No approval needed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-bg border-cyber-border border-t-4 border-t-cyber-secondary">
              <CardContent className="p-6">
                <h3 className="font-tech font-bold text-cyber-text tracking-wider mb-2">LEVEL 1</h3>
                <p className="font-code text-sm text-cyber-text-secondary font-bold uppercase mb-4">Staging</p>
                <div className="space-y-2 font-code text-xs text-cyber-text-muted">
                  <p>• Deploy to staging</p>
                  <p>• Integration tests</p>
                  <p>• Compare version</p>
                  <p className="text-cyber-secondary pt-2">Ready for review</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-bg border-cyber-border border-t-4 border-t-cyber-warning">
              <CardContent className="p-6">
                <h3 className="font-tech font-bold text-cyber-text tracking-wider mb-2">LEVEL 2</h3>
                <p className="font-code text-sm text-cyber-text-secondary font-bold uppercase mb-4">Human Review</p>
                <div className="space-y-2 font-code text-xs text-cyber-text-muted">
                  <p>• Review diff & scopes</p>
                  <p>• Review generated code</p>
                  <p>• Review security</p>
                  <p className="text-cyber-warning pt-2">Manual Approval</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyber-bg border-cyber-border border-t-4 border-t-[#39FF14] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#39FF14]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-6 relative z-10">
                <h3 className="font-tech font-bold text-cyber-text tracking-wider mb-2">LEVEL 3</h3>
                <p className="font-code text-sm text-[#39FF14] font-bold uppercase mb-4 shadow-[0_0_8px_rgba(57,255,20,0.8)]">Autonomous</p>
                <div className="space-y-2 font-code text-xs text-cyber-text-muted">
                  <p className="flex justify-between"><span>Trusted Integration</span><Check className="h-3 w-3 text-[#39FF14]" /></p>
                  <p className="flex justify-between"><span>No API Changes</span><Check className="h-3 w-3 text-[#39FF14]" /></p>
                  <p className="flex justify-between"><span>Test Coverage</span><Check className="h-3 w-3 text-[#39FF14]" /></p>
                  <p className="flex justify-between"><span>Security Scan</span><Check className="h-3 w-3 text-[#39FF14]" /></p>
                  <p className="text-[#39FF14] pt-2 font-bold">Auto Deploy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
