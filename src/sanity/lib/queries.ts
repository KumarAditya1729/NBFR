import { groq } from 'next-sanity'

export const ALL_PUBLICATIONS_QUERY = groq`
  *[_type == "publication"] | order(publishDate desc) {
    _id,
    title,
    slug,
    publicationType,
    abstract,
    publishDate,
    districtScope,
    authors[]->{
      _id,
      name,
      designation,
      role
    },
    featuredImage,
    pdfUrl,
    seo
  }
`

export const RECENT_PUBLICATIONS_QUERY = groq`
  *[_type == "publication"] | order(publishDate desc)[0...4] {
    _id,
    title,
    slug,
    publicationType,
    abstract,
    publishDate,
    districtScope,
    authors[]->{
      _id,
      name,
      designation,
      role
    },
    featuredImage,
    pdfUrl
  }
`

export const PUBLICATION_BY_SLUG_QUERY = groq`
  *[_type == "publication" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publicationType,
    abstract,
    executiveSummary,
    publishDate,
    lastUpdated,
    districtScope,
    researchVertical->{
      title,
      slug,
      iconName
    },
    authors[]->{
      _id,
      name,
      designation,
      role,
      bio,
      image
    },
    "pdfFileUrl": pdfFile.asset->url,
    pdfUrl,
    featuredImage,
    citation,
    methodology->{
      title,
      summary,
      dataCollectionType,
      sampleSize,
      verificationProtocols,
      limitations
    },
    datasets[]->{
      _id,
      indicatorName,
      slug,
      category,
      year,
      valueString,
      unit,
      sourceName,
      sourceUrl,
      verifiedBy
    },
    seo
  }
`

export const ALL_EXPERTS_QUERY = groq`
  *[_type == "expert"] | order(name asc) {
    _id,
    name,
    role,
    category,
    bio,
    image,
    "hash": _id
  }
`

export const BOARD_EXPERTS_QUERY = groq`
  *[_type == "expert" && category == "board"] | order(name asc) {
    _id,
    name,
    role,
    category,
    bio,
    image,
    "hash": _id
  }
`

export const ALL_EVENTS_QUERY = groq`
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    type,
    image
  }
`

export const ALL_PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(name asc) {
    _id,
    name,
    tier,
    logo,
    websiteUrl,
    description
  }
`

export const ALL_VERTICALS_QUERY = groq`
  *[_type == "researchVertical"] | order(title asc) {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    iconName,
    activeProjectsCount,
    leadExpert->{
      name,
      role
    }
  }
`

export const ALL_DATASETS_QUERY = groq`
  *[_type == "biharDataset"] | order(indicatorName asc) {
    _id,
    indicatorName,
    slug,
    category,
    year,
    valueString,
    numericValue,
    unit,
    district,
    sourceName,
    sourceUrl,
    verifiedBy,
    methodologyNotes
  }
`

export const ALL_DISTRICTS_QUERY = groq`
  *[_type == "districtFactsheet"] | order(districtName asc) {
    _id,
    districtName,
    slug,
    division,
    headquarters,
    population,
    literacyRate,
    areaSqKm,
    economicOverview,
    featuredImage
  }
`

export const GLOBAL_SEARCH_QUERY = groq`
  *{
    _id,
    _type,
    title,
    name,
    indicatorName,
    slug,
    abstract,
    shortDescription,
    bio
  }[title match $searchTerm || name match $searchTerm || indicatorName match $searchTerm || abstract match $searchTerm][0...20]
`
