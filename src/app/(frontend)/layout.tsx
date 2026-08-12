import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrowingVines from "@/components/GrowingVines";
import DataPulseTicker from "@/components/DataPulseTicker";
import BiharSplashScreen from "@/components/BiharSplashScreen";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-brand-primary text-white font-mono font-bold px-4 py-2.5 rounded shadow-2xl border border-white/20 focus:outline-none focus:ring-4 focus:ring-brand-accent">
        Skip to main content
      </a>
      <GrowingVines />
      <BiharSplashScreen />
      <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
        <Navbar />
        <DataPulseTicker />
        <div id="main-content" className="flex-grow pt-[128px] lg:pt-[160px] focus:outline-none" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
