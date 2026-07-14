import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import {
  ALL_PUBLICATIONS_QUERY,
  ALL_VERTICALS_QUERY,
  ALL_EXPERTS_QUERY
} from "@/sanity/lib/queries";
import type { Publication, ResearchVertical, Expert } from "@/sanity/lib/fallbackData";
import ResearchLibraryClient from "@/components/library/ResearchLibraryClient";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, FileSpreadsheet, Layers } from "lucide-react";

export const metadata = {
  title: "Research Library & Policy Repository | Nav Bihar Renaissance Foundation (NBRF)",
  description:
    "Explore NBRF's authoritative open-access repository of working papers, policy briefs, data monographs, and district-level empirical research across all 38 districts of Bihar.",
  openGraph: {
    title: "NBRF Research Library & Policy Repository",
    description: "Open-access empirical research and policy frameworks for Bihar's transformation.",
    url: "https://nbrf.in/publications",
    siteName: "Nav Bihar Renaissance Foundation",
    type: "website",
  },
};

export default async function PublicationsHubPage() {
  const [publications, verticals, experts] = await Promise.all([
    sanityFetch<Publication[]>({ query: ALL_PUBLICATIONS_QUERY, revalidate: 3600 }),
    sanityFetch<ResearchVertical[]>({ query: ALL_VERTICALS_QUERY, revalidate: 3600 }),
    sanityFetch<Expert[]>({ query: ALL_EXPERTS_QUERY, revalidate: 3600 }),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-24 overflow-x-hidden">
      {/* Decorative Top Grid */}
      <div className="absolute inset-0 h-[600px] bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded border border-border/60 bg-surface/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Think Tank Portal
          </Link>
        </div>

        {/* ── Library Hero Section ── */}
        <div className="tech-card p-8 sm:p-12 mb-12 border-brand-primary/40 bg-gradient-to-br from-surface/90 via-surface/60 to-background/90 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" /> OPEN ACCESS // RESEARCH REPOSITORY
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold text-foreground mb-6 leading-tight">
              BIHAR PUBLIC POLICY <span className="text-brand-primary">ARCHIVE</span>
            </h1>
            <p className="font-sans text-muted text-base sm:text-lg leading-relaxed mb-8">
              Nav Bihar Renaissance Foundation publishes rigorous, multi-disciplinary research to inform state governance, rural economic development, and institutional reform. All reports are peer-reviewed and made open-access under Creative Commons (CC-BY 4.0).
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted pt-6 border-t border-border/60">
              <span className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded border border-border">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> Verified District Data
              </span>
              <span className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded border border-border">
                <FileSpreadsheet className="w-3.5 h-3.5 text-brand-accent" /> Standardized Citations
              </span>
              <span className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded border border-border">
                <Layers className="w-3.5 h-3.5 text-brand-secondary" /> 8 Research Verticals
              </span>
            </div>
          </div>
        </div>

        {/* ── Interactive Client Hub ── */}
        <ResearchLibraryClient
          initialPublications={publications}
          verticals={verticals}
          authors={experts}
        />

        {/* ── Submission CTA Band ── */}
        <div className="mt-20 tech-card p-10 border-brand-secondary/30 bg-gradient-to-r from-surface via-surface-alt/40 to-surface flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary bg-brand-secondary/10 border border-brand-secondary/30 px-2.5 py-0.5 rounded inline-block mb-3">
              CALL FOR WORKING PAPERS
            </div>
            <h3 className="font-mono font-bold text-xl text-foreground mb-2">
              Are you researching Bihar&apos;s economy, governance, or demography?
            </h3>
            <p className="text-sm font-sans text-muted max-w-xl">
              NBRF invites research fellows, doctoral candidates, and public policy economists to submit empirical working papers for publication and dissemination across state policy networks.
            </p>
          </div>
          <Link
            href="/#contact"
            className="tech-button shrink-0 border-brand-secondary/40 text-brand-secondary hover:bg-brand-secondary/10 hover:border-brand-secondary py-3 px-6 text-xs"
          >
            Submit Working Paper →
          </Link>
        </div>
      </div>
    </main>
  );
}
