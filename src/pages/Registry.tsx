import React, { useMemo } from "react";
import { Card, CardContent } from "../components/ui/card";
import { FolderTree } from "lucide-react";
import { DISCOVERY_INTEGRATIONS, getDiscoveryStats, groupByCategory } from "../lib/discovery";

export function Registry() {
  const stats = getDiscoveryStats();
  const categories = useMemo(() => groupByCategory(), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">
            Discovery Registry
          </h1>
          <p className="text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] text-sm mt-1 font-code font-bold">
            {"// SINGLE SOURCE OF TRUTH · HONEST COUNTS ONLY"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary text-sm font-code font-bold">
          <FolderTree className="h-4 w-4" />
          {stats.total} TRACKED · {stats.connected} CONNECTED
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const connected = cat.items.filter((i) => i.status === "connected").length;
          return (
            <Card
              key={cat.category}
              className="bg-cyber-bg-darker/50 hover:border-cyber-primary/50 transition-colors group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-tech text-cyber-text tracking-wider text-sm group-hover:text-cyber-primary transition-colors">
                    {cat.category}
                  </span>
                  <span className="font-code font-bold text-cyber-primary">{cat.items.length}</span>
                </div>
                <p className="font-code text-xs text-cyber-text-muted">
                  {connected} connected · {cat.items.length - connected} open
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-cyber-bg-darker/40 border-cyber-border">
        <CardContent className="p-4 font-code text-xs text-cyber-text-muted">
          Ranked list lives in code at{" "}
          <span className="text-cyber-text-secondary">src/lib/discovery.ts</span> —{" "}
          {DISCOVERY_INTEGRATIONS.length} channels loaded. Fake “10,000+” registry removed.
        </CardContent>
      </Card>
    </div>
  );
}
