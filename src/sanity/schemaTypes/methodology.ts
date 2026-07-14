import { defineField, defineType } from 'sanity'

export const methodologyType = defineType({
  name: 'methodology',
  title: 'Research Methodology',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Methodology Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary of Methodology',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'dataCollectionType',
      title: 'Data Collection Type',
      type: 'string',
      options: {
        list: [
          { title: 'Primary Field Survey', value: 'Primary Field Survey' },
          { title: 'Secondary Data Synthesis', value: 'Secondary Data Synthesis' },
          { title: 'Mixed Methods Framework', value: 'Mixed Methods Framework' },
          { title: 'Econometric Modeling', value: 'Econometric Modeling' },
          { title: 'Qualitative Policy Audit', value: 'Qualitative Policy Audit' },
        ],
      },
    }),
    defineField({
      name: 'sampleSize',
      title: 'Sample Size & Scope',
      type: 'string',
      description: 'e.g., 5,200 households across 12 districts',
    }),
    defineField({
      name: 'districtsCovered',
      title: 'Districts Covered in Study',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'verificationProtocols',
      title: 'Verification & Fact-Check Protocols',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'limitations',
      title: 'Known Limitations / Assumptions',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dataCollectionType',
    },
  },
})
