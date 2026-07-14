"use client";

import { Calendar, ArrowRight, BarChart2, TrendingUp } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventsDataRow({ events = [], datasets = [] }: { events?: any[]; datasets?: any[] }) {
  const displayEvents = events && events.length > 0 ? events : [];
  const displayDatasets = datasets && datasets.length > 0 ? datasets : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* Upcoming Events */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-border/50 pb-3">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Upcoming Events</h2>
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
        </div>

        <div className="flex flex-col gap-3">
          {displayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <Calendar className="w-8 h-8 text-muted/40" />
              <p className="text-xs font-mono text-muted">No events scheduled yet.</p>
              <p className="text-[11px] text-muted">Add events via <Link href="/studio" className="text-brand-primary hover:underline">Sanity Studio</Link>.</p>
            </div>
          ) : displayEvents.slice(0, 3).map((evt, idx) => (
            <Link key={idx} href="#events" className="group p-3 rounded-lg border border-border/40 bg-surface-alt/30 hover:border-brand-primary/50 transition-all">
              <div className="flex items-center justify-between text-[10px] font-mono text-brand-primary mb-1">
                <span>{evt.type || "Conference"}</span>
                <span className="text-muted">{evt.date}</span>
              </div>
              <h3 className="font-mono font-bold text-xs sm:text-sm text-foreground group-hover:text-brand-primary transition-colors line-clamp-2">
                {evt.title}
              </h3>
            </Link>
          ))}
        </div>

        <Link href="#events" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1 mt-auto pt-2">
          View All Events <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Data Visualization Center */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-brand-primary" />
            <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Data Observatory Indicators</h2>
          </div>
          <Link href="/bihar" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            <span className="hidden sm:inline">Explore All Datasets</span>
            <span className="sm:hidden">Explore</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {displayDatasets.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 py-10 text-center">
              <BarChart2 className="w-8 h-8 text-muted/40" />
              <p className="text-xs font-mono text-muted">No indicators published yet.</p>
              <p className="text-[11px] text-muted">Add datasets via <Link href="/studio" className="text-brand-primary hover:underline">Sanity Studio</Link> or explore the <Link href="/bihar" className="text-brand-primary hover:underline">Bihar Observatory</Link>.</p>
            </div>
          ) : displayDatasets.slice(0, 4).map((data, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-border/40 bg-surface/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-muted mb-1">
                  <span className="uppercase">{data.category}</span>
                  <span className="text-brand-primary font-semibold">{data.year}</span>
                </div>
                <h3 className="text-xs font-semibold text-foreground line-clamp-1 mb-2">
                  {data.indicatorName}
                </h3>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-border/30">
                <span className="font-mono text-lg font-bold text-brand-primary">{data.valueString}</span>
                <span className="text-[10px] font-mono text-muted">{data.sourceName}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/40">
          <span className="flex items-center gap-1.5 font-mono text-[11px]"><TrendingUp className="w-3.5 h-3.5 text-brand-primary" /> 38 Districts Tracked Live</span>
          <Link href="/bihar" className="tech-button py-1 px-3 text-[11px]">View District Map</Link>
        </div>
      </div>

    </div>
  );
}
