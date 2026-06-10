"use client";

import { Search, Filter, Briefcase, Building } from "lucide-react";
import Link from "next/link";

export default function PartnersSearchRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      
      {/* Partner Organizations */}
      <div className="lg:col-span-8 tech-card p-6 md:p-8 flex flex-col gap-6">
        <h2 className="font-mono font-bold text-xl text-white">Partner Organizations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {[
            { name: "Universities & Academic Institutions", desc: "Joint research and collaborative findings." },
            { name: "Government Bodies", desc: "Translate research into actionable policy." },
            { name: "NGOs & Civil Society", desc: "Ground-level research initiatives." }
          ].map((partner, i) => (
            <div key={i} className="border border-border/50 bg-surface/30 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-brand-primary/30 transition-colors">
              <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center text-muted">
                <Building className="w-5 h-5 opacity-50" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{partner.name}</h3>
                <p className="text-[10px] text-muted">{partner.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Research Search */}
      <div className="lg:col-span-4 tech-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-xl text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-primary" />
            Advanced Search
          </h2>
        </div>

        <div className="flex flex-col gap-4 h-full justify-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded text-sm text-white placeholder-muted focus:border-brand-primary focus:ring-0 transition-all"
              placeholder="Find policy frameworks for green tariffs..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="bg-background border border-border rounded px-3 py-2 text-xs text-muted focus:border-brand-primary transition-all">
              <option>Region/District</option>
              <option>Patna</option>
              <option>Gaya</option>
            </select>
            <select className="bg-background border border-border rounded px-3 py-2 text-xs text-muted focus:border-brand-primary transition-all">
              <option>Sector/Vertical</option>
              <option>Trade</option>
              <option>Climate</option>
            </select>
            <select className="bg-background border border-border rounded px-3 py-2 text-xs text-muted focus:border-brand-primary transition-all">
              <option>Date: 2020-2024</option>
            </select>
            <select className="bg-background border border-border rounded px-3 py-2 text-xs text-muted focus:border-brand-primary transition-all">
              <option>Type: Reports</option>
            </select>
          </div>

          <button className="tech-button-primary py-2.5 w-full flex items-center justify-center gap-2 mt-2">
            Search Repository
          </button>
        </div>
      </div>

    </div>
  );
}
