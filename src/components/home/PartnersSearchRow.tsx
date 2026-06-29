"use client";

import { Search } from "lucide-react";

export default function PartnersSearchRow() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full">

      {/* Partner Organizations */}
      <div className="lg:col-span-8 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary">Partner Organizations</h2>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="font-mono text-xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
          <p className="text-muted text-sm">Our partner organizations will be showcased here.</p>
        </div>
      </div>

      {/* Advanced Search */}
      <div className="lg:col-span-4 tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary flex items-center gap-2">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
            Search
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center h-full">
          <h3 className="font-mono text-xl font-bold text-brand-primary/40 mb-2">Coming Soon</h3>
          <p className="text-muted text-sm">Advanced repository search is under development.</p>
        </div>
      </div>

    </div>
  );
}
