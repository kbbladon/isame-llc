import type { Block } from 'payload'

export const ServiceShowcaseBlock: Block = {
  slug: 'service-showcase',
  labels: {
    singular: 'Service Showcase',
    plural: 'Service Showcases',
  },
  fields: [
    // ============================================================
    // 🏗️ TOP HERO / HEADING AREA
    // ============================================================
    {
      name: 'topBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Top Section Background Image (optional)',
      admin: { description: 'Placed behind the heading and subheading.' },
    },
    {
      name: 'topBackgroundColor',
      type: 'text',
      label: 'Top Section Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Fills the top area unless an image is uploaded.',
      },
    },
    {
      name: 'topHeight',
      type: 'select',
      label: 'Top Section Height',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'topCustomHeight',
      type: 'text',
      label: 'Custom Height (e.g., 400px)',
      admin: { condition: (_, siblingData) => siblingData?.topHeight === 'custom' },
    },

    // ---------- HEADING & SUBHEADING ----------
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      localized: true,
      defaultValue: 'Professional Debt Recovery for Belizean Enterprises',
    },
    {
      name: 'headingColor',
      type: 'text',
      label: 'Heading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      localized: true,
      defaultValue:
        'Comprehensive collection services designed to protect your business interests while maintaining ethical standards',
    },
    {
      name: 'subheadingColor',
      type: 'text',
      label: 'Subheading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },

    // ============================================================
    // 📦 SERVICE CARDS AREA
    // ============================================================
    {
      name: 'serviceBackgroundColor',
      type: 'text',
      label: 'Service Cards Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Background behind the service cards.',
      },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Trending Up', value: 'trendingUp' },
            { label: 'Scale', value: 'scale' },
            { label: 'Users', value: 'users' },
            { label: 'File Text', value: 'fileText' },
            { label: 'Shield', value: 'shield' },
            { label: 'Check Circle', value: 'checkCircle' },
            { label: 'Star', value: 'star' },
            { label: 'Award', value: 'award' },
            { label: 'Briefcase', value: 'briefcase' },
            { label: 'Handshake', value: 'handshake' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
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
        {
          name: 'features',
          type: 'array',
          label: 'Feature Bullets',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Feature Text',
              localized: true,
              required: true,
            },
          ],
        },
        // Per‑card colour overrides (unchanged)
        {
          type: 'collapsible',
          label: '🎨 Card Colours (optional)',
          fields: [
            {
              name: 'cardBgColor',
              type: 'text',
              label: 'Card Background',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
            {
              name: 'cardBorderColor',
              type: 'text',
              label: 'Card Border',
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
              name: 'featureCheckColor',
              type: 'text',
              label: 'Feature Check Icon Colour',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
            {
              name: 'featureTextColor',
              type: 'text',
              label: 'Feature Text Colour',
              admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
            },
          ],
        },
      ],
    },

    // ============================================================
    // ⭐ WHY CHOOSE US (optional)
    // ============================================================
    {
      type: 'collapsible',
      label: '⭐ Why Choose Us Section',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'whyChooseUsBackgroundColor',
          type: 'text',
          label: 'Why Choose Us Section Background',
          admin: {
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Background behind the items and the CTA.',
          },
        },
        {
          name: 'whyChooseUsHeading',
          type: 'text',
          label: 'Heading',
          localized: true,
          defaultValue: 'Why Choose Isame?',
        },
        {
          name: 'whyChooseUsHeadingColor',
          type: 'text',
          label: 'Heading Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'whyChooseUsItems',
          type: 'array',
          label: 'Why Choose Us Items',
          minRows: 0,
          maxRows: 6,
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Shield', value: 'shield' },
                { label: 'File Text', value: 'fileText' },
                { label: 'Users', value: 'users' },
                { label: 'Heart', value: 'heart' },
                { label: 'Award', value: 'award' },
                { label: 'Badge Check', value: 'badgeCheck' },
                { label: 'Thumbs Up', value: 'thumbsUp' },
                { label: 'Globe', value: 'globe' },
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
            // Per‑item colour overrides
            {
              name: 'iconBgColor',
              type: 'text',
              label: 'Icon Background Colour',
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
      ],
    },

    // ============================================================
    // 🔘 CTA AREA
    // ============================================================
    {
      name: 'ctaBackgroundColor',
      type: 'text',
      label: 'CTA Section Background Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    {
      type: 'collapsible',
      label: '🔘 Call to Action',
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
          label: 'CTA Button Background',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'ctaTextColor',
          type: 'text',
          label: 'CTA Button Text',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
      ],
    },

    // ---------- ANIMATION ----------
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animations',
      defaultValue: true,
    },
  ],
}
