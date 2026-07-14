import { defineField, defineType } from 'sanity'

export const partnerType = defineType({
  name: 'partner',
  title: 'Partner / Collaborator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Partnership Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Knowledge Partner', value: 'Knowledge Partner' },
          { title: 'Academic Partner', value: 'Academic Partner' },
          { title: 'Institutional Collaborator', value: 'Institutional Collaborator' },
          { title: 'Policy Stakeholder', value: 'Policy Stakeholder' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Organization Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Collaboration Focus / Summary',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tier',
      media: 'logo',
    },
  },
})
