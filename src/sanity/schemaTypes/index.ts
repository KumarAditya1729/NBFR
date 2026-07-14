import type { SchemaTypeDefinition } from 'sanity'

import { seoType } from './seo'
import { citationType } from './citation'
import { authorType } from './author'
import { expertType } from './expert'
import { methodologyType } from './methodology'
import { researchVerticalType } from './researchVertical'
import { partnerType } from './partner'
import { biharDatasetType } from './biharDataset'
import { districtFactsheetType } from './districtFactsheet'
import { eventType } from './event'
import { publicationType } from './publication'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seoType,
    citationType,
    authorType,
    expertType,
    methodologyType,
    researchVerticalType,
    partnerType,
    biharDatasetType,
    districtFactsheetType,
    eventType,
    publicationType,
  ],
}
