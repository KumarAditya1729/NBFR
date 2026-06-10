"use client";

import { useState, useEffect } from "react";
import { Newspaper, BarChart, Mic, MessageSquare, BookOpen, PenTool } from "lucide-react";
import Link from "next/link";
import { SkeletonLine, SkeletonBlock } from "@/components/ui/Skeleton";

const newsItems = [
  {
    icon: PenTool,
    title: "Opinion Articles",
    date: "Coming Soon",
    author: "Writers & Policymakers",
    desc: "Expert analysis from researchers and policymakers on Bihar's developmental priorities.",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10",
    border: "border-brand-primary/20",
  },
  {
    icon: Mic,
    title: "Podcast Series",
    date: "Coming Soon",
    author: "Civil Society Leaders",
    desc: "Conversations with Bihar's administrators, academics, and civil society leaders.",
    color: "text-brand-secondary",
    bg: "bg-brand-secondary/10",
    border: "border-brand-secondary/20",
  },
  {
    icon: MessageSquare,
    title: "Expert Interviews",
    date: "Coming Soon",
    author: "Domain Specialists",
    desc: "In-depth Q&A sessions with domain specialists across Bihar's key development sectors.",
    color: "text-brand-accent",
    bg: "bg-brand-accent/10",
    border: "border-brand-accent/20",
  },
  {
    icon: BookOpen,
    title: "Research Blogs",
    date: "Coming Soon",
    author: "NBRF Team",
    desc: "Accessible write-ups translating complex research findings into public-friendly narratives.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
];

function NewsSkeleton() {
  return (
    <div className="flex gap-3 py-3 border-b border-border/40 last:border-0">
      <SkeletonBlock className="hidden sm:block w-16 h-16 shrink-0 rounded-lg" />
      <div className="flex flex-col gap-2 flex-1">
        <SkeletonLine className="h-3 w-2/3" />
        <SkeletonLine className="h-2.5 w-1/2" />
        <SkeletonLine className="h-2.5 w-full" />
      </div>
    </div>
  );
}

export default function NewsImpactRow() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* News & Insights */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-white">News & Insights</h2>
          <Link href="/#insights" className="tech-button py-1.5 sm:py-2 px-3 sm:px-4 text-xs">See All</Link>
        </div>

        <div className="flex flex-col divide-y divide-border/40">
          {!loaded
            ? Array.from({ length: 4 }).map((_, i) => <NewsSkeleton key={i} />)
            : newsItems.map((item, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 py-3 group cursor-pointer">
                  {/* Icon block instead of thumbnail */}
                  <div className={`hidden sm:flex w-14 h-14 shrink-0 rounded-lg border ${item.border} ${item.bg} items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex flex-col gap-1 justify-center">
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
                      {item.date} · By {item.author}
                    </p>
                    <p className="text-xs text-muted/80 line-clamp-2 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5 bg-gradient-to-br from-surface to-brand-primary/5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-white">Impact</h2>
          <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8 h-full">
          {[
            { label: "Policy Briefs", value: "37", color: "text-brand-primary", glow: "glow-text" },
            { label: "Local Partners", value: "52", color: "text-brand-secondary", glow: "glow-text-blue" },
            { label: "Media Mentions", value: "4.5K", color: "text-brand-accent", glow: "glow-text", note: "Global reach · 60+ countries" },
          ].map((m, i) => (
            <div key={i} className="flex flex-col gap-1 flex-1">
              <p className="text-[10px] sm:text-xs font-mono text-muted uppercase tracking-widest">{m.label}</p>
              <div className={`text-3xl sm:text-4xl font-mono font-bold ${m.color} ${m.glow}`}>{m.value}</div>
              {m.note && <p className="text-[10px] text-muted font-sans mt-0.5">{m.note}</p>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
