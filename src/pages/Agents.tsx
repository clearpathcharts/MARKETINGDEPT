import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Bot, Terminal, Activity, AlertTriangle, Settings, Play, Database, Cloud, Mail, PowerOff, CheckCircle2, ChevronRight, ChevronDown, Cpu, MemoryStick, Clock, Bug, BarChart2 } from "lucide-react";

const agentRegistry = [
  {
    category: "Search Agents",
    items: [
      { id: "google-agent", name: "GoogleAgent", status: "Healthy" },
      { id: "bing-agent", name: "BingAgent", status: "Healthy" },
      { id: "duckduckgo-agent", name: "DuckDuckGoAgent", status: "Healthy" },
      { id: "yandex-agent", name: "YandexAgent", status: "Warning" },
    ]
  },
  {
    category: "AI Agents",
    items: [
      { id: "openai-agent", name: "OpenAIAgent", status: "Healthy" },
      { id: "gemini-agent", name: "GeminiAgent", status: "Healthy" },
      { id: "claude-agent", name: "ClaudeAgent", status: "Healthy" },
    ]
  },
  {
    category: "CRM Agents",
    items: [
      { id: "salesforce-agent", name: "SalesforceAgent", status: "Healthy" },
      { id: "hubspot-agent", name: "HubSpotAgent", status: "Healthy" },
    ]
  },
  {
    category: "Finance Agents",
    items: [
      { id: "stripe-agent", name: "StripeAgent", status: "Offline" },
      { id: "quickbooks-agent", name: "QuickBooksAgent", status: "Healthy" },
    ]
  },
  {
    category: "Security & Infra",
    items: [
      { id: "ssl-agent", name: "SSLAgent", status: "Healthy" },
      { id: "dns-agent", name: "DNSAgent", status: "Healthy" },
      { id: "cloudrun-agent", name: "CloudRunAgent", status: "Restarting" },
    ]
  }
];

export function Agents() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Search Agents": true,
    "CRM Agents": true,
  });
  const [selectedAgent, setSelectedAgent] = useState("salesforce-agent");
  const [activeTab, setActiveTab] = useState("Overview");

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const tabs = ["Overview", "Event Bus", "Logs", "Metrics", "Memory", "Settings", "History"];

  return (
    <div className="flex h-[calc(100vh-5.5rem)] -mx-6 -mt-6 -mb-6">
      {/* Explorer Sidebar */}
      <div className="w-64 border-r border-cyber-border bg-cyber-bg overflow-y-auto flex-shrink-0">
        <div className="p-4 font-tech text-xs tracking-widest text-cyber-text-muted uppercase border-b border-cyber-border/50 sticky top-0 bg-cyber-bg z-10">
          Agent Manager
        </div>
        <div className="py-2">
          {agentRegistry.map(category => (
            <div key={category.category}>
              <button 
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center gap-1 px-4 py-1.5 hover:bg-cyber-bg-dark text-cyber-text transition-colors group"
              >
                {expandedCategories[category.category] ? (
                  <ChevronDown className="h-4 w-4 text-cyber-text-muted group-hover:text-cyber-primary" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-cyber-text-muted group-hover:text-cyber-primary" />
                )}
                <span className="font-code text-sm font-bold">{category.category}</span>
              </button>
              
              {expandedCategories[category.category] && (
                <div className="pb-2">
                  {category.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedAgent(item.id)}
                      className={`w-full flex items-center gap-2 pl-9 pr-4 py-1.5 text-sm font-code transition-colors ${
                        selectedAgent === item.id 
                          ? 'bg-cyber-primary/10 text-cyber-primary border-r-2 border-cyber-primary' 
                          : 'text-cyber-text-secondary hover:text-cyber-text hover:bg-cyber-bg-dark'
                      }`}
                    >
                      <Bot className={`h-3 w-3 shrink-0 ${
                        item.status === 'Healthy' ? 'animate-fluid-cyan' :
                        item.status === 'Warning' ? 'text-cyber-warning' :
                        item.status === 'Offline' ? 'text-cyber-danger' :
                        'text-cyber-secondary'
                      }`} />
                      <span className="truncate text-left">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-cyber-bg-darker overflow-hidden">
        {(() => {
          const selectedItem = agentRegistry.flatMap(c => c.items).find(i => i.id === selectedAgent);
          if (!selectedItem) return null;
          
          return (
          <>
            {/* Header */}
            <div className="p-6 border-b border-cyber-border flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyber-bg border border-cyber-border rounded-xl">
                    <Bot className="h-8 w-8 text-cyber-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-tech font-bold text-cyber-text tracking-wider uppercase text-glow">{selectedItem.name}</h1>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`${selectedItem.status === 'Healthy' ? 'animate-fluid-cyan drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]' : selectedItem.status === 'Warning' ? 'text-cyber-warning drop-shadow-[0_0_5px_rgba(255,176,0,0.8)]' : selectedItem.status === 'Offline' ? 'text-cyber-danger drop-shadow-[0_0_5px_rgba(255,61,61,0.8)]' : 'text-cyber-secondary'} text-xs font-code font-bold flex items-center gap-1`}>
                        <CheckCircle2 className="h-3 w-3" /> {selectedItem.status}
                      </span>
                      <span className="text-cyber-text-muted text-xs font-code">•</span>
                      <span className="text-cyber-text-secondary text-xs font-code">v2.4.1</span>
                      <span className="text-cyber-text-muted text-xs font-code">•</span>
                      <span className="text-cyber-text-secondary text-xs font-code">myeyes.{selectedItem.id.replace('-agent', '')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-cyber-bg border border-cyber-border text-cyber-text text-sm font-code font-bold rounded hover:bg-cyber-border transition-colors flex items-center gap-2">
                    <PowerOff className="h-4 w-4 text-cyber-danger" /> Stop
                  </button>
                  <button className="px-4 py-2 bg-cyber-bg border border-cyber-border text-cyber-text text-sm font-code font-bold rounded hover:bg-cyber-border transition-colors flex items-center gap-2">
                    <Play className="h-4 w-4 text-[#39FF14]" /> Restart
                  </button>
                </div>
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-xs font-code text-cyber-text-secondary">Lifecycle <span className="text-[#39FF14] ml-1">Running</span></span>
                <span className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-xs font-code text-cyber-text-secondary">Schedule <span className="text-cyber-primary ml-1">Real Time</span></span>
                <span className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-xs font-code text-cyber-text-secondary">Target <span className="text-cyber-secondary ml-1">/integrations/salesforce</span></span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-cyber-border flex-shrink-0 flex overflow-x-auto hide-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-code text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab 
                      ? 'border-cyber-primary text-cyber-primary bg-cyber-primary/5' 
                      : 'border-transparent text-cyber-text-muted hover:text-cyber-text hover:bg-cyber-bg'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "Overview" && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-cyber-text-muted mb-2">
                          <Cpu className="h-4 w-4" />
                          <span className="text-xs font-code uppercase">CPU</span>
                        </div>
                        <p className="text-xl font-tech font-bold text-cyber-text">0.8%</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-cyber-text-muted mb-2">
                          <MemoryStick className="h-4 w-4" />
                          <span className="text-xs font-code uppercase">Memory</span>
                        </div>
                        <p className="text-xl font-tech font-bold text-cyber-text">92 MB</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-cyber-text-muted mb-2">
                          <Activity className="h-4 w-4" />
                          <span className="text-xs font-code uppercase">Events Today</span>
                        </div>
                        <p className="text-xl font-tech font-bold text-[#39FF14]">18,442</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-cyber-text-muted mb-2">
                          <Database className="h-4 w-4" />
                          <span className="text-xs font-code uppercase">API Calls</span>
                        </div>
                        <p className="text-xl font-tech font-bold text-cyber-text">120,332</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-cyber-text-muted mb-2">
                          <Bug className="h-4 w-4" />
                          <span className="text-xs font-code uppercase">Errors</span>
                        </div>
                        <p className="text-xl font-tech font-bold text-cyber-success">0</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-cyber-text-muted mb-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs font-code uppercase">Latency</span>
                        </div>
                        <p className="text-xl font-tech font-bold text-cyber-text">112 ms</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardHeader className="border-b border-cyber-border/50 pb-4">
                        <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
                          <Terminal className="h-5 w-5 text-cyber-primary" />
                          LIFECYCLE STATUS
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="font-code text-sm text-cyber-text-secondary space-y-4">
                          <div className="flex items-center gap-4">
                            <CheckCircle2 className="h-4 w-4 text-[#39FF14]" />
                            <span className="text-[#39FF14]">Initialize</span>
                            <span className="text-xs text-cyber-text-muted ml-auto">12ms</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <CheckCircle2 className="h-4 w-4 text-[#39FF14]" />
                            <span className="text-[#39FF14]">Load Configuration</span>
                            <span className="text-xs text-cyber-text-muted ml-auto">8ms</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <CheckCircle2 className="h-4 w-4 text-[#39FF14]" />
                            <span className="text-[#39FF14]">Authenticate</span>
                            <span className="text-xs text-cyber-text-muted ml-auto">45ms</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Activity className="h-4 w-4 text-cyber-primary animate-pulse" />
                            <span className="text-cyber-text">Heartbeat / Collect</span>
                            <span className="text-xs text-cyber-text-muted ml-auto">Running</span>
                          </div>
                          <div className="flex items-center gap-4 opacity-50">
                            <div className="h-4 w-4 rounded-full border border-cyber-text-muted" />
                            <span className="text-cyber-text-muted">Shutdown</span>
                            <span className="text-xs text-cyber-text-muted ml-auto">Pending</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-cyber-bg border-cyber-border">
                      <CardHeader className="border-b border-cyber-border/50 pb-4">
                        <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
                          <BarChart2 className="h-5 w-5 text-cyber-secondary" />
                          MEMORY KERNEL
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="font-code text-sm text-cyber-text-secondary space-y-4">
                           <div className="flex justify-between border-b border-cyber-border/50 pb-2">
                             <span>Last Run</span>
                             <span className="text-cyber-text">14 seconds ago</span>
                           </div>
                           <div className="flex justify-between border-b border-cyber-border/50 pb-2">
                             <span>Previous Errors</span>
                             <span className="text-cyber-text">None (72h window)</span>
                           </div>
                           <div className="flex justify-between border-b border-cyber-border/50 pb-2">
                             <span>Last Authentication</span>
                             <span className="text-cyber-text">2026-07-21 08:00:00Z</span>
                           </div>
                           <div className="flex justify-between pb-2">
                             <span>Average Latency</span>
                             <span className="text-cyber-text">110ms</span>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {activeTab === "Event Bus" && (
                <Card className="bg-cyber-bg border-cyber-border">
                  <CardHeader className="border-b border-cyber-border/50 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
                      <Database className="h-5 w-5 text-[#39FF14]" />
                      TOPIC: myeyes.crm.salesforce
                    </CardTitle>
                    <span className="text-xs font-code text-cyber-text-muted px-2 py-1 bg-cyber-bg-dark rounded">Kafka Consumer: ACTIVE</span>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-[#0D0D12] p-4 font-code text-xs text-cyber-text-muted overflow-x-auto">
                      <pre className="text-cyber-primary"><code>{`{
  "eventId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "timestamp": "2026-07-22T12:14:22Z",
  "agent": "SalesforceAgent",
  "integration": "salesforce",
  "severity": "info",
  "type": "opportunity_won",
  "payload": {
    "opportunityId": "0064W00000X9a1q",
    "amount": 50000,
    "accountId": "0014W000021aZqX"
  },
  "traceId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}`}</code></pre>
                      <div className="mt-4 border-t border-cyber-border/50 pt-4">
                        <pre className="text-cyber-text-secondary"><code>{`{
  "eventId": "a17cc10b-58cc-4372-a567-0e02b2c3d111",
  "timestamp": "2026-07-22T12:14:10Z",
  "agent": "SalesforceAgent",
  "integration": "salesforce",
  "severity": "info",
  "type": "heartbeat",
  "payload": {
    "status": "healthy",
    "latency": 105
  }
}`}</code></pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
          );
        })()}
      </div>
    </div>
  );
}

