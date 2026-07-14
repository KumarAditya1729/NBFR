import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import {
  PUBLICATION_BY_SLUG_QUERY,
  ALL_PUBLICATIONS_QUERY
} from "@/sanity/lib/queries";
import PublicationDetailClient from "@/components/library/PublicationDetailClient";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { client } from "@/sanity/lib/client";

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<Array<{ slug: string }>>(
      `*[_type == "publication" && defined(slug.current)]{ "slug": slug.current }`
    );
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const publication = await sanityFetch<any>({
    query: PUBLICATION_BY_SLUG_QUERY,
    params: { slug },
    revalidate: 3600
  });

  const pubData = publication;

  if (!pubData) {
    return {
      title: "Publication Not Found | NBRF Research Repository",
      description: "The requested research document could not be found in the NBRF archive."
    };
  }

  const titleText = `${pubData.title} | NBRF Research Repository`;
  const descText = pubData.abstract || "Rigorous, multi-district empirical public policy research for Bihar.";

  return {
    title: titleText,
    description: descText,
    openGraph: {
      title: pubData.title,
      description: descText,
      url: `https://nbrf.in/publications/${slug}`,
      siteName: "Nav Bihar Renaissance Foundation",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pubData.title,
      description: descText
    }
  };
}

export default async function PublicationDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [publication, allPublications] = await Promise.all([
    sanityFetch<any>({
      query: PUBLICATION_BY_SLUG_QUERY,
      params: { slug },
      revalidate: 3600
    }),
    sanityFetch<any[]>({
      query: ALL_PUBLICATIONS_QUERY,
      revalidate: 3600
    })
  ]);

  const pubData = publication;

  if (!pubData) {
    notFound();
  }

  const relatedList = (allPublications && allPublications.length > 0)
    ? allPublications.filter(p => (typeof p.slug === "string" ? p.slug : p.slug?.current) !== slug)
    : [];

  const scholarlyArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pubData.title,
    description: pubData.abstract || "Rigorous public policy monograph on Bihar.",
    author: pubData.authors && pubData.authors.length > 0
      ? pubData.authors.map((a: any) => ({ "@type": "Person", name: a.name }))
      : [{ "@type": "Organization", name: "Nav Bihar Renaissance Foundation Research Council" }],
    datePublished: pubData.publishDate || "2026-01-01",
    publisher: {
      "@type": "Organization",
      name: "Nav Bihar Renaissance Foundation (NBRF)",
      url: "https://nbrf.in",
    },
    url: `https://nbrf.in/publications/${slug}`,
    inLanguage: "en-IN",
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-brand-primary pb-24 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />
      {/* Background Decorative Lighting */}
      <div className="absolute inset-0 h-[600px] bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        {/* Navigation Breadcrumb & Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded border border-border/60 bg-surface/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Research Library Hub
          </Link>

          <span className="text-xs font-mono text-muted flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-primary" /> NBRF Monograph Archive // Open Access
          </span>
        </div>

        {/* ── Interactive Detail Client View ── */}
        <PublicationDetailClient
          publication={pubData}
          relatedPublications={relatedList}
        />
      </div>
    </main>
  );
}
