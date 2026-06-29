"use client";

import { ArrowRight, ShieldCheck, Globe, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <div className="tech-card p-5 sm:p-8 md:p-10 flex flex-col gap-5 w-full relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Background Bihar Map watermark */}
      <div className="absolute -bottom-10 -right-10 w-48 sm:w-72 h-48 sm:h-72 opacity-5 pointer-events-none">
        <Image src="/bihar-map.svg" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-brand-primary/30 overflow-hidden bg-surface shrink-0">
            <Image src="/logo.png" alt="NBRF Logo" width={64} height={64} className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-mono text-brand-primary tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shrink-0" />
              ESTABLISHED 2024 · PATNA, BIHAR
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-muted/60 mt-0.5">Nav Bihar Renaissance Foundation — Think Tank</div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-brand-primary leading-[1.1]">
          Nav Bihar <span className="text-brand-primary">Renaissance</span> Foundation
        </h1>

        <p className="text-muted/80 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Bihar&apos;s pioneering think tank driving development through Research, Policy, Impact, and Action. We identify developmental gaps across Bihar&apos;s social, economic, and cultural sectors — and provide data-driven recommendations to policymakers, institutions, and stakeholders.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 sm:gap-3 flex-wrap">
          <Link href="#about" className="tech-button-primary flex items-center justify-center gap-2 py-2.5 sm:py-4 px-5 sm:px-8 text-xs sm:text-sm whitespace-nowrap group hover:-translate-y-0.5 transition-transform">
            Learn About NBRF
          </Link>
          <Link href="#research" className="tech-button flex items-center justify-center gap-2 py-2.5 sm:py-4 px-5 sm:px-8 text-xs sm:text-sm whitespace-nowrap group hover:-translate-y-0.5 transition-transform">
            Explore Our Research
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-3 sm:pt-4 border-t border-border/30">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-muted">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-brand-secondary shrink-0" /> Institutional research
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-muted">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-brand-primary shrink-0" /> All 38 districts
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-muted">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-brand-accent shrink-0" /> Actionable insights
          </div>
        </div>
      </div>
    </div>
  );
}
