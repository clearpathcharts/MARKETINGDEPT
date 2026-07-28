import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { AlertTriangle, Terminal } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAVIGATION_ITEMS } from "../lib/constants";

export function PlaceholderPage() {
  const location = useLocation();
  const currentRoute = NAVIGATION_ITEMS.find((item) => item.path === location.pathname);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase">{currentRoute?.name || 'Dashboard'}</h1>
          <p className="text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] text-sm mt-1 font-code font-bold">{"// LIVE TELEMETRY AND CONTROL PLANE"}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg border-cyber-primary/30 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50 shadow-[0_0_10px_rgba(255,90,31,0.8)]"></div>
          
          <CardContent className="flex flex-col items-center justify-center p-12 text-center relative z-10">
            <div className="mb-6 rounded-full bg-cyber-bg-darker border border-cyber-primary/20 p-5 shadow-[0_0_30px_rgba(255,90,31,0.1)] relative">
              <div className="absolute inset-0 rounded-full border border-cyber-primary/50 animate-ping opacity-20"></div>
              {currentRoute?.icon ? (
                <currentRoute.icon className="h-10 w-10 text-cyber-primary" />
              ) : (
                <Terminal className="h-10 w-10 text-cyber-primary" />
              )}
            </div>
            
            <h2 className="text-xl font-tech font-bold text-cyber-text tracking-widest mb-3 uppercase">Module Initializing</h2>
            
            <div className="w-full bg-cyber-bg-darker p-4 rounded-md border border-cyber-border text-left font-code text-sm mb-6 shadow-inner">
              <p className="text-cyber-secondary mb-1">$ <span className="text-cyber-text">./init_module.sh --target={currentRoute?.name.toLowerCase().replace(/\s+/g, '_') || 'dashboard'}</span></p>
              <p className="text-cyber-text-secondary mb-1">[INFO] Allocating resources...</p>
              <p className="text-cyber-text-secondary mb-1">[INFO] Establishing secure connection...</p>
              <p className="text-cyber-warning animate-pulse">_ AWAITING DATA STREAM</p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-code text-cyber-warning bg-cyber-warning/10 px-4 py-2 rounded-md border border-cyber-warning/20 shadow-[0_0_10px_rgba(255,176,0,0.1)]">
              <AlertTriangle className="h-4 w-4" />
              CONNECTION_PENDING
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
