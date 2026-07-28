import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Activity, Mail, Send, Layers, Linkedin, Facebook, Instagram, Youtube, MessageSquare, Flame, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const platformData = [
  { name: 'Discord', icon: MessageSquare, metric: '14,204', label: 'Active Members', trend: 12.4, status: 'Connected' },
  { name: 'YouTube', icon: Youtube, metric: '1.2M', label: 'Views (30d)', trend: 8.2, status: 'Connected' },
  { name: 'Reddit', icon: Flame, metric: '45.2K', label: 'Community Mentions', trend: 15.4, status: 'Connected' },
  { name: 'Instagram Business', icon: Instagram, metric: '102K', label: 'Followers', trend: 2.1, status: 'Connected' },
  { name: 'Facebook Pages', icon: Facebook, metric: '84K', label: 'Page Likes', trend: -1.5, status: 'Connected' },
  { name: 'LinkedIn', icon: Linkedin, metric: '32K', label: 'Connections', trend: 5.4, status: 'Connected' },
  { name: 'Buffer', icon: Layers, metric: '1,420', label: 'Posts Scheduled', trend: 10.2, status: 'Connected' },
  { name: 'Telegram', icon: Send, metric: '8,400', label: 'Channel Subs', trend: 4.8, status: 'Connected' },
  { name: 'Gmail', icon: Mail, metric: '124', label: 'Unread Inquiries', trend: -5.0, status: 'Connected' },
];

const mockChartData = Array.from({ length: 14 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  engagement: Math.floor(Math.random() * 5000) + 1000,
  reach: Math.floor(Math.random() * 10000) + 5000,
}));

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">Analytics Core</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// CROSS-PLATFORM DATA AGGREGATION AND METRICS"}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary text-sm font-code font-bold shadow-[0_0_15px_rgba(255,90,31,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-primary shadow-[0_0_5px_rgba(255,90,31,1)]"></span>
            </span>
            SYNCING 9 SOURCES
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformData.map((platform, idx) => {
          const Icon = platform.icon;
          return (
            <Card key={idx} className="hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl border bg-cyber-bg-darker border-cyber-border text-cyber-primary shadow-[0_0_15px_rgba(255,90,31,0.1)]">
                      <Icon className="h-6 w-6 relative z-10" />
                    </div>
                    <div>
                      <h3 className="font-tech font-bold text-cyber-text tracking-wide uppercase text-sm">{platform.name}</h3>
                      <p className="text-xs font-code text-cyber-text-muted uppercase">{platform.status}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-code font-bold flex items-center gap-1 bg-cyber-bg-darker px-2 py-1 rounded border ${
                    platform.trend > 0 ? 'text-cyber-primary border-cyber-primary/30' : 'text-cyber-danger border-cyber-danger/30'
                  }`}>
                    {platform.trend > 0 ? '+' : ''}{platform.trend}%
                    <TrendingUp className={`h-3 w-3 ${platform.trend < 0 && 'rotate-180'}`} />
                  </div>
                </div>
                <div>
                  <h4 className="text-3xl font-tech font-bold text-cyber-text tracking-wider">{platform.metric}</h4>
                  <p className="text-xs font-code font-bold text-cyber-text-secondary mt-2 tracking-widest uppercase">{platform.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyber-secondary font-code text-sm uppercase">
            <Activity className="h-4 w-4" />
            Aggregated Reach vs Engagement (14 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF00C8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF00C8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5A1F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF5A1F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#1e293b" tick={{fill: '#71717a', fontSize: 12, fontFamily: 'Fira Code'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#1e293b" tick={{fill: '#71717a', fontSize: 12, fontFamily: 'Fira Code'}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#08090B', borderColor: '#FF5A1F', borderRadius: '0.5rem', fontFamily: 'Fira Code', boxShadow: '0 0 15px rgba(255,90,31,0.2)' }}
                  itemStyle={{ color: '#F4F6F8' }}
                />
                <Area type="monotone" dataKey="reach" stroke="#FF00C8" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" dataKey="engagement" stroke="#FF5A1F" strokeWidth={2} fillOpacity={1} fill="url(#colorEngagement)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
