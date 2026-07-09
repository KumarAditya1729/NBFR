"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-16 border-brand-primary/30 relative"
        >
          <div className="w-16 h-16 bg-surface border border-brand-primary/50 rounded-md flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Mail className="w-8 h-8 text-brand-primary" aria-hidden="true" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-4 glow-text">
            STAY INFORMED
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto font-sans">
            Subscribe to receive NBRF&apos;s latest research updates, policy recommendations, event announcements, and opportunities to engage with Bihar&apos;s development agenda.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input 
              id="newsletter-email"
              type="email" 
              placeholder="Enter your email address..." 
              className="flex-grow px-6 py-4 rounded bg-[#0A0A0A] border border-border focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary font-mono text-sm text-brand-primary"
              required
            />
            <button 
              type="submit" 
              className="tech-button-primary shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
          
          <p className="text-xs text-muted mt-6 font-mono">
            BY SUBSCRIBING, YOU AGREE TO RECEIVE UPDATES FROM NBRF. UNSUBSCRIBE ANYTIME.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
