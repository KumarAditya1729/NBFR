import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_DATASETS_QUERY, ALL_DISTRICTS_QUERY } from "@/sanity/lib/queries";
import type { BiharDataset, DistrictFactsheet } from "@/sanity/lib/fallbackData";
import BiharObservatoryClient from "@/components/observatory/BiharObservatoryClient";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, TreeDeciduous, Wheat, BookOpen, Clock,
  Users, Target, Leaf, Fish, Bird, Building2, ArrowLeft,
  Activity, Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bihar Data Observatory & State Factsheet Hub | Nav Bihar Renaissance Foundation (NBRF)",
  description:
    "Interactive open-data observatory for Bihar. Explore district-level factsheets across all 38 districts, empirical economic indicators, GSDP benchmarks, and download standardized datasets in CSV format.",
  openGraph: {
    title: "NBRF Bihar Data Observatory & District Factsheets",
    description: "Multi-dimensional empirical data on Bihar's economy, literacy, demography, and rural livelihoods.",
    url: "https://nbrf.in/bihar",
    siteName: "Nav Bihar Renaissance Foundation",
    type: "website",
  },
};

export default async function BiharObservatoryPage() {
  const [datasets, districts] = await Promise.all([
    sanityFetch<BiharDataset[]>({ query: ALL_DATASETS_QUERY, revalidate: 3600 }),
    sanityFetch<DistrictFactsheet[]>({ query: ALL_DISTRICTS_QUERY, revalidate: 3600 }),
  ]);

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "NBRF Bihar State & District Data Observatory",
    description:
      "Comprehensive empirical datasets covering district-level factsheets for all 38 districts of Bihar, agricultural yields, GSDP growth rates, fiscal indicators, and demography.",
    url: "https://nbrf.in/bihar",
    keywords: [
      "Bihar economy",
      "Bihar demographics",
      "Patna GSDP",
      "District factsheets Bihar",
      "NBRF open data",
    ],
    creator: {
      "@type": "Organization",
      name: "Nav Bihar Renaissance Foundation (NBRF)",
      url: "https://nbrf.in",
    },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: "https://nbrf.in/bihar",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-24 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 h-[650px] bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded border border-border/60 bg-surface/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Think Tank Portal
          </Link>
          
          <div className="flex items-center gap-3">
            <Link
              href="/snapshot"
              className="text-xs font-mono text-muted hover:text-foreground px-3 py-1.5 rounded border border-border bg-surface"
            >
              Macro Snapshot →
            </Link>
            <Link
              href="/map"
              className="text-xs font-mono text-brand-primary hover:bg-brand-primary/10 px-3 py-1.5 rounded border border-brand-primary/40 bg-brand-primary/5 font-bold"
            >
              GIS District Map
            </Link>
          </div>
        </div>

        {/* ── Observatory Hero Section ── */}
        <div className="tech-card p-8 sm:p-12 mb-12 border-brand-primary/40 bg-gradient-to-br from-surface/90 via-surface/60 to-background/90 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4">
              <Activity className="w-3.5 h-3.5" /> EMPIRICAL DATA OBSERVATORY
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold text-foreground mb-6 leading-tight">
              BIHAR STATE <span className="text-brand-primary">DATA HUB</span> & FACTSHEETS
            </h1>
            <p className="font-sans text-muted text-base sm:text-lg leading-relaxed mb-8">
              Explore standardized, verifiable socio-economic data across all 38 districts of Bihar. Triangulated from Directorate of Economics & Statistics surveys, Census projections, CAG audits, and primary NBRF field research.
            </p>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/60 font-mono">
              <div className="p-3.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted block uppercase">Districts Covered</span>
                <strong className="text-xl text-brand-primary font-bold">38 Districts</strong>
              </div>
              <div className="p-3.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted block uppercase">Macro GDP per Capita</span>
                <strong className="text-xl text-brand-secondary font-bold">₹54,383</strong>
              </div>
              <div className="p-3.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted block uppercase">State Literacy</span>
                <strong className="text-xl text-foreground font-bold">61.8%</strong>
              </div>
              <div className="p-3.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted block uppercase">Data License</span>
                <strong className="text-sm text-brand-accent font-bold block mt-1">Open Access / CSV</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ── Interactive Client Hub ── */}
        <BiharObservatoryClient
          initialDatasets={datasets}
          initialDistricts={districts}
        />

        {/* ── State Agricultural & Biodiversity Overview ── */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-3">
              <Wheat className="w-3.5 h-3.5" /> ECOLOGY & AGRARIAN PROFILE
            </div>
            <h2 className="text-3xl font-mono font-bold text-foreground mb-4">
              Agricultural Supremacy & Biodiversity Heritage
            </h2>
            <p className="text-sm font-sans text-muted">
              Supporting over 80% of Bihar&apos;s workforce, the agrarian economy is undergoing rapid structural evolution toward organic farming, commercial livestock, and high-value horticulture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="tech-card p-6 border border-border bg-surface/60 border-l-4 border-l-brand-primary">
              <h3 className="font-mono font-bold text-lg text-brand-primary mb-3">Shahi Litchi Monopsony</h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Bihar produces <strong>71% of India&apos;s total Litchi output</strong>, concentrated across Tirhut division (Muzaffarpur, Vaishali, Sitamarhi), with dedicated geographical indication (GI) tagging.
              </p>
            </div>

            <div className="tech-card p-6 border border-border bg-surface/60 border-l-4 border-l-brand-secondary">
              <h3 className="font-mono font-bold text-lg text-brand-secondary mb-3">World Makhana Capital</h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                The Mithilanchal wetland basins (Darbhanga, Madhubani, Purnia) account for <strong>85% of national and nearly 90% of global Fox Nut (Makhana)</strong> cultivation and preliminary processing.
              </p>
            </div>

            <div className="tech-card p-6 border border-border bg-surface/60 border-l-4 border-l-brand-accent">
              <h3 className="font-mono font-bold text-lg text-brand-accent mb-3">Maize & Organic Corridors</h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Purnia and Katihar boast the highest winter maize productivity yields in South Asia. Meanwhile, 13 districts along the Ganga basin have been designated for 100% subsidy-backed organic agriculture.
              </p>
            </div>
          </div>

          {/* State Symbols Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "State Animal", name: "Gaur (Indian Bison)", desc: "Bos gaurus", icon: Target },
              { title: "State Bird", name: "House Sparrow", desc: "Passer domesticus", icon: Bird },
              { title: "State Aquatic", name: "Gangetic Dolphin", desc: "Platanista gangetica", icon: Fish },
              { title: "State Tree", name: "Peepal (Bodhi)", desc: "Ficus religiosa", icon: Leaf },
            ].map((sym, idx) => (
              <div key={idx} className="tech-card p-5 text-center border border-border bg-background/50">
                <sym.icon className="w-6 h-6 text-brand-primary mx-auto mb-3" />
                <div className="text-[10px] font-mono uppercase text-muted tracking-widest">{sym.title}</div>
                <div className="font-mono font-bold text-sm text-foreground my-1">{sym.name}</div>
                <div className="text-[11px] font-sans italic text-muted">{sym.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
