"use client";

import { motion } from "framer-motion";
import { FileText, Mail, ChevronRight, Landmark, Wheat, GraduationCap, HeartPulse, TrendingUp, Leaf } from "lucide-react";
import Link from "next/link";

export default function PolicyBriefs() {
  const upcomingBriefs = [
    { icon: Landmark, color: "text-brand-secondary", title: "Governance Reform", desc: "Administrative accountability and service delivery in Bihar." },
    { icon: Wheat, color: "text-brand-primary", title: "Agriculture Policy", desc: "Crop diversification, irrigation, and farmer income security." },
    { icon: GraduationCap, color: "text-brand-accent", title: "Education & Literacy", desc: "School infrastructure reform and skill development strategies." },
    { icon: HeartPulse, color: "text-brand-secondary", title: "Public Health", desc: "Healthcare access and maternal health in underserved districts." },
    { icon: TrendingUp, color: "text-brand-primary", title: "Economic Development", desc: "MSME growth, livelihood generation, and investment policy." },
    { icon: Leaf, color: "text-brand-accent", title: "Climate & Environment", desc: "Flood resilience, groundwater policy, and climate adaptation." },
  ];

  return (
    <section id="policy" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            POLICY // BRIEFS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-white glow-text-blue mb-6"
          >
            POLICY BRIEFS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            Our policy briefs are currently being developed. As a newly founded think tank, we are building a rigorous research pipeline rooted in Bihar&apos;s real challenges.
          </motion.p>
        </div>

        {/* Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-14 border-brand-secondary/30 relative overflow-hidden mb-12 text-center"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-brand-secondary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-4">
              Help Shape Bihar&apos;s Policy Agenda
            </h3>
            <p className="text-muted text-lg font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              NBRF is actively seeking policy experts, researchers, and administrators who can contribute briefs on Bihar&apos;s development priorities. Your expertise can directly influence government policy and public discourse.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Contribute a Brief
              </Link>
              <Link href="#memberships" className="tech-button inline-flex items-center gap-2 border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary/10 hover:border-brand-secondary">
                Join Our Research Network <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Topics Grid */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-mono text-muted uppercase tracking-widest mb-8"
        >
          — Planned Policy Brief Topics —
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingBriefs.map((brief, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="tech-card p-6 flex items-start gap-4 group hover:-translate-y-1 transition-all duration-300 hover:border-brand-secondary/50"
            >
              <div className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-brand-secondary/50 transition-all">
                <brief.icon className={`w-5 h-5 ${brief.color}`} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-white mb-1 text-sm group-hover:text-brand-secondary transition-colors">
                  {brief.title}
                </h4>
                <p className="text-muted text-xs font-sans leading-relaxed">{brief.desc}</p>
                <span className="inline-block mt-3 text-[10px] font-mono text-muted border border-border px-2 py-0.5 rounded">
                  COMING SOON
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
