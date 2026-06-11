"use client";

import { useState, useEffect } from "react";
import { Globe, Mail, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SkeletonBlock, SkeletonLine, SkeletonCircle } from "@/components/ui/Skeleton";

const experts = [
  {
    name: "Arun Kumar Singh",
    title: "Director",
    desc: "Former Deputy CAG of India, joined IA&AS in 1978. Finalized Union govt reports.",
    image: "/directors/arun-kumar-singh.jpg",
  },
  {
    name: "Gyan Mohan",
    title: "Director",
    desc: "Seasoned banking professional with over three decades of experience across banking and finance.",
    image: "/directors/gyan-mohan.jpg",
  },
  {
    name: "Dr. Satyajit K. Singh",
    title: "Director",
    desc: "Managing director of Ruban Memorial Hospital, Patna, and renowned Urologist.",
    image: "/directors/satyajit-kumar-singh.jpg",
  },
  {
    name: "Prof. Nirmal Kumar",
    title: "Director",
    desc: "Academic leader with extensive experience in engineering education. Former Principal of MIT Muzaffarpur.",
    image: "/directors/nirmal-kumar.jpg",
  },
  {
    name: "A.M. Prasad",
    title: "Director",
    desc: "Distinguished public servant with deep expertise in administration and governance across Bihar.",
    image: "/directors/am-prasad.jpg",
  },
  {
    name: "Shashank Shrivastava",
    title: "Manager",
    desc: "Experienced leader driving strategic research and institutional development at NBRF.",
    image: "/directors/shashank-shrivastava.jpg",
  },
];

function ExpertSkeleton() {
  return (
    <div className="border border-border bg-surface rounded-lg p-3 sm:p-4 flex flex-col gap-3">
      <SkeletonBlock className="w-full aspect-square rounded-lg" />
      <div className="flex flex-col gap-2">
        <SkeletonLine className="h-3 w-3/4" />
        <SkeletonLine className="h-2.5 w-1/2" />
      </div>
      <SkeletonLine className="h-2.5 w-full hidden sm:block" />
      <SkeletonLine className="h-2.5 w-4/5 hidden sm:block" />
      <div className="flex gap-1.5 mt-auto pt-2 border-t border-border/50">
        <SkeletonBlock className="w-7 h-7 rounded" />
        <SkeletonBlock className="w-7 h-7 rounded" />
      </div>
    </div>
  );
}

export default function ExpertsBento() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="tech-card p-4 sm:p-6 md:p-8 flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center border-b border-border/50 pb-4">
        <h2 className="font-mono font-bold text-lg sm:text-xl text-white">Board of Directors</h2>
        <Link href="#about" className="tech-button py-1.5 sm:py-2 px-3 sm:px-4 text-xs flex items-center gap-1.5">
          Learn More <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {!loaded
          ? Array.from({ length: 6 }).map((_, i) => <ExpertSkeleton key={i} />)
          : experts.map((expert, i) => (
              <div
                key={i}
                className="border border-border bg-surface rounded-lg p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 group hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Photo */}
                <div className="w-full aspect-square rounded-lg bg-background border border-border overflow-hidden relative">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div>
                  <h3 className="font-mono font-bold text-[10px] sm:text-xs text-white group-hover:text-brand-primary transition-colors leading-tight">
                    {expert.name}
                  </h3>
                  <p className="text-[9px] font-mono text-brand-primary/70 uppercase tracking-wide mt-0.5">
                    {expert.title}
                  </p>
                </div>

                <p className="text-[9px] sm:text-[10px] text-muted leading-relaxed line-clamp-3 hidden sm:block">
                  {expert.desc}
                </p>

                <div className="flex gap-1.5 mt-auto pt-2 border-t border-border/50">
                  <Link
                    href="#contact"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
                  >
                    <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Link>
                  <Link
                    href="#contact"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
                  >
                    <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
