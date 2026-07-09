"use client";

import { motion } from "framer-motion";
import { UserPlus, FileText, Users, Network, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Membership() {
  const benefits = [
    {
      icon: FileText,
      text: "Gain access to our exclusive research reports and publications."
    },
    {
      icon: Users,
      text: "Be invited to our internal meetings and workshops."
    },
    {
      icon: Network,
      text: "Network with fellow members and collaborate on research projects."
    },
    {
      icon: ShieldCheck,
      text: "Contribute to shaping policy discussions and recommendations on key issues of Bihar."
    }
  ];

  return (
    <section id="memberships" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      {/* Bodhi Tree Background Watermark */}
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.05] w-[380px]">
        <Image
          src="/bodhi-tree.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-accent/30 bg-brand-accent/10 text-brand-accent font-mono text-[10px] uppercase tracking-widest mb-6"
            >
              JOIN // NBRF
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
            >
              WANT TO CONTRIBUTE TO THE DEVELOPMENT OF BIHAR?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted text-base md:text-lg font-sans mb-6 leading-relaxed"
            >
              As we embark on this new journey, the Nav Bihar Renaissance Foundation (NBRF) is eager to build a robust community of thought leaders, professionals, and academics who are passionate about contributing to meaningful research and policy formulation for the betterment of Bihar.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted text-base md:text-lg font-sans mb-8 leading-relaxed"
            >
              We believe that by becoming an official member of NBRF, you can play a crucial role in shaping the direction and impact of our initiatives.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/apply" className="tech-button flex items-center gap-2 w-max text-brand-accent border-brand-accent/30 hover:bg-brand-accent/10 hover:border-brand-accent hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <UserPlus className="w-5 h-5" /> JOIN NBRF
              </Link>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="tech-card p-8 md:p-10 border-brand-accent/20"
            >
              <h3 className="text-xl font-mono font-bold text-brand-primary mb-8 border-b border-border pb-4">
                WHY JOIN NBRF?
              </h3>
              
              <ul className="space-y-6">
                {benefits.map((benefit, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded bg-background border border-border flex items-center justify-center mt-1 group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                      <benefit.icon className="w-5 h-5 text-brand-accent" />
                    </div>
                    <p className="text-muted text-sm md:text-base font-sans pt-1 group-hover:text-brand-primary transition-colors">
                      {benefit.text}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
