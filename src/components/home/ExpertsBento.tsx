"use client";

import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ExpertsBento({ experts = [] }: { experts?: any[] }) {
  const directors = (experts && experts.length > 0 ? experts : [])
    .filter((e) => !e.category || e.category === "board")
    .slice(0, 6);

  if (directors.length === 0) {
    return (
      <div className="tech-card p-6 md:p-8 flex flex-col items-center justify-center gap-4 min-h-[180px] border-dashed w-full text-center">
        <Users className="w-10 h-10 text-muted/40" />
        <div>
          <p className="text-sm font-mono font-bold text-muted">Board of Directors</p>
          <p className="text-xs text-muted mt-1">
            Director profiles will appear here once added via{" "}
            <Link href="/studio" className="text-brand-primary hover:underline">Sanity Studio</Link>.
          </p>
        </div>
        <Link href="#experts" className="tech-button text-xs px-4 py-2">
          Meet the Team <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center border-b border-border/50 pb-4">
        <div>
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Board of Directors</h2>
          <p className="text-muted text-xs font-sans mt-0.5">Founding leadership driving public governance and rural transformation</p>
        </div>
        <Link href="#experts" className="tech-button py-1.5 sm:py-2 px-3 sm:px-4 text-xs flex items-center gap-1.5 shrink-0">
          View All Profiles <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {directors.map((dir, i) => {
          const imgUrl = typeof dir.image === "string"
            ? dir.image
            : (dir.image?.asset ? urlForImage(dir.image) : null);
          return (
            <Link
              key={i}
              href="#experts"
              className="group flex flex-col items-center text-center p-3 rounded-lg border border-border/40 bg-surface-alt/30 hover:border-brand-primary/50 hover:bg-surface-alt/60 transition-all duration-300"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-300 bg-background">
                {imgUrl ? (
                  <Image
                    key={imgUrl}
                    src={imgUrl}
                    alt={`Photo of ${dir.name}`}
                    fill
                    sizes="80px"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-primary/10">
                    <span className="text-lg font-mono font-bold text-brand-primary">
                      {dir.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-mono font-bold text-xs sm:text-sm text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
                {dir.name}
              </h3>
              <p className="font-sans text-[10px] text-muted mt-1 line-clamp-2 leading-tight">
                {dir.role}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
