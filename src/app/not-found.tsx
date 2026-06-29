"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft, Map, BookOpen, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Bihar map watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.04] pointer-events-none">
        <Image src="/bihar-map.svg" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-full border-2 border-brand-primary/30 overflow-hidden bg-surface">
            <Image src="/logo.png" alt="NBRF" width={64} height={64} className="object-cover w-full h-full" />
          </div>
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[120px] sm:text-[160px] font-mono font-bold leading-none text-brand-primary/20 glow-text select-none"
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="-mt-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-6">
            Page Not Found
          </div>

          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-brand-primary mb-4">
            This page doesn&apos;t exist
          </h1>
          <p className="text-muted font-sans text-sm sm:text-base leading-relaxed mb-10">
            The page you&apos;re looking for may have been moved, renamed, or doesn&apos;t exist yet. 
            NBRF is still building its research body — check back soon.
          </p>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { href: "/", icon: Home, label: "Home" },
              { href: "/#research", icon: BookOpen, label: "Research" },
              { href: "/map", icon: Map, label: "Bihar Map" },
              { href: "#contact", icon: Mail, label: "Contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-surface hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all group"
              >
                <link.icon className="w-5 h-5 text-muted group-hover:text-brand-primary transition-colors" />
                <span className="text-xs font-mono text-muted group-hover:text-brand-primary transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>

          <Link href="/" className="tech-button-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
