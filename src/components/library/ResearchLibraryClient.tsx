"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
  Building2,
  Users,
  GraduationCap,
  Activity,
  Layers,
  ShieldCheck,
  ChevronRight,
  X,
  User,
  ArrowRight,
  ChevronLeft,
  Copy
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface PublicationItem {
  _id?: string;
  title?: string;
  slug?: { current?: string } | string;
  publicationType?: string;
  abstract?: string;
  publishDate?: string;
  districtScope?: string[];
  authors?: Array<{ _id?: string; name?: string; designation?: string; role?: string }>;
  featuredImage?: unknown;
  pdfUrl?: string;
  pdfFileUrl?: string;
  vertical?: string;
}

interface ResearchLibraryClientProps {
  initialPublications?: PublicationItem[];
  verticals?: Array<{ title: string; _id?: string }>;
  authors?: Array<{ name: string; _id?: string }>;
}

const DISTRICT_LIST = [
  "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", 
  "Nalanda", "Purnia", "Begusarai", "Rohtas", "Saran", "Katihar",
  "Samastipur", "East Champaran", "West Champaran", "Madhubani"
];

const PUBLICATION_TYPES = [
  "Research Report",
  "Working Paper",
  "Policy Brief",
  "Field Study",
  "Data Monograph"
];

export default function ResearchLibraryClient({
  initialPublications = [],
  verticals = [],
  authors = []
}: ResearchLibraryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");
  const [selectedVertical, setSelectedVertical] = useState<string>("ALL");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title-asc">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals state
  const [activeCitationPub, setActiveCitationPub] = useState<PublicationItem | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activePdfPub, setActivePdfPub] = useState<PublicationItem | null>(null);

  // Use only real Sanity data — no fallback demo records
  const rawData: PublicationItem[] = useMemo(() => {
    return initialPublications && initialPublications.length > 0
      ? initialPublications
      : [];
  }, [initialPublications]);

  // Extract unique verticals and authors if not passed
  const availableVerticals = useMemo(() => {
    if (verticals && verticals.length > 0) return verticals.map(v => v.title);
    return [
      "Governance & Public Administration",
      "Agriculture & Rural Economy",
      "Education & Human Capital",
      "Social Justice & Inclusion"
    ];
  }, [verticals]);

  const availableAuthors = useMemo(() => {
    if (authors && authors.length > 0) return authors.map(a => a.name);
    return ["Santosh Kumar", "Dr. Rajeshwar Prasad", "Aditi Sharma", "Arun Kumar Singh"];
  }, [authors]);

  // Filter and sort logic
  const filteredPublications = useMemo(() => {
    return rawData.filter((item) => {
      const title = item.title || "";
      const abstract = item.abstract || "";
      const type = item.publicationType || "";
      const districts = item.districtScope || [];
      const itemAuthors = item.authors?.map(a => a.name || "") || [];

      // Search match
      if (searchQuery.trim() !== "") {
        const queryLower = searchQuery.toLowerCase();
        const matchesTitle = title.toLowerCase().includes(queryLower);
        const matchesAbstract = abstract.toLowerCase().includes(queryLower);
        const matchesDistrict = districts.some(d => d.toLowerCase().includes(queryLower));
        const matchesAuthor = itemAuthors.some(a => a.toLowerCase().includes(queryLower));
        if (!matchesTitle && !matchesAbstract && !matchesDistrict && !matchesAuthor) {
          return false;
        }
      }

      // Type match
      if (selectedType !== "ALL" && type !== selectedType) {
        return false;
      }

      // District match
      if (selectedDistrict !== "ALL" && !districts.includes(selectedDistrict)) {
        return false;
      }

      // Vertical match
      if (selectedVertical !== "ALL" && item.vertical !== selectedVertical) {
        // If vertical isn't set explicitly, fallback allow or check title/abstract
        const matchesInText = title.toLowerCase().includes(selectedVertical.toLowerCase().split(' ')[0]) ||
                              abstract.toLowerCase().includes(selectedVertical.toLowerCase().split(' ')[0]);
        if (!matchesInText && item.vertical !== selectedVertical) return false;
      }

      // Author match
      if (selectedAuthor !== "ALL") {
        if (!itemAuthors.includes(selectedAuthor)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "newest") {
        return (new Date(b.publishDate || "2026-01-01").getTime()) - (new Date(a.publishDate || "2026-01-01").getTime());
      }
      if (sortBy === "oldest") {
        return (new Date(a.publishDate || "2026-01-01").getTime()) - (new Date(b.publishDate || "2026-01-01").getTime());
      }
      return (a.title || "").localeCompare(b.title || "");
    });
  }, [rawData, searchQuery, selectedType, selectedDistrict, selectedVertical, selectedAuthor, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPublications.length / pageSize) || 1;
  const paginatedPublications = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPublications.slice(start, start + pageSize);
  }, [filteredPublications, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("ALL");
    setSelectedDistrict("ALL");
    setSelectedVertical("ALL");
    setSelectedAuthor("ALL");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const getSlugString = (slugField?: { current?: string } | string) => {
    if (!slugField) return "bihar-policy-blueprint";
    if (typeof slugField === "string") return slugField;
    return slugField.current || "bihar-policy-blueprint";
  };

  const generateCitationText = (pub: PublicationItem, format: "APA" | "BibTeX" | "MLA") => {
    const year = pub.publishDate ? new Date(pub.publishDate).getFullYear() : 2026;
    const authorStr = pub.authors && pub.authors.length > 0 
      ? pub.authors.map(a => a.name).join(", ") 
      : "Nav Bihar Renaissance Foundation";
    const title = pub.title || "Research Monograph on Bihar Policy";

    if (format === "APA") {
      return `${authorStr} (${year}). ${title}. Nav Bihar Renaissance Foundation (NBRF) Research Repository. https://nbrf.in/publications/${getSlugString(pub.slug)}`;
    }
    if (format === "MLA") {
      return `${authorStr}. "${title}." Nav Bihar Renaissance Foundation, ${year}, nbrf.in/publications/${getSlugString(pub.slug)}.`;
    }
    // BibTeX
    return `@techreport{nbrf_${year}_${getSlugString(pub.slug).replace(/-/g, "_")},
  author    = {${authorStr}},
  title     = {${title}},
  institution = {Nav Bihar Renaissance Foundation},
  year      = {${year}},
  url       = {https://nbrf.in/publications/${getSlugString(pub.slug)}}
}`;
  };

  return (
    <div className="w-full">
      {/* ── Filter Bar & Search Toolbar ── */}
      <div className="tech-card p-6 md:p-8 mb-10 border border-brand-primary/30 bg-surface/80 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-6 pb-6 border-b border-border/60">
          {/* Main Search Input */}
          <div className="relative flex-grow max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search reports, working papers, authors, or district factsheets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-muted uppercase tracking-widest hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as "newest" | "oldest" | "title-asc")}
              className="px-4 py-2.5 rounded bg-background border border-border text-xs font-mono text-foreground focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Multi-Tag Dropdown Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Publication Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-brand-primary" /> Document Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded bg-background border border-border text-xs font-sans text-foreground focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">All Document Types</option>
              {PUBLICATION_TYPES.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* District Scope */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-brand-accent" /> District Focus
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded bg-background border border-border text-xs font-sans text-foreground focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">All 38 Districts / Statewide</option>
              {DISTRICT_LIST.map((d, idx) => (
                <option key={idx} value={d}>{d} District</option>
              ))}
            </select>
          </div>

          {/* Research Vertical */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-brand-primary" /> Research Domain
            </label>
            <select
              value={selectedVertical}
              onChange={(e) => {
                setSelectedVertical(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded bg-background border border-border text-xs font-sans text-foreground focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">All Research Domains</option>
              {availableVerticals.map((v, idx) => (
                <option key={idx} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Author/Director */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
              <User className="w-3 h-3 text-brand-secondary" /> Lead Author / Fellow
            </label>
            <select
              value={selectedAuthor}
              onChange={(e) => {
                setSelectedAuthor(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded bg-background border border-border text-xs font-sans text-foreground focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">All NBRF Scholars & Directors</option>
              {availableAuthors.map((a, idx) => (
                <option key={idx} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {(searchQuery || selectedType !== "ALL" || selectedDistrict !== "ALL" || selectedVertical !== "ALL" || selectedAuthor !== "ALL") && (
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-border/40">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider mr-2">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-mono text-xs">
                Query: &quot;{searchQuery}&quot;
                <X className="w-3 h-3 cursor-pointer hover:text-foreground" onClick={() => setSearchQuery("")} />
              </span>
            )}
            {selectedType !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-mono text-xs">
                {selectedType}
                <X className="w-3 h-3 cursor-pointer hover:text-foreground" onClick={() => setSelectedType("ALL")} />
              </span>
            )}
            {selectedDistrict !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-mono text-xs">
                District: {selectedDistrict}
                <X className="w-3 h-3 cursor-pointer hover:text-foreground" onClick={() => setSelectedDistrict("ALL")} />
              </span>
            )}
            {selectedVertical !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-mono text-xs">
                Domain: {selectedVertical.split(' ')[0]}
                <X className="w-3 h-3 cursor-pointer hover:text-foreground" onClick={() => setSelectedVertical("ALL")} />
              </span>
            )}
            {selectedAuthor !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary font-mono text-xs">
                Author: {selectedAuthor}
                <X className="w-3 h-3 cursor-pointer hover:text-foreground" onClick={() => setSelectedAuthor("ALL")} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs font-mono text-muted hover:text-foreground ml-auto underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Results Summary Header ── */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-sm text-muted">
          Showing <span className="text-foreground font-bold">{filteredPublications.length}</span> research papers and monographs in NBRF repository
        </p>
        <span className="text-xs font-mono text-brand-primary hidden sm:inline-block">
          OPEN ACCESS ARCHIVE // CC-BY 4.0
        </span>
      </div>

      {/* ── Publications Cards Grid ── */}
      {paginatedPublications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="tech-card p-16 text-center border-dashed border-border flex flex-col items-center justify-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center text-muted">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-mono font-bold text-lg text-foreground">No Research Publications Match Your Criteria</h3>
          <p className="text-sm text-muted max-w-md mx-auto font-sans">
            Try adjusting your search terms or clearing active filters to browse the full NBRF Bihar Policy archive.
          </p>
          <button
            onClick={handleResetFilters}
            className="tech-button-primary inline-flex items-center gap-2 mt-2 py-2.5 px-5"
          >
            Clear All Filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {paginatedPublications.map((pub, idx) => {
            const slugStr = getSlugString(pub.slug);
            const imgUrl = urlForImage(pub.featuredImage) || "/mindful_research.png";
            const pubType = pub.publicationType || "Research Report";
            const pubDate = pub.publishDate || "2026-03-15";

            return (
              <motion.div
                key={pub._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="tech-card flex flex-col justify-between border border-border/80 hover:border-brand-primary/60 transition-all duration-300 group hover:-translate-y-1 bg-background/70 overflow-hidden"
              >
                <div>
                  {/* Card Top Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-surface-alt border-b border-border/60">
                    <Image
                      src={imgUrl}
                      alt={pub.title || "Research Document"}
                      fill
                      className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                      <span className="text-[10px] font-mono bg-background/90 border border-brand-primary/40 text-brand-primary px-2.5 py-1 rounded uppercase tracking-wider backdrop-blur-md font-bold shadow-sm">
                        {pubType}
                      </span>
                      <span className="text-[10px] font-mono bg-background/90 border border-border text-foreground px-2 py-1 rounded backdrop-blur-md flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted" /> {pubDate}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 z-10">
                      {pub.districtScope && pub.districtScope.map((d, dIdx) => (
                        <span key={dIdx} className="text-[9px] font-mono bg-surface/90 border border-border text-muted px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm">
                          <MapPin className="w-2.5 h-2.5 text-brand-accent" /> {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6">
                    <h3 className="font-mono font-bold text-lg text-foreground group-hover:text-brand-primary transition-colors leading-snug mb-3">
                      <Link href={`/publications/${slugStr}`}>
                        {pub.title || "Bihar Public Policy Blueprint"}
                      </Link>
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed mb-5">
                      {pub.abstract || "An extensive multi-district study evaluating service delivery, administrative governance, and livelihood interventions across Bihar."}
                    </p>

                    {/* Authors list */}
                    {pub.authors && pub.authors.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 pt-3 border-t border-border/40 text-xs font-mono text-muted">
                        <User className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                        <span className="line-clamp-1">
                          By {pub.authors.map(a => a.name).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-surface/50 border-t border-border flex items-center justify-between gap-3">
                  <Link
                    href={`/publications/${slugStr}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand-primary hover:underline"
                  >
                    Read Full Report <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCitationPub(pub)}
                      title="Cite this research"
                      className="p-2 rounded border border-border hover:border-brand-primary text-muted hover:text-brand-primary transition-colors bg-background"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActivePdfPub(pub)}
                      title="Download or Preview PDF Monograph"
                      className="p-2 rounded border border-brand-primary/40 hover:border-brand-primary text-brand-primary hover:bg-brand-primary/10 transition-colors bg-brand-primary/5 inline-flex items-center gap-1 text-[11px] font-mono font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Pagination Bar ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-border mb-16">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="tech-button inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-xs py-2 px-4"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Page
          </button>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                  currentPage === idx + 1
                    ? "bg-brand-primary text-background font-bold"
                    : "border border-border text-muted hover:text-foreground bg-surface"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="tech-button inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-xs py-2 px-4"
          >
            Next Page <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Citation Generator Modal ── */}
      <AnimatePresence>
        {activeCitationPub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setActiveCitationPub(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="tech-card p-6 md:p-8 max-w-2xl w-full border border-brand-primary shadow-2xl bg-surface relative"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-primary" />
                  <h3 className="font-mono font-bold text-base md:text-lg text-foreground">
                    Academic Citation Generator
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCitationPub(null)}
                  className="text-muted hover:text-foreground p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-muted font-sans mb-6">
                Use our standardized academic citations for your research papers, policy briefs, or media reports. Copy any format with a single click.
              </p>

              <div className="space-y-6">
                {(["APA", "MLA", "BibTeX"] as const).map((fmt) => {
                  const citationText = generateCitationText(activeCitationPub, fmt);
                  const isCopied = copiedFormat === fmt;
                  return (
                    <div key={fmt} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono text-brand-primary">
                        <span>{fmt} Style Format</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(citationText);
                            setCopiedFormat(fmt);
                            setTimeout(() => setCopiedFormat(null), 2500);
                          }}
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-brand-primary" /> Copied to Clipboard
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Format
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-3.5 rounded bg-background border border-border/80 font-mono text-xs text-foreground/90 overflow-x-auto whitespace-pre-wrap selection:bg-brand-primary selection:text-background">
                        {citationText}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-border flex justify-end">
                <button
                  onClick={() => setActiveCitationPub(null)}
                  className="tech-button text-xs py-2 px-5"
                >
                  Close Citation Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PDF Monograph Preview Modal ── */}
      <AnimatePresence>
        {activePdfPub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-lg"
            onClick={() => setActivePdfPub(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="tech-card p-6 md:p-8 max-w-3xl w-full border border-brand-primary shadow-2xl bg-surface relative flex flex-col gap-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-border">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/30 px-2 py-0.5 rounded">
                    OPEN ACCESS MONOGRAPH
                  </span>
                  <h3 className="font-mono font-bold text-lg text-foreground mt-2">
                    {activePdfPub.title}
                  </h3>
                  <p className="text-xs text-muted font-mono mt-1">
                    Published: {activePdfPub.publishDate || "2026"} | Document ID: {activePdfPub._id || "NBRF-DOC-001"}
                  </p>
                </div>
                <button
                  onClick={() => setActivePdfPub(null)}
                  className="text-muted hover:text-foreground p-1 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 rounded bg-background border border-border text-center flex flex-col items-center justify-center gap-4 my-2">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary animate-pulse">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-base text-foreground">Complete Research Monograph (PDF)</h4>
                  <p className="text-xs text-muted max-w-md mx-auto mt-1 font-sans">
                    Full document with high-resolution empirical data tables, district-level GIS surveys, and comprehensive policy recommendations.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                  <a
                    href={activePdfPub.pdfUrl || activePdfPub.pdfFileUrl || "/sample_research_report.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-button-primary inline-flex items-center gap-2 text-xs py-2.5 px-6"
                  >
                    <Download className="w-4 h-4" /> Download Complete Monograph (PDF)
                  </a>
                  <Link
                    href={`/publications/${getSlugString(activePdfPub.slug)}`}
                    onClick={() => setActivePdfPub(null)}
                    className="tech-button inline-flex items-center gap-2 text-xs py-2.5 px-5"
                  >
                    <ExternalLink className="w-4 h-4" /> View Online Abstract & Data
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted border-t border-border pt-4">
                <span>Verification & Integrity: NBRF Research Council</span>
                <span>License: Creative Commons CC-BY 4.0</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
