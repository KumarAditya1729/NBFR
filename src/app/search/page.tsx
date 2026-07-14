import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import {
  ALL_PUBLICATIONS_QUERY,
  ALL_EXPERTS_QUERY,
  ALL_EVENTS_QUERY,
  ALL_PARTNERS_QUERY,
  ALL_VERTICALS_QUERY,
  ALL_DATASETS_QUERY,
} from "@/sanity/lib/queries";
import type {
  Publication,
  Expert,
  EventItem,
  Partner,
  ResearchVertical,
  BiharDataset,
} from "@/sanity/lib/fallbackData";
import GlobalSearchClient from "@/components/search/GlobalSearchClient";
import Link from "next/link";
import { ArrowLeft, Search, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Universal Research & Knowledge Index | Nav Bihar Renaissance Foundation (NBRF)",
  description:
    "Global search and knowledge discovery engine across NBRF research publications, economic datasets, board of directors, research centres, and Bihar policy colloquiums.",
};

export default async function SearchPage() {
  const [publications, experts, events, partners, verticals, datasets] = await Promise.all([
    sanityFetch<Publication[]>({ query: ALL_PUBLICATIONS_QUERY, revalidate: 3600 }),
    sanityFetch<Expert[]>({ query: ALL_EXPERTS_QUERY, revalidate: 3600 }),
    sanityFetch<EventItem[]>({ query: ALL_EVENTS_QUERY, revalidate: 3600 }),
    sanityFetch<Partner[]>({ query: ALL_PARTNERS_QUERY, revalidate: 3600 }),
    sanityFetch<ResearchVertical[]>({ query: ALL_VERTICALS_QUERY, revalidate: 3600 }),
    sanityFetch<BiharDataset[]>({ query: ALL_DATASETS_QUERY, revalidate: 3600 }),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-24 overflow-x-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 h-[500px] bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded border border-border/60 bg-surface/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Think Tank Portal
          </Link>
          
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <Sparkles className="w-4 h-4 text-brand-primary" /> NBRF Global Search Engine
          </div>
        </div>

        {/* Hero Banner */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-3">
            <Search className="w-3.5 h-3.5" /> KNOWLEDGE RETRIEVAL HUB
          </div>
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-foreground mb-3">
            Universal <span className="text-brand-primary">Search Index</span>
          </h1>
          <p className="font-sans text-muted text-sm sm:text-base leading-relaxed">
            Search our integrated database of research reports, empirical datasets, governance advisors, academic colloquiums, and policy initiatives across Bihar.
          </p>
        </div>

        {/* Global Search Client Component */}
        <div className="tech-card p-2 sm:p-4 border border-brand-primary/40 shadow-2xl bg-surface/60 backdrop-blur-md">
          <GlobalSearchClient
            initialPublications={publications}
            initialExperts={experts}
            initialEvents={events}
            initialPartners={partners}
            initialVerticals={verticals}
            initialDatasets={datasets}
            isModal={false}
          />
        </div>
      </div>
    </main>
  );
}
