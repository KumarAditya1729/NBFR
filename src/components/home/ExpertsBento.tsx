"use client";

import { Globe, Mail, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ExpertsBento() {
  const experts = [
    {
      name: "Arun Kumar Singh",
      title: "Director",
      desc: "Former Deputy CAG of India, joined IA&AS in 1978. Finalized Union govt reports.",
      image: "/directors/arun-kumar-singh.jpg"
    },
    {
      name: "Gyan Mohan",
      title: "Director",
      desc: "Seasoned banking professional with over three decades of experience across banking and finance.",
      image: "/directors/gyan-mohan.jpg"
    },
    {
      name: "Dr. Satyajit K. Singh",
      title: "Director",
      desc: "Managing director of Ruban Memorial Hospital, Patna, and renowned Urologist.",
      image: "/directors/satyajit-kumar-singh.jpg"
    },
    {
      name: "Prof. Nirmal Kumar",
      title: "Director",
      desc: "Academic leader with extensive experience in engineering education. Former Principal of MIT Muzaffarpur.",
      image: "/directors/nirmal-kumar.jpg"
    },
    {
      name: "A.M. Prasad",
      title: "Director",
      desc: "Distinguished public servant with deep expertise in administration and governance across Bihar.",
      image: "/directors/am-prasad.jpg"
    },
    {
      name: "Shashank Shrivastava",
      title: "Director",
      desc: "Experienced leader driving strategic research and institutional development at NBRF.",
      image: "/directors/shashank-shrivastava.jpg"
    }
  ];

  return (
    <div className="tech-card p-6 md:p-8 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center border-b border-border/50 pb-4">
        <h2 className="font-mono font-bold text-xl text-white">Board of Directors</h2>
        <Link href="#about" className="tech-button py-2 px-4 text-xs flex items-center gap-2">
          Learn More <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {experts.map((expert, i) => (
          <div key={i} className="border border-border bg-surface rounded-lg p-4 flex flex-col gap-3 group hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1">
            {/* Photo */}
            <div className="w-full aspect-square rounded-lg bg-background border border-border overflow-hidden relative">
              {expert.image ? (
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 opacity-20 text-muted" />
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div>
              <h3 className="font-mono font-bold text-xs text-white group-hover:text-brand-primary transition-colors leading-tight">{expert.name}</h3>
              <p className="text-[9px] font-mono text-brand-primary/70 uppercase tracking-wide mt-0.5">{expert.title}</p>
            </div>

            <p className="text-[10px] text-muted leading-relaxed line-clamp-3 hidden sm:block">{expert.desc}</p>

            <div className="flex gap-1.5 mt-auto pt-2 border-t border-border/50">
              <Link href="#contact" className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                <Globe className="w-3 h-3" />
              </Link>
              <Link href="#contact" className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                <Mail className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
