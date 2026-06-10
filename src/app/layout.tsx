import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
    <html lang="en" className="scroll-smooth dark overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
