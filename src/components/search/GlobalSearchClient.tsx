"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  User,
  Database,
  Calendar,
  Handshake,
  Layers,
  ArrowRight,
  X,
  Command,
  Filter,
  Check,
  ExternalLink,
  Sparkles,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import {
  type Publication,
  type Expert,
  type EventItem,
  type Partner,
  type ResearchVertical,
  type BiharDataset
} from "@/sanity/lib/fallbackData";

interface SearchResultItem {
  id: string;
  type: "publication" | "expert" | "dataset" | "event" | "partner" | "vertical";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tag: string;
  date?: string;
}

interface GlobalSearchClientProps {
  initialPublications?: Publication[];
  initialExperts?: Expert[];
  initialEvents?: EventItem[];
  initialPartners?: Partner[];
  initialVerticals?: ResearchVertical[];
  initialDatasets?: BiharDataset[];
  isModal?: boolean;
  onClose?: () => void;
}

export default function GlobalSearchClient({
  initialPublications = [],
  initialExperts = [],
  initialEvents = [],
  initialPartners = [],
  initialVerticals = [],
  initialDatasets = [],
  isModal = false,
  onClose
}: GlobalSearchClientProps) {
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"relevance" | "newest">("relevance");

  // Use only real Sanity data — no fallback demo records
  const pubs = useMemo(() => initialPublications, [initialPublications]);
  const exps = useMemo(() => initialExperts, [initialExperts]);
  const evts = useMemo(() => initialEvents, [initialEvents]);
  const parts = useMemo(() => initialPartners, [initialPartners]);
  const verts = useMemo(() => initialVerticals, [initialVerticals]);
  const dsets = useMemo(() => initialDatasets, [initialDatasets]);

  // Unified searchable index
  const allItems = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // Publications
    pubs.forEach(p => {
      list.push({
        id: p._id || `pub-${p.title}`,
        type: "publication",
        title: p.title,
        subtitle: `Research Report // ${p.authors?.[0]?.name || "NBRF Lab"}`,
        description: p.abstract || "Empirical research paper on Bihar public policy and developmental economics.",
        href: `/publications/${p.slug?.current || "state-of-rural-livelihoods-in-bihar-goat-farming-impact"}`,
        tag: p.publicationType || "Research Report",
        date: p.publishDate || "2024"
      });
    });

    // Experts
    exps.forEach(e => {
      list.push({
        id: e._id || `exp-${e.name}`,
        type: "expert",
        title: e.name,
        subtitle: e.role || "Director & Research Fellow",
        description: e.bio || "Distinguished scholar and governance advisor contributing to NBRF research.",
        href: "/#experts",
        tag: "Leadership",
        date: "Active"
      });
    });

    // Datasets
    dsets.forEach(d => {
      list.push({
        id: d._id || `ds-${d.indicatorName}`,
        type: "dataset",
        title: d.indicatorName || "Bihar Socio-Economic Dataset",
        subtitle: `Source: ${d.sourceName || "Govt of Bihar"} // Year: ${d.year}`,
        description: `Verified value: ${d.valueString} ${d.unit || ""}. ${d.methodologyNotes || "Standardized indicator."}`,
        href: "/bihar",
        tag: d.category || "Economy",
        date: d.year || "2024"
      });
    });

    // Events
    evts.forEach(ev => {
      list.push({
        id: ev._id || `evt-${ev.title}`,
        type: "event",
        title: ev.title,
        subtitle: `Patna / Virtual // ${ev.type || "Colloquium"}`,
        description: "High-level policy dialogue and research workshop conducted by NBRF.",
        href: "/#events",
        tag: ev.type || "Workshop",
        date: ev.date || "2024"
      });
    });

    // Partners
    parts.forEach(p => {
      list.push({
        id: p._id || `part-${p.name}`,
        type: "partner",
        title: p.name,
        subtitle: p.tier || "Knowledge & Research Partner",
        description: p.description || "Collaborating with NBRF on empirical field research and policy advocacy.",
        href: "/#partners",
        tag: p.tier || "Institutional",
        date: "2024"
      });
    });

    // Verticals
    verts.forEach(v => {
      list.push({
        id: v._id || `vert-${v.title}`,
        type: "vertical",
        title: v.title,
        subtitle: "Research Centre & Focus Area",
        description: v.shortDescription || "Dedicated institutional vertical conducting longitudinal policy studies.",
        href: "/#research",
        tag: "Research Centre",
        date: "Core"
      });
    });

    return list;
  }, [pubs, exps, dsets, evts, parts, verts]);

  // Filter and Search
  const filteredItems = useMemo(() => {
    let result = allItems;

    // Type tab filtering
    if (selectedTab !== "ALL") {
      result = result.filter(item => item.type === selectedTab.toLowerCase());
    }

    // Query text search
    if (query.trim() !== "") {
      const q = query.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "newest") {
      result = [...result].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }

    return result;
  }, [allItems, selectedTab, query, sortBy]);

  // Counts by type
  const counts = useMemo(() => {
    const map: Record<string, number> = {
      ALL: allItems.length,
      publication: 0,
      expert: 0,
      dataset: 0,
      event: 0,
      partner: 0,
      vertical: 0
    };
    allItems.forEach(i => {
      map[i.type] = (map[i.type] || 0) + 1;
    });
    return map;
  }, [allItems]);

  // Highlight helper
  const highlightText = (text: string, q: string) => {
    if (!q.trim()) return text;
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <span key={i} className="bg-brand-primary/30 text-brand-primary font-bold px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Keyboard escape handle for modal
  useEffect(() => {
    if (!isModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModal, onClose]);

  const tabs = [
    { id: "ALL", label: "All Index", icon: Layers, count: counts.ALL },
    { id: "publication", label: "Publications", icon: FileText, count: counts.publication },
    { id: "dataset", label: "Datasets", icon: Database, count: counts.dataset },
    { id: "expert", label: "Experts", icon: User, count: counts.expert },
    { id: "vertical", label: "Centres", icon: BookOpen, count: counts.vertical },
    { id: "event", label: "Events", icon: Calendar, count: counts.event },
    { id: "partner", label: "Partners", icon: Handshake, count: counts.partner },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "publication":
        return { icon: FileText, bg: "bg-brand-primary/10 border-brand-primary/30 text-brand-primary", name: "Report" };
      case "expert":
        return { icon: User, bg: "bg-brand-secondary/10 border-brand-secondary/30 text-brand-secondary", name: "Expert" };
      case "dataset":
        return { icon: Database, bg: "bg-orange-500/10 border-orange-500/30 text-orange-400", name: "Dataset" };
      case "event":
        return { icon: Calendar, bg: "bg-purple-500/10 border-purple-500/30 text-purple-400", name: "Event" };
      case "partner":
        return { icon: Handshake, bg: "bg-blue-500/10 border-blue-500/30 text-blue-400", name: "Partner" };
      default:
        return { icon: BookOpen, bg: "bg-brand-accent/10 border-brand-accent/30 text-brand-accent", name: "Centre" };
    }
  };

  return (
    <div className={`w-full ${isModal ? "bg-surface border border-brand-primary/50 shadow-2xl rounded-xl max-h-[85vh] flex flex-col overflow-hidden" : ""}`}>
      
      {/* ── SEARCH INPUT HEADER ── */}
      <div className="p-4 sm:p-6 border-b border-border bg-background/90 sticky top-0 z-20">
        <div className="flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-brand-primary shrink-0" />
          <input
            type="text"
            autoFocus={isModal}
            placeholder="Search across research papers, authors, datasets, policy centres, and Bihar statistics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-foreground placeholder:text-muted/60 font-mono text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-surface text-muted hover:text-foreground shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="ml-2 px-2.5 py-1 rounded border border-border text-[10px] font-mono text-muted hover:text-foreground shrink-0"
            >
              ESC
            </button>
          )}
        </div>

        {/* ── FILTER TABS ROW ── */}
        <div className="mt-4 pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Tabs — scrollable row */}
          <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3 py-1.5 rounded flex items-center gap-1.5 shrink-0 transition-colors ${
                    isActive
                      ? "bg-brand-primary text-background font-bold shadow-sm"
                      : "bg-surface border border-border/60 text-muted hover:text-foreground hover:border-brand-primary/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${isActive ? "bg-background/20 text-background" : "bg-background text-muted"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort — own row, right-aligned */}
          <div className="flex items-center justify-end gap-2 text-xs font-mono">
            <span className="text-muted">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "relevance" | "newest")}
              className="bg-surface border border-border rounded px-2.5 py-1 text-foreground focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

        </div>

      </div>

      {/* ── SEARCH RESULTS LIST ── */}
      <div className={`p-4 sm:p-6 space-y-3 ${isModal ? "overflow-y-auto max-h-[60vh]" : "min-h-[400px]"}`}>
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-surface/40 rounded-lg border border-dashed border-border">
            <Search className="w-10 h-10 text-muted mx-auto mb-3 opacity-40" />
            <h4 className="font-mono font-bold text-base text-foreground mb-1">
              No results found for &quot;{query}&quot;
            </h4>
            <p className="font-sans text-xs text-muted max-w-md mx-auto mb-6">
              Try broadening your search terms, filtering by &apos;All Index&apos;, or checking spelling for Bihar district terminology.
            </p>
            <button
              onClick={() => { setQuery(""); setSelectedTab("ALL"); }}
              className="tech-button text-xs py-2 px-4 inline-flex items-center gap-2"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const badge = getTypeBadge(item.type);
            const BadgeIcon = badge.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={item.href}
                  onClick={() => { if (isModal && onClose) onClose(); }}
                  className="tech-card p-4 sm:p-5 border border-border/80 hover:border-brand-primary transition-all bg-background/80 hover:bg-surface/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-grow pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-mono uppercase tracking-wider ${badge.bg}`}>
                        <BadgeIcon className="w-3 h-3" /> {badge.name}
                      </span>
                      <span className="text-[11px] font-mono text-muted">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="font-mono font-bold text-sm sm:text-base text-foreground group-hover:text-brand-primary transition-colors leading-snug">
                      {highlightText(item.title, query)}
                    </h3>

                    <p className="font-sans text-xs text-muted line-clamp-2 leading-relaxed">
                      {highlightText(item.description, query)}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 font-mono text-xs">
                    <span className="text-muted/80 text-[11px]">{item.date}</span>
                    <span className="text-brand-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>

      {/* ── FOOTER BAR ── */}
      <div className="px-6 py-3 bg-surface/80 border-t border-border flex items-center justify-between font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> NBRF Unified Knowledge Index
        </span>
        <span>Showing {filteredItems.length} of {allItems.length} indexed records</span>
      </div>
    </div>
  );
}
