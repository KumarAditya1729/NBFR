import type { Metadata } from "next";
import {
  FALLBACK_PUBLICATIONS,
  FALLBACK_VERTICALS,
  FALLBACK_EXPERTS
} from "@/lib/data";
import type { Publication, ResearchVertical, Expert } from "@/lib/data";
import ResearchLibraryClient from "@/components/library/ResearchLibraryClient";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, FileSpreadsheet, Layers } from "lucide-react";
import { BOARD_OF_DIRECTORS, MANAGEMENT_TEAM } from "@/data/boardOfDirectors";

export const metadata = {
  title: "Research Library & Policy Repository | Nav Bihar Renaissance Foundation (NBRF)",
  description:
    "Explore data-driven research papers, working drafts, and policy briefs from NBRF across agrarian transition, governance, demography, and industrial policy in Bihar.",
  openGraph: {
    title: "Research Library | Nav Bihar Renaissance Foundation",
    description: "Policy research and verified data repository for Bihar's transformation.",
    url: "https://nbrf.in/publications",
    siteName: "Nav Bihar Renaissance Foundation",
    type: "website",
  },
};

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function PublicationsHubPage() {
  const [publicationsRaw, verticals] = await Promise.all([
    prisma.publication.findMany({ include: { authors: { include: { author: true } }, researchVertical: true } }),
    prisma.researchVertical.findMany()
  ]);

  const publications = publicationsRaw.map(pub => ({
    ...pub,
    authors: pub.authors.map(pa => pa.author),
    slug: pub.slug || undefined,
  }));

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
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded border border-border/60 bg-surface/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Think Tank Portal
          </Link>
        </div>

        {/* ── Page Header Band ── */}
        <div className="tech-card p-6 sm:p-8 md:p-12 bg-surface/80 border-border/80 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                NBRF POLICY REPOSITORY & WORKING PAPERS
              </div>
              <h1 className="font-mono font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground">
                Research Library & <span className="text-brand-primary">Data Hub</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-muted mt-3 leading-relaxed">
                Open-access policy briefs, empirical field surveys, and economic analyses exploring Bihar&apos;s structural transformation. Search across publications, verticals, and verified datasets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
              <div className="tech-card px-4 py-2.5 bg-background/50 flex items-center gap-2 border-border/60">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                <span><strong className="text-foreground">{publications.length}</strong> Papers</span>
              </div>
              <div className="tech-card px-4 py-2.5 bg-background/50 flex items-center gap-2 border-border/60">
                <Layers className="w-3.5 h-3.5 text-brand-secondary" />
                <span><strong className="text-foreground">{verticals.length}</strong> Verticals</span>
              </div>
              <Link href="/bihar" className="tech-button py-2 px-3 flex items-center gap-1.5 text-xs">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Bihar Data Engine
              </Link>
            </div>
          </div>
        </div>

        {/* ── Interactive Client Hub ── */}
        <ResearchLibraryClient
          initialPublications={publications}
          verticals={verticals}
          authors={[...BOARD_OF_DIRECTORS, ...MANAGEMENT_TEAM]}
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
export const dynamic = 'force-dynamic';
