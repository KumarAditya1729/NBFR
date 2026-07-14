import { defineField, defineType } from 'sanity'

export const districtFactsheetType = defineType({
  name: 'districtFactsheet',
  title: 'District Factsheet',
  type: 'document',
  fields: [
    defineField({
      name: 'districtName',
      title: 'District Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'districtName',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Administrative Division',
      type: 'string',
      options: {
        list: [
          { title: 'Patna Division', value: 'Patna Division' },
          { title: 'Tirhut Division', value: 'Tirhut Division' },
          { title: 'Saran Division', value: 'Saran Division' },
          { title: 'Darbhanga Division', value: 'Darbhanga Division' },
          { title: 'Kosi Division', value: 'Kosi Division' },
          { title: 'Purnia Division', value: 'Purnia Division' },
          { title: 'Bhagalpur Division', value: 'Bhagalpur Division' },
          { title: 'Munger Division', value: 'Munger Division' },
          { title: 'Magadh Division', value: 'Magadh Division' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headquarters',
      title: 'District Headquarters',
      type: 'string',
    }),
    defineField({
      name: 'population',
      title: 'Population Summary',
      type: 'string',
    }),
    defineField({
      name: 'literacyRate',
      title: 'Literacy Rate (%)',
      type: 'string',
    }),
    defineField({
      name: 'areaSqKm',
      title: 'Area (Sq. Km)',
      type: 'string',
    }),
    defineField({
      name: 'economicOverview',
      title: 'Economic Overview & Key Strengths',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featuredImage',
      title: 'District Map / Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'datasets',
      title: 'Related Datasets & Indicators',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'biharDataset' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'districtName',
      subtitle: 'division',
      media: 'featuredImage',
    },
  },
})
