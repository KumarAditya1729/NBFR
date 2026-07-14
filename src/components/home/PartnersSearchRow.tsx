"use client";

import { useState } from "react";
import { Search, ArrowRight, ExternalLink, Handshake } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PartnersSearchRow({ partners = [] }: { partners?: any[] }) {
  const displayPartners = partners && partners.length > 0 ? partners : [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/#publications?query=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* Partner Organizations */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-border/50 pb-3">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Partner & Collaborator Ecosystem</h2>
          <Link href="#partners" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {displayPartners.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 py-8 text-center">
              <Handshake className="w-8 h-8 text-muted/40" />
              <p className="text-xs font-mono text-muted">No partners listed yet.</p>
              <p className="text-[11px] text-muted/60">Add partners via <Link href="/studio" className="text-brand-primary hover:underline">Sanity Studio</Link>.</p>
            </div>
          ) : displayPartners.slice(0, 4).map((part, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-border/40 bg-surface/40 flex flex-col justify-between hover:border-brand-primary/40 transition-all">
              <div>
                <span className="text-[9px] font-mono uppercase bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-2 py-0.5 rounded">
                  {part.tier}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-foreground mt-2 line-clamp-1">
                  {part.name}
                </h3>
                <p className="text-xs text-muted font-sans mt-1 line-clamp-2">
                  {part.description}
                </p>
              </div>
              {part.websiteUrl && (
                <a href={part.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-brand-primary hover:underline mt-3 pt-2 border-t border-border/30">
                  <span>Visit Portal</span> <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Research & Data Search */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-border/50 pb-3">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary flex items-center gap-2">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
            Repository Search
          </h2>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col gap-3 my-auto">
          <p className="text-xs text-muted font-sans leading-relaxed">
            Instant search across NBRF research publications, district factsheets, goat farming economic surveys, and RTI audits.
          </p>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports, indicators, districts..."
              className="w-full bg-background border border-border rounded px-3 py-2.5 pl-9 text-xs text-foreground focus:outline-none focus:border-brand-primary transition-colors"
            />
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="tech-button-primary w-full py-2.5 text-center text-xs font-mono flex items-center justify-center gap-2"
          >
            Execute Search <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 text-[10px] font-mono text-muted">
          <span>Trending:</span>
          <button onClick={() => setSearchTerm("Goat Farming")} className="hover:text-brand-primary underline">Goat Farming</button> •
          <button onClick={() => setSearchTerm("Municipal Audit")} className="hover:text-brand-primary underline">Municipal Audit</button> •
          <button onClick={() => setSearchTerm("RTI")} className="hover:text-brand-primary underline">RTI</button>
        </div>
      </div>

    </div>
  );
}
