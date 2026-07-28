import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Cloud,
  ExternalLink,
  AlertTriangle,
  CircleDashed,
  ListOrdered,
} from "lucide-react";
import {
  DISCOVERY_INTEGRATIONS,
  groupByCategory,
  statusLabel,
  type DiscoveryIntegration,
  type DiscoveryStatus,
} from "../lib/discovery";

function statusClass(status: DiscoveryStatus): string {
  if (status === "connected") return "text-[#39FF14]";
  if (status === "partial") return "text-cyber-warning";
  return "text-cyber-text-muted";
}

function StatusIcon({ status }: { status: DiscoveryStatus }) {
  if (status === "connected") return <CheckCircle2 className="h-3 w-3" />;
  if (status === "partial") return <AlertTriangle className="h-3 w-3" />;
  return <CircleDashed className="h-3 w-3" />;
}

export function Integrations() {
  const categories = useMemo(() => groupByCategory(), []);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.category, true])),
  );
  const [selectedId, setSelectedId] = useState(DISCOVERY_INTEGRATIONS[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState("Overview");

  const selectedItem: DiscoveryIntegration | undefined = DISCOVERY_INTEGRATIONS.find(
    (i) => i.id === selectedId,
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const tabs = ["Overview", "Setup", "Honest Status"];

  return (
    <div className="flex h-[calc(100vh-5.5rem)] -mx-6 -mt-6 -mb-6">
      <div className="w-72 border-r border-cyber-border bg-cyber-bg overflow-y-auto flex-shrink-0">
        <div className="p-4 font-tech text-xs tracking-widest text-cyber-text-muted uppercase border-b border-cyber-border/50 sticky top-0 bg-cyber-bg z-10">
          Discovery Explorer
        </div>
        <div className="py-2">
          {categories.map((category) => (
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
                <span className="font-code text-sm font-bold truncate">{category.category}</span>
                <span className="ml-auto text-[10px] font-code text-cyber-text-muted">
                  {category.items.length}
                </span>
              </button>

              {expandedCategories[category.category] && (
                <div className="pb-2">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-sm font-code transition-colors ${
                        selectedId === item.id
                          ? "bg-cyber-primary/10 text-cyber-primary border-r-2 border-cyber-primary"
                          : "text-cyber-text-secondary hover:text-cyber-text hover:bg-cyber-bg-dark"
                      }`}
                    >
                      <span className="text-[10px] text-cyber-text-muted w-5 shrink-0">#{item.rank}</span>
                      <span className={`shrink-0 ${statusClass(item.status)}`}>
                        <StatusIcon status={item.status} />
                      </span>
                      <span className="truncate text-left">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-cyber-bg-darker overflow-hidden">
        {selectedItem && (
          <>
            <div className="p-6 border-b border-cyber-border flex-shrink-0">
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyber-primary/10 border border-cyber-primary/30 rounded-xl shadow-[0_0_15px_rgba(255,90,31,0.15)]">
                    <Cloud className="h-8 w-8 text-cyber-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-tech font-bold text-cyber-text tracking-wider uppercase text-glow">
                      {selectedItem.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span
                        className={`${statusClass(selectedItem.status)} text-xs font-code font-bold flex items-center gap-1`}
                      >
                        <StatusIcon status={selectedItem.status} />
                        {statusLabel(selectedItem.status).toUpperCase()}
                      </span>
                      <span className="text-cyber-text-muted text-xs font-code">•</span>
                      <span className="text-cyber-text-secondary text-xs font-code">
                        RANK #{selectedItem.rank} · {selectedItem.tier.toUpperCase()} ·{" "}
                        {selectedItem.category}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedItem.setupUrl && (
                  <a
                    href={selectedItem.setupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-cyber-primary/10 border border-cyber-primary/50 text-cyber-primary text-sm font-code font-bold rounded shadow-[0_0_15px_rgba(255,90,31,0.1)] hover:bg-cyber-primary/20 transition-colors flex items-center gap-2"
                  >
                    Open setup <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-xs font-code text-cyber-text-secondary">
                  Evidence{" "}
                  <span className="text-cyber-primary ml-1">{selectedItem.evidence.toUpperCase()}</span>
                </span>
                <span className="px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-xs font-code text-cyber-text-secondary">
                  Discovery channel
                </span>
                {selectedItem.missionNote && (
                  <span className="px-2 py-1 rounded bg-cyber-bg border border-cyber-warning/40 text-xs font-code text-cyber-warning">
                    Mission note active
                  </span>
                )}
              </div>
            </div>

            <div className="border-b border-cyber-border flex-shrink-0 flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-code text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-cyber-primary text-cyber-primary bg-cyber-primary/5"
                      : "border-transparent text-cyber-text-muted hover:text-cyber-text hover:bg-cyber-bg"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "Overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-cyber-bg border-cyber-border">
                    <CardHeader className="border-b border-cyber-border/50 pb-4">
                      <CardTitle className="font-tech text-cyber-text tracking-wider">
                        WHY THIS HELPS USERS FIND US
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="font-code text-sm text-cyber-text-secondary leading-relaxed">
                        {selectedItem.why}
                      </p>
                      {selectedItem.missionNote && (
                        <p className="mt-4 font-code text-sm text-cyber-warning leading-relaxed border-l-2 border-cyber-warning/50 pl-3">
                          {selectedItem.missionNote}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-cyber-bg border-cyber-border">
                    <CardHeader className="border-b border-cyber-border/50 pb-4">
                      <CardTitle className="font-tech text-cyber-text tracking-wider flex items-center gap-2">
                        <ListOrdered className="h-5 w-5 text-cyber-primary" />
                        NEXT STEP
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="font-code text-sm text-cyber-text leading-relaxed">
                        {selectedItem.nextStep}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "Setup" && (
                <Card className="bg-cyber-bg border-cyber-border">
                  <CardHeader className="border-b border-cyber-border/50 pb-4">
                    <CardTitle className="font-tech text-cyber-text tracking-wider">
                      SETUP CHECKLIST
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <p className="font-code text-sm text-cyber-text-secondary">{selectedItem.nextStep}</p>
                    {selectedItem.setupUrl ? (
                      <a
                        href={selectedItem.setupUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-code text-cyber-primary hover:underline"
                      >
                        {selectedItem.setupUrl} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <p className="font-code text-xs text-cyber-text-muted">
                        No external console URL — this is content/ops work on clearpathtrader.com or
                        via already-connected Zapier apps.
                      </p>
                    )}
                    <div className="rounded border border-cyber-border bg-cyber-bg-darker p-4">
                      <p className="font-code text-xs text-cyber-text-muted uppercase tracking-wider mb-2">
                        Honesty rule
                      </p>
                      <p className="font-code text-sm text-cyber-text-secondary">
                        Status flips to Connected only when we have real evidence (Zapier auth, Search
                        Console verified, or live site check) — never decorative badges.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "Honest Status" && (
                <Card className="bg-cyber-bg border-cyber-border">
                  <CardHeader className="border-b border-cyber-border/50 pb-4">
                    <CardTitle className="font-tech text-cyber-text tracking-wider">
                      EVIDENCE TRAIL
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3 font-code text-sm">
                    <div className="flex justify-between border-b border-cyber-border/40 pb-2">
                      <span className="text-cyber-text-muted">Reported status</span>
                      <span className={statusClass(selectedItem.status)}>
                        {statusLabel(selectedItem.status)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-cyber-border/40 pb-2">
                      <span className="text-cyber-text-muted">Evidence source</span>
                      <span className="text-cyber-text">{selectedItem.evidence}</span>
                    </div>
                    <div className="flex justify-between border-b border-cyber-border/40 pb-2">
                      <span className="text-cyber-text-muted">Fake telemetry</span>
                      <span className="text-cyber-danger">Removed</span>
                    </div>
                    <p className="text-cyber-text-secondary pt-2 leading-relaxed">
                      {selectedItem.status === "connected"
                        ? "Live via Zapier MCP for Clear Path Market Science ops. Not a fake OAuth badge."
                        : selectedItem.status === "partial"
                          ? "Some pieces may exist on the site; full verification still required."
                          : "Not connected yet. Use Setup tab and Search Intelligence for #1–2."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
