
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experts from "@/components/Experts";
import ResearchVerticals from "@/components/ResearchVerticals";
import Publications from "@/components/Publications";
import PolicyBriefs from "@/components/PolicyBriefs";
import DataLab from "@/components/DataLab";
import Events from "@/components/Events";
import ResearchCentres from "@/components/ResearchCentres";
import Fellowships from "@/components/Fellowships";
import Insights from "@/components/Insights";
import Partners from "@/components/Partners";
import MediaPress from "@/components/MediaPress";
import AiAssistant from "@/components/AiAssistant";
import Newsletter from "@/components/Newsletter";
import Membership from "@/components/Membership";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-white">

      <Hero />
      <About />
      <Experts />
      <ResearchVerticals />
      <Publications />
      <PolicyBriefs />
      <DataLab />
      <Events />
      <ResearchCentres />
      <Fellowships />
      <Insights />
      <Partners />
      <MediaPress />
      <AiAssistant />
      <Membership />
      <Contact />
      <Newsletter />
      <ScrollToTop />

    </main>
  );
}
