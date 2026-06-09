"use client";

import { motion } from "framer-motion";
import { Landmark, Wheat, GraduationCap, HeartPulse, TrendingUp, Leaf, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ResearchCentres() {
  const plannedCentres = [
    {
      id: "governance",
      name: "Centre for Governance & Public Policy",
      icon: Landmark,
      description: "Dedicated to administrative reform, accountability, and improving public service delivery across Bihar&apos;s governance structures.",
      colSpan: "md:col-span-2",
      color: "text-brand-primary",
      glow: "group-hover:border-brand-primary",
    },
    {
      id: "agriculture",
      name: "Centre for Agriculture & Rural Economy",
      icon: Wheat,
      description: "Focusing on Bihar&apos;s agrarian economy — crop policy, irrigation, farmer welfare, and rural livelihood strategies.",
      colSpan: "md:col-span-1",
      color: "text-brand-secondary",
      glow: "group-hover:border-brand-secondary",
    },
    {
      id: "education",
      name: "Centre for Education & Skill Development",
      icon: GraduationCap,
      description: "Researching literacy gaps, school infrastructure, and skilling pathways aligned to Bihar&apos;s workforce demands.",
      colSpan: "md:col-span-1",
      color: "text-brand-accent",
      glow: "group-hover:border-brand-accent",
    },
    {
      id: "health",
      name: "Centre for Public Health & Social Welfare",
      icon: HeartPulse,
      description: "Studying healthcare access in underserved districts, maternal health, nutrition policy, and social protection.",
      colSpan: "md:col-span-1",
      color: "text-brand-primary",
      glow: "group-hover:border-brand-primary",
    },
    {
      id: "economy",
      name: "Centre for Economic Development & MSME",
      icon: TrendingUp,
      description: "Mapping micro-enterprise ecosystems and designing strategies for sustainable economic growth across Bihar.",
      colSpan: "md:col-span-1",
      color: "text-brand-secondary",
      glow: "group-hover:border-brand-secondary",
    },
    {
      id: "climate",
      name: "Centre for Environment & Climate Resilience",
      icon: Leaf,
      description: "Addressing Bihar&apos;s annual floods, groundwater depletion, and long-term climate adaptation policy needs.",
      colSpan: "md:col-span-1",
      color: "text-brand-accent",
      glow: "group-hover:border-brand-accent",
    },
  ];

  return (
    <section id="initiatives" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-background/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
            >
              CENTRES // PLANNED
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-mono font-bold text-white glow-text"
            >
              CENTERS & INITIATIVES
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted font-sans text-sm max-w-sm text-right"
          >
            These centres are in the planning phase. We are seeking domain experts and institutional partners to co-found each centre.
          </motion.p>
        </div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plannedCentres.map((centre, i) => (
            <motion.div
              key={centre.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`tech-card p-8 group relative overflow-hidden flex flex-col justify-between min-h-[280px] ${centre.colSpan} border border-border transition-all duration-300 ${centre.glow} hover:-translate-y-1`}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-border group-hover:border-brand-primary transition-colors" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-border group-hover:border-brand-primary transition-colors" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center mb-6 group-hover:bg-background transition-colors">
                  <centre.icon className={`w-6 h-6 ${centre.color}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-mono font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">
                  {centre.name}
                </h3>
                <p className="text-muted font-sans text-sm md:text-base leading-relaxed">
                  {centre.description}
                </p>
              </div>

              <div className="mt-8 flex justify-between items-center relative z-10 border-t border-border pt-4">
                <span className="font-mono text-xs text-muted border border-border px-2 py-0.5 rounded">PLANNING PHASE</span>
                <Link href="#contact" className={`font-mono text-xs ${centre.color} flex items-center gap-1 hover:underline`}>
                  Partner With Us <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-card p-8 border-brand-primary/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div>
            <h3 className="font-mono font-bold text-white text-lg mb-1">Help Co-Found a Research Centre</h3>
            <p className="text-muted text-sm font-sans">Are you a domain expert, academic institution, or NGO? Partner with NBRF to establish one of these research centres.</p>
          </div>
          <Link href="#contact" className="tech-button-primary shrink-0 inline-flex items-center gap-2">
            <Mail className="w-4 h-4" /> Become a Partner
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
