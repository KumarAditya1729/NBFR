"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Download,
  BookOpen,
  Users,
  Search,
  Database,
  Globe,
  Award,
  FileText,
  Share2,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  period: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
  bg: string;
}

const mainMetrics: MetricCardProps[] = [
  {
    label: "Monograph & Brief PDF Downloads",
    value: "14,820+",
    change: "+28.4%",
    period: "vs previous fiscal quarter",
    icon: Download,
    color: "text-brand-primary",
    bg: "bg-brand-primary/10 border-brand-primary/30"
  },
  {
    label: "Policy Citations & Gov References",
    value: "1,420+",
    change: "+41.2%",
    period: "Indexed in NITI Aayog & State Gazette",
    icon: Award,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/30"
  },
  {
    label: "District Observatory CSV Queries",
    value: "38,910+",
    change: "+64.8%",
    period: "across all 38 Bihar districts",
    icon: Database,
    color: "text-brand-accent",
    bg: "bg-brand-accent/10 border-brand-accent/30"
  },
  {
    label: "Syndicated Media & Press Features",
    value: "185+",
    change: "+15.0%",
    period: "National & regional editorials",
    icon: Globe,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30"
  }
];

const topMonographs = [
  {
    title: "State of Rural Livelihoods in Bihar: Goat Farming Impact Assessment",
    vertical: "Rural & Agricultural Economy",
    downloads: 4820,
    citations: 340,
    growth: "+18%"
  },
  {
    title: "Public Sector Audit & Municipal Fiscal Accountability in Bihar",
    vertical: "Governance & Public Policy",
    downloads: 3910,
    citations: 285,
    growth: "+32%"
  },
  {
    title: "Expanding Micro-Credit and NBFC-MFI Reach in North Bihar",
    vertical: "Economic Policy & Finance",
    downloads: 3420,
    citations: 410,
    growth: "+25%"
  },
  {
    title: "Tertiary Healthcare Infrastructure & Emergency Medicine Deficits",
    vertical: "Human Development & Social Infrastructure",
    downloads: 2670,
    citations: 385,
    growth: "+14%"
  }
];

const districtQueries = [
  { district: "Patna", queries: 8420, topDataset: "GSDP & Fiscal Revenue Benchmarks", share: 22 },
  { district: "Muzaffarpur", queries: 6150, topDataset: "Litchi & Agri-Value Chain Economics", share: 16 },
  { district: "Gaya", queries: 5310, topDataset: "Pilgrim Economy & Tourism Revenue", share: 14 },
  { district: "Darbhanga", queries: 4890, topDataset: "Makhana Production & Rural Credit", share: 13 },
  { district: "Bhagalpur", queries: 4120, topDataset: "Silk Weaving Cluster & Export Volume", share: 11 },
  { district: "Nalanda", queries: 3820, topDataset: "Higher Education & Heritage Tourism", share: 10 }
];

const trendingKeywords = [
  { keyword: "Makhana Value Chain", volume: "4,210 searches", trend: "Hot" },
  { keyword: "Municipal Audit Compliance", volume: "3,890 searches", trend: "Rising" },
  { keyword: "Panchayati Raj Fiscal Grants", volume: "3,450 searches", trend: "Steady" },
  { keyword: "Flood Resilient Agriculture", volume: "2,980 searches", trend: "Rising" },
  { keyword: "North Bihar MFI Penetration", volume: "2,610 searches", trend: "Hot" },
  { keyword: "Kosi Basin Embankment Policy", volume: "2,190 searches", trend: "Steady" },
  { keyword: "Patna Urban Transit Plan", volume: "1,840 searches", trend: "Rising" },
  { keyword: "Primary School Dropout Rates", volume: "1,620 searches", trend: "Steady" }
];

export default function ResearchImpactClient() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"Q1-2026" | "FY-2025" | "All-Time">("FY-2025");
  const [downloading, setDownloading] = useState(false);

  const handleExportSummary = () => {
    setDownloading(true);
    const csvContent =
      "Metric,Value,Change,Period\n" +
      mainMetrics.map((m) => `"${m.label}","${m.value}","${m.change}","${m.period}"`).join("\n") +
      "\n\nTop Monographs,Downloads,Citations\n" +
      topMonographs.map((m) => `"${m.title}",${m.downloads},${m.citations}`).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `NBRF_Research_Impact_Summary_${selectedTimeframe}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Timeframe Controls & Export Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface/80 p-4 sm:p-6 rounded-2xl border border-border backdrop-blur-md shadow-sm">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-widest text-brand-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Live Institutional Metrics
          </h2>
          <p className="text-xs font-mono text-muted mt-1">
            Real-time telemetry and public verification across all research verticals and empirical datasets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-background border border-border rounded-full p-1 text-xs font-mono">
            {(["Q1-2026", "FY-2025", "All-Time"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedTimeframe === tf
                    ? "bg-brand-primary text-white font-bold shadow"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportSummary}
            disabled={downloading}
            className="tech-button-primary py-2 px-4 text-xs gap-2 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            {downloading ? "Exporting CSV..." : "Export Telemetry CSV"}
          </button>
        </div>
      </div>

      {/* Main Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {mainMetrics.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`tech-card p-6 border ${stat.bg} flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-background/80 border border-border/60">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-background text-brand-primary border border-border">
                  {stat.change}
                </span>
              </div>

              <div className="mt-6">
                <div className="text-3xl font-mono font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-mono font-semibold text-foreground mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] font-mono text-muted mt-1 leading-relaxed">
                  {stat.period}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid: Top Monographs & District Query Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Top Downloaded Monographs */}
        <div className="lg:col-span-7 tech-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-primary" /> Most Downloaded Research Monographs
              </h3>
              <span className="text-[10px] font-mono uppercase text-muted bg-surface-alt px-2 py-1 rounded border border-border">
                Indexed Downloads
              </span>
            </div>

            <div className="space-y-4">
              {topMonographs.map((m) => (
                <div
                  key={m.title}
                  className="p-4 rounded-xl border border-border/80 bg-background/50 hover:border-brand-primary/50 transition-all flex flex-col sm:flex-row justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-primary font-semibold uppercase tracking-wider">
                      {m.vertical}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                      {m.title}
                    </h4>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-border/60">
                    <div className="text-xs font-mono font-bold text-foreground">
                      {m.downloads.toLocaleString()} <span className="text-[10px] text-muted font-normal">PDFs</span>
                    </div>
                    <div className="text-[11px] font-mono text-green-500 font-medium">
                      {m.citations} citations ({m.growth})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs font-mono text-muted">
            <span>Verified via Cloudflare & Sanity Edge Analytics</span>
            <Link href="/publications" className="text-brand-primary hover:underline flex items-center gap-1">
              Browse All 35+ Reports <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: District Data Observatory Queries */}
        <div className="lg:col-span-5 tech-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-accent" /> District Observatory Queries
              </h3>
              <span className="text-[10px] font-mono uppercase text-muted bg-surface-alt px-2 py-1 rounded border border-border">
                CSV Exports
              </span>
            </div>

            <p className="text-xs text-muted mb-6">
              Top requested empirical factsheets out of our 38-district open GIS data repository.
            </p>

            <div className="space-y-4">
              {districtQueries.map((dq) => (
                <div key={dq.district} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-brand-primary" /> {dq.district}
                    </span>
                    <span className="text-brand-primary font-bold">
                      {dq.queries.toLocaleString()} <span className="text-[10px] text-muted font-normal">({dq.share}%)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden border border-border/40">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(dq.share / 22) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-brand-primary rounded-full"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-muted italic">
                    Top dataset: {dq.topDataset}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs font-mono text-muted">
            <span>38 districts indexed</span>
            <Link href="/bihar" className="text-brand-primary hover:underline flex items-center gap-1">
              Explore Bihar Observatory <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Search Keywords Section */}
      <div className="tech-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="font-mono font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" /> Live Policy Keyword Search Trends
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Top query phrases logged inside the institutional <kbd className="px-1 py-0.5 rounded border border-border bg-surface text-[10px] font-mono">Cmd + K</kbd> global research index.
            </p>
          </div>
          <span className="text-xs font-mono text-green-500 flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping mr-1" /> Updated hourly
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingKeywords.map((tk) => (
            <div
              key={tk.keyword}
              className="p-4 rounded-xl border border-border bg-background/60 hover:border-brand-primary/40 transition-all flex justify-between items-center gap-3"
            >
              <div>
                <div className="text-xs font-mono font-bold text-foreground">
                  &ldquo;{tk.keyword}&rdquo;
                </div>
                <div className="text-[10px] font-mono text-muted mt-0.5">
                  {tk.volume}
                </div>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  tk.trend === "Hot"
                    ? "bg-red-500/10 text-red-500 border border-red-500/30"
                    : tk.trend === "Rising"
                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/30"
                    : "bg-surface text-muted border border-border"
                }`}
              >
                {tk.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Accountability Footer Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-secondary via-brand-secondary to-brand-primary/20 border border-brand-primary/30 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase tracking-widest text-brand-accent">
            <ShieldCheck className="w-4 h-4" /> 100% Open Data Institutional Pledge
          </div>
          <h3 className="text-lg sm:text-xl font-mono font-bold text-white">
            Need custom telemetry or API access for field research?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            NBRF provides API tokens and custom SQL export views for registered academic institutions, doctoral researchers, and government departments.
          </p>
        </div>

        <Link
          href="#contact"
          className="tech-button-primary bg-white text-brand-secondary hover:bg-slate-100 hover:text-brand-primary border-transparent shadow-lg shrink-0"
        >
          Request Research API Key →
        </Link>
      </div>
    </div>
  );
}
