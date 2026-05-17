import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    // ---------- SECTION BACKGROUND ----------
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },
    // ---------- HEADING & SUBHEADING ----------
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      localized: true,
      defaultValue: 'Support from the Business Community',
    },
    {
      name: 'headingColor',
      type: 'text',
      label: 'Heading Color',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      localized: true,
      defaultValue: 'Trusted by Belizean businesses across all sectors',
    },
    {
      name: 'subheadingColor',
      type: 'text',
      label: 'Subheading Color',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
      },
    },
    // ---------- TESTIMONIALS ----------
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          localized: true,
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author Name',
          localized: true,
          required: true,
        },
        {
          name: 'business',
          type: 'text',
          label: 'Business / Location',
          localized: true,
        },
        // Card & text colours (optional overrides)
        {
          type: 'collapsible',
          label: '🎨 Card Colours (optional)',
          fields: [
            {
              name: 'quoteIconColor',
              type: 'text',
              label: 'Quote Icon Color',
              admin: {
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'cardBgColor',
              type: 'text',
              label: 'Card Background Color',
              admin: {
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'cardBorderColor',
              type: 'text',
              label: 'Card Border Color',
              admin: {
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'authorColor',
              type: 'text',
              label: 'Author Text Color',
              admin: {
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
            {
              name: 'businessColor',
              type: 'text',
              label: 'Business Text Color',
              admin: {
                components: { Field: '@/components/ThemeColorPicker#default' },
              },
            },
          ],
        },
      ],
    },
    // ---------- COLUMNS ----------
    {
      name: 'columns',
      type: 'select',
      label: 'Desktop Columns',
      defaultValue: '2',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    // ---------- CTA ----------
    {
      type: 'collapsible',
      label: '🔘 Call to Action (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Label',
          localized: true,
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'CTA URL',
        },
        {
          name: 'ctaNewTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
        {
          name: 'ctaBgColor',
          type: 'text',
          label: 'CTA Background Color',
          admin: {
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
        {
          name: 'ctaTextColor',
          type: 'text',
          label: 'CTA Text Color',
          admin: {
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
      ],
    },
    // ---------- ANIMATION ----------
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animation',
      defaultValue: true,
    },
  ],
}
