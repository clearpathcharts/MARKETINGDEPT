import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Zap, CheckCircle2, XCircle, Clock, Server } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const timeline = [
  { time: '09:42:15', action: 'Published', target: '/guide/gold-bars', source: 'CMS', status: 'success' },
  { time: '09:42:16', action: 'IndexNow Triggered', target: 'API Ping', source: 'System', status: 'success' },
  { time: '09:42:18', action: 'Bing Accepted', target: '200 OK', source: 'Bing', status: 'success' },
  { time: '09:43:01', action: 'Yandex Accepted', target: '200 OK', source: 'Yandex', status: 'success' },
  { time: '08:15:22', action: 'Published', target: '/news/market-update', source: 'CMS', status: 'success' },
  { time: '08:15:23', action: 'IndexNow Triggered', target: 'API Ping', source: 'System', status: 'success' },
  { time: '08:15:25', action: 'Bing Accepted', target: '200 OK', source: 'Bing', status: 'success' },
  { time: '08:16:10', action: 'Yandex Rejected', target: '429 Rate Limit', source: 'Yandex', status: 'error' },
];

const performanceData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 50) + 10,
}));

export function IndexNowControl() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-3xl font-tech font-bold tracking-wider text-cyber-text uppercase text-glow animate-molten-text">IndexNow Command</h1>
          <p className="text-cyber-text-secondary text-sm mt-1 font-code">{"// INSTANT INDEXING PROTOCOL STATUS"}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-success/30 bg-cyber-success/10 text-cyber-success text-sm font-code font-bold shadow-[0_0_15px_rgba(255,90,31,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-success"></span>
            </span>
            PROTOCOL RUNNING
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-cyber-bg-darker/50">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="text-[10px] font-code uppercase tracking-wider text-cyber-text-muted mb-1">API Key</div>
            <div className="text-lg font-tech font-bold text-cyber-success">VALID</div>
          </CardContent>
        </Card>
        <Card className="bg-cyber-bg-darker/50">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="text-[10px] font-code uppercase tracking-wider text-cyber-text-muted mb-1">Cloud Run</div>
            <div className="text-lg font-tech font-bold text-cyber-success">CONNECTED</div>
          </CardContent>
        </Card>
        <Card className="bg-cyber-bg-darker/50">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="text-[10px] font-code uppercase tracking-wider text-cyber-text-muted mb-1">Requests Today</div>
            <div className="text-lg font-tech font-bold text-cyber-text">174</div>
          </CardContent>
        </Card>
        <Card className="bg-cyber-bg-darker/50 border-cyber-success/30">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="text-[10px] font-code uppercase tracking-wider text-cyber-success mb-1">Successful</div>
            <div className="text-lg font-tech font-bold text-cyber-success">171</div>
          </CardContent>
        </Card>
        <Card className="bg-cyber-bg-darker/50 border-cyber-danger/30">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="text-[10px] font-code uppercase tracking-wider text-cyber-danger mb-1">Failed</div>
            <div className="text-lg font-tech font-bold text-cyber-danger">3</div>
          </CardContent>
        </Card>
        <Card className="bg-cyber-bg-darker/50">
          <CardContent className="p-4 flex flex-col justify-center">
            <div className="text-[10px] font-code uppercase tracking-wider text-cyber-text-muted mb-1">Avg Response</div>
            <div className="text-lg font-tech font-bold text-cyber-secondary">220ms</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyber-secondary font-code text-sm uppercase">
              <Zap className="h-4 w-4" />
              API Request Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF00C8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF00C8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#1e293b" tick={{fill: '#71717a', fontSize: 12, fontFamily: 'Fira Code'}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#1e293b" tick={{fill: '#71717a', fontSize: 12, fontFamily: 'Fira Code'}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#08090B', borderColor: '#FF00C8', borderRadius: '0.5rem', fontFamily: 'Fira Code', boxShadow: '0 0 15px rgba(255,0,200,0.2)' }}
                    itemStyle={{ color: '#F4F6F8' }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="#FF00C8" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyber-secondary font-code text-sm uppercase">
              <Clock className="h-4 w-4" />
              Live Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 space-y-6 mt-4 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyber-primary before:via-cyber-highlight before:to-transparent">
              {timeline.map((event, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-cyber-bg-dark absolute left-0 md:left-1/2 -translate-x-1/2 bg-cyber-bg-darker ${
                    event.status === 'success' ? 'text-cyber-success shadow-[0_0_10px_rgba(255,90,31,0.5)]' : 'text-cyber-danger shadow-[0_0_10px_rgba(255,61,61,0.5)]'
                  }`}>
                    {event.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="bg-cyber-bg-darker border border-cyber-border/50 p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-code font-bold text-cyber-primary">{event.action}</span>
                        <span className="text-[10px] font-code text-cyber-text-muted">{event.time}</span>
                      </div>
                      <p className="text-xs text-cyber-text-secondary font-code">{event.target}</p>
                      <p className="text-[10px] text-cyber-text-muted mt-1 uppercase tracking-wider">{event.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
