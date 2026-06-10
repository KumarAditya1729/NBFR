"use client";

import { useState, useEffect } from "react";
import { Activity, FileText, AlertTriangle, Cpu, TrendingUp } from "lucide-react";
import { SkeletonBlock, SkeletonLine } from "@/components/ui/Skeleton";

const stats = [
  { label: "Districts Focused", value: "38", desc: "across Bihar", icon: Activity, color: "text-brand-secondary" },
  { label: "Research Verticals", value: "10", desc: "core pillars", icon: FileText, color: "text-brand-primary" },
  { label: "Directors", value: "6", desc: "founding board", icon: AlertTriangle, color: "text-orange-400" },
  { label: "Founded", value: "2024", desc: "Patna, Bihar", icon: Cpu, color: "text-brand-accent" },
];

const bars = [
  { label: "Governance & Admin", pct: 78, color: "bg-brand-primary" },
  { label: "Agriculture & Economy", pct: 92, color: "bg-green-400" },
  { label: "Education & Skills", pct: 65, color: "bg-brand-accent" },
  { label: "Public Health", pct: 71, color: "bg-brand-secondary" },
  { label: "Infrastructure", pct: 55, color: "bg-orange-400" },
];

function StatCardSkeleton() {
  return (
    <div className="border border-border bg-surface p-3 sm:p-4 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <SkeletonLine className="h-2.5 w-2/3" />
        <SkeletonBlock className="w-4 h-4 rounded" />
      </div>
      <SkeletonLine className="h-7 w-1/2" />
      <SkeletonLine className="h-2.5 w-1/3" />
    </div>
  );
}

export default function PolicyDashboard() {
  const [loaded, setLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 500);
    const t2 = setTimeout(() => setAnimate(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="tech-card p-4 sm:p-6 md:p-8 flex flex-col h-full gap-5">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h2 className="font-mono font-bold text-lg sm:text-xl text-white mb-1">Policy Intelligence Dashboard</h2>
          <p className="text-xs font-mono text-muted">Real-time data and policy signals across districts</p>
        </div>
        <div className="text-[10px] font-mono text-brand-primary border border-brand-primary/30 bg-brand-primary/10 px-2 py-1 rounded flex items-center gap-2 self-start shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          Live · Updated
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {!loaded
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat, i) => (
              <div key={i} className="border border-border bg-surface p-3 sm:p-4 rounded-lg flex flex-col gap-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-xs font-mono text-muted leading-tight">{stat.label}</span>
                  <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color} shrink-0`} />
                </div>
                <div className={`text-xl sm:text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] text-muted">{stat.desc}</div>
              </div>
            ))}
      </div>

      {/* Animated Bar Chart */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-primary" />
          <span className="text-xs font-mono text-white font-bold">Research Focus Distribution</span>
        </div>
        {!loaded
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <SkeletonLine className="h-2.5 w-1/3" />
                <SkeletonBlock className="h-3 w-full rounded-full" />
              </div>
            ))
          : bars.map((bar, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-muted">{bar.label}</span>
                  <span className="text-[10px] font-mono text-white">{bar.pct}%</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                    style={{ width: animate ? `${bar.pct}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
