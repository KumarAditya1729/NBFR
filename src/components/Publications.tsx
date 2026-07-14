"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Users, ChevronRight, Handshake, Search, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default function Publications({ publications: publicationsProp }: { publications?: any[] } = {}) {
  const displayPubs = (publicationsProp && publicationsProp.length > 0) ? publicationsProp : [];
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPubs = displayPubs.filter(pub => {
    const matchesType = filterType === "ALL" || pub.publicationType === filterType;
    const matchesQuery = !searchQuery || (pub.title?.toLowerCase().includes(searchQuery.toLowerCase()) || pub.abstract?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesQuery;
  });

  const categories = ["ALL", "Policy Brief", "Research Report", "Working Paper", "Field Survey"];

  return (
    <section id="publications" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      {/* Decorative accent grid */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            INTELLIGENCE // REPOSITORY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            RESEARCH PUBLICATIONS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-3xl mx-auto"
          >
            Rigorous policy analysis, field surveys, and economic audits published by the Nav Bihar Renaissance Foundation research teams and fellows.
          </motion.p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-background/80 p-4 rounded-lg border border-border/80 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                  filterType === cat
                    ? "bg-brand-primary text-background font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    : "bg-surface text-muted hover:text-foreground border border-border/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full bg-surface border border-border rounded px-3 py-1.5 pl-9 text-xs text-foreground focus:outline-none focus:border-brand-primary"
            />
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPubs.map((pub, i) => {
            const imgUrl = urlForImage(pub.featuredImage) || "/mindful_research.png";
            return (
              <motion.div
                key={pub._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="tech-card flex flex-col justify-between group overflow-hidden border border-border hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1.5 bg-background/60"
              >
                <div>
                  <div className="relative w-full h-48 bg-surface overflow-hidden border-b border-border/50">
                    <Image
                      src={imgUrl}
                      alt={pub.title || "Research"}
                      fill
                      className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="text-[10px] font-mono bg-background/90 border border-brand-primary/40 text-brand-primary px-2 py-0.5 rounded shadow-sm">
                        {pub.publicationType || "Report"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                      <span>{pub.publishDate}</span>
                      <span>{pub.districtScope?.join(", ") || "Bihar Statewide"}</span>
                    </div>

                    <h3 className="font-mono font-bold text-base text-foreground group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                      {pub.title}
                    </h3>

                    <p className="text-xs text-muted font-sans line-clamp-3 leading-relaxed">
                      {pub.abstract}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-[11px] font-mono text-muted/80">
                    By {pub.authors?.[0]?.name || "NBRF Research Team"}
                  </span>
                  {pub.pdfFile?.asset?.url ? (
                    <a
                      href={pub.pdfFile.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-primary hover:underline font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF Download
                    </a>
                  ) : (
                    <Link
                      href={`/publications/${pub.slug?.current || '#'}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-brand-primary hover:underline font-semibold"
                    >
                      Read Abstract <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon & Collaboration Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="tech-card p-10 md:p-14 border-brand-primary/30 relative overflow-hidden mb-12 text-center bg-gradient-to-b from-surface to-background"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-brand-primary" />
            </div>

            <h3 className="text-2xl md:text-4xl font-mono font-bold text-brand-primary mb-4">
              We Need Your Cooperation
            </h3>
            <p className="text-muted text-lg font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              As an expanding think tank, NBRF invites researchers, academics, policymakers, and domain experts to collaborate with us in shaping Bihar&apos;s development narrative.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="tech-button-primary inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Partner With Us
              </Link>
              <Link href="#memberships" className="tech-button inline-flex items-center gap-2">
                <Users className="w-4 h-4" /> Join as Researcher
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border rounded p-6 bg-surface/50"
        >
          <div>
            <p className="font-mono font-bold text-brand-primary text-sm">Are you a researcher or policy expert?</p>
            <p className="text-muted text-xs font-sans mt-1">Contribute your work and help build Bihar&apos;s research ecosystem.</p>
          </div>
          <Link
            href="#contact"
            className="tech-button shrink-0 flex items-center gap-2 text-brand-accent border-brand-accent/30 hover:bg-brand-accent/10 hover:border-brand-accent"
          >
            Submit Your Research <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
