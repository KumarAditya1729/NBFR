"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Users, TrendingUp, GraduationCap, Stethoscope,
  Wheat, Building2, Zap, Droplets, Baby, Activity, MapPin,
  BarChart2, ExternalLink
} from "lucide-react";

const statCards = [
  { label: "Population", value: "128.5M", sub: "Census 2011 base, estimated 2024", icon: Users, color: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary/30" },
  { label: "GSDP Growth", value: "10.5%", sub: "Among fastest-growing states", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  { label: "Literacy Rate", value: "61.8%", sub: "Rising 5.6% from prev. census", icon: GraduationCap, color: "text-brand-secondary", bg: "bg-brand-secondary/10", border: "border-brand-secondary/30" },
  { label: "Infant Mortality", value: "27/1000", sub: "Live births (SRS 2022)", icon: Baby, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  { label: "Agriculture Share", value: "24%", sub: "of GSDP, 80% workforce", icon: Wheat, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { label: "Urban Population", value: "11.3%", sub: "Low urbanisation, high potential", icon: Building2, color: "text-brand-accent", bg: "bg-brand-accent/10", border: "border-brand-accent/30" },
];

const sectors = [
  {
    title: "Education",
    icon: GraduationCap,
    color: "text-brand-secondary",
    items: [
      { label: "Literacy Rate", value: "61.8%", note: "Male: 71.2% | Female: 51.5%" },
      { label: "School Enrollment (6-14)", value: "96%", note: "Near universal enrolment" },
      { label: "Higher Education Institutions", value: "700+", note: "Universities, colleges" },
      { label: "NALANDA (Intl. Univ.)", value: "Revived", note: "Global research hub" },
    ],
  },
  {
    title: "Health",
    icon: Stethoscope,
    color: "text-red-400",
    items: [
      { label: "Life Expectancy", value: "68.2 yrs", note: "Rising steadily" },
      { label: "Infant Mortality Rate", value: "27", note: "per 1,000 live births" },
      { label: "Kala-azar Elimination", value: "95%+ districts", note: "WHO-certified progress" },
      { label: "Maternal Mortality Rate", value: "130", note: "per 100,000 live births" },
    ],
  },
  {
    title: "Infrastructure",
    icon: Zap,
    color: "text-yellow-400",
    items: [
      { label: "Electrification", value: "99.9%", note: "All villages electrified" },
      { label: "Road Density", value: "High", note: "State Highway Network" },
      { label: "Ganga Expressway", value: "Planned", note: "Economic corridor" },
      { label: "Patna Metro", value: "In Progress", note: "Phase-1 underway" },
    ],
  },
  {
    title: "Water & Sanitation",
    icon: Droplets,
    color: "text-brand-secondary",
    items: [
      { label: "Safe Drinking Water", value: "82%", note: "Households covered" },
      { label: "Sanitation Coverage", value: "75%+", note: "ODF declared villages" },
      { label: "Flood-prone Area", value: "73%", note: "Of total geographical area" },
      { label: "Irrigation Coverage", value: "46%", note: "Of net sown area" },
    ],
  },
];

const demographics = [
  { label: "Population Density", value: "1,106/km²", icon: Users },
  { label: "Sex Ratio", value: "918 / 1000", icon: Activity },
  { label: "Youth (< 25 yrs)", value: "58%", icon: Baby },
  { label: "Districts", value: "38", icon: MapPin },
  { label: "Sub-divisions", value: "101", icon: Building2 },
  { label: "GDP per Capita", value: "~$600", icon: BarChart2 },
];

export default function SnapshotPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-muted hover:text-brand-primary transition-colors text-xs font-mono">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2 text-brand-secondary font-mono text-xs">
              <Activity className="w-4 h-4" /> Bihar State Snapshot
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/bihar" className="tech-button-primary py-2 px-4 text-xs flex items-center gap-1.5 font-bold">
              District Observatory & CSV <ExternalLink className="w-3 h-3" />
            </Link>
            <Link href="/map" className="tech-button py-2 px-4 text-xs flex items-center gap-1.5">
              GIS Map <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary font-mono text-[10px] uppercase tracking-widest mb-4">
            <Activity className="w-3 h-3" /> Data Dashboard · Bihar 2024
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-brand-primary mb-4 leading-tight">
            Bihar <span className="text-brand-secondary glow-text-blue">State Snapshot</span>
          </h1>
          <p className="text-muted/80 text-sm md:text-base font-sans max-w-2xl leading-relaxed">
            Bihar&apos;s demographic and administrative scale requires precise, data-driven interventions. NBRF utilizes this macro data to formulate hyper-local policy solutions.
          </p>
        </motion.div>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`tech-card p-4 sm:p-5 border ${s.border} group hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-10 h-10 rounded ${s.bg} border ${s.border} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className={`text-2xl font-mono font-bold ${s.color} mb-1`}>{s.value}</div>
              <div className="text-xs font-mono text-brand-primary mb-1">{s.label}</div>
              <div className="text-[10px] text-muted leading-tight">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick demographics strip */}
        <div className="tech-card p-5 mb-10">
          <h2 className="text-sm font-mono font-bold text-brand-primary mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-primary" /> Quick Demographics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {demographics.map((d) => (
              <div key={d.label} className="flex flex-col gap-1 p-3 border border-border rounded hover:border-brand-primary/30 transition-colors">
                <d.icon className="w-4 h-4 text-brand-primary mb-1" />
                <div className="text-sm font-mono font-bold text-brand-primary">{d.value}</div>
                <div className="text-[10px] text-muted">{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="tech-card p-6"
            >
              <h3 className="font-mono font-bold text-brand-primary text-base mb-5 flex items-center gap-2">
                <sector.icon className={`w-5 h-5 ${sector.color}`} /> {sector.title}
              </h3>
              <div className="flex flex-col gap-0 divide-y divide-border/50">
                {sector.items.map((item) => (
                  <div key={item.label} className="py-3 flex justify-between items-start gap-4">
                    <div>
                      <div className="text-xs font-mono text-muted">{item.label}</div>
                      <div className="text-[10px] text-muted/60 mt-0.5">{item.note}</div>
                    </div>
                    <div className="text-sm font-mono font-bold text-brand-primary whitespace-nowrap">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agriculture spotlight */}
        <div className="tech-card p-6 mb-10 border-green-400/20">
          <h2 className="font-mono font-bold text-brand-primary text-base mb-6 flex items-center gap-2">
            <Wheat className="w-5 h-5 text-green-400" /> Agricultural Powerhouse
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {[
              { crop: "Makhana (Fox Nut)", share: "85%", title: "of India's total" },
              { crop: "Litchi", share: "71%", title: "of India's total" },
              { crop: "Mango", share: "13%", title: "of India's total" },
              { crop: "Tobacco", share: "3rd Largest", title: "in India" },
            ].map((c) => (
              <div key={c.crop} className="border border-green-400/20 rounded-lg p-4 bg-green-400/5 text-center">
                <div className="text-2xl font-mono font-bold text-green-400 mb-1">{c.share}</div>
                <div className="text-[10px] text-muted mb-2">{c.title}</div>
                <div className="text-xs font-mono font-bold text-brand-primary">{c.crop}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="tech-card p-6 border-brand-accent/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-mono font-bold text-brand-primary text-base mb-6 flex items-center gap-2 relative z-10">
            <TrendingUp className="w-5 h-5 text-brand-accent" /> Bihar Vision 2030
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            {[
              { goal: "Double GSDP", target: "$100 Billion", detail: "Driven by IT, food processing & eco-tourism", color: "text-brand-accent" },
              { goal: "Skill 10M Youth", target: "By 2025", detail: "Highest demographic dividend in India", color: "text-brand-primary" },
              { goal: "Bihta IT City", target: "Smart City", detail: "Technology & innovation hub near Patna", color: "text-brand-secondary" },
            ].map((v) => (
              <div key={v.goal} className="border border-border rounded-lg p-5">
                <div className={`text-xl font-mono font-bold ${v.color} mb-1`}>{v.target}</div>
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">{v.goal}</div>
                <div className="text-xs text-muted leading-relaxed">{v.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
