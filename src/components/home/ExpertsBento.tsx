"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ExpertsBento() {

  return (
    <div className="tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center border-b border-border/50 pb-4">
        <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Board of Directors</h2>
        <Link href="#about" className="tech-button py-1.5 sm:py-2 px-3 sm:px-4 text-xs flex items-center gap-1.5">
          Learn More <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center border-t border-border/40 mt-2">
        <h3 className="font-mono text-xl sm:text-2xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
        <p className="text-muted text-sm max-w-md mx-auto">The Board of Directors and key experts will be announced shortly.</p>
      </div>
    </div>
  );
}
