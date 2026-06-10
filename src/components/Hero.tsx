"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, UserPlus, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const words = ["Research", "Policy", "Impact", "Action"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Bihar Map Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
        <img
          src="/bihar-map.svg"
          alt=""
          aria-hidden="true"
          className="w-full max-w-[900px] h-auto object-contain"
          style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(100deg) brightness(1.5)" }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-secondary/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 text-brand-primary font-mono text-xs mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          ESTABLISHED 2024 &nbsp;·&nbsp; PATNA, BIHAR
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold font-mono tracking-tighter mb-6 text-white leading-none"
        >
          Nav Bihar{" "}
          <br className="hidden sm:block" />
          <span className="glow-text text-brand-primary">Renaissance</span>
          <br className="hidden sm:block" />
          Foundation
        </motion.h1>

        {/* Animated rotating word */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-2xl text-muted font-sans mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          Bihar&apos;s pioneering think tank driving development through{" "}
          <span
            className="text-brand-primary font-mono font-bold transition-all duration-400"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
          >
            {words[wordIndex]}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm md:text-base text-muted/70 font-sans mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We identify developmental gaps across Bihar&apos;s social, economic, and cultural sectors — and provide data-driven recommendations to policymakers, institutions, and stakeholders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center items-center mb-20"
        >
          <Link href="#about" className="tech-button-primary flex items-center gap-2 rounded-full px-8">
            <BookOpen className="w-4 h-4" />
            About NBRF
          </Link>
          <Link href="#research" className="tech-button flex items-center gap-2 rounded-full px-8">
            <FileText className="w-4 h-4" />
            Research Areas
          </Link>
          <Link href="#memberships" className="tech-button flex items-center gap-2 rounded-full px-8">
            <UserPlus className="w-4 h-4" />
            Join Us
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full"
        >
          {[
            { label: "Districts Focused", value: "38", sub: "across Bihar" },
            { label: "Research Verticals", value: "10", sub: "core pillars" },
            { label: "Directors", value: "5", sub: "founding board" },
            { label: "Founded", value: "2024", sub: "Patna, Bihar" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="tech-card p-5 text-center group hover:border-brand-primary/50 transition-all"
            >
              <div className="text-3xl md:text-4xl font-mono font-bold text-brand-primary glow-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white font-mono uppercase tracking-widest mb-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-muted font-sans">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted z-10"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
