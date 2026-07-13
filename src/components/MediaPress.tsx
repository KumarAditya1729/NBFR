"use client";

import { motion } from "framer-motion";
import { Megaphone, Newspaper, Radio, Mail, ChevronRight, Send } from "lucide-react";
import Link from "next/link";

export default function MediaPress() {
  const mediaOpportunities = [
    {
      icon: Megaphone,
      color: "text-brand-accent",
      title: "Press Releases",
      desc: "Official announcements on NBRF's research launches, partnerships, and events — distributed to media outlets on request.",
    },
    {
      icon: Newspaper,
      color: "text-brand-primary",
      title: "Media Coverage",
      desc: "NBRF welcomes journalists and reporters covering Bihar's development, governance, and social policy sectors.",
    },
    {
      icon: Radio,
      color: "text-brand-secondary",
      title: "Media Interviews",
      desc: "Our directors and advisors are available for expert commentary, panel discussions, and broadcast interviews.",
    },
  ];

  return (
    <section id="media" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-accent/30 bg-brand-accent/10 text-brand-accent font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            MEDIA // PRESS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            MEDIA & PRESS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            NBRF is newly established and has no press coverage yet. We welcome media inquiries and are happy to provide expert commentary on Bihar&apos;s development issues.
          </motion.p>
        </div>

        {/* Media Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mediaOpportunities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="tech-card p-7 flex flex-col gap-5 group border border-border hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center group-hover:border-brand-accent/50 transition-all">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-mono font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm font-sans leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Coverage Yet + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-14 border-brand-accent/30 text-center relative overflow-hidden mb-8"
        >
          <div className="absolute top-0 right-0 w-56 h-56 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mx-auto mb-5">
              <Newspaper className="w-7 h-7 text-brand-accent" />
            </div>
            <h3 className="text-2xl font-mono font-bold text-brand-primary mb-4">No Press Coverage Yet</h3>
            <p className="text-muted text-base font-sans max-w-xl mx-auto mb-8 leading-relaxed">
              As a newly founded think tank, NBRF hasn&apos;t featured in the press yet. Are you a journalist covering Bihar&apos;s development, policy, or governance? We&apos;d love to connect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Media Enquiry
              </Link>
              <Link href="#contact" className="tech-button inline-flex items-center gap-2 border-brand-accent/30 text-brand-accent hover:bg-brand-accent/10 hover:border-brand-accent">
                <Send className="w-4 h-4" /> Request Media Kit
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Press Contact Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border rounded p-6 bg-surface/50"
        >
          <div>
            <p className="font-mono font-bold text-brand-primary text-sm">Press & Media Contact</p>
            <p className="text-muted text-xs font-sans mt-1">For interviews, press releases, and media enquiries, reach out to NBRF&apos;s communications team.</p>
          </div>
          <Link href="#contact" className="tech-button shrink-0 inline-flex items-center gap-2 border-brand-accent/30 text-brand-accent hover:bg-brand-accent/10 hover:border-brand-accent">
            Contact Us <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
