import React from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-cyber-bg-dark text-cyber-text selection:bg-cyber-primary/30">
      <TopBar />
      <Sidebar />
      <main className="pl-64 pt-14 pb-8 min-h-screen relative z-10">
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,90,31,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,90,31,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[-1]" />
        <div className="h-[calc(100vh-3.5rem-2rem)] overflow-y-auto p-6 custom-scrollbar">
          <Outlet />
        </div>
      </main>
      <StatusBar />
    </div>
  );
}
