"use client";

import { motion } from "framer-motion";
import { Mic, PenTool, MessageSquare, BookOpen, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Insights() {
  const upcomingFormats = [
    {
      icon: PenTool,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      title: "Opinion Articles",
      desc: "Expert analysis from researchers and policymakers on Bihar&apos;s developmental priorities.",
    },
    {
      icon: Mic,
      color: "text-brand-secondary",
      border: "hover:border-brand-secondary/50",
      title: "Podcast Series",
      desc: "Conversations with Bihar&apos;s administrators, academics, and civil society leaders.",
    },
    {
      icon: MessageSquare,
      color: "text-brand-accent",
      border: "hover:border-brand-accent/50",
      title: "Expert Interviews",
      desc: "In-depth Q&A sessions with domain specialists across Bihar&apos;s key development sectors.",
    },
    {
      icon: BookOpen,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      title: "Research Blogs",
      desc: "Accessible write-ups translating complex research findings into public-friendly narratives.",
    },
  ];

  return (
    <section id="insights" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            INSIGHTS // MEDIA
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-white glow-text mb-6"
          >
            INSIGHTS & ARTICLES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            Our insights platform is being built. We invite writers, researchers, and public intellectuals to contribute their perspectives on Bihar&apos;s development.
          </motion.p>
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-14 border-brand-primary/30 relative overflow-hidden mb-12 text-center"
        >
          <div className="absolute top-0 right-0 w-56 h-56 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mx-auto mb-6">
              <PenTool className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-4">
              Write for NBRF
            </h3>
            <p className="text-muted text-lg font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              Do you have an informed perspective on Bihar&apos;s governance, development, or social issues? NBRF welcomes opinion pieces, research blogs, and interviews from experts and engaged citizens alike.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Submit Your Article
              </Link>
              <Link href="#memberships" className="tech-button inline-flex items-center gap-2">
                Join as Contributor <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Content Formats */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-mono text-muted uppercase tracking-widest mb-8"
        >
          — Planned Content Formats —
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {upcomingFormats.map((format, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`tech-card p-6 flex flex-col gap-4 group border border-border transition-all duration-300 ${format.border} hover:-translate-y-1`}
            >
              <div className="w-11 h-11 rounded bg-background border border-border flex items-center justify-center group-hover:border-current transition-all">
                <format.icon className={`w-5 h-5 ${format.color}`} />
              </div>
              <div>
                <h4 className={`font-mono font-bold text-white mb-2 text-sm group-hover:${format.color} transition-colors`}>
                  {format.title}
                </h4>
                <p className="text-muted text-xs font-sans leading-relaxed">{format.desc}</p>
              </div>
              <span className="inline-block mt-auto text-[10px] font-mono text-muted border border-border px-2 py-0.5 rounded w-fit">
                COMING SOON
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
