"use client";

import { Newspaper, BarChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewsImpactRow() {
  const newsItems = [
    {
      title: "Opinion Articles",
      date: "Coming Soon",
      author: "Writers & Policymakers",
      desc: "Expert analysis from researchers and policymakers on Bihar's developmental priorities."
    },
    {
      title: "Podcast Series",
      date: "Coming Soon",
      author: "Civil Society Leaders",
      desc: "Conversations with Bihar's administrators, academics, and civil society leaders."
    },
    {
      title: "Expert Interviews",
      date: "Coming Soon",
      author: "Domain Specialists",
      desc: "In-depth Q&A sessions with domain specialists across Bihar's key development sectors."
    },
    {
      title: "Research Blogs",
      date: "Coming Soon",
      author: "NBRF Team",
      desc: "Accessible write-ups translating complex research findings into public-friendly narratives."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      
      {/* News & Insights */}
      <div className="lg:col-span-8 tech-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-xl text-white">News & Insights</h2>
          <Link href="/#insights" className="tech-button py-2 px-4 text-xs">See All</Link>
        </div>

        <div className="flex flex-col gap-4">
          {newsItems.map((item, i) => (
            <div key={i} className="flex gap-3 sm:gap-4 group cursor-pointer">
              <div className="hidden sm:flex w-20 h-20 shrink-0 bg-surface border border-border rounded items-center justify-center text-muted overflow-hidden">
                <Newspaper className="w-6 h-6 opacity-20" />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <h3 className="text-sm font-bold text-white group-hover:text-brand-primary transition-colors">{item.title}</h3>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">{item.date} · By {item.author}</p>
                <p className="text-xs text-muted/80 line-clamp-2 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="lg:col-span-4 tech-card p-6 md:p-8 flex flex-col gap-6 bg-gradient-to-br from-surface to-brand-primary/5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-xl text-white">Impact Metrics</h2>
          <BarChart className="w-5 h-5 text-brand-primary" />
        </div>

        <div className="flex flex-col justify-center h-full gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Policy Briefs Adopted</p>
            <div className="text-4xl font-mono font-bold text-brand-primary glow-text">37</div>
          </div>
          
          <div className="w-full h-px bg-border/50"></div>
          
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Local Partners</p>
            <div className="text-4xl font-mono font-bold text-brand-secondary glow-text-blue">52</div>
          </div>
          
          <div className="w-full h-px bg-border/50"></div>
          
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Media Mentions (YTD)</p>
            <div className="text-4xl font-mono font-bold text-brand-accent glow-text">4.5K</div>
            <p className="text-[10px] text-muted font-sans mt-1">Research Reach: Global relationships across 60 countries.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
