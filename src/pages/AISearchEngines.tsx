import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Brain, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const aiEngines = [
  { name: 'OpenAI (GPT-4)', status: 'Connected', recognized: 'YES', articlesUsed: 24, wrongFacts: 1, correctFacts: 98, confidence: 93 },
  { name: 'Google Gemini', status: 'Connected', recognized: 'YES', articlesUsed: 31, wrongFacts: 0, correctFacts: 99, confidence: 96 },
  { name: 'Anthropic Claude', status: 'Connected', recognized: 'YES', articlesUsed: 18, wrongFacts: 2, correctFacts: 94, confidence: 88 },
  { name: 'Perplexity AI', status: 'Connected', recognized: 'YES', articlesUsed: 42, wrongFacts: 1, correctFacts: 97, confidence: 94 },
  { name: 'xAI Grok', status: 'Monitoring', recognized: 'PARTIAL', articlesUsed: 8, wrongFacts: 3, correctFacts: 82, confidence: 76 },
  { name: 'Meta AI', status: 'Pending', recognized: 'NO', articlesUsed: 0, wrongFacts: 0, correctFacts: 0, confidence: 0 },
  { name: 'DeepSeek', status: 'Monitoring', recognized: 'PARTIAL', articlesUsed: 12, wrongFacts: 2, correctFacts: 88, confidence: 81 },
];

export function AISearchEngines() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">AI Search Engines</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// LLM CITATION AND ACCURACY TRACKING"}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary text-sm font-code font-bold shadow-[0_0_15px_rgba(255,90,31,0.1)]">
            <Brain className="h-4 w-4" />
            MONITORING 7 MODELS
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {aiEngines.map((ai, idx) => (
          <Card key={idx} className="hover:-translate-y-1 transition-transform duration-300">
            <CardHeader className="border-b border-cyber-border/50 bg-cyber-bg-darker/50 pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-tech tracking-wider text-cyber-text flex items-center gap-2">
                  <Brain className={`h-5 w-5 ${ai.recognized === 'YES' ? 'text-cyber-success' : ai.recognized === 'PARTIAL' ? 'text-cyber-warning' : 'text-cyber-text-muted'}`} />
                  {ai.name}
                </CardTitle>
                <div className={`px-2 py-1 rounded text-[10px] font-code font-bold uppercase border ${
                  ai.status === 'Connected'
                    ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/30'
                    : ai.status === 'Monitoring'
                    ? 'bg-cyber-warning/10 text-cyber-warning border-cyber-warning/30'
                    : 'bg-cyber-text-muted/10 text-cyber-text-muted border-cyber-border'
                }`}>
                  {ai.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 font-code text-sm">
              <div className="flex justify-between items-center py-1 border-b border-cyber-border/30">
                <span className="text-cyber-text-muted">Company Recognized</span>
                <span className={`font-bold flex items-center gap-1 ${
                  ai.recognized === 'YES' ? 'text-cyber-success' : ai.recognized === 'PARTIAL' ? 'text-cyber-warning' : 'text-cyber-danger'
                }`}>
                  {ai.recognized === 'YES' && <CheckCircle2 className="h-3 w-3" />}
                  {ai.recognized === 'PARTIAL' && <AlertTriangle className="h-3 w-3" />}
                  {ai.recognized === 'NO' && <XCircle className="h-3 w-3" />}
                  {ai.recognized}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-cyber-border/30">
                <span className="text-cyber-text-muted">Articles Used as Context</span>
                <span className="font-bold text-cyber-text">{ai.articlesUsed}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-cyber-border/30">
                <span className="text-cyber-text-muted">Wrong Facts Generated</span>
                <span className={`font-bold ${ai.wrongFacts === 0 ? 'text-cyber-success' : ai.wrongFacts > 2 ? 'text-cyber-danger' : 'text-cyber-warning'}`}>
                  {ai.wrongFacts}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-cyber-border/30">
                <span className="text-cyber-text-muted">Factual Accuracy</span>
                <span className="font-bold text-cyber-success">{ai.correctFacts}%</span>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-cyber-text-muted uppercase">Citation Confidence</span>
                  <span className="text-xs font-bold text-cyber-primary">{ai.confidence}%</span>
                </div>
                <div className="h-1.5 w-full bg-cyber-bg-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyber-primary to-cyber-highlight"
                    style={{ width: `${ai.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
