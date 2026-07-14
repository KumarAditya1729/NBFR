import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const imageBuilder = projectId ? createImageUrlBuilder({ projectId, dataset: dataset || 'production' }) : null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any): string | null => {
  if (!source || !imageBuilder) return null
  if (typeof source === 'string') return source
  try {
    return imageBuilder.image(source).auto('format').fit('max').url()
  } catch {
    return null
  }
}
