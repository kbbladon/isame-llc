import type { Block, Field } from 'payload'
import { richTextEditor } from '@/fields/richTextEditor'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: richTextEditor,
    label: false,
    localized: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  {
    name: 'alignment',
    type: 'select',
    defaultValue: 'center',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
    admin: {
      description: 'Align content inside the column',
    },
  },
  // ── Link type ──
  {
    name: 'linkType',
    type: 'select',
    defaultValue: 'custom',
    options: [
      { label: 'Page (internal)', value: 'reference' },
      { label: 'Custom URL', value: 'custom' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
    },
  },
  // ── Page reference (shown when type = reference) ──
  {
    name: 'linkReference',
    type: 'relationship',
    relationTo: 'pages',
    label: 'Select Page',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.enableLink && siblingData?.linkType === 'reference',
    },
  },
  // ── Custom URL (shown when type = custom) ──
  {
    name: 'linkUrl',
    type: 'text',
    label: 'URL',
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink && siblingData?.linkType === 'custom',
    },
  },
  // ── Shared link fields ──
  {
    name: 'linkLabel',
    type: 'text',
    label: 'Button Label',
    localized: true,
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
    },
  },
  {
    name: 'linkNewTab',
    type: 'checkbox',
    label: 'Open in new tab',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
    },
  },
  // ── Button style & colour overrides (all use the small ColorPicker) ──
  {
    name: 'buttonStyle',
    type: 'select',
    defaultValue: 'solid',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Outline', value: 'outline' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
    },
  },
  {
    name: 'buttonBgColor',
    type: 'text',
    label: 'Button Background Colour',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.enableLink && siblingData?.buttonStyle === 'solid',
      components: { Field: '@/components/ColorPicker#default' },
    },
  },
  {
    name: 'buttonTextColor',
    type: 'text',
    label: 'Button Text Colour',
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
      components: { Field: '@/components/ColorPicker#default' },
    },
  },
  {
    name: 'buttonHoverBgColor',
    type: 'text',
    label: 'Button Hover Background Colour',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.enableLink && siblingData?.buttonStyle === 'solid',
      components: { Field: '@/components/ColorPicker#default' },
    },
  },
  {
    name: 'buttonHoverTextColor',
    type: 'text',
    label: 'Button Hover Text Colour',
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
      components: { Field: '@/components/ColorPicker#default' },
    },
  },
  {
    name: 'buttonBorderColor',
    type: 'text',
    label: 'Button Border Colour (Outline only)',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.enableLink && siblingData?.buttonStyle === 'outline',
      components: { Field: '@/components/ColorPicker#default' },
    },
  },
  {
    name: 'buttonBorderRadius',
    type: 'text',
    label: 'Button Border Radius',
    defaultValue: '0.375rem',
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink,
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
    {
      name: 'containerMaxWidth',
      type: 'number',
      label: 'Container Max Width (px)',
      defaultValue: 850,
      admin: {
        placeholder: '850',
        description: 'Maximum width of the content container. Leave empty for no max width.',
      },
    },
    // Section background – also uses the smaller ColorPicker
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        components: { Field: '@/components/ColorPicker#default' },
        description: 'Leave empty or set to transparent for no background.',
      },
    },
    {
      name: 'backgroundOpacity',
      type: 'number',
      label: 'Background Opacity',
      defaultValue: 1,
      min: 0,
      max: 1,
      admin: { step: 0.05, description: 'Only applies if a background color is selected.' },
    },
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animations',
      defaultValue: true,
    },
  ],
}
