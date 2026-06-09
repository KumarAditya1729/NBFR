"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Research", href: "#research" },
  { name: "Publications", href: "#publications" },
  { name: "Events", href: "#events" },
  { name: "Membership", href: "#memberships" },
  { name: "Initiatives", href: "#initiatives" },
  { name: "Insights", href: "#insights" },
  { name: "Media", href: "#media" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <div className={`flex justify-between items-center h-16 rounded-xl px-4 transition-all duration-300 ${
          scrolled 
            ? 'bg-surface/80 backdrop-blur-md border border-border shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-md group"
              aria-label="NBRF Home"
            >
              <div className="h-10 w-40 bg-white rounded overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="NBRF Logo" 
                  width={160} 
                  height={40} 
                  className="w-full h-full object-cover scale-[1.1]" 
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-mono text-muted hover:text-white hover:glow-text transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-sm py-1"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#contact"
              className="tech-button py-2 px-4 text-xs"
              aria-label="Contact Us"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-muted hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-md"
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
            className="lg:hidden absolute top-full left-4 right-4 mt-2 max-h-[80vh] overflow-y-auto"
          >
            <div className="tech-card p-4 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-mono text-muted hover:text-brand-primary py-3 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary rounded-md"
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
