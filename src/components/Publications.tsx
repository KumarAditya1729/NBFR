"use client";

import { motion } from "framer-motion";
import { Mail, FileText, Users, ChevronRight, Handshake } from "lucide-react";
import Link from "next/link";

export default function Publications() {
  const upcomingAreas = [
    {
      icon: FileText,
      color: "text-brand-primary",
      border: "group-hover:border-brand-primary",
      bg: "bg-brand-primary/10",
      title: "Policy Briefs",
      desc: "In-depth analysis of Bihar's governance, agriculture, and social development policies.",
    },
    {
      icon: FileText,
      color: "text-brand-secondary",
      border: "group-hover:border-brand-secondary",
      bg: "bg-brand-secondary/10",
      title: "Research Reports",
      desc: "Data-driven reports on economic, educational, and health indicators across Bihar's 38 districts.",
    },
    {
      icon: FileText,
      color: "text-brand-accent",
      border: "group-hover:border-brand-accent",
      bg: "bg-brand-accent/10",
      title: "Working Papers",
      desc: "Collaborative academic papers on migration, rural economy, infrastructure, and social equity.",
    },
    {
      icon: FileText,
      color: "text-brand-primary",
      border: "group-hover:border-brand-primary",
      bg: "bg-brand-primary/10",
      title: "Survey & Field Studies",
      desc: "Ground-level research from Bihar's villages and cities to inform actionable recommendations.",
    },
  ];

  return (
    <section id="publications" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-accent/30 bg-brand-accent/10 text-brand-accent font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            RESEARCH // PUBLICATIONS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            FEATURED RESEARCH
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-3xl mx-auto"
          >
            NBRF is a newly established think tank and our research publications are currently in progress. We are actively building our research team and welcome your collaboration.
          </motion.p>
        </div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-14 border-brand-accent/30 relative overflow-hidden mb-12 text-center"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-brand-accent" />
            </div>

            <h3 className="text-2xl md:text-4xl font-mono font-bold text-brand-primary mb-4">
              We Need Your Cooperation
            </h3>
            <p className="text-muted text-lg font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              As a newly founded think tank, NBRF is in the process of building its first body of research. We invite researchers, academics, policymakers, and domain experts to collaborate with us in shaping Bihar&apos;s development narrative.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Partner With Us
              </Link>
              <Link href="#memberships" className="tech-button inline-flex items-center gap-2">
                <Users className="w-4 h-4" /> Join as Researcher
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Publication Types */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs font-mono text-muted uppercase tracking-widest mb-8"
          >
            — Upcoming Publication Categories —
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingAreas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`tech-card p-6 flex flex-col gap-4 group border border-border transition-all duration-300 ${area.border} hover:-translate-y-1`}
              >
                <div className={`w-10 h-10 rounded ${area.bg} border border-border flex items-center justify-center ${area.border} transition-all`}>
                  <area.icon className={`w-5 h-5 ${area.color}`} />
                </div>
                <div>
                  <h4 className={`font-mono font-bold text-brand-primary mb-2 group-hover:${area.color} transition-colors`}>
                    {area.title}
                  </h4>
                  <p className="text-muted text-xs font-sans leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border rounded p-6 bg-surface/50"
        >
          <div>
            <p className="font-mono font-bold text-brand-primary text-sm">Are you a researcher or policy expert?</p>
            <p className="text-muted text-xs font-sans mt-1">Contribute your work and help build Bihar&apos;s research ecosystem.</p>
          </div>
          <Link
            href="#contact"
            className="tech-button shrink-0 flex items-center gap-2 text-brand-accent border-brand-accent/30 hover:bg-brand-accent/10 hover:border-brand-accent"
          >
            Submit Your Research <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
