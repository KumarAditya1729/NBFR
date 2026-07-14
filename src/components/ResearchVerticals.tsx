"use client";

import { motion } from "framer-motion";
import {
  Wheat,
  Landmark,
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Compass,
  Building2,
  Users,
  Leaf,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function ResearchVerticals({ verticals: verticalsProp }: { verticals?: any[] } = {}) {
  const defaultVerticals = [
    {
      name: "Governance & Public Administration",
      desc: "Strengthening democratic institutions, administrative accountability, and service delivery reform across Bihar's 38 districts.",
      icon: Landmark,
      color: "text-brand-primary",
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      border: "group-hover:border-brand-primary",
    },
    {
      name: "Agriculture & Rural Economy",
      desc: "Transforming Bihar's agrarian backbone through crop diversification, irrigation policy, and farmer income security frameworks.",
      icon: Wheat,
      color: "text-brand-secondary",
      glow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
      border: "group-hover:border-brand-secondary",
    },
    {
      name: "Education & Skill Development",
      desc: "Bridging literacy gaps, reforming school infrastructure, and aligning higher education with Bihar's workforce needs.",
      icon: GraduationCap,
      color: "text-brand-accent",
      glow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
      border: "group-hover:border-brand-accent",
    },
    {
      name: "Public Health & Social Welfare",
      desc: "Researching healthcare access in underserved regions, maternal health, nutrition policy, and social protection systems.",
      icon: HeartPulse,
      color: "text-brand-primary",
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      border: "group-hover:border-brand-primary",
    },
    {
      name: "Economy, MSME & Livelihood",
      desc: "Mapping micro-enterprise ecosystems, enabling MSME growth, and designing strategies for sustainable livelihood generation.",
      icon: TrendingUp,
      color: "text-brand-secondary",
      glow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
      border: "group-hover:border-brand-secondary",
    },
    {
      name: "Migration & Labour Policy",
      desc: "Addressing Bihar's large-scale migration through data-driven labour policy, diaspora engagement, and remittance economics.",
      icon: Compass,
      color: "text-brand-accent",
      glow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
      border: "group-hover:border-brand-accent",
    },
    {
      name: "Infrastructure & Urban Development",
      desc: "Evaluating gaps in roads, power, water, and housing — and proposing investment-ready frameworks for urban-rural connectivity.",
      icon: Building2,
      color: "text-brand-primary",
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      border: "group-hover:border-brand-primary",
    },
    {
      name: "Social Justice & Inclusion",
      desc: "Championing policy equity for SC/ST communities, women, minorities, and persons with disabilities across Bihar.",
      icon: Users,
      color: "text-brand-secondary",
      glow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
      border: "group-hover:border-brand-secondary",
    },
    {
      name: "Environment & Climate Resilience",
      desc: "Studying the impact of annual floods, groundwater depletion, and forest cover loss — and crafting long-term climate adaptation policies.",
      icon: Leaf,
      color: "text-brand-accent",
      glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
      border: "group-hover:border-brand-accent",
    },
  ];

  const iconsList = [Landmark, Wheat, GraduationCap, HeartPulse, TrendingUp, Building2, Users, Leaf, Globe, Compass];
  const displayVerticals = (verticalsProp && verticalsProp.length > 0)
    ? verticalsProp.map((v, idx) => ({
        name: v.title || v.name || "Research Vertical",
        desc: v.description || v.desc || "",
        icon: iconsList[idx % iconsList.length],
        color: idx % 2 === 0 ? "text-brand-primary" : "text-brand-accent",
        glow: idx % 2 === 0 ? "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]" : "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
        border: idx % 2 === 0 ? "group-hover:border-brand-primary" : "group-hover:border-brand-accent",
      }))
    : defaultVerticals;

  return (
    <section id="research" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            RESEARCH // DOMAINS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            RESEARCH VERTICALS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-3xl mx-auto"
          >
            Nav Bihar Renaissance Foundation focuses its intellectual resources on eight core domains — producing data-driven research to inform governance and public policy across Bihar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayVerticals.map((vertical, i) => {
            const IconComp = vertical.icon || Landmark;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href="#publications"
                  className={`tech-card p-7 flex flex-col h-full group hover:-translate-y-1.5 transition-all duration-300 ${vertical.glow} ${vertical.border}`}
                >
                  <div className={`w-12 h-12 rounded bg-background border border-border flex items-center justify-center mb-5 ${vertical.border} transition-all duration-300`}>
                    <IconComp className={`w-6 h-6 ${vertical.color}`} />
                  </div>
                  <h3 className={`text-base font-mono font-bold text-brand-primary mb-3 group-hover:${vertical.color} transition-colors leading-snug`}>
                    {vertical.name}
                  </h3>
                  <p className="text-muted text-xs font-sans leading-relaxed flex-grow">
                    {vertical.desc}
                  </p>
                  <div className={`mt-5 text-[10px] font-mono ${vertical.color} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    EXPLORE RESEARCH →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="#publications" className="tech-button-primary inline-flex items-center gap-2">
            View All Publications
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
