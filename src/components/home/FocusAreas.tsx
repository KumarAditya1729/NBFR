"use client";

import { Leaf, MonitorSmartphone, Building2, BookOpenCheck, ArrowRight, Landmark, Wheat, GraduationCap, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function FocusAreas() {
  const areas = [
    {
      title: "Governance & Admin",
      desc: "Strengthening democratic institutions.",
      icon: Landmark,
      color: "group-hover:text-brand-primary",
      bg: "group-hover:bg-brand-primary/10",
      border: "group-hover:border-brand-primary/30"
    },
    {
      title: "Agriculture & Economy",
      desc: "Transforming agrarian backbone.",
      icon: Wheat,
      color: "group-hover:text-brand-secondary",
      bg: "group-hover:bg-brand-secondary/10",
      border: "group-hover:border-brand-secondary/30"
    },
    {
      title: "Education & Skills",
      desc: "Bridging literacy gaps.",
      icon: GraduationCap,
      color: "group-hover:text-brand-accent",
      bg: "group-hover:bg-brand-accent/10",
      border: "group-hover:border-brand-accent/30"
    },
    {
      title: "Public Health & Welfare",
      desc: "Researching healthcare access.",
      icon: HeartPulse,
      color: "group-hover:text-brand-primary",
      bg: "group-hover:bg-brand-primary/10",
      border: "group-hover:border-brand-primary/30"
    }
  ];

  return (
    <div className="tech-card p-6 md:p-8 flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <h2 className="font-mono font-bold text-xl text-white">Focus Areas</h2>
        <Link href="/#research" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-colors">
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 h-full justify-between">
        {areas.map((area, i) => (
          <Link href="/#research" key={i} className={`group flex items-center gap-4 p-3 rounded-lg border border-border bg-surface transition-all duration-300 ${area.border} ${area.bg}`}>
            <div className={`w-10 h-10 rounded bg-background border border-border flex items-center justify-center transition-colors ${area.color}`}>
              <area.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-mono font-bold text-sm text-white transition-colors ${area.color}`}>{area.title}</h3>
              <p className="text-[10px] text-muted font-sans">{area.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
