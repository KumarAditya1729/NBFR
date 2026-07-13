"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, GraduationCap, Globe } from "lucide-react";
import Link from "next/link";

export default function Fellowships() {
  return (
    <section id="initiatives" className="py-24 bg-background bg-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="tech-card p-8 md:p-16 relative overflow-hidden border-brand-primary/30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-6"
              >
                MEMBERSHIP // OPEN
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6 glow-text"
              >
                MEMBERSHIP PROGRAMS
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted text-lg font-sans mb-8"
              >
                The NBRF Membership Program is a highly selective program for researchers, policymakers, and development professionals committed to Bihar&apos;s growth and governance reform.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/apply" className="tech-button-primary inline-flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  APPLY NOW
                </Link>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, title: "Research Membership", desc: "For researchers and academics advancing Bihar's development agenda." },
                  { icon: UserPlus, title: "Policy Membership", desc: "For mid-career professionals and administrators shaping governance." },
                  { icon: GraduationCap, title: "Student Membership", desc: "Mentorship and engagement for outstanding university students." },
                  { icon: Globe, title: "Visiting Scholar", desc: "Global experts collaborating on Bihar's development research." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-background/50 border border-border p-6 rounded hover:border-brand-primary transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-brand-primary mb-4" />
                    <h4 className="font-mono font-bold text-brand-primary mb-2 text-sm">{item.title}</h4>
                    <p className="text-muted text-xs font-sans">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
