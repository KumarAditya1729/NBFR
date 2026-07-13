"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Globe, Briefcase, Handshake, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Partners() {
  const partnerTypes = [
    {
      icon: GraduationCap,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      title: "Universities & Academic Institutions",
      desc: "Partner on joint research, field studies, and publish collaborative findings.",
    },
    {
      icon: Building2,
      color: "text-brand-secondary",
      border: "hover:border-brand-secondary/50",
      title: "Government Bodies",
      desc: "Work alongside Bihar's state departments to translate research into actionable policy.",
    },
    {
      icon: Briefcase,
      color: "text-brand-accent",
      border: "hover:border-brand-accent/50",
      title: "NGOs & Civil Society",
      desc: "Collaborate on ground-level research and social development initiatives across districts.",
    },
    {
      icon: Globe,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      title: "International Organisations",
      desc: "Engage with global development bodies, embassies, and international research networks.",
    },
    {
      icon: Handshake,
      color: "text-brand-secondary",
      border: "hover:border-brand-secondary/50",
      title: "Industry & Corporates",
      desc: "Channel CSR and strategic partnerships toward Bihar's development ecosystem.",
    },
  ];

  return (
    <section id="partners" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            PARTNERSHIPS // OPEN
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6 glow-text-blue"
          >
            PARTNER WITH NBRF
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            As a newly founded think tank, NBRF is actively building its partnership ecosystem. We welcome institutions, organisations, and individuals who share our vision for Bihar&apos;s renaissance.
          </motion.p>
        </div>

        {/* Partner Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {partnerTypes.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`tech-card p-7 flex items-start gap-4 group border border-border transition-all duration-300 ${type.border} hover:-translate-y-1`}
            >
              <div className="w-11 h-11 rounded bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-current transition-all">
                <type.icon className={`w-5 h-5 ${type.color}`} />
              </div>
              <div>
                <h3 className={`font-mono font-bold text-brand-primary mb-2 text-sm group-hover:${type.color} transition-colors`}>
                  {type.title}
                </h3>
                <p className="text-muted text-xs font-sans leading-relaxed">{type.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Become a Partner CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="tech-card p-7 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-brand-primary/40 hover:border-brand-primary transition-colors bg-brand-primary/5"
          >
            <Handshake className="w-8 h-8 text-brand-primary" />
            <div>
              <h3 className="font-mono font-bold text-brand-primary mb-2 text-sm">Become a Partner</h3>
              <p className="text-muted text-xs font-sans leading-relaxed">Interested in collaborating? Reach out and let&apos;s build Bihar&apos;s future together.</p>
            </div>
            <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2 text-xs py-2 px-4">
              <Mail className="w-3 h-3" /> Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border rounded p-6 bg-surface/50"
        >
          <div>
            <p className="font-mono font-bold text-brand-primary text-sm">No partners listed yet — be our first.</p>
            <p className="text-muted text-xs font-sans mt-1">NBRF is actively building its partner network. Your organisation could be one of our founding partners.</p>
          </div>
          <Link href="#contact" className="tech-button shrink-0 inline-flex items-center gap-2 border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary/10 hover:border-brand-secondary">
            Partner With Us <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
