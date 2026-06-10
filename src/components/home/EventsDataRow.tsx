"use client";

import { useState, useEffect } from "react";
import { Calendar, BarChart2, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SkeletonBlock, SkeletonLine } from "@/components/ui/Skeleton";

export default function EventsDataRow() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* Upcoming Events */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-white">Upcoming Events</h2>
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
        </div>

        {!loaded ? (
          <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <SkeletonLine className="h-3 w-2/3" />
                <SkeletonLine className="h-2.5 w-1/2" />
                <div className="flex gap-2 mt-1">
                  <SkeletonBlock className="h-7 w-16 rounded" />
                  <SkeletonBlock className="h-7 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {[
              {
                title: "NBRF Inaugural Conference",
                date: "Date TBD · Patna, Bihar",
                cta: true,
              },
              {
                title: "Bihar Development Policy Dialogue",
                date: "Date TBD · Patna / Virtual",
                cta: false,
              },
              {
                title: "District-Level Field Research Drive",
                date: "Date TBD · All 38 Districts",
                cta: false,
              },
            ].map((ev, i) => (
              <div key={i} className={`flex flex-col gap-2 ${i < 2 ? "pb-4 border-b border-border/40" : ""}`}>
                <h3 className={`text-sm font-bold ${ev.cta ? "text-brand-primary" : "text-white hover:text-brand-primary"} transition-colors cursor-pointer`}>
                  {ev.title}
                </h3>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">{ev.date}</p>
                {ev.cta && (
                  <div className="flex gap-2 mt-1">
                    <Link href="#contact" className="tech-button py-1.5 px-3 text-[10px]">Details</Link>
                    <Link href="#contact" className="tech-button-primary py-1.5 px-3 text-[10px]">Register</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Data Visualization Center */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-white">Data Visualization Center</h2>
          <Link href="/#research" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            <span className="hidden sm:inline">Charts & Datasets</span>
            <span className="sm:hidden">View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {!loaded ? (
            <>
              <SkeletonBlock className="h-36 sm:h-48 rounded-lg" />
              <SkeletonBlock className="h-36 sm:h-48 rounded-lg" />
            </>
          ) : (
            <>
              {/* Chart 1 — simple bar viz */}
              <div className="border border-border rounded-lg bg-surface/50 p-4 flex flex-col gap-3 group hover:border-brand-secondary/40 transition-colors">
                <div className="text-xs font-mono text-muted">Trade & Climate Scenarios</div>
                <div className="flex items-end gap-1.5 h-24 sm:h-32 px-2">
                  {[40, 65, 50, 80, 55, 70, 90, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand-secondary/30 group-hover:bg-brand-secondary/60 rounded-t transition-all duration-500 hover:bg-brand-secondary"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-brand-secondary text-right font-mono">District Index 2024</div>
              </div>

              {/* Chart 2 — donut viz */}
              <div className="border border-border rounded-lg bg-surface/50 p-4 flex flex-col items-center justify-center gap-3 group hover:border-brand-accent/40 transition-colors">
                <div className="text-xs font-mono text-muted self-start">Policy Heatmap</div>
                <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a20" strokeWidth="3" />
                    {[
                      { pct: 35, color: "#8B5CF6", offset: 0 },
                      { pct: 25, color: "#10B981", offset: 35 },
                      { pct: 20, color: "#0EA5E9", offset: 60 },
                      { pct: 20, color: "#F97316", offset: 80 },
                    ].map((seg, i) => (
                      <circle
                        key={i}
                        cx="18" cy="18" r="15.9"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="3"
                        strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                        strokeDashoffset={-seg.offset}
                        opacity="0.7"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-brand-accent opacity-60" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { label: "Governance", color: "bg-brand-accent" },
                    { label: "Agriculture", color: "bg-brand-primary" },
                    { label: "Health", color: "bg-brand-secondary" },
                    { label: "Education", color: "bg-orange-400" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1 text-[9px] font-mono text-muted">
                      <div className={`w-2 h-2 rounded-full ${l.color}`} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
