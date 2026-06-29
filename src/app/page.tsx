import HomeHero from "@/components/home/HomeHero";
import PublicationsBento from "@/components/home/PublicationsBento";
import InteractiveMapBento from "@/components/home/InteractiveMapBento";
import PolicyDashboard from "@/components/home/PolicyDashboard";
import FocusAreas from "@/components/home/FocusAreas";
import ExpertsBento from "@/components/home/ExpertsBento";
import EventsDataRow from "@/components/home/EventsDataRow";
import NewsImpactRow from "@/components/home/NewsImpactRow";
import PartnersSearchRow from "@/components/home/PartnersSearchRow";

// Full-page sections (anchor targets)
import Hero from "@/components/Hero";
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

            {/* Row 2: Map Full Width */}
            <div className="w-full h-full">
              <InteractiveMapBento />
            </div>

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

          </div>
        </div>
      </main>

      {/* ── Full Page Sections (Navbar Anchor Targets) ── */}
      <About />
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
