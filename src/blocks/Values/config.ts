import type { Block } from 'payload'

export const ValuesBlock: Block = {
  slug: 'values',
  labels: { singular: 'Values Section', plural: 'Values Sections' },
  fields: [
    // Section background – prominent at the top
    {
      name: 'sectionBackgroundColor',
      type: 'text',
      label: 'Section Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for theme default.',
      },
    },
    // Heading
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
      required: true,
      defaultValue: 'Our Values',
    },
    {
      name: 'headingColor',
      type: 'text',
      label: 'Heading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    // Subheading
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      localized: true,
      defaultValue: 'The principles that guide everything we do',
    },
    {
      name: 'subheadingColor',
      type: 'text',
      label: 'Subheading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    // Value cards
    {
      name: 'values',
      type: 'array',
      label: 'Value Cards',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Heart', value: 'heart' },
            { label: 'Award', value: 'award' },
            { label: 'Target', value: 'target' },
            { label: 'Globe', value: 'globe' },
            { label: 'Star', value: 'star' },
            { label: 'Shield', value: 'shield' },
            { label: 'Thumbs Up', value: 'thumbsUp' },
            { label: 'Briefcase', value: 'briefcase' },
            { label: 'Handshake', value: 'handshake' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
          required: true,
        },
        // Per‑card colour overrides
        {
          name: 'cardBackgroundColor',
          type: 'text',
          label: 'Card Background Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'iconBackgroundColor',
          type: 'text',
          label: 'Icon Circle Background',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'iconColor',
          type: 'text',
          label: 'Icon Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'titleColor',
          type: 'text',
          label: 'Title Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'descriptionColor',
          type: 'text',
          label: 'Description Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
      ],
    },
    // Animation toggle
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animation',
      defaultValue: true,
    },
  ],
}
