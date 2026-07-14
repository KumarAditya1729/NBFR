import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import ResearchImpactClient from "@/components/impact/ResearchImpactClient";

export const metadata: Metadata = {
  title: "Research Impact & Telemetry Dashboard | Nav Bihar Renaissance Foundation (NBRF)",
  description:
    "Live empirical metrics, PDF download volumes, policy citations, and dataset export queries across NBRF research monographs and the 38-district Bihar Data Observatory.",
  openGraph: {
    title: "NBRF Research Impact & Telemetry Dashboard",
    description:
      "Public verification and live reach statistics across Bihar's premier empirical policy think tank.",
    url: "https://nbrf.in/impact",
    siteName: "Nav Bihar Renaissance Foundation",
    type: "website",
  },
};

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 overflow-x-hidden relative">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 h-[500px] bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded border border-border/60 bg-surface/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Think Tank Portal
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/publications"
              className="text-xs font-mono text-muted hover:text-foreground px-3 py-1.5 rounded border border-border bg-surface"
            >
              Research Library →
            </Link>
            <Link
              href="/bihar"
              className="text-xs font-mono text-brand-primary hover:bg-brand-primary/10 px-3 py-1.5 rounded border border-brand-primary/40 bg-brand-primary/5 font-bold"
            >
              Bihar Observatory
            </Link>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-mono uppercase tracking-widest mb-4">
            <BarChart3 className="w-3.5 h-3.5" /> Open Telemetry & Institutional Reach
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-foreground tracking-tight leading-tight">
            Research Impact Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted mt-3 leading-relaxed">
            Public verification of monograph downloads, policy references, district dataset exports, and search queries logged across NBRF&apos;s open governance portal.
          </p>
        </div>

        {/* Interactive Client Component */}
        <ResearchImpactClient />
      </div>
    </main>
  );
}
