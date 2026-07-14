import { defineField, defineType } from 'sanity'

export const citationType = defineType({
  name: 'citationObject',
  title: 'Citation Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'doi',
      title: 'Digital Object Identifier (DOI)',
      type: 'string',
      description: 'e.g., 10.1016/j.nbrf.2026.04.001',
    }),
    defineField({
      name: 'apaCitation',
      title: 'APA Formatted String',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mlaCitation',
      title: 'MLA Formatted String',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'chicagoCitation',
      title: 'Chicago Formatted String',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'bibtexString',
      title: 'BibTeX Code',
      type: 'text',
      rows: 4,
    }),
  ],
})
