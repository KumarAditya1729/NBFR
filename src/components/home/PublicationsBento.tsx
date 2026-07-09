"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PublicationsBento() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
      
      {/* Featured Publication */}
      <div className="tech-card p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h3 className="font-mono font-bold text-lg text-brand-primary">Featured Research</h3>
        </div>
        
        <div className="text-sm font-bold text-brand-primary">We Need Your Cooperation</div>
        
        <div className="w-full h-44 rounded-lg overflow-hidden relative border border-border/50">
          <Image
            src="/mindful_research.png"
            alt="Featured Research"
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="text-[9px] font-mono bg-brand-primary/20 border border-brand-primary/40 text-brand-primary px-2 py-0.5 rounded uppercase tracking-widest">
              Policy Intelligence
            </span>
          </div>
        </div>
        
        <p className="text-sm text-muted line-clamp-3">
          As a newly founded think tank, NBRF is in the process of building its first body of research. We invite researchers, academics, policymakers, and domain experts to collaborate with us in shaping Bihar&apos;s development narrative.
        </p>

        <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
          <Link href="#contact" className="tech-button flex-1 py-2 px-0 text-center flex justify-center items-center gap-2 text-xs">
            Partner With Us
          </Link>
          <Link href="#memberships" className="tech-button flex-1 py-2 px-0 text-center flex justify-center items-center gap-2 text-xs">
            Join as Researcher
          </Link>
        </div>
      </div>

      {/* Latest Publications */}
      <div className="tech-card p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-mono font-bold text-lg text-brand-primary">Upcoming Categories</h3>
          <Link href="#publications" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-0 divide-y divide-border/50">
          {[
            {
              title: "Policy Briefs",
              author: "In-depth analysis",
              desc: "Analysis of Bihar's governance and agriculture.",
              tag: "Briefs"
            },
            {
              title: "Research Reports",
              author: "Data-driven",
              desc: "Reports on economic and health indicators.",
              tag: "Reports"
            },
            {
              title: "Working Papers",
              author: "Academic",
              desc: "Papers on migration, rural economy, and equity.",
              tag: "Papers"
            },
            {
              title: "Survey & Field Studies",
              author: "Ground-level",
              desc: "Ground-level research from Bihar's villages.",
              tag: "Surveys"
            }
          ].map((item, i) => (
            <div key={i} className="py-3 flex flex-col gap-1 group cursor-pointer">
              <div className="flex justify-between items-start gap-4">
                <h4 className="text-sm font-semibold text-brand-primary group-hover:text-brand-primary transition-colors">{item.title}</h4>
                <span className="text-[10px] font-mono border border-border px-2 py-0.5 rounded text-muted whitespace-nowrap bg-surface">
                  {item.tag}
                </span>
              </div>
              <div className="text-xs text-muted font-sans">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
