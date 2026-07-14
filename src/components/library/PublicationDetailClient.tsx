"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  BookOpen,
  Calendar,
  MapPin,
  Check,
  Share2,
  Layers,
  Sparkles,
  Database,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import CitationModal from "@/components/library/CitationModal";

interface AuthorItem {
  _id?: string;
  name: string;
  designation?: string;
  role?: string;
  bio?: string;
  image?: unknown;
}

interface MethodologyData {
  title?: string;
  summary?: string;
  dataCollectionType?: string;
  sampleSize?: string;
  verificationProtocols?: string;
  limitations?: string;
}

interface DatasetItem {
  _id?: string;
  indicatorName?: string;
  slug?: { current?: string } | string;
  category?: string;
  year?: string;
  valueString?: string;
  unit?: string;
  sourceName?: string;
  sourceUrl?: string;
  verifiedBy?: string;
}

interface PublicationDetailProps {
  publication: {
    _id?: string;
    title: string;
    slug?: { current?: string } | string;
    publicationType?: string;
    abstract?: string;
    executiveSummary?: string;
    publishDate?: string;
    lastUpdated?: string;
    districtScope?: string[];
    researchVertical?: { title?: string; slug?: unknown; iconName?: string };
    authors?: AuthorItem[];
    pdfFileUrl?: string;
    pdfUrl?: string;
    featuredImage?: unknown;
    citation?: string;
    methodology?: MethodologyData;
    datasets?: DatasetItem[];
  };
  relatedPublications?: Array<{
    _id?: string;
    title?: string;
    slug?: { current?: string } | string;
    featuredImage?: unknown;
    publishDate?: string;
    abstract?: string;
    publicationType?: string;
  }>;
}

export default function PublicationDetailClient({
  publication,
  relatedPublications = []
}: PublicationDetailProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "methodology" | "datasets" | "pdf">("summary");
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const slugStr = typeof publication.slug === "string" 
    ? publication.slug 
    : (publication.slug?.current || "bihar-policy-blueprint");

  const pdfDownloadUrl = publication.pdfUrl || publication.pdfFileUrl || "/sample_research_report.pdf";
  const pubYear = publication.publishDate ? new Date(publication.publishDate).getFullYear() : 2026;

  const doiString = `10.5829/nbrf.${pubYear}.${slugStr.slice(0, 20)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: publication.title,
        text: publication.abstract || "Check out this open-access policy research on Bihar from NBRF.",
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  return (
    <div className="w-full">
      {/* ── Top Hero Banner ── */}
      <div className="tech-card p-6 md:p-12 mb-10 border-brand-primary/40 bg-gradient-to-b from-surface via-surface/80 to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Badges & DOI */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono bg-brand-primary/15 border border-brand-primary/40 text-brand-primary px-3 py-1 rounded font-bold uppercase tracking-widest">
              {publication.publicationType || "Research Report"}
            </span>
            {publication.researchVertical && (
              <span className="text-xs font-mono bg-surface-alt border border-border text-foreground px-3 py-1 rounded flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-accent" />
                {publication.researchVertical.title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-primary" />
              Published: <strong className="text-foreground">{publication.publishDate || "2026-03-15"}</strong>
            </span>
            <span className="hidden sm:inline-block border-l border-border pl-4">
              DOI: <span className="text-brand-primary">{doiString}</span>
            </span>
          </div>
        </div>

        {/* Title & Abstract Header */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-foreground mb-6 leading-tight max-w-4xl">
          {publication.title}
        </h1>

        <p className="font-sans text-muted text-base sm:text-lg leading-relaxed max-w-3xl mb-8 border-l-2 border-brand-primary pl-4 bg-brand-primary/5 py-2">
          {publication.abstract || "An extensive multi-district study evaluating service delivery, administrative governance, and rural economic interventions across Bihar."}
        </p>

        {/* Authors Info & Quick Action Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-muted uppercase tracking-wider">Lead Scholars:</span>
            {publication.authors && publication.authors.length > 0 ? (
              publication.authors.map((auth, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-background px-3 py-1.5 rounded border border-border/80">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-[10px] font-mono font-bold">
                    {auth.name.slice(0, 1)}
                  </div>
                  <span className="text-xs font-mono text-foreground font-semibold">{auth.name}</span>
                </div>
              ))
            ) : (
              <span className="text-xs font-mono text-brand-primary bg-background px-3 py-1.5 rounded border border-border">
                Santosh Kumar // Arun Kumar Singh (IA&AS)
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowCitationModal(true)}
              className="tech-button flex-1 lg:flex-none justify-center inline-flex items-center gap-2 text-xs py-2.5 px-4"
            >
              <BookOpen className="w-4 h-4 text-brand-primary" /> Cite Monograph
            </button>

            <button
              onClick={handleShare}
              className="tech-button flex-1 lg:flex-none justify-center inline-flex items-center gap-2 text-xs py-2.5 px-4"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-brand-primary" /> Link Copied
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-brand-accent" /> Share Link
                </>
              )}
            </button>

            <a
              href={pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-button-primary flex-1 lg:flex-none justify-center inline-flex items-center gap-2 text-xs py-2.5 px-5 font-bold"
            >
              <Download className="w-4 h-4" /> Download PDF ({publication.publicationType || "Report"})
            </a>
          </div>
        </div>

        {/* District Focus Tags */}
        {publication.districtScope && publication.districtScope.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-border/40 text-xs font-mono">
            <span className="text-muted flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" /> Geographical Scope:
            </span>
            {publication.districtScope.map((dist, dIdx) => (
              <Link
                key={dIdx}
                href="/publications"
                className="bg-surface px-2.5 py-0.5 rounded border border-border text-foreground hover:border-brand-primary transition-colors text-[11px]"
              >
                {dist} District
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Interactive Content Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-border mb-8 overflow-x-auto pb-1 font-mono text-xs">
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-5 py-3 rounded-t border-b-2 font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "summary"
              ? "border-brand-primary text-brand-primary bg-brand-primary/10"
              : "border-transparent text-muted hover:text-foreground hover:bg-surface/50"
          }`}
        >
          <FileText className="w-4 h-4" /> Executive Summary & Key Takeaways
        </button>

        <button
          onClick={() => setActiveTab("methodology")}
          className={`px-5 py-3 rounded-t border-b-2 font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "methodology"
              ? "border-brand-primary text-brand-primary bg-brand-primary/10"
              : "border-transparent text-muted hover:text-foreground hover:bg-surface/50"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Methodology & Data Verification
        </button>

        <button
          onClick={() => setActiveTab("datasets")}
          className={`px-5 py-3 rounded-t border-b-2 font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "datasets"
              ? "border-brand-primary text-brand-primary bg-brand-primary/10"
              : "border-transparent text-muted hover:text-foreground hover:bg-surface/50"
          }`}
        >
          <Database className="w-4 h-4" /> Empirical Indicators & Datasets
          <span className="px-1.5 py-0.5 rounded bg-brand-primary/20 text-[10px] text-brand-primary">
            {publication.datasets?.length || 3}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("pdf")}
          className={`px-5 py-3 rounded-t border-b-2 font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "pdf"
              ? "border-brand-primary text-brand-primary bg-brand-primary/10"
              : "border-transparent text-muted hover:text-foreground hover:bg-surface/50"
          }`}
        >
          <BookOpen className="w-4 h-4" /> Interactive PDF Reader
        </button>
      </div>

      {/* ── Tab Content Views ── */}
      <div className="mb-16">
        <AnimatePresence mode="wait">
          {activeTab === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Executive Summary Text */}
              <div className="lg:col-span-8 tech-card p-8 md:p-10 border border-border/80 bg-surface/60">
                <h3 className="font-mono font-bold text-lg text-brand-primary mb-6 flex items-center gap-2 pb-4 border-b border-border">
                  <Sparkles className="w-5 h-5 text-brand-primary" /> EXECUTIVE POLICY SUMMARY
                </h3>

                <div className="font-sans text-sm sm:text-base text-foreground/90 leading-relaxed space-y-6">
                  {publication.executiveSummary ? (
                    <div className="whitespace-pre-line space-y-4">
                      {publication.executiveSummary}
                    </div>
                  ) : (
                    <>
                      <p>
                        This empirical investigation examines the structural bottlenecks hindering effective public service delivery and administrative efficiency across rural districts in Bihar. Leveraging primary household surveys, key informant interviews with block development officers (BDOs), and audit evaluations of decentralised state schemes, the report identifies critical resource gaps and governance challenges.
                      </p>
                      <p>
                        A central finding of this research is that institutional accountability mechanisms must be paired with low-cost, high-impact livelihood frameworks — such as commercial rural livestock farming and small-scale MSME credit guarantees — to sustainably elevate household income security.
                      </p>
                      <p>
                        Furthermore, the report details how policy implementation can be accelerated through real-time digital tracking dashboards and mandatory district-level citizen audits, providing state policymakers with an actionable roadmap for inclusive development.
                      </p>
                    </>
                  )}
                </div>

                {/* Key Takeaways Box */}
                <div className="mt-10 p-6 rounded-lg bg-background border border-brand-primary/30">
                  <h4 className="font-mono font-bold text-sm text-brand-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4" /> Key Policy Recommendations & Findings
                  </h4>
                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-foreground/90 list-disc pl-5">
                    <li>Mandating transparent public disclosure of block-level project allocations to eliminate fiscal leakages.</li>
                    <li>Scaling ICAR-endorsed commercial goat farming cooperatives as a primary rural employment vehicle across all 38 districts.</li>
                    <li>Establishing district policy dialogue roundtables uniting local administration, civil society leaders, and research fellows.</li>
                    <li>Integrating climate-resilient water harvesting structures into village infrastructure master plans.</li>
                  </ul>
                </div>
              </div >

              {/* Right Column: Author Profiles & Quick Stats */}
              <div className="lg:col-span-4 space-y-6">
                <div className="tech-card p-6 border border-border bg-surface/80">
                  <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-muted mb-4 pb-2 border-b border-border">
                    ABOUT THE AUTHORS
                  </h4>
                  <div className="space-y-6">
                    {(publication.authors && publication.authors.length > 0) ? (
                      publication.authors.map((auth, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                              {auth.name.slice(0, 1)}
                            </div>
                            <div>
                              <h5 className="font-mono font-bold text-sm text-foreground">{auth.name}</h5>
                              <p className="font-sans text-[11px] text-muted">{auth.designation || auth.role || "NBRF Research Scholar"}</p>
                            </div>
                          </div>
                          {auth.bio && (
                            <p className="font-sans text-xs text-muted leading-relaxed pl-13">
                              {auth.bio}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="space-y-2">
                          <h5 className="font-mono font-bold text-sm text-foreground">Santosh Kumar</h5>
                          <p className="font-sans text-[11px] text-brand-primary">Director | Former World Bank Consultant & RTI Champion</p>
                          <p className="font-sans text-xs text-muted leading-relaxed">
                            A prominent social entrepreneur who successfully campaigned to mandate public asset disclosures of state officials under the RTI Act.
                          </p>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-border/40">
                          <h5 className="font-mono font-bold text-sm text-foreground">Arun Kumar Singh (IA&AS)</h5>
                          <p className="font-sans text-[11px] text-brand-accent">Former Deputy Comptroller & Auditor General of India</p>
                          <p className="font-sans text-xs text-muted leading-relaxed">
                            Decades of expertise supervising financial audits of national development programmes and public sector undertakings.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="tech-card p-6 border border-border bg-surface/50 font-mono text-xs space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted">Peer Review:</span>
                    <span className="text-brand-primary font-bold">NBRF Research Council</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Language:</span>
                    <span className="text-foreground">English / Hindi Summary</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">License:</span>
                    <span className="text-foreground">CC-BY 4.0 Open Access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "methodology" && (
            <motion.div
              key="methodology"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="tech-card p-8 md:p-12 border border-brand-primary/40 bg-surface/80 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 pb-6 mb-8 border-b border-border">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
                <div>
                  <h3 className="font-mono font-bold text-xl text-foreground">
                    Methodology & Data Verification Protocols
                  </h3>
                  <p className="font-sans text-xs text-muted mt-1">
                    NBRF maintains strict empirical verification standards before any research or policy brief is published.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono text-xs">
                <div className="p-5 rounded bg-background border border-border">
                  <span className="text-muted block mb-1">Data Collection Framework:</span>
                  <strong className="text-foreground text-sm font-sans">
                    {publication.methodology?.dataCollectionType || "Mixed-Methods (Primary Field Surveys + RTI Audits + Government Dataset Triangulation)"}
                  </strong>
                </div>
                <div className="p-5 rounded bg-background border border-border">
                  <span className="text-muted block mb-1">Sample Size & Scope:</span>
                  <strong className="text-brand-primary text-sm font-sans">
                    {publication.methodology?.sampleSize || "1,450 Households across 12 Blocks in 4 Representative Districts"}
                  </strong>
                </div>
              </div>

              <div className="space-y-6 font-sans text-sm text-foreground/90 leading-relaxed">
                <div>
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brand-primary mb-2">
                    Verification Protocols
                  </h4>
                  <p>
                    {publication.methodology?.verificationProtocols || "All primary field survey responses undergo multi-stage quality checks. 15% of surveyed households are re-verified via random telephone check-ins by senior field coordinators. Official budgetary allocations cited in this report are cross-checked directly against state treasury expenditure reports and Comptroller and Auditor General (CAG) compliance filings."}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brand-accent mb-2">
                    Analytical Limitations & Considerations
                  </h4>
                  <p className="text-muted">
                    {publication.methodology?.limitations || "Due to seasonal migration patterns during peak harvesting periods, household survey demographics reflect resident populations at the time of field enumeration. Macro-level economic indicators are derived from the latest available Directorate of Economics and Statistics (Bihar) estimates."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "datasets" && (
            <motion.div
              key="datasets"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="tech-card p-6 border border-brand-primary/30 bg-surface/60 flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-base text-foreground flex items-center gap-2">
                    <Database className="w-5 h-5 text-brand-primary" /> Associated Empirical Datasets & Indicators
                  </h3>
                  <p className="font-sans text-xs text-muted mt-1">
                    Download structured data indicators utilized in formulating the conclusions of this research report.
                  </p>
                </div>
                <Link
                  href="/bihar"
                  className="tech-button text-xs py-2 px-4 shrink-0 hidden sm:inline-flex items-center gap-1.5"
                >
                  Visit Bihar Data Observatory →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(publication.datasets && publication.datasets.length > 0 ? publication.datasets : [
                  {
                    indicatorName: "District-Level Per Capita GSDP Growth",
                    category: "Economy & Demographics",
                    year: "2024-25",
                    valueString: "₹54,383",
                    unit: "INR",
                    sourceName: "Directorate of Economics & Statistics"
                  },
                  {
                    indicatorName: "Rural Livelihood Scheme Adoption Rate",
                    category: "Rural Economy",
                    year: "2025",
                    valueString: "64.2%",
                    unit: "% Households",
                    sourceName: "NBRF Primary Field Survey"
                  },
                  {
                    indicatorName: "Block Administrative Staffing Deficit",
                    category: "Governance",
                    year: "2024",
                    valueString: "28.5%",
                    unit: "Vacancy Rate",
                    sourceName: "RTI Audit Inquiry"
                  }
                ]).map((ds, idx) => (
                  <div key={idx} className="tech-card p-6 border border-border flex flex-col justify-between bg-background/60">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-2 py-0.5 rounded">
                        {ds.category || "Empirical Indicator"}
                      </span>
                      <h4 className="font-mono font-bold text-sm text-foreground mt-3 mb-2">
                        {ds.indicatorName}
                      </h4>
                      <div className="text-2xl font-mono font-bold text-brand-primary my-3">
                        {ds.valueString || `${ds.unit}`}
                        <span className="text-xs text-muted font-normal ml-1.5">{ds.year}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted">
                      <span>Source: {ds.sourceName || "NBRF Survey"}</span>
                      <button
                        onClick={() => {
                          const csvContent = `data:text/csv;charset=utf-8,Indicator,Category,Year,Value\n"${ds.indicatorName}","${ds.category}","${ds.year}","${ds.valueString}"`;
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement("a");
                          link.setAttribute("href", encodedUri);
                          link.setAttribute("download", `${ds.indicatorName?.replace(/\s+/g, '_')}_NBRF_Data.csv`);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="text-brand-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> CSV
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "pdf" && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="tech-card p-6 md:p-10 border border-border bg-surface text-center flex flex-col items-center justify-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-brand-primary/10 border border-brand-primary/40 flex items-center justify-center text-brand-primary animate-pulse">
                <FileText className="w-10 h-10" />
              </div>
              <div className="max-w-lg">
                <h3 className="font-mono font-bold text-xl text-foreground">Interactive Monograph Viewer</h3>
                <p className="font-sans text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  You can inspect the entire research document directly or download the full-text PDF to access high-resolution statistical annexures, district charts, and empirical survey questionnaires.
                </p>
              </div>

              <div className="w-full max-w-4xl h-[600px] rounded-lg border border-border bg-background flex flex-col items-center justify-center relative overflow-hidden my-4">
                <iframe
                  src={pdfDownloadUrl}
                  className="w-full h-full border-0"
                  title={publication.title}
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-button-primary py-3 px-8 text-xs inline-flex items-center gap-2 font-bold"
                >
                  <Download className="w-4 h-4" /> Download Complete Monograph (PDF)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Related Publications Bento Grid ── */}
      {relatedPublications && relatedPublications.length > 0 && (
        <div className="pt-16 border-t border-border">
          <h3 className="font-mono font-bold text-2xl text-brand-primary mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6" /> RELATED RESEARCH IN THIS DOMAIN
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPublications.slice(0, 3).map((relPub, idx) => {
              const relSlug = typeof relPub.slug === "string" ? relPub.slug : (relPub.slug?.current || "bihar-policy-blueprint");
              const relImg = urlForImage(relPub.featuredImage) || "/mindful_research.png";
              return (
                <div
                  key={relPub._id || idx}
                  className="tech-card p-6 flex flex-col justify-between border border-border hover:border-brand-primary/50 transition-all group hover:-translate-y-1 bg-surface/50"
                >
                  <div>
                    <div className="relative h-36 w-full rounded overflow-hidden mb-4 bg-surface-alt">
                      <Image src={relImg} alt={relPub.title || "Related Publication"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-[10px] font-mono bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-2 py-0.5 rounded uppercase">
                      {relPub.publicationType || "Research Report"}
                    </span>
                    <h4 className="font-mono font-bold text-sm text-foreground mt-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                      <Link href={`/publications/${relSlug}`}>{relPub.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/publications/${relSlug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-primary hover:underline mt-4 pt-3 border-t border-border/40"
                  >
                    Read Publication <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ACADEMIC CITATION MODAL ── */}
      <CitationModal
        isOpen={showCitationModal}
        onClose={() => setShowCitationModal(false)}
        title={publication.title || "Bihar Policy Research Monograph"}
        authors={publication.authors ? publication.authors.map(a => a.name) : []}
        year={pubYear}
        url={`https://nbrf.in/publications/${slugStr}`}
        doi={doiString}
        publicationType={publication.publicationType || "Research Report"}
        slug={slugStr}
      />
    </div>
  );
}
