import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'
import { richTextEditor } from '@/fields/richTextEditor'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Layout selector
    {
      name: 'layout',
      type: 'select',
      label: 'Footer Layout',
      defaultValue: 'simple',
      options: [
        { label: 'Simple (navigation links only)', value: 'simple' },
        { label: 'Advanced (multi‑column, rich content)', value: 'advanced' },
      ],
    },

    // ---------- SIMPLE LAYOUT ----------
    {
      name: 'navItems',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'simple',
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
      ],
      maxRows: 6,
    },

    // ---------- ADVANCED LAYOUT ----------
    // 🌈 Global footer styling (optional – falls back to theme)
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Colour',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Colour',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },
    {
      name: 'iconColor',
      type: 'text',
      label: 'Icon Colour',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Used for the contact icons (phone, mail, map, etc.).',
      },
    },

    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo (SVG or image)',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description Text',
      editor: richTextEditor,
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
    },
    {
      name: 'socialBadges',
      type: 'array',
      label: 'Social Links',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'music' }, // Lucide uses "Music" for TikTok
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Globe (website)', value: 'globe' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: true,
        },
      ],
    },

    // Quick Links column
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
      ],
    },

    // Services column
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Service Name',
          localized: true,
          required: true,
        },
      ],
    },

    // Reach Us section – ONE group with all fields
    {
      name: 'reachUs',
      type: 'group',
      label: 'Reach Us Section',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Reach Us',
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          localized: true,
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Address',
          localized: true,
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Business Hours',
          localized: true,
        },
        {
          name: 'location',
          type: 'text',
          label: 'Office Location',
          localized: true,
        },
        {
          name: 'partnerHotel',
          type: 'group',
          label: 'Partner Hotel',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label Text',
              defaultValue: 'Book a room at our Flagship Hotel.',
              localized: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Partner Hotel Logo',
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link URL',
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: true,
            },
          ],
        },
      ],
    },

    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps Embed URL',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
        description: 'Paste the full embed URL from Google Maps',
      },
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: 'Copyright © 2026 Isame Credit Collection Ltd. All Rights Reserved. Belize.',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'advanced',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
