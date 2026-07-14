import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'
export const client = createClient({
  apiVersion: apiVersion || '2024-01-01',
  dataset: dataset || 'production',
  projectId: projectId || 'demo-project-id',
  useCdn: useCdn ?? true,
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  const isRealSanityConfigured = Boolean(projectId && projectId !== 'demo-project-id' && projectId.length > 3)

  if (isRealSanityConfigured) {
    try {
      const data = await client.fetch<T>(query, params, {
        next: {
          revalidate,
          tags,
        },
      })
      return data
    } catch (error) {
      console.warn('Sanity fetch failed:', error)
    }
  }

  return [] as unknown as T
}
