"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ExpertsBento() {
  const previewDirectors = [
    {
      name: "Santosh Kumar",
      role: "Director | Social Entrepreneur & RTI Champion",
      image: "/directors/santosh-kumar.jpg",
    },
    {
      name: "Arun Kumar Singh",
      role: "Former Deputy CAG of India | IA&AS",
      image: "/directors/arun-kumar-singh.jpg",
    },
    {
      name: "Gyan Mohan",
      role: "Senior Banking & Finance Professional",
      image: "/directors/gyan-mohan.jpg",
    },
    {
      name: "Dr. Satyajit Kumar Singh",
      role: "Managing Director, Ruban Memorial Hospital",
      image: "/directors/Dr.-Satyajit-Kumar-Singh.jpg",
    },
    {
      name: "Prof. Nirmal Kumar",
      role: "Former Principal | Civil Engineer",
      image: "/directors/Prof.-Nirmal-Kumar.jpg",
    },
    {
      name: "A. M. Prasad",
      role: "Former IRS Officer | Special Secretary",
      image: "/directors/A.M-Prasad.jpg",
    },
  ];

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
        {previewDirectors.map((dir, i) => (
          <Link
            key={i}
            href="#experts"
            className="group flex flex-col items-center text-center p-3 rounded-lg border border-border/40 bg-surface-alt/30 hover:border-brand-primary/50 hover:bg-surface-alt/60 transition-all duration-300"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-300 bg-background">
              <Image
                src={dir.image}
                alt={dir.name}
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
              />
            </div>
            <h3 className="font-mono font-bold text-xs sm:text-sm text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
              {dir.name}
            </h3>
            <p className="font-sans text-[10px] text-muted mt-1 line-clamp-2 leading-tight">
              {dir.role}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
