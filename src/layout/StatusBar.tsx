import React from "react";
import { Activity, Wifi, ShieldCheck, Database } from "lucide-react";
import { getDiscoveryStats } from "../lib/discovery";

export function StatusBar() {
  const stats = getDiscoveryStats();

  return (
    <footer className="fixed bottom-0 left-0 z-50 flex h-8 w-full items-center justify-between border-t border-cyber-primary/20 bg-cyber-bg-darker px-4 text-xs text-cyber-text-muted font-code shadow-[0_-5px_15px_rgba(255,90,31,0.1)]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyber-warning animate-pulse" />
          <span className="tracking-wider font-bold text-cyber-warning">
            BUILDING · HONEST MODE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-cyber-secondary" />
          <span>
            CONNECTED: {stats.connected}/{stats.total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="h-3 w-3 text-cyber-primary" />
          <span>
            CRITICAL OPEN: {stats.criticalOpen}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Database className="h-3 w-3" />
          <span>REGISTRY: discovery.ts</span>
        </div>
        <div className="flex items-center gap-2 text-[#39FF14]">
          <ShieldCheck className="h-3 w-3" />
          <span className="font-bold tracking-wider">NO FAKE TELEMETRY</span>
        </div>
      </div>
    </footer>
  );
}
