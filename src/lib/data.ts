// ─── Type Interfaces ───────────────────────────────────

export interface Publication {
  _id?: string;
  id?: string;
  title: string;
  slug?: { current: string } | string;
  publicationType?: string | null;
  abstract?: string | null;
  publishDate?: string | null;
  districtScope?: string[];
  researchVertical?: { title: string; slug?: { current: string } | string | null; iconName?: string | null } | null;
  authors?: Array<{ _id?: string; id?: string; name: string; designation?: string | null }>;
  featuredImage?: unknown;
  pdfFileUrl?: string | null;
  pdfUrl?: string | null;
  seo?: { metaTitle?: string | null; metaDescription?: string | null };
}

export interface Expert {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  category: 'board' | 'management' | string;
  bio: string;
  image?: unknown;
  hash?: string;
}

export interface EventItem {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  type: string;
  image?: unknown;
}

export interface Partner {
  _id?: string;
  id?: string;
  name: string;
  tier: string;
  description?: string | null;
  websiteUrl?: string | null;
  logo?: unknown;
}

export interface ResearchVertical {
  _id?: string;
  id?: string;
  title: string;
  slug?: { current: string } | string | null;
  shortDescription: string;
  iconName: string | null;
  activeProjectsCount?: number | null;
}

export interface BiharDataset {
  _id?: string;
  id?: string;
  indicatorName: string;
  slug?: { current: string } | string;
  category: string;
  year: string;
  valueString: string;
  numericValue?: number | null;
  unit?: string | null;
  district?: string | null;
  sourceName: string;
  verifiedBy?: string | null;
  methodologyNotes?: string | null;
}

export interface DistrictFactsheet {
  _id?: string;
  id?: string;
  districtName: string;
  slug?: { current: string } | string;
  division?: string | null;
  headquarter?: string | null;
  areaSqKm?: number | null;
  population?: string | null;
  literacyRate?: string | null;
  sexRatio?: string | null;
  perCapitaIncome?: string | null;
  agricultureFocus?: string | null;
  keyChallenge?: string | null;
  topOpportunity?: string | null;
  geometryCoordinates?: string | null;
}

export interface SiteSettings {
  aboutText?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
}

export interface Insight {
  _id?: string;
  id?: string;
  title: string;
  date?: string | null;
  createdAt?: Date;
  excerpt?: string | null;
  slug?: { current: string } | string | null;
  type?: string | null;
  author?: string | null;
  link?: string | null;
}

export interface MembershipProgram {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  benefits?: string[];
  iconName?: string | null;
}

export interface MediaMention {
  _id?: string;
  id?: string;
  headline: string;
  source: string;
  date?: string | null;
  createdAt?: Date;
  url: string;
}

export interface TimelineEvent {
  _id?: string;
  id?: string;
  year: string;
  title: string;
  description: string;
  category?: string | null;
}

export interface ImpactStat {
  _id?: string;
  id?: string;
  label: string;
  value: string;
  icon?: string;
  iconName?: string | null;
  description?: string | null;
}

export interface FocusArea {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  icon?: string;
  iconName?: string | null;
}

// ─── Fallback Data ────────────────────────────────────────────────────
export const FALLBACK_EXPERTS: Expert[] = [];
export const FALLBACK_PUBLICATIONS: Publication[] = [];
export const FALLBACK_EVENTS: EventItem[] = [];
export const FALLBACK_PARTNERS: Partner[] = [];
export const FALLBACK_VERTICALS: ResearchVertical[] = [];
export const FALLBACK_DATASETS: BiharDataset[] = [];
export const FALLBACK_DISTRICTS: DistrictFactsheet[] = [];
