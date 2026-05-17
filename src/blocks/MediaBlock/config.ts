import type { Block } from 'payload'
import { richTextEditor } from '@/fields/richTextEditor'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // ----- Responsive layout -----
    {
      name: 'layout',
      type: 'select',
      label: 'Image Fit',
      defaultValue: 'cover',
      options: [
        { label: 'Cover (fills container)', value: 'cover' },
        { label: 'Contain (letterbox)', value: 'contain' },
        { label: 'Natural width (responsive)', value: 'natural' },
      ],
      admin: {
        description: 'How the image should fill its container.',
      },
    },
    {
      name: 'maxWidth',
      type: 'text',
      label: 'Max Width (optional)',
      admin: {
        placeholder: 'e.g., 100% or 600px',
        description: 'Any CSS value. Leave blank for no max width.',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio (for fill modes)',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (use image natural)', value: 'auto' },
        { label: '16:9', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: '1:1', value: '1/1' },
        { label: '3:2', value: '3/2' },
        { label: '2:3', value: '2/3' },
      ],
      admin: {
        description: 'Forces a specific shape when using cover/contain.',
      },
    },
    {
      name: 'objectPosition',
      type: 'text',
      label: 'Focal Point (e.g., center, top, 20% 50%)',
      defaultValue: 'center',
      admin: {
        description: 'CSS object-position value.',
      },
    },
    // ----- Alignment -----
    {
      name: 'alignment',
      type: 'select',
      label: 'Block Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    // ----- Visual extras (unchanged) -----
    {
      name: 'enableBackground',
      type: 'checkbox',
      label: 'Enable Background Color',
      defaultValue: false,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        condition: (_, siblingData) => siblingData?.enableBackground === true,
        components: { Field: '@/components/ColorPicker' } as any,
      },
    },
    {
      name: 'backgroundPadding',
      type: 'select',
      label: 'Background Padding',
      defaultValue: 'p-6',
      options: [
        { label: 'None', value: '0' },
        { label: 'Small (p-4)', value: 'p-4' },
        { label: 'Medium (p-6)', value: 'p-6' },
        { label: 'Large (p-8)', value: 'p-8' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.enableBackground === true,
      },
    },
    {
      name: 'roundedCorners',
      type: 'select',
      label: 'Rounded Corners',
      defaultValue: 'rounded-md',
      options: [
        { label: 'None', value: 'rounded-none' },
        { label: 'Small', value: 'rounded' },
        { label: 'Medium', value: 'rounded-md' },
        { label: 'Large', value: 'rounded-lg' },
        { label: 'Extra Large', value: 'rounded-xl' },
        { label: 'Full', value: 'rounded-full' },
      ],
    },
    {
      name: 'enableOverlay',
      type: 'checkbox',
      label: 'Enable Overlay (dark gradient)',
      defaultValue: false,
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay Opacity',
      defaultValue: 0.5,
      min: 0,
      max: 1,
      admin: { step: 0.05, condition: (_, s) => s?.enableOverlay === true },
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      editor: richTextEditor,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL (optional)',
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open link in new tab',
      defaultValue: false,
    },
  ],
}
