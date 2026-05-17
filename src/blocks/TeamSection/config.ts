import type { Block } from 'payload'
import { richTextEditor } from '@/fields/richTextEditor'

export const TeamSectionBlock: Block = {
  slug: 'team-section',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
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
    // ---------- CONTENT WIDTH ----------
    {
      name: 'contentWidth',
      type: 'select',
      label: 'Content Width',
      defaultValue: 'contained',
      options: [
        { label: 'Contained (max-width, centered)', value: 'contained' },
        { label: 'Full Width (edge to edge)', value: 'full' },
      ],
    },
    // ---------- IMAGE ----------
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Team Image',
      required: true,
    },
    // Optional gradient overlay on the image
    {
      type: 'collapsible',
      label: '🎨 Image Overlay Gradient',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'overlayGradientStart',
          type: 'text',
          label: 'Gradient Start Color',
          admin: {
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
        {
          name: 'overlayGradientEnd',
          type: 'text',
          label: 'Gradient End Color',
          admin: {
            components: { Field: '@/components/ThemeColorPicker#default' },
          },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Overlay Opacity (0‑1)',
          defaultValue: 0.1,
          min: 0,
          max: 1,
          admin: { step: 0.05 },
        },
      ],
    },
    // ---------- HEADING ----------
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
      required: true,
      defaultValue: 'About the Team',
    },
    {
      name: 'headingColor',
      type: 'text',
      label: 'Heading Color',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
      },
    },
    // ---------- CONTENT (rich text) ----------
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: richTextEditor,
      localized: true,
      required: true,
      admin: {
        description: 'Use the toolbar to format text, add multiple paragraphs, bold, etc.',
      },
    },
    // ---------- QUOTE BOX ----------
    {
      type: 'collapsible',
      label: '💬 Quote Box (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'quoteText',
          type: 'text',
          label: 'Quote Text',
          localized: true,
        },
        {
          name: 'quoteBorderColor',
          type: 'text',
          label: 'Quote Border Color',
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
