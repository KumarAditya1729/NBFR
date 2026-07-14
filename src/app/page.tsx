import HomeHero from "@/components/home/HomeHero";
import PublicationsBento from "@/components/home/PublicationsBento";
import FocusAreas from "@/components/home/FocusAreas";
import ExpertsBento from "@/components/home/ExpertsBento";
import EventsDataRow from "@/components/home/EventsDataRow";
import NewsImpactRow from "@/components/home/NewsImpactRow";
import PartnersSearchRow from "@/components/home/PartnersSearchRow";
import ImpactCounter from "@/components/home/ImpactCounter";
import BiharInNumbers from "@/components/home/BiharInNumbers";
import BiharTimeline from "@/components/home/BiharTimeline";
import AskThinkTank from "@/components/home/AskThinkTank";
import dynamic from "next/dynamic";

const InteractiveMapBento = dynamic(() => import("@/components/home/InteractiveMapBento"), {
  loading: () => <div className="min-h-[400px] w-full tech-card animate-pulse bg-surface/50" />,
});

const PolicyDashboard = dynamic(() => import("@/components/home/PolicyDashboard"), {
  loading: () => <div className="min-h-[380px] w-full tech-card animate-pulse bg-surface/50" />,
});

const NalandaParallax = dynamic(() => import("@/components/home/NalandaParallax"), {
  loading: () => <div className="min-h-[350px] w-full tech-card animate-pulse bg-surface/50" />,
});

// Full-page domain sections (anchor targets)
import About from "@/components/About";
import ResearchVerticals from "@/components/ResearchVerticals";
import Publications from "@/components/Publications";
import Events from "@/components/Events";
import Membership from "@/components/Membership";
import Fellowships from "@/components/Fellowships";
import Insights from "@/components/Insights";
import MediaPress from "@/components/MediaPress";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import Experts from "@/components/Experts";

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

export default async function Home() {
  const [publications, experts, events, partners, verticals, datasets] = await Promise.all([
    sanityFetch<Publication[]>({ query: ALL_PUBLICATIONS_QUERY, revalidate: 3600 }),
    sanityFetch<Expert[]>({ query: ALL_EXPERTS_QUERY, revalidate: 3600 }),
    sanityFetch<EventItem[]>({ query: ALL_EVENTS_QUERY, revalidate: 3600 }),
    sanityFetch<Partner[]>({ query: ALL_PARTNERS_QUERY, revalidate: 3600 }),
    sanityFetch<ResearchVertical[]>({ query: ALL_VERTICALS_QUERY, revalidate: 3600 }),
    sanityFetch<BiharDataset[]>({ query: ALL_DATASETS_QUERY, revalidate: 3600 }),
  ]);

  return (
    <>
      <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-20 overflow-x-hidden">
        
        {/* ── SEGMENT 1: HERO & HISTORICAL CONTINUUM ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-4">
          <HomeHero />
          <BiharTimeline />
          <NalandaParallax />
        </section>

        {/* ── SEGMENT 2: ABOUT NBRF & MISSION (#about) ── */}
        <About />

        {/* ── SEGMENT 3: BIHAR GIS & EMPIRICAL OBSERVATORY ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <InteractiveMapBento />
          <ImpactCounter />
          <BiharInNumbers />
        </section>

        {/* ── SEGMENT 4: RESEARCH VERTICALS & POLICY DASHBOARD (#research) ── */}
        <ResearchVerticals verticals={verticals} />
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
            <div className="lg:col-span-8">
              <PolicyDashboard />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <FocusAreas />
            </div>
          </div>
        </section>

        {/* ── SEGMENT 5: PUBLICATIONS & RESEARCH ARCHIVE (#publications) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <PublicationsBento publications={publications} />
        </section>
        <Publications publications={publications} />

        {/* ── SEGMENT 6: BOARD OF DIRECTORS, EXPERTS & FELLOWSHIPS (#experts, #initiatives) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <ExpertsBento experts={experts} />
        </section>
        <Experts experts={experts} />
        <Fellowships />

        {/* ── SEGMENT 7: EVENTS & EMPIRICAL DATA CENTER (#events) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <EventsDataRow events={events} datasets={datasets} />
        </section>
        <Events events={events} />

        {/* ── SEGMENT 8: NEWS, MEDIA & INSIGHTS (#insights, #media) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <NewsImpactRow />
        </section>
        <Insights />
        <MediaPress />

        {/* ── SEGMENT 9: ECOSYSTEM PARTNERS & INSTITUTIONAL MEMBERSHIP (#partners, #memberships) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <PartnersSearchRow partners={partners} />
        </section>
        <Partners partners={partners} />
        <Membership />

        {/* ── SEGMENT 10: AI THINK TANK ASSISTANT & CONTACT (#contact) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <AskThinkTank />
        </section>
        <Contact />

      </main>
      <ScrollToTop />
    </>
  );
}
