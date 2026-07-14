"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Copy, Check, Download, X, Sparkles, FileText } from "lucide-react";

export interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  authors: string[];
  year: number | string;
  url?: string;
  doi?: string;
  publicationType?: string;
  institution?: string;
  slug?: string;
}

export type CitationFormat = "APA" | "MLA" | "Chicago" | "BibTeX" | "RIS";

export default function CitationModal({
  isOpen,
  onClose,
  title,
  authors,
  year,
  url = "https://nbrf.in",
  doi,
  publicationType = "Research Report",
  institution = "Nav Bihar Renaissance Foundation (NBRF)",
  slug = "bihar-policy-study",
}: CitationModalProps) {
  const [copiedFormat, setCopiedFormat] = useState<CitationFormat | null>(null);
  const [activeTab, setActiveTab] = useState<CitationFormat>("APA");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const authorString = authors && authors.length > 0
    ? authors.join(", ")
    : "Nav Bihar Renaissance Foundation Research Council";

  const doiString = doi || `10.5829/nbrf.${year}.${slug.slice(0, 20)}`;

  const generateCitationText = (format: CitationFormat): string => {
    switch (format) {
      case "APA":
        return `${authorString} (${year}). ${title}. ${institution}. https://doi.org/${doiString}`;
      case "MLA":
        return `${authorString}. "${title}." ${institution}, ${year}, ${url}.`;
      case "Chicago":
        return `${authorString}. "${title}." ${institution} Research Repository (${year}). https://doi.org/${doiString}.`;
      case "BibTeX":
        return `@techreport{nbrf_${year}_${slug.replace(/[^a-zA-Z0-9]/g, "_")},
  author       = {${authorString}},
  title        = {${title}},
  institution  = {${institution}},
  year         = {${year}},
  type         = {${publicationType}},
  doi          = {${doiString}},
  url          = {${url}}
}`;
      case "RIS":
        return `TY  - RPRT
TI  - ${title}
AU  - ${authorString}
PY  - ${year}
PB  - ${institution}
T2  - NBRF Bihar Policy Series
DO  - ${doiString}
UR  - ${url}
ER  -`;
      default:
        return "";
    }
  };

  const handleCopy = (format: CitationFormat) => {
    const text = generateCitationText(format);
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleDownloadFile = (format: "BibTeX" | "RIS") => {
    const text = generateCitationText(format);
    const ext = format === "BibTeX" ? "bib" : "ris";
    const mimeType = "text/plain;charset=utf-8";
    const blob = new Blob([text], { type: mimeType });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${slug}_citation.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  const formats: CitationFormat[] = ["APA", "MLA", "Chicago", "BibTeX", "RIS"];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="citation-modal-title"
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="tech-card max-w-2xl w-full p-6 sm:p-8 border border-brand-primary shadow-2xl bg-surface relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-brand-primary/10 border border-brand-primary/30 text-brand-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 id="citation-modal-title" className="font-mono font-bold text-base sm:text-lg text-foreground">
                  Universal Citation Generator
                </h3>
                <p className="text-[11px] font-mono text-muted">
                  Standardized formats for peer-reviewed & policy citations
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground p-1.5 rounded hover:bg-surface-alt transition-colors"
              aria-label="Close citation generator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Monograph summary badge */}
          <div className="mb-6 p-3 rounded border border-border/60 bg-background/60 flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <div className="text-xs font-sans text-muted overflow-hidden">
              <span className="font-mono text-foreground font-semibold block truncate">
                {title}
              </span>
              <span>
                {authorString} • {year} • {doiString}
              </span>
            </div>
          </div>

          {/* Style Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5 border-b border-border/60 pb-3">
            {formats.map((fmt) => {
              const isActive = activeTab === fmt;
              return (
                <button
                  key={fmt}
                  onClick={() => setActiveTab(fmt)}
                  className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                    isActive
                      ? "bg-brand-primary text-background font-bold shadow-sm"
                      : "bg-surface-alt text-muted hover:text-foreground border border-border/50"
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>

          {/* Citation Preview & Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-brand-primary">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {activeTab} Citation String
              </span>
              
              <div className="flex items-center gap-3">
                {(activeTab === "BibTeX" || activeTab === "RIS") && (
                  <button
                    onClick={() => handleDownloadFile(activeTab)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-brand-primary/40 bg-brand-primary/10 hover:bg-brand-primary hover:text-background text-brand-primary transition-all text-[11px]"
                  >
                    <Download className="w-3 h-3" /> Download .{activeTab === "BibTeX" ? "bib" : "ris"}
                  </button>
                )}
                <button
                  onClick={() => handleCopy(activeTab)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primary text-background hover:bg-brand-primary/90 font-bold transition-all text-[11px] shadow-sm"
                >
                  {copiedFormat === activeTab ? (
                    <>
                      <Check className="w-3 h-3" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy {activeTab}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 rounded bg-background border border-border font-mono text-xs text-foreground leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-brand-primary selection:text-background max-h-[220px]">
              {generateCitationText(activeTab)}
            </div>
          </div>

          {/* Quick Copy All Bar */}
          <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted">
            <span>Click any format above to copy or export BibTeX/RIS files directly into EndNote, Zotero, or Mendeley.</span>
            <button
              onClick={onClose}
              className="tech-button text-xs py-1.5 px-4"
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
