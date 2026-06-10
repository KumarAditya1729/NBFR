"use client";
// Note: metadata is defined in a separate server component if needed
// Title: Interactive Bihar Map | NBRF

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Map, Layers, ZoomIn, ZoomOut, RotateCcw, ExternalLink,
  MapPin, Users, Activity, BookOpen, Wheat, Stethoscope, GraduationCap, ArrowLeft
} from "lucide-react";

const districts = [
  { name: "Patna", region: "Central", pop: "5.8M", hdi: "0.61" },
  { name: "Gaya", region: "South", pop: "4.4M", hdi: "0.52" },
  { name: "Muzaffarpur", region: "North", pop: "4.7M", hdi: "0.54" },
  { name: "Bhagalpur", region: "East", pop: "3.0M", hdi: "0.55" },
  { name: "Darbhanga", region: "North", pop: "3.9M", hdi: "0.50" },
  { name: "Nalanda", region: "Central", pop: "2.8M", hdi: "0.57" },
  { name: "Sitamarhi", region: "North", pop: "3.4M", hdi: "0.48" },
  { name: "Samastipur", region: "Central", pop: "4.2M", hdi: "0.51" },
  { name: "Purnia", region: "East", pop: "3.3M", hdi: "0.49" },
  { name: "Vaishali", region: "Central", pop: "3.5M", hdi: "0.53" },
  { name: "East Champaran", region: "North", pop: "5.0M", hdi: "0.50" },
  { name: "West Champaran", region: "North", pop: "3.9M", hdi: "0.49" },
];

const overlays = [
  { id: "development", label: "Development Index", icon: Activity, color: "text-brand-primary" },
  { id: "agriculture", label: "Agriculture Output", icon: Wheat, color: "text-green-400" },
  { id: "health", label: "Health Coverage", icon: Stethoscope, color: "text-blue-400" },
  { id: "education", label: "Literacy Rate", icon: GraduationCap, color: "text-purple-400" },
];

const regions = [
  { name: "North Bihar", districts: 14, focus: "Flood management, Makhana, Litchi" },
  { name: "South Bihar", districts: 10, focus: "Mining, Eco-tourism, Pilgrim economy" },
  { name: "Central Bihar", districts: 9, focus: "Administration, Trade, River transport" },
  { name: "East Bihar", districts: 5, focus: "Silk, Fishery, Tea gardens" },
];

export default function MapPage() {
  const [zoom, setZoom] = useState(100);
  const [activeOverlay, setActiveOverlay] = useState("development");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Toolbar */}
      <div className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-1.5 text-muted hover:text-white transition-colors text-xs font-mono">
              <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
            </Link>
            <span className="text-border hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-2 text-brand-primary font-mono text-xs">
              <Map className="w-4 h-4" /> Interactive Bihar Map
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            <span className="text-[9px] sm:text-[10px] font-mono text-muted uppercase tracking-widest shrink-0 hidden sm:inline">Layer:</span>
            {overlays.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveOverlay(o.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded text-[9px] sm:text-[10px] font-mono transition-all border shrink-0 ${
                  activeOverlay === o.id
                    ? "border-brand-primary bg-brand-primary/20 text-brand-primary"
                    : "border-border text-muted hover:border-brand-primary/40 hover:text-white"
                }`}
              >
                <o.icon className={`w-3 h-3 ${activeOverlay === o.id ? o.color : ""}`} />
                <span className="hidden md:inline">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">

          {/* Left Sidebar — hidden on mobile, shown on xl */}
          <div className="hidden xl:flex xl:col-span-3 flex-col gap-4">
            <div className="tech-card p-5">
              <h2 className="font-mono font-bold text-white text-sm mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-primary" /> Districts
                <span className="ml-auto text-[10px] font-mono text-muted border border-border rounded px-1.5 py-0.5">38 Total</span>
              </h2>
              <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
                {districts.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => setSelectedDistrict(selectedDistrict === d.name ? null : d.name)}
                    className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono transition-all ${
                      selectedDistrict === d.name
                        ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/40"
                        : "text-muted hover:bg-surface-hover hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{d.name}</span>
                      <span className="text-[9px] text-muted/60 uppercase">{d.region}</span>
                    </div>
                    {selectedDistrict === d.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 pt-2 border-t border-brand-primary/20 grid grid-cols-2 gap-2"
                      >
                        <div>
                          <div className="text-[9px] text-muted uppercase tracking-widest">Population</div>
                          <div className="text-white font-bold text-xs">{d.pop}</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-muted uppercase tracking-widest">HDI</div>
                          <div className="text-brand-primary font-bold text-xs">{d.hdi}</div>
                        </div>
                      </motion.div>
                    )}
                  </button>
                ))}
                <p className="text-[9px] text-muted text-center pt-2">+ 26 more districts</p>
              </div>
            </div>

            <div className="tech-card p-5">
              <h2 className="font-mono font-bold text-white text-sm mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-secondary" /> Regions
              </h2>
              <div className="flex flex-col gap-2">
                {regions.map((r) => (
                  <div key={r.name} className="border border-border rounded p-3 hover:border-brand-secondary/40 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-mono font-bold text-white">{r.name}</span>
                      <span className="text-[9px] font-mono text-brand-secondary border border-brand-secondary/30 px-1.5 py-0.5 rounded">{r.districts} districts</span>
                    </div>
                    <p className="text-[10px] text-muted leading-relaxed">{r.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="xl:col-span-6 flex flex-col gap-4">
            {/* Map container */}
            <div className="tech-card relative overflow-hidden" style={{ minHeight: "320px" }}>
              {/* Zoom controls */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button
                  onClick={() => setZoom(Math.min(150, zoom + 10))}
                  className="w-9 h-9 rounded border border-border bg-surface flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(Math.max(60, zoom - 10))}
                  className="w-9 h-9 rounded border border-border bg-surface flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="w-9 h-9 rounded border border-border bg-surface flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Active overlay badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-[10px] font-mono uppercase tracking-widest">
                  {(() => {
                    const o = overlays.find(x => x.id === activeOverlay);
                    return o ? <><o.icon className="w-3 h-3" /> {o.label}</> : null;
                  })()}
                </div>
              </div>

              {/* The Bihar Map SVG */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <div className="relative w-[90%] h-[90%] drop-shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <Image
                    src="/bihar-map.svg"
                    alt="Interactive Bihar Map"
                    fill
                    className="object-contain"
                    style={{
                      filter: activeOverlay === "development"
                        ? "invert(1) sepia(1) saturate(5) hue-rotate(100deg) brightness(1.5)"
                        : activeOverlay === "agriculture"
                        ? "invert(1) sepia(1) saturate(3) hue-rotate(60deg) brightness(1.4)"
                        : activeOverlay === "health"
                        ? "invert(1) sepia(1) saturate(4) hue-rotate(150deg) brightness(1.5)"
                        : "invert(1) sepia(1) saturate(4) hue-rotate(220deg) brightness(1.4)"
                    }}
                  />
                </div>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

              {/* Glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Zoom percentage */}
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted border border-border px-2 py-1 rounded bg-surface">
                {zoom}%
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                <div className="text-[9px] font-mono text-muted uppercase tracking-widest mb-1">Legend</div>
                {["High", "Medium", "Low"].map((level, i) => (
                  <div key={level} className="flex items-center gap-2 text-[9px] font-mono text-muted">
                    <div className={`w-3 h-1.5 rounded-sm ${
                      i === 0 ? "bg-brand-primary" : i === 1 ? "bg-brand-primary/50" : "bg-brand-primary/20"
                    }`} />
                    {level}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom quick stat strip */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Total Districts", value: "38" },
                { label: "Area", value: "94,163 km²" },
                { label: "Population", value: "128M+" },
                { label: "Rivers", value: "5 Major" },
              ].map((s) => (
                <div key={s.label} className="tech-card p-3 text-center">
                  <div className="text-lg font-mono font-bold text-brand-primary">{s.value}</div>
                  <div className="text-[9px] font-mono text-muted uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar — shown below map on mobile */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            <div className="tech-card p-5">
              <h2 className="font-mono font-bold text-white text-sm mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-primary" /> Development Indicators
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Human Development Index", value: 0.574, max: 1, color: "bg-brand-primary" },
                  { label: "Literacy Rate", value: 61.8, max: 100, color: "bg-brand-secondary" },
                  { label: "Agricultural Coverage", value: 79, max: 100, color: "bg-green-400" },
                  { label: "Urban Population", value: 11.3, max: 100, color: "bg-brand-accent" },
                  { label: "GSDP Growth Rate", value: 10.5, max: 20, color: "bg-orange-400" },
                ].map((ind) => (
                  <div key={ind.label}>
                    <div className="flex justify-between text-[10px] font-mono mb-1.5">
                      <span className="text-muted">{ind.label}</span>
                      <span className="text-white">{ind.value}{ind.label.includes("Index") ? "" : "%"}</span>
                    </div>
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(ind.value / ind.max) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${ind.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-card p-5">
              <h2 className="font-mono font-bold text-white text-sm mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-secondary" /> Key Research Zones
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { zone: "Mithilanchal", tag: "Culture & History", color: "border-brand-primary/40" },
                  { zone: "Magadha Region", tag: "Heritage & Tourism", color: "border-brand-accent/40" },
                  { zone: "Champaran", tag: "Agriculture & Ecology", color: "border-green-400/40" },
                  { zone: "Seemanchal", tag: "Border Economy", color: "border-brand-secondary/40" },
                ].map((z) => (
                  <div key={z.zone} className={`border ${z.color} rounded p-3 hover:bg-surface/50 transition-colors cursor-pointer`}>
                    <div className="text-xs font-mono font-bold text-white">{z.zone}</div>
                    <div className="text-[9px] font-mono text-muted uppercase tracking-widest mt-0.5">{z.tag}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/snapshot" className="tech-card p-5 flex items-center gap-4 group hover:border-brand-secondary/50 transition-colors">
              <div className="w-10 h-10 rounded bg-brand-secondary/10 border border-brand-secondary/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-brand-secondary" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white group-hover:text-brand-secondary transition-colors">State Snapshot</div>
                <div className="text-[10px] text-muted mt-0.5">Full demographic data dashboard</div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted ml-auto shrink-0 group-hover:text-brand-secondary transition-colors" />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
