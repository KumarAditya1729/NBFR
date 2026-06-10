"use client";

import { Calendar, BarChart2, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EventsDataRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      
      {/* Upcoming Events */}
      <div className="lg:col-span-4 tech-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="font-mono font-bold text-xl text-white">Upcoming Events</h2>
          <Calendar className="w-5 h-5 text-brand-primary" />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-brand-primary">NBRF Inaugural Conference</h3>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Date TBD · Patna, Bihar</p>
            <div className="flex gap-2 mt-2">
              <Link href="#" className="tech-button py-1.5 px-3 text-[10px]">Details</Link>
              <Link href="#" className="tech-button-primary py-1.5 px-3 text-[10px]">Register</Link>
            </div>
          </div>
          
          <div className="w-full h-px bg-border/50"></div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-white hover:text-brand-primary transition-colors cursor-pointer">Bihar Development Policy Dialogue</h3>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Date TBD · Patna / Virtual</p>
          </div>

          <div className="w-full h-px bg-border/50"></div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-white hover:text-brand-primary transition-colors cursor-pointer">District-Level Field Research Drive</h3>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Date TBD · All 38 Districts</p>
          </div>
        </div>
      </div>

      {/* Data Visualization Center */}
      <div className="lg:col-span-8 tech-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-xl text-white">Data Visualization Center</h2>
          <Link href="/#research" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            Interactive Charts & Datasets <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[250px]">
          {/* Chart 1 */}
          <div className="border border-border border-dashed rounded-lg bg-surface/50 p-4 flex flex-col items-center justify-center relative group">
            <div className="absolute top-4 left-4 text-xs font-mono text-muted">Trade & Climate Scenarios</div>
            <BarChart2 className="w-12 h-12 text-brand-secondary opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <div className="absolute bottom-4 right-4 text-[10px] text-brand-secondary">Expand Chart</div>
          </div>
          
          {/* Chart 2 */}
          <div className="border border-border border-dashed rounded-lg bg-surface/50 p-4 flex flex-col items-center justify-center relative group">
            <div className="absolute top-4 left-4 text-xs font-mono text-muted">Policy Heatmap</div>
            <PieChart className="w-12 h-12 text-brand-accent opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <div className="absolute bottom-4 right-4 text-[10px] text-brand-accent">Expand Chart</div>
          </div>
        </div>
      </div>

    </div>
  );
}
