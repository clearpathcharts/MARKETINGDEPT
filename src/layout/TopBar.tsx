import React from "react";
import { Search, Bell, User, ShieldAlert } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-cyber-primary/30 bg-cyber-bg-darker/90 px-4 backdrop-blur-md shadow-[0_0_20px_rgba(255,90,31,0.15)]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]">
          <ShieldAlert className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-sm font-code tracking-widest text-[#39FF14] leading-tight">CLEARPATHTRADER.COM</span>
            <span className="text-xl font-tech font-bold tracking-wider text-cyber-text leading-tight uppercase animate-pulse">MYEYES OS</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyber-text-muted" />
          <input
            type="text"
            placeholder="Search integrations, logs, automation... (CTRL+K)"
            className="h-9 w-full rounded-md border border-cyber-border bg-cyber-bg-card pl-10 pr-12 text-sm text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary transition-all shadow-[inset_0_0_10px_rgba(255,90,31,0.05)] font-code"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <kbd className="px-1.5 py-0.5 text-[10px] font-code font-bold rounded border border-cyber-border bg-cyber-bg-dark text-cyber-text-muted uppercase">CTRL</kbd>
             <kbd className="px-1.5 py-0.5 text-[10px] font-code font-bold rounded border border-cyber-border bg-cyber-bg-dark text-cyber-text-muted uppercase">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-cyber-border bg-cyber-bg-card text-cyber-text-secondary hover:text-cyber-primary hover:border-cyber-primary/50 transition-colors hover:shadow-[0_0_15px_rgba(255,90,31,0.2)]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyber-danger shadow-[0_0_5px_rgba(255,61,61,0.8)]"></span>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/30 hover:bg-cyber-primary/20 transition-colors hover:shadow-[0_0_15px_rgba(255,90,31,0.2)]">
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
