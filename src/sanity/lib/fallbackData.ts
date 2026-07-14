// ─── Type Interfaces (kept for TypeScript) ───────────────────────────────────

export interface Publication {
  _id: string
  title: string
  slug: { current: string }
  publicationType: string
  abstract: string
  publishDate: string
  districtScope?: string[]
  authors?: Array<{ _id: string; name: string; designation?: string }>
  featuredImage?: unknown
  pdfUrl?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

export interface Expert {
  _id: string
  name: string
  role: string
  category: 'board' | 'management'
  bio: string
  image?: unknown
  hash?: string
}

export interface EventItem {
  _id: string
  title: string
  date: string
  type: string
  image?: unknown
}

export interface Partner {
  _id: string
  name: string
  tier: string
  description?: string
  websiteUrl?: string
  logo?: unknown
}

export interface ResearchVertical {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  iconName: string
  activeProjectsCount?: number
}

export interface BiharDataset {
  _id: string
  indicatorName: string
  slug: { current: string }
  category: string
  year: string
  valueString: string
  numericValue?: number
  unit?: string
  district?: string
  sourceName: string
  verifiedBy?: string
  methodologyNotes?: string
}

export interface DistrictFactsheet {
  _id: string
  districtName: string
  slug?: { current: string } | string
  division?: string
  headquarter?: string
  areaSqKm?: number
  population?: string
  literacyRate?: string
  sexRatio?: string
  perCapitaIncome?: string
  agricultureFocus?: string
  keyChallenge?: string
  topOpportunity?: string
  geometryCoordinates?: string
}

// ─── Empty Fallback Arrays ────────────────────────────────────────────────────
// All demo data has been removed. Data is now served exclusively from Sanity CMS.
// Add real content via the Sanity Studio at /studio.

export const FALLBACK_EXPERTS: Expert[] = []
export const FALLBACK_PUBLICATIONS: Publication[] = []
export const FALLBACK_EVENTS: EventItem[] = []
export const FALLBACK_PARTNERS: Partner[] = []
export const FALLBACK_VERTICALS: ResearchVertical[] = []
export const FALLBACK_DATASETS: BiharDataset[] = []
export const FALLBACK_DISTRICTS: DistrictFactsheet[] = []
