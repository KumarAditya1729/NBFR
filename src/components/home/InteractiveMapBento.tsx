"use client";

import { Map, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function InteractiveMapBento() {
  return (
    <div className="tech-card p-6 flex flex-col items-center justify-center h-full min-h-[280px] sm:min-h-[400px] relative overflow-hidden group">
      {/* Background Map Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none p-8">
        <div className="relative w-full h-full max-w-[80%] max-h-[80%] drop-shadow-[0_0_15px_rgba(234,88,12,0.15)]">
          <Image
            src="/bihar-map.svg"
            alt="Bihar Map"
            fill
            className="object-contain opacity-20"
          />
        </div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 mt-8">
        <div className="w-20 h-20 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center glow-text mb-2">
          <Map className="w-8 h-8 text-brand-primary" />
        </div>
        
        <div>
          <h2 className="font-mono font-bold text-xl text-brand-primary mb-2">Interactive Bihar Map</h2>
          <p className="text-sm text-muted max-w-[250px] mx-auto">Explore development hotspots, policy impact zones, and district-level data.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full px-4">
          <Link href="/map" className="tech-button-primary flex-1 py-3 text-xs flex justify-center items-center gap-2">
            Open Interactive Map
          </Link>
          <Link href="/snapshot" className="tech-button flex-1 py-3 text-xs flex justify-center items-center gap-2">
            State Snapshot <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
