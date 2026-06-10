"use client";

import { useState, useEffect } from "react";
import { Search, Building, University, Users, Landmark } from "lucide-react";
import { SkeletonBlock, SkeletonLine } from "@/components/ui/Skeleton";

const partners = [
  { name: "Universities & Academic Institutions", desc: "Joint research and collaborative findings.", icon: University ?? Building, color: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" },
  { name: "Government Bodies", desc: "Translate research into actionable policy.", icon: Landmark, color: "text-brand-secondary", bg: "bg-brand-secondary/10", border: "border-brand-secondary/20" },
  { name: "NGOs & Civil Society", desc: "Ground-level research initiatives.", icon: Users, color: "text-brand-accent", bg: "bg-brand-accent/10", border: "border-brand-accent/20" },
];

export default function PartnersSearchRow() {
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* Partner Organizations */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <h2 className="font-mono font-bold text-lg sm:text-xl text-white">Partner Organizations</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {!loaded
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-border/50 rounded-lg p-4 flex flex-col items-center gap-3">
                  <SkeletonBlock className="w-12 h-12 rounded-lg" />
                  <SkeletonLine className="h-3 w-3/4" />
                  <SkeletonLine className="h-2.5 w-2/3" />
                </div>
              ))
            : partners.map((p, i) => (
                <div key={i} className={`border ${p.border} ${p.bg} rounded-lg p-4 sm:p-5 flex flex-col items-center text-center gap-3 hover:scale-[1.02] transition-transform`}>
                  <div className={`w-12 h-12 rounded-lg ${p.bg} border ${p.border} flex items-center justify-center`}>
                    <p.icon className={`w-6 h-6 ${p.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-1">{p.name}</h3>
                    <p className="text-[10px] sm:text-xs text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Advanced Search */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-white flex items-center gap-2">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
            Search
          </h2>
        </div>

        <div className="flex flex-col gap-4 flex-1 justify-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded text-sm text-white placeholder-muted focus:border-brand-primary transition-all"
              placeholder="Search policy frameworks..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Region/District", opts: ["All Districts", "Patna", "Gaya", "Muzaffarpur"] },
              { label: "Sector/Vertical", opts: ["All Sectors", "Trade", "Climate", "Education"] },
              { label: "Date Range", opts: ["2020-2024", "2022-2024", "2024"] },
              { label: "Content Type", opts: ["All Types", "Reports", "Briefs", "Papers"] },
            ].map((sel) => (
              <select
                key={sel.label}
                aria-label={sel.label}
                className="bg-background border border-border rounded px-2.5 py-2 text-[10px] sm:text-xs text-muted focus:border-brand-primary transition-all w-full"
              >
                {sel.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>

          <button className="tech-button-primary py-2.5 w-full flex items-center justify-center gap-2 text-xs sm:text-sm">
            <Search className="w-3.5 h-3.5" />
            Search Repository
          </button>

          {query && (
            <p className="text-[10px] font-mono text-muted text-center">
              Searching for: <span className="text-brand-primary">{query}</span>
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
