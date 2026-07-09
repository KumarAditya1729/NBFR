"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Discover Bihar", href: "/bihar" },
  { name: "Research", href: "/#research" },
  { name: "Publications", href: "/#publications" },
  { name: "Events", href: "/#events" },
  { name: "Membership", href: "/#memberships" },
  { name: "Initiatives", href: "/#initiatives" },
  { name: "Insights", href: "/#insights" },
  { name: "Media", href: "/#media" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 rounded-full px-4 transition-all duration-300 ${
          scrolled 
            ? 'glass-panel' 
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-md group"
              aria-label="NBRF Home"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-brand-primary/30 group-hover:border-brand-primary group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all overflow-hidden p-1 shrink-0">
                <Image src="/logo.png" alt="NBRF Logo" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-mono font-bold text-lg leading-none tracking-tight text-foreground group-hover:text-brand-primary transition-colors">
                  NBRF
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted font-mono mt-0.5">
                  Think Tank
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-foreground hover:text-brand-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-sm py-1 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-all"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
            <Link
              href="#contact"
              className="tech-button py-2 px-4 text-xs"
              aria-label="Contact Us"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-full left-2 right-2 sm:left-4 sm:right-4 mt-2 max-h-[80vh] overflow-y-auto z-[60]"
          >
            <div className="tech-card bg-white backdrop-blur-xl p-4 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-semibold text-foreground hover:text-brand-primary py-3 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link 
                  href="#contact"
                  className="tech-button-primary w-full text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
