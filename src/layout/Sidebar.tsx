import React from "react";
import { NavLink } from "react-router-dom";
import { NAVIGATION_ITEMS } from "../lib/constants";
import { cn } from "../lib/utils";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem-2rem)] w-64 overflow-y-auto border-r border-cyber-border bg-cyber-bg-darker/90 pb-4 backdrop-blur-md custom-scrollbar">
      <nav className="flex flex-col space-y-0.5 p-3">
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all relative overflow-hidden",
                isActive
                  ? "text-cyber-primary bg-cyber-primary/10 border border-cyber-primary/20 shadow-[inset_0_0_10px_rgba(255,90,31,0.1)]"
                  : "text-cyber-text-secondary hover:bg-cyber-bg-hover hover:text-cyber-text"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-cyber-primary" : "text-cyber-text-muted group-hover:text-cyber-primary/70")} />
                <span className="font-primary tracking-wide">{item.name}</span>
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-primary via-cyber-highlight to-cyber-primary shadow-[0_0_10px_rgba(255,90,31,0.8)] rounded-r-md animate-molten-glow"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
