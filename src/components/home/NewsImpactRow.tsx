"use client";

import { BarChart } from "lucide-react";
import Link from "next/link";

export default function NewsImpactRow() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* News & Insights */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">News & Insights</h2>
          <Link href="/#insights" className="tech-button py-1.5 sm:py-2 px-3 sm:px-4 text-xs">See All</Link>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center h-full">
          <h3 className="font-mono text-xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
          <p className="text-muted text-sm">Our insights and articles are currently being drafted.</p>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5 bg-gradient-to-br from-surface to-brand-primary/5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Impact</h2>
          <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
        </div>

        <div className="flex flex-col items-center justify-center h-full text-center min-h-[150px]">
          <h3 className="font-mono text-xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
          <p className="text-muted text-sm">Impact metrics will be tracked here.</p>
        </div>
      </div>

    </div>
  );
}
