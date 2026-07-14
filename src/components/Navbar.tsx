"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import GlobalSearchClient from "@/components/search/GlobalSearchClient";

// ── Nav structure ─────────────────────────────────────────────────────────────
const PRIMARY_LINKS = [
  { name: "Home",          href: "/" },
  { name: "About",         href: "/#about" },
  { name: "Discover Bihar",href: "/bihar" },
  { name: "Research",      href: "/#research" },
  { name: "Publications",  href: "/publications" },
  { name: "Impact",        href: "/impact" },
];

const SECONDARY_LINKS = [
  { name: "Events",      href: "/#events" },
  { name: "Membership",  href: "/#memberships" },
  { name: "Initiatives", href: "/#initiatives" },
  { name: "Insights",    href: "/#insights" },
  { name: "Media",       href: "/#media" },
];

const ALL_LINKS = [...PRIMARY_LINKS, ...SECONDARY_LINKS];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const { theme, setTheme }                 = useTheme();
  const [mounted, setMounted]               = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchModalOpen(p => !p); }
      if (e.key === "Escape" && searchModalOpen) setSearchModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchModalOpen]);

  return (
    <nav aria-label="Main institutional navigation" className="fixed top-0 left-0 right-0 z-50">

      {/* ── DESKTOP NAV (two-row pill) ─────────────────────────────────────── */}
      <div className="hidden lg:block">
        <div className={`transition-all duration-300 ${scrolled ? "pt-2" : "pt-3"}`}>
          <div className="max-w-[1400px] mx-auto px-6">

            {/* Outer pill */}
            <div className={`rounded-2xl transition-all duration-300 ${
              scrolled ? "glass-panel shadow-lg" : "bg-background/80 backdrop-blur-md border border-border/40"
            }`}>

              {/* ── ROW 1: Logo · Search · Theme · Contact ── */}
              <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/30">

                {/* Logo */}
                <Link
                  href="/"
                  className="flex items-center gap-3 group rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                  aria-label="NBRF Home"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-brand-primary/30 group-hover:border-brand-primary group-hover:shadow-[0_0_14px_rgba(16,185,129,0.35)] transition-all overflow-hidden p-1 shrink-0">
                    <Image src="/logo.png" alt="NBRF Logo" width={36} height={36} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-base leading-none tracking-tight text-foreground group-hover:text-brand-primary transition-colors">NBRF</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted font-mono mt-0.5">Think Tank</span>
                  </div>
                </Link>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <button
                    onClick={() => setSearchModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-surface/60 hover:border-brand-primary text-xs font-mono text-muted hover:text-foreground transition-all shadow-sm"
                    title="Search (⌘K)"
                  >
                    <Search className="w-3.5 h-3.5 text-brand-primary" />
                    <span className="hidden xl:inline">Search</span>
                    <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-surface border border-border text-muted hidden xl:inline">⌘K</kbd>
                  </button>

                  {/* Theme */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-all"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {theme === "dark" ? (
                          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Sun className="w-3.5 h-3.5" />
                          </motion.div>
                        ) : (
                          <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Moon className="w-3.5 h-3.5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  )}

                  {/* Contact CTA */}
                  <Link href="#contact" className="tech-button-primary py-1.5 px-5 text-xs font-mono">
                    Contact
                  </Link>
                </div>
              </div>

              {/* ── ROW 2: All nav links centered with divider ── */}
              <div className="flex items-center justify-center gap-0 px-4 py-1.5">
                {/* Primary group */}
                {PRIMARY_LINKS.map((link, i) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-3 py-1.5 text-[11.5px] font-semibold font-mono text-foreground hover:text-brand-primary transition-colors group whitespace-nowrap rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                  >
                    {link.name}
                    <span className="absolute bottom-0.5 left-3 right-3 h-[1.5px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </Link>
                ))}

                {/* Divider */}
                <div className="w-px h-4 bg-border/60 mx-2 shrink-0" aria-hidden="true" />

                {/* Secondary group */}
                {SECONDARY_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-3 py-1.5 text-[11.5px] font-semibold font-mono text-muted hover:text-brand-primary transition-colors group whitespace-nowrap rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                  >
                    {link.name}
                    <span className="absolute bottom-0.5 left-3 right-3 h-[1.5px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET NAV (single row pill) ─────────────────────────── */}
      <div className="lg:hidden">
        <div className={`transition-all duration-300 ${scrolled ? "pt-2" : "pt-3"}`}>
          <div className="mx-3 sm:mx-4">
            <div className={`flex items-center justify-between h-14 px-4 rounded-2xl transition-all duration-300 ${
              scrolled ? "glass-panel shadow-lg" : "bg-background/85 backdrop-blur-md border border-border/40"
            }`}>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group rounded-md" aria-label="NBRF Home">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-brand-primary/30 overflow-hidden p-1 shrink-0">
                  <Image src="/logo.png" alt="NBRF Logo" width={32} height={32} className="w-full h-full object-contain" />
                </div>
                <span className="font-mono font-bold text-sm text-foreground">NBRF</span>
              </Link>

              {/* Mobile controls */}
              <div className="flex items-center gap-2">
                <button onClick={() => setSearchModalOpen(true)} className="p-2 text-brand-primary" aria-label="Search">
                  <Search className="w-4.5 h-4.5" />
                </button>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    className="p-2 text-muted hover:text-brand-primary transition-colors"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-foreground hover:text-brand-primary rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                  aria-expanded={mobileMenuOpen}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-3 right-3 sm:left-4 sm:right-4 mt-2 z-[60]"
            >
              <div className="tech-card bg-background/98 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-border/60">
                {/* Primary links */}
                <div className="mb-2">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted px-3 mb-1">Main</p>
                  <div className="grid grid-cols-2 gap-1">
                    {PRIMARY_LINKS.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-semibold text-foreground hover:text-brand-primary hover:bg-brand-primary/5 py-2.5 px-3 rounded-lg transition-all"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Divider */}
                <div className="border-t border-border/40 my-2" />
                {/* Secondary links */}
                <div className="mb-3">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted px-3 mb-1">More</p>
                  <div className="grid grid-cols-2 gap-1">
                    {SECONDARY_LINKS.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-semibold text-muted hover:text-brand-primary hover:bg-brand-primary/5 py-2.5 px-3 rounded-lg transition-all"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* CTA */}
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="tech-button-primary w-full text-center block text-sm py-2.5"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── GLOBAL SEARCH MODAL ───────────────────────────────────────────── */}
      <AnimatePresence>
        {searchModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Global Research Search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 lg:p-12 bg-background/80 backdrop-blur-md"
            onClick={() => setSearchModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <GlobalSearchClient isModal={true} onClose={() => setSearchModalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
