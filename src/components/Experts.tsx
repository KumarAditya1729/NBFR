"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/lib/image";
import { BOARD_OF_DIRECTORS, MANAGEMENT_TEAM } from "@/data/boardOfDirectors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Experts({ experts: _expertsProp }: { experts?: any[] } = {}) {
  // Always display the real static NBRF Board of Directors (6 profiles) — no Sanity override
  const displayExperts = BOARD_OF_DIRECTORS;


  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  const toggleBio = (hash: string) => {
    if (expandedBio === hash) {
      setExpandedBio(null);
    } else {
      setExpandedBio(hash);
    }
  };

  return (
    <section id="experts" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      {/* Decorative accent orb */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            PEOPLE // LEADERSHIP
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            BOARD OF DIRECTORS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-3xl mx-auto"
          >
            Our directors are accomplished leaders from public administration, banking, healthcare, engineering, and social development — guiding NBRF&apos;s mission with decades of distinguished service.
          </motion.p>
        </div>

        {/* Directors Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayExperts.length === 0 ? (
            <div className="col-span-3 flex flex-col items-center justify-center gap-4 py-20 text-center border border-dashed border-border rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                <ChevronDown className="w-8 h-8 text-muted/40" />
              </div>
              <div>
                <p className="font-mono font-bold text-muted">No Director profiles yet</p>
                <p className="text-xs text-muted mt-1">Our Board of Directors profiles will be updated shortly.</p>
              </div>
            </div>
          ) : displayExperts.map((expert, i) => {
            const isExpanded = expandedBio === expert.hash;
            // Use local string path directly; only resolve Sanity refs through urlForImage
            const imgUrl = typeof expert.image === 'string'
              ? expert.image
              : (expert.image && expert.image.asset ? urlForImage(expert.image) : null);

            return (
              <motion.div
                key={expert.hash || i}
                id={expert.hash}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="tech-card flex flex-col group overflow-hidden border border-border hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-1 w-full max-w-xs mx-auto"
              >
                {/* Director Photo Container */}
                <div className="relative w-full h-64 shrink-0 bg-surface-alt/50 overflow-hidden border-b border-border/50">
                  {imgUrl ? (
                    <Image
                      key={imgUrl}
                      src={imgUrl}
                      alt={`Photo of ${expert.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 3}
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-background flex flex-col items-center justify-center gap-3">
                      <div className="w-24 h-24 rounded-full bg-brand-primary/10 border-2 border-brand-primary/30 flex items-center justify-center">
                        <span className="text-4xl font-mono font-bold text-brand-primary">
                          {expert.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted">PHOTO COMING SOON</span>
                    </div>
                  )}
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                  {/* Director badge */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[10px] font-mono text-white">DIRECTOR</span>
                  </div>
                  {/* Name overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                    <h3 className="text-xl font-mono font-bold text-white leading-tight">
                      {expert.name}
                    </h3>
                    <p className="text-brand-primary font-mono text-xs uppercase tracking-widest mt-1">
                      {expert.role}
                    </p>
                  </div>
                </div>

                {/* Bio section */}
                <div className="p-5 flex flex-col flex-1">
                  <p className={`text-sm text-muted font-sans leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-4'}`}>
                    {expert.bio}
                  </p>
                  <button 
                    onClick={() => toggleBio(expert.hash)}
                    className="text-brand-primary text-xs font-mono mt-3 self-start hover:underline"
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Management Team */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-mono text-muted uppercase tracking-widest px-4">Management Team</span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {MANAGEMENT_TEAM.map((expert, i) => {
              const isExpanded = expandedBio === expert.hash;
              const imgUrl = typeof expert.image === 'string'
                ? expert.image
                : (expert.image && expert.image.asset ? urlForImage(expert.image) : null);

              return (
                <motion.div
                  key={expert.hash || i}
                  id={expert.hash}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="tech-card group overflow-hidden flex flex-col w-full max-w-xs hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden shrink-0 bg-surface-alt/50">
                    {imgUrl ? (
                      <Image
                        key={imgUrl}
                        src={imgUrl}
                        alt={`Photo of ${expert.name}`}
                        fill
                        sizes="320px"
                        priority
                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-background flex flex-col items-center justify-center gap-3">
                        <div className="w-24 h-24 rounded-full bg-brand-primary/10 border-2 border-brand-primary/30 flex items-center justify-center">
                          <span className="text-4xl font-mono font-bold text-brand-primary">
                            {expert.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-muted">PHOTO COMING SOON</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                      <span className="text-[10px] font-mono text-white">MANAGEMENT</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                      <h3 className="text-xl font-mono font-bold text-white leading-tight">{expert.name}</h3>
                      <p className="text-brand-accent font-mono text-xs uppercase tracking-widest mt-1">{expert.role}</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className={`text-sm text-muted font-sans leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-4'}`}>
                      {expert.bio}
                    </p>
                    <button 
                      onClick={() => toggleBio(expert.hash)}
                      className="text-brand-accent text-xs font-mono mt-3 self-start hover:underline"
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
