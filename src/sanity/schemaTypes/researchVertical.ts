import { defineField, defineType } from 'sanity'

export const researchVerticalType = defineType({
  name: 'researchVertical',
  title: 'Research Vertical / Centre',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Vertical Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., FileText, Landmark, Users, TrendingUp, Leaf, HeartPulse, GraduationCap, Building2',
      initialValue: 'FileText',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Detailed Overview',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'leadExpert',
      title: 'Lead Expert / Director',
      type: 'reference',
      to: [{ type: 'expert' }, { type: 'author' }],
    }),
    defineField({
      name: 'activeProjectsCount',
      title: 'Active Projects Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoObject',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
    },
  },
})
