import { defineField, defineType } from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Research Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Publication Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 120,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicationType',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Research Report', value: 'Research Report' },
          { title: 'Policy Brief', value: 'Policy Brief' },
          { title: 'Working Paper', value: 'Working Paper' },
          { title: 'Survey & Field Study', value: 'Survey & Field Study' },
          { title: 'Book Chapter / Monograph', value: 'Book Chapter / Monograph' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract / Summary',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'executiveSummary',
      title: 'Executive Summary Details',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'authors',
      title: 'Authors & Co-Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'expert' }, { type: 'author' }] }],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publication Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
    }),
    defineField({
      name: 'districtScope',
      title: 'District / Geographic Scope',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add All Bihar or specific district names',
    }),
    defineField({
      name: 'researchVertical',
      title: 'Research Vertical / Centre',
      type: 'reference',
      to: [{ type: 'researchVertical' }],
    }),
    defineField({
      name: 'pdfFile',
      title: 'Upload Report PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'pdfUrl',
      title: 'External PDF Mirror URL (Optional)',
      type: 'url',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Cover Image / Graphic',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'citation',
      title: 'Citation Data',
      type: 'citationObject',
    }),
    defineField({
      name: 'methodology',
      title: 'Research Methodology Details',
      type: 'reference',
      to: [{ type: 'methodology' }],
    }),
    defineField({
      name: 'datasets',
      title: 'Attached Datasets & Indicators',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'biharDataset' }] }],
    }),
    defineField({
      name: 'status',
      title: 'Editorial Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'Draft' },
          { title: 'Under Fact-Check Review', value: 'Under Review' },
          { title: 'Published & Live', value: 'Published' },
          { title: 'Archived', value: 'Archived' },
        ],
      },
      initialValue: 'Published',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Cards',
      type: 'seoObject',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publicationType',
      media: 'featuredImage',
    },
  },
})
