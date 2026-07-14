import { defineField, defineType } from 'sanity'

export const biharDatasetType = defineType({
  name: 'biharDataset',
  title: 'Bihar Dataset & Indicator',
  type: 'document',
  fields: [
    defineField({
      name: 'indicatorName',
      title: 'Indicator / Dataset Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'indicatorName',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Thematic Category',
      type: 'string',
      options: {
        list: [
          { title: 'Economy & GDP', value: 'Economy & GDP' },
          { title: 'Agriculture & Rural Livelihoods', value: 'Agriculture & Rural Livelihoods' },
          { title: 'Education & Literacy', value: 'Education & Literacy' },
          { title: 'Public Health & Nutrition', value: 'Public Health & Nutrition' },
          { title: 'MSME & Industrial Growth', value: 'MSME & Industrial Growth' },
          { title: 'Migration & Demographics', value: 'Migration & Demographics' },
          { title: 'Governance & Infrastructure', value: 'Governance & Infrastructure' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Data Year / Reference Period',
      type: 'string',
      description: 'e.g., 2023-24',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'valueString',
      title: 'Display Value String',
      type: 'string',
      description: 'e.g., ₹54,383 or 61.8% or 10.42 Lakh',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'numericValue',
      title: 'Numeric Value (for Charting)',
      type: 'number',
    }),
    defineField({
      name: 'unit',
      title: 'Measurement Unit',
      type: 'string',
      description: 'e.g., INR, %, Thousands, Score',
    }),
    defineField({
      name: 'district',
      title: 'District Scope',
      type: 'string',
      description: 'State-Level or specific district name like Patna, Gaya, Muzaffarpur',
      initialValue: 'State-Level',
    }),
    defineField({
      name: 'sourceName',
      title: 'Official Source Name',
      type: 'string',
      description: 'e.g., Economic Survey of Bihar 2023-24, NITI Aayog SDG Index',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source Verification Link',
      type: 'url',
    }),
    defineField({
      name: 'verifiedBy',
      title: 'Verified By (Lab / Team)',
      type: 'string',
      initialValue: 'NBRF Economics & Policy Lab',
    }),
    defineField({
      name: 'methodologyNotes',
      title: 'Methodology & Definition Notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'dataCsvFile',
      title: 'Downloadable Dataset File (CSV / Excel)',
      type: 'file',
      options: {
        accept: '.csv,.xlsx,.json',
      },
    }),
  ],
  preview: {
    select: {
      title: 'indicatorName',
      subtitle: 'valueString',
    },
  },
})
