"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PublicationsBento({ publications = [] }: { publications?: any[] }) {
  const displayPubs = publications && publications.length > 0 ? publications : [];
  const featured = displayPubs[0] || null;
  const listPubs = displayPubs.slice(0, 4);

  const featuredImgUrl = featured ? (urlForImage(featured.featuredImage) || "/mindful_research.png") : null;

  // Empty state
  if (!featured) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
        {[0, 1].map((i) => (
          <div key={i} className="tech-card p-6 flex flex-col items-center justify-center gap-4 min-h-[280px] border-dashed">
            <BookOpen className="w-10 h-10 text-muted/40" />
            <div className="text-center">
              <p className="text-sm font-mono font-bold text-muted">{i === 0 ? "Featured Research" : "Latest Publications"}</p>
              <p className="text-xs text-muted/70 mt-1">
                Publications will appear here once added via{" "}
                <Link href="/studio" className="text-brand-primary hover:underline">Sanity Studio</Link>.
              </p>
            </div>
            <Link href="/publications" className="tech-button text-xs px-4 py-2">
              Browse Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">

      {/* Featured Publication */}
      <div className="tech-card p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h2 className="font-mono font-bold text-lg text-brand-primary">Featured Research</h2>
          <span className="text-[10px] font-mono bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-2 py-0.5 rounded uppercase tracking-widest">
            {featured.publicationType || "Research Report"}
          </span>
        </div>

        <div className="text-sm font-bold text-foreground hover:text-brand-primary transition-colors">
          <Link href={`/publications/${featured.slug?.current || ''}`}>
            {featured.title}
          </Link>
        </div>

        {featuredImgUrl && (
          <div className="w-full h-44 rounded-lg overflow-hidden relative border border-border/50">
            <Image
              src={featuredImgUrl}
              alt={featured.title || "Featured Research"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-mono text-foreground flex items-center gap-1 font-bold">
                Read Executive Summary <ArrowRight className="w-3.5 h-3.5 text-brand-primary" />
              </span>
            </div>
          </div>
        )}

        <div className="text-xs text-muted font-sans line-clamp-3 leading-relaxed mt-1">
          {featured.abstract}
        </div>

        <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
          <Link href={`/publications/${featured.slug?.current || ''}`} className="tech-button-primary flex-1 py-2 px-0 text-center flex justify-center items-center gap-2 text-xs">
            Read Full Report
          </Link>
          <Link href="#memberships" className="tech-button flex-1 py-2 px-0 text-center flex justify-center items-center gap-2 text-xs">
            Join as Researcher
          </Link>
        </div>
      </div>

      {/* Latest Publications */}
      <div className="tech-card p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-mono font-bold text-lg text-brand-primary">Latest Publications</h2>
          <Link href="/publications" className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1">
            Library Hub <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-0 divide-y divide-border/50">
          {listPubs.map((item, i) => (
            <Link
              key={i}
              href={`/publications/${item.slug?.current || ''}`}
              className="py-3.5 flex flex-col gap-1.5 group cursor-pointer"
            >
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <span className="text-[9px] font-mono border border-brand-primary/30 text-brand-primary px-2 py-0.5 rounded whitespace-nowrap bg-brand-primary/5">
                  {item.publicationType}
                </span>
              </div>
              <div className="text-xs text-muted font-sans line-clamp-2 leading-relaxed">
                {item.abstract}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted/80 mt-1">
                <span>By {item.authors?.[0]?.name || "NBRF Research Lab"}</span>
                <span>•</span>
                <span>{item.publishDate}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
