import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
  metadataBase: new URL("https://nbrf.org.in"),
  openGraph: {
    title: "NBRF — Nav Bihar Renaissance Foundation",
    description:
      "Bihar's pioneering think tank driving development through Research, Policy, Impact, and Action.",
    url: "https://nbrf.org.in",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand-primary text-brand-primary px-4 py-2 rounded shadow-lg font-mono text-sm">
            Skip to main content
          </a>
          <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-grow pt-20 focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
