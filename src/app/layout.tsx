import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import GrowingVines from "@/components/GrowingVines";
import DataPulseTicker from "@/components/DataPulseTicker";
import BiharSplashScreen from "@/components/BiharSplashScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NBRF — Nav Bihar Renaissance Foundation",
    template: "%s | NBRF",
  },
  description:
    "Bihar's pioneering think tank driving development through Research, Policy, Impact, and Action across all 38 districts.",
  keywords: [
    "NBRF",
    "Nav Bihar Renaissance Foundation",
    "Bihar think tank",
    "Bihar policy",
    "Bihar research",
    "Patna",
    "Bihar development",
  ],
  authors: [{ name: "NBRF" }],
  creator: "Nav Bihar Renaissance Foundation",
  metadataBase: new URL("https://nbrf.in"),
  openGraph: {
    title: "NBRF — Nav Bihar Renaissance Foundation",
    description:
      "Bihar's pioneering think tank driving development through Research, Policy, Impact, and Action.",
    url: "https://nbrf.in",
    siteName: "NBRF",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NBRF — Nav Bihar Renaissance Foundation",
    description:
      "Bihar's pioneering think tank driving development through Research, Policy, Impact, and Action.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nav Bihar Renaissance Foundation (NBRF)",
  alternateName: "NBRF",
  url: "https://nbrf.in",
  logo: "https://nbrf.in/icon.png",
  description:
    "Bihar's pioneering policy think tank driving socioeconomic transformation through empirical field research, governance advisory, and data-driven development.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/nbrfindia",
    "https://linkedin.com/company/nbrf",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
