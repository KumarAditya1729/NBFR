import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { ALL_PUBLICATIONS_QUERY } from '@/sanity/lib/queries'
import type { Publication } from '@/sanity/lib/fallbackData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nbrf.in'

  // Dynamic publications fetching for sitemap indexing
  const publications = await sanityFetch<Publication[]>({
    query: ALL_PUBLICATIONS_QUERY,
    revalidate: 3600,
  }).catch(() => [])

  const publicationRoutes: MetadataRoute.Sitemap = (publications || []).map((pub) => {
    const slugStr = typeof pub.slug === 'string' ? pub.slug : pub.slug?.current || ''
    return {
      url: `${baseUrl}/publications/${slugStr}`,
      lastModified: pub.publishDate ? new Date(pub.publishDate) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    }
  })

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bihar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/snapshot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  return [...staticRoutes, ...publicationRoutes]
}
