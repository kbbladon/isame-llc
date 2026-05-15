import type { Block } from 'payload'

export const FeatureSectionBlock: Block = {
  slug: 'feature-section',
  labels: {
    singular: 'Feature Section',
    plural: 'Feature Sections',
  },
  fields: [
    // ---------- SECTION HEADING ----------
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      localized: true,
      defaultValue: 'The Isame Difference',
    },
    {
      name: 'headingColor',
      type: 'text',
      label: 'Heading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      localized: true,
      defaultValue: 'Experience debt collection that combines professionalism with compassion',
    },
    {
      name: 'subheadingColor',
      type: 'text',
      label: 'Subheading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },

    // ---------- LAYOUT & BACKGROUND ----------
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Desktop Columns',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },

    // ---------- FEATURE ITEMS ----------
    {
      name: 'features',
      type: 'array',
      label: 'Feature Items',
      minRows: 1,
      maxRows: 12,
      fields: [
        // Icon settings
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Heart', value: 'heart' },
            { label: 'File Text', value: 'fileText' },
            { label: 'Users', value: 'users' },
            { label: 'Star', value: 'star' },
            { label: 'Shield', value: 'shield' },
            { label: 'Award', value: 'award' },
            { label: 'Badge Check', value: 'badgeCheck' },
            { label: 'Thumbs Up', value: 'thumbsUp' },
            { label: 'Globe', value: 'globe' },
            { label: 'Briefcase', value: 'briefcase' },
            { label: 'Handshake', value: 'handshake' },
          ],
          required: true,
        },
        // Content (localized)
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
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
        // Per‑card colours (override theme)
        {
          type: 'collapsible',
          label: '🎨 Card Colours (optional)',
          fields: [
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
            {
              name: 'cardBgColor',
              type: 'text',
              label: 'Card Background',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
            {
              name: 'cardBorderColor',
              type: 'text',
              label: 'Card Border Colour',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
            {
              name: 'iconBgColor',
              type: 'text',
              label: 'Icon Circle Background',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
            {
              name: 'iconColor',
              type: 'text',
              label: 'Icon Colour (inside)',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
          ],
        },
      ],
    },

    // ---------- ANIMATION TOGGLE ----------
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animations',
      defaultValue: true,
    },
  ],
}
