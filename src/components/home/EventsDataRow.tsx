"use client";

import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EventsDataRow() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* Upcoming Events */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Upcoming Events</h2>
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
        </div>

          <div className="flex flex-col items-center justify-center py-12 text-center h-full">
            <h3 className="font-mono text-xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
            <p className="text-muted text-sm">Upcoming events will be listed here.</p>
          </div>
      </div>

      {/* Data Visualization Center */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Data Visualization Center</h2>
          <Link href="/#research" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            <span className="hidden sm:inline">Charts & Datasets</span>
            <span className="sm:hidden">View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center h-full">
          <h3 className="font-mono text-xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
          <p className="text-muted text-sm">Interactive data visualizations will be available shortly.</p>
        </div>
      </div>

    </div>
  );
}
