import HomeHero from "@/components/home/HomeHero";
import PublicationsBento from "@/components/home/PublicationsBento";
import InteractiveMapBento from "@/components/home/InteractiveMapBento";
import PolicyDashboard from "@/components/home/PolicyDashboard";
import FocusAreas from "@/components/home/FocusAreas";
import ExpertsBento from "@/components/home/ExpertsBento";
import EventsDataRow from "@/components/home/EventsDataRow";
import NewsImpactRow from "@/components/home/NewsImpactRow";
import PartnersSearchRow from "@/components/home/PartnersSearchRow";
import ImpactCounter from "@/components/home/ImpactCounter";
import BiharInNumbers from "@/components/home/BiharInNumbers";
import BiharTimeline from "@/components/home/BiharTimeline";
import AskThinkTank from "@/components/home/AskThinkTank";
import NalandaParallax from "@/components/home/NalandaParallax";

// Full-page sections (anchor targets)

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

export default function Home() {
  return (
    <>
      {/* ── Bento Grid Homepage ── */}
      <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-20 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">

            {/* Row 1: Hero */}
            <div className="w-full">
              <HomeHero />
            </div>

            {/* Bihar Timeline */}
            <div className="w-full">
              <BiharTimeline />
            </div>

            {/* Nalanda Parallax */}
            <div className="w-full">
              <NalandaParallax />
            </div>

            {/* Row 2: Map Full Width */}
            <div className="w-full h-full">
              <InteractiveMapBento />
            </div>

            {/* Impact Counter Band */}
            </div>
          </div>
        </main>
        <ImpactCounter />
        <main className="bg-background text-foreground overflow-x-hidden pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
            {/* Bihar in Numbers */}
            <BiharInNumbers />

            {/* Row 3: Publications */}
            <div className="w-full">
              <PublicationsBento />
            </div>

            {/* Row 4: Dashboard & Focus Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <PolicyDashboard />
              </div>
              <div className="lg:col-span-4">
                <FocusAreas />
              </div>
            </div>

            {/* Row 3: Experts Grid */}
            <div className="w-full">
              <ExpertsBento />
            </div>

            {/* Row 4: Events & Data Visualization */}
            <EventsDataRow />

            {/* Row 5: News & Impact Metrics */}
            <NewsImpactRow />

            {/* Row 6: Partners & AI Search */}
            <PartnersSearchRow />

            {/* Ask the Think Tank */}
            <AskThinkTank />

          </div>
        </div>
      </main>

      {/* ── Full Page Sections (Navbar Anchor Targets) ── */}
      <About />
      <Experts />
      <ResearchVerticals />
      <Publications />
      <Events />
      <Membership />
      <Fellowships />
      <Insights />
      <MediaPress />
      <Partners />
      <Contact />
      <ScrollToTop />
    </>
  );
}
