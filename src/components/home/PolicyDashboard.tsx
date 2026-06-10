"use client";

import { Activity, FileText, AlertTriangle, Cpu, TrendingUp } from "lucide-react";

export default function PolicyDashboard() {
  return (
    <div className="tech-card p-6 md:p-8 flex flex-col h-full gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-mono font-bold text-xl text-white mb-1">Policy Intelligence Dashboard</h2>
          <p className="text-xs font-mono text-muted">Real-time data and policy signals across districts</p>
        </div>
        <div className="text-[10px] font-mono text-brand-primary border border-brand-primary/30 bg-brand-primary/10 px-2 py-1 rounded flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          Updated 10m ago
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Districts Focused", value: "38", desc: "across Bihar", icon: Activity, color: "text-brand-secondary" },
          { label: "Research Verticals", value: "10", desc: "core pillars", icon: FileText, color: "text-brand-primary" },
          { label: "Directors", value: "5", desc: "founding board", icon: AlertTriangle, color: "text-orange-400" },
          { label: "Founded", value: "2024", desc: "Patna, Bihar", icon: Cpu, color: "text-brand-accent" },
        ].map((stat, i) => (
          <div key={i} className="border border-border bg-surface p-4 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-muted">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-muted">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="w-full h-48 border border-border border-dashed rounded-lg flex flex-col items-center justify-center text-muted gap-3 mt-2 bg-gradient-to-b from-transparent to-surface/50">
        <TrendingUp className="w-8 h-8 opacity-20" />
        <span className="text-sm font-mono opacity-50">Trend Visualization Loading...</span>
      </div>
    </div>
  );
}
