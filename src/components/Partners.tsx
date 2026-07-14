"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Globe, Briefcase, Handshake, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Partners({ partners: partnersProp }: { partners?: any[] } = {}) {
  const defaultPartnerTypes = [
    {
      icon: GraduationCap,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      title: "Universities & Academic Institutions",
      desc: "Partner on joint research, field studies, and publish collaborative findings.",
    },
    {
      icon: Building2,
      color: "text-brand-accent",
      border: "hover:border-brand-accent/50",
      title: "Government Bodies",
      desc: "Work alongside Bihar's state departments to translate research into actionable policy.",
    },
    {
      icon: Briefcase,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      title: "NGOs & Civil Society",
      desc: "Collaborate on ground-level research and social development initiatives across districts.",
    },
    {
      icon: Globe,
      color: "text-brand-accent",
      border: "hover:border-brand-accent/50",
      title: "International Organisations",
      desc: "Engage with global development bodies, embassies, and international research networks.",
    },
  ];

  const displayPartners = (partnersProp && partnersProp.length > 0) ? partnersProp : [
    {
      name: "Indian Council of Agricultural Research (ICAR)",
      tier: "INSTITUTIONAL",
      description: "Official endorsement and advisory collaboration on commercial goat farming and rural livelihood models.",
      websiteUrl: "https://icar.org.in"
    },
    {
      name: "Microfinance Institutions Network (MFIN)",
      tier: "STRATEGIC",
      description: "Policy coordination and research on microcredit, rural self-help groups, and financial inclusion.",
      websiteUrl: "https://mfinindia.org"
    },
    {
      name: "Ministry of MSME Taskforce Network",
      tier: "GOVERNMENT",
      description: "Collaborative framework recommendations for small and medium rural enterprises across Bihar.",
    }
  ];

  return (
    <section id="partners" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            PARTNERSHIPS // COLLABORATORS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            PARTNER & COLLABORATOR NETWORK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            NBRF works alongside premier research councils, self-regulatory financial networks, and government task forces to advance sustainable policy in Bihar.
          </motion.p>
        </div>

        {/* Confirmed Partners Grid */}
        <div className="mb-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            Confirmed & Endorsing Collaborators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPartners.map((part, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="tech-card p-6 flex flex-col justify-between border border-border/80 hover:border-brand-primary/50 bg-background/60 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono uppercase bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-2.5 py-0.5 rounded">
                      {part.tier || "PARTNER"}
                    </span>
                  </div>
                  <h4 className="font-mono font-bold text-base text-foreground mb-2">
                    {part.name}
                  </h4>
                  <p className="text-xs text-muted font-sans leading-relaxed">
                    {part.description}
                  </p>
                </div>
                {part.websiteUrl && (
                  <a
                    href={part.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-primary hover:underline mt-4 pt-3 border-t border-border/40"
                  >
                    Visit Official Web Portal →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {defaultPartnerTypes.map((type, i) => (
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
            <p className="font-mono font-bold text-brand-primary text-sm">Partner with NBRF across any of Bihar&apos;s 38 districts.</p>
            <p className="text-muted text-xs font-sans mt-1">We are expanding institutional linkages with academic universities, state boards, and policy research institutes.</p>
          </div>
          <Link href="#contact" className="tech-button shrink-0 inline-flex items-center gap-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary">
            Partner With Us <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
