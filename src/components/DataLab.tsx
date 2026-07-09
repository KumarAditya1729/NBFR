"use client";

import { motion } from "framer-motion";
import { BarChart3, Mail, ChevronRight, TrendingUp, Users, FileText, Landmark } from "lucide-react";
import Link from "next/link";

export default function DataLab() {
  const goals = [
    {
      icon: FileText,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      value: "50+",
      label: "Research Papers",
      desc: "Target for Year 1 — across governance, agriculture, health, and economy.",
    },
    {
      icon: Landmark,
      color: "text-brand-secondary",
      border: "hover:border-brand-secondary/50",
      value: "20+",
      label: "Policy Briefs",
      desc: "Actionable policy recommendations to submit to Bihar&apos;s government stakeholders.",
    },
    {
      icon: Users,
      color: "text-brand-accent",
      border: "hover:border-brand-accent/50",
      value: "100+",
      label: "Collaborators",
      desc: "Researchers, academics, and administrators to build our knowledge network.",
    },
    {
      icon: TrendingUp,
      color: "text-brand-primary",
      border: "hover:border-brand-primary/50",
      value: "38",
      label: "Districts Covered",
      desc: "Field research and data collection across all of Bihar&apos;s districts.",
    },
  ];

  return (
    <section id="datalab" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            DATA // INSIGHTS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6 glow-text-blue"
          >
            RESEARCH IMPACT OVERVIEW
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted max-w-2xl mx-auto text-lg font-sans"
          >
            NBRF is at its founding stage. Our impact metrics are aspirational targets we are working toward — with your support, we can achieve them together.
          </motion.p>
        </div>

        {/* Goal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`tech-card p-7 flex flex-col gap-4 border border-border transition-all duration-300 ${goal.border} hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <goal.icon className={`w-6 h-6 ${goal.color}`} />
                <span className="text-[10px] font-mono text-muted border border-border px-2 py-0.5 rounded">TARGET</span>
              </div>
              <div>
                <div className={`text-4xl font-mono font-bold ${goal.color} mb-1`}>{goal.value}</div>
                <div className="text-brand-primary font-mono font-bold text-sm mb-2">{goal.label}</div>
                <p className="text-muted text-xs font-sans leading-relaxed">{goal.desc}</p>
              </div>
              {/* Progress bar - empty, showing potential */}
              <div className="w-full bg-surface border border-border h-1.5 rounded-full overflow-hidden mt-auto">
                <div className={`h-full w-0 rounded-full bg-current ${goal.color} opacity-60`} style={{ width: "5%" }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-14 border-brand-primary/30 relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-56 h-56 bg-brand-primary/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-mono font-bold text-brand-primary mb-4">
              Help Us Build Bihar&apos;s Data Ecosystem
            </h3>
            <p className="text-muted text-lg font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              We are looking for data scientists, field researchers, and development economists to help us collect, analyse, and publish meaningful data on Bihar&apos;s 38 districts. Every data point brings us closer to better policy decisions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Collaborate With Us
              </Link>
              <Link href="#memberships" className="tech-button inline-flex items-center gap-2">
                Join as Data Researcher <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
