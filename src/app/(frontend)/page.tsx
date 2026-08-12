import HomeHero from "@/components/home/HomeHero";
import FocusAreas from "@/components/home/FocusAreas";
import ImpactCounter from "@/components/home/ImpactCounter";
import BiharInNumbers from "@/components/home/BiharInNumbers";
import BiharTimeline from "@/components/home/BiharTimeline";
import AskThinkTank from "@/components/home/AskThinkTank";
import nextDynamic from "next/dynamic";

const InteractiveMapBento = nextDynamic(() => import("@/components/home/InteractiveMapBento"), {
  loading: () => <div className="min-h-[400px] w-full tech-card animate-pulse bg-surface/50" />,
});

const PolicyDashboard = nextDynamic(() => import("@/components/home/PolicyDashboard"), {
  loading: () => <div className="min-h-[380px] w-full tech-card animate-pulse bg-surface/50" />,
});

const NalandaParallax = nextDynamic(() => import("@/components/home/NalandaParallax"), {
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

import {
  FALLBACK_PUBLICATIONS,
  FALLBACK_EXPERTS,
  FALLBACK_EVENTS,
  FALLBACK_PARTNERS,
  FALLBACK_VERTICALS,
  FALLBACK_DATASETS,
} from "@/lib/data";
import type {
  Publication,
  Expert,
  EventItem,
  Partner,
  ResearchVertical,
  BiharDataset,
} from "@/lib/data";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Home() {
  const [
    siteSettings,
    timelineEvents,
    impactStats,
    focusAreas,
    insights,
    mediaMentions,
    membershipPrograms,
    publicationsRaw,
    experts,
    events,
    partners,
    verticals
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.timelineEvent.findMany({ orderBy: { year: 'asc' } }),
    prisma.impactStat.findMany(),
    prisma.focusArea.findMany(),
    prisma.insight.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.mediaMention.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.membershipProgram.findMany(),
    prisma.publication.findMany({ 
      include: { 
        authors: { include: { author: true } }, 
        researchVertical: true 
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.expert.findMany(),
    prisma.eventItem.findMany({ orderBy: { date: 'desc' } }),
    prisma.partner.findMany(),
    prisma.researchVertical.findMany(),
  ]);

  // Map Prisma publications to the expected frontend interface
  const publications = publicationsRaw.map(pub => ({
    ...pub,
    authors: pub.authors.map(pa => pa.author),
    slug: pub.slug || undefined,
  }));

  // Ensure fallback empty arrays/objects if null
  const safeSiteSettings = siteSettings || {};

  return (
    <>
      <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-20 overflow-x-hidden">
        
        {/* ── SEGMENT 1: HERO & HISTORICAL CONTINUUM ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-4">
          <HomeHero settings={safeSiteSettings} />
          <BiharTimeline events={timelineEvents} />
          <NalandaParallax />
        </section>

        {/* ── SEGMENT 2: ABOUT NBRF & MISSION (#about) ── */}
        <About settings={safeSiteSettings} />

        {/* ── SEGMENT 3: BIHAR GIS & EMPIRICAL OBSERVATORY ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <InteractiveMapBento />
          <ImpactCounter stats={impactStats} />
          <BiharInNumbers />
        </section>

        {/* ── SEGMENT 4: RESEARCH VERTICALS & POLICY DASHBOARD (#research) ── */}
        <ResearchVerticals verticals={verticals} />
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
            <div className="lg:col-span-8">
              <PolicyDashboard areas={focusAreas} />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <FocusAreas areas={focusAreas} />
            </div>
          </div>
        </section>

        {/* ── SEGMENT 5: PUBLICATIONS & RESEARCH ARCHIVE (#publications) ── */}
        <Publications publications={publications} />

        {/* ── SEGMENT 6: BOARD OF DIRECTORS, EXPERTS & FELLOWSHIPS (#experts, #initiatives) ── */}
        <Experts experts={experts} />
        <Fellowships programs={membershipPrograms} />

        {/* ── SEGMENT 7: EVENTS & EMPIRICAL DATA CENTER (#events) ── */}
        <Events events={events} />

        {/* ── SEGMENT 8: NEWS, MEDIA & INSIGHTS (#insights, #media) ── */}
        <Insights insights={insights} />
        <MediaPress mentions={mediaMentions} />

        {/* ── SEGMENT 9: ECOSYSTEM PARTNERS & INSTITUTIONAL MEMBERSHIP (#partners, #memberships) ── */}
        <Partners partners={partners} />
        <Membership programs={membershipPrograms} />

        {/* ── SEGMENT 10: AI THINK TANK ASSISTANT & CONTACT (#contact) ── */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <AskThinkTank />
        </section>
        <Contact settings={safeSiteSettings} />

      </main>
      <ScrollToTop />
    </>
  );
}
export const dynamic = 'force-dynamic';
