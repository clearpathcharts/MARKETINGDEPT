import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Link as LinkIcon,
  Network,
  Search,
} from "lucide-react";
import { getDiscoveryStats, getNextActions, statusLabel } from "../lib/discovery";

export function Dashboard() {
  const stats = getDiscoveryStats();
  const nextActions = getNextActions(5);

  const kpis = [
    {
      name: "Tracked",
      status: String(stats.total),
      icon: Network,
      color: "text-cyber-primary",
      borderColor: "border-cyber-primary/30",
      bg: "bg-cyber-primary/10",
    },
    {
      name: "Connected",
      status: String(stats.connected),
      icon: CheckCircle2,
      color: "text-[#39FF14]",
      borderColor: "border-[#39FF14]/30",
      bg: "bg-[#39FF14]/10",
    },
    {
      name: "Partial",
      status: String(stats.partial),
      icon: LinkIcon,
      color: "text-cyber-warning",
      borderColor: "border-cyber-warning/30",
      bg: "bg-cyber-warning/10",
    },
    {
      name: "Not yet",
      status: String(stats.notYet),
      icon: CircleDashed,
      color: "text-cyber-text-muted",
      borderColor: "border-cyber-border",
      bg: "bg-cyber-bg-darker",
    },
    {
      name: "Critical live",
      status: `${stats.criticalConnected}/${stats.criticalTotal}`,
      icon: Activity,
      color: "animate-fluid-cyan",
      borderColor: "border-[#00FFFF]/30",
      bg: "bg-[#00FFFF]/10",
    },
    {
      name: "Critical open",
      status: String(stats.criticalOpen),
      icon: AlertTriangle,
      color: "text-cyber-warning",
      borderColor: "border-cyber-warning/30",
      bg: "bg-cyber-warning/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">
            ClearPath Discovery Ops
          </h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">
            {"// HONEST STATUS · CLEARPATHTRADER.COM · NO FAKE TELEMETRY"}
          </p>
        </div>
        <Link
          to="/search-intelligence"
          className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary text-sm font-code font-bold hover:bg-cyber-primary/20 transition-colors"
        >
          <Search className="h-4 w-4" />
          START #1–2 SETUP
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.name} className="hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div
                  className={`p-3 rounded-xl border mb-3 ${kpi.bg} ${kpi.borderColor} ${kpi.color}`}
                >
                  <Icon className="h-6 w-6 relative z-10" />
                </div>
                <h3 className="font-tech font-bold text-cyber-text tracking-wide text-sm">{kpi.name}</h3>
                <p className={`text-lg font-code font-bold mt-1 ${kpi.color}`}>{kpi.status}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-cyber-bg-darker/50 border-cyber-border">
          <CardHeader className="border-b border-cyber-border/50 pb-4">
            <CardTitle className="font-tech text-cyber-text tracking-wider">
              NEXT ACTIONS (RANK ORDER)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-cyber-border/40">
              {nextActions.map((item) => (
                <li key={item.id}>
                  <Link
                    to="/integrations"
                    className="flex items-start gap-3 p-4 hover:bg-cyber-bg transition-colors"
                  >
                    <span className="font-code text-xs text-cyber-primary mt-0.5 shrink-0">
                      #{item.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-code font-bold text-sm text-cyber-text">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-code uppercase text-cyber-warning">
                          {statusLabel(item.status)}
                        </span>
                      </div>
                      <p className="font-code text-xs text-cyber-text-muted mt-1 leading-relaxed">
                        {item.nextStep}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-cyber-text-muted shrink-0 mt-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-cyber-bg-darker/50 border-cyber-border">
          <CardHeader className="border-b border-cyber-border/50 pb-4">
            <CardTitle className="font-tech text-cyber-text tracking-wider">MISSION LOCK</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 font-code text-sm text-cyber-text-secondary leading-relaxed">
            <p>
              Clear Path Market Science helps wounded veterans and neurodivergent learners read
              markets without ticker flash that can trigger PTSD or seizures.
            </p>
            <p>
              MYEYES tracks discovery channels that bring people to{" "}
              <span className="text-cyber-primary">clearpathtrader.com</span> — education only, not a
              brokerage.
            </p>
            <p className="text-cyber-warning text-xs uppercase tracking-wider">
              Prefer audio + calm video. Deprioritize flashy ads and broker affiliates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
