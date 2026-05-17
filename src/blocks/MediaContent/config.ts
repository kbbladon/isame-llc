import type { Block } from 'payload'
import { richTextEditor } from '@/fields/richTextEditor'

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media & Content',
    plural: 'Media & Content',
  },
  fields: [
    // ---------- SECTION BACKGROUND ----------
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },
    // ---------- HEADING ----------
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
      defaultValue: 'Our Story',
    },
    {
      name: 'headingColor',
      type: 'text',
      label: 'Heading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    // ---------- RICH TEXT CONTENT ----------
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: richTextEditor,
      localized: true,
      required: true,
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    // ---------- IMAGE ----------
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'imageFit',
      type: 'select',
      label: 'Image Fit',
      defaultValue: 'cover',
      options: [
        { label: 'Cover (crop to fill)', value: 'cover' },
        { label: 'Contain (letterbox)', value: 'contain' },
      ],
    },
    {
      name: 'imageMaxHeight',
      type: 'text',
      label: 'Image Max Height (CSS)',
      admin: {
        placeholder: 'e.g., 500px or 100%',
        description: 'Leave empty for auto height based on content.',
      },
    },
    // ---------- LAYOUT ----------
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      options: [
        { label: 'Image on Right', value: 'right' },
        { label: 'Image on Left', value: 'left' },
      ],
    },
    // ---------- IMAGE OVERLAY (optional) ----------
    {
      name: 'enableOverlay',
      type: 'checkbox',
      label: 'Enable image overlay',
      defaultValue: false,
    },
    {
      name: 'overlayColor',
      type: 'text',
      label: 'Overlay Colour',
      admin: {
        condition: (_, siblingData) => siblingData?.enableOverlay,
        components: { Field: '@/components/ThemeColorPicker#default' },
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay Opacity',
      defaultValue: 0.3,
      min: 0,
      max: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.enableOverlay,
        step: 0.05,
      },
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
