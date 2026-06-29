import type { SchemaTypeDefinition } from 'sanity'

import { eventType } from './event'
import { expertType } from './expert'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, expertType],
}
