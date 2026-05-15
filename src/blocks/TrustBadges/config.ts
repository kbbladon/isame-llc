import type { Block } from 'payload'

export const TrustBadgesBlock: Block = {
  slug: 'trust-badges', // matches your existing block slug
  labels: {
    singular: 'Trust Badges',
    plural: 'Trust Badges',
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Background colour for the entire trust badges section.',
      },
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Badges',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Users', value: 'users' },
            { label: 'Shield', value: 'shield' },
            { label: 'Globe', value: 'globe' },
            { label: 'Star', value: 'star' },
            { label: 'Heart', value: 'heart' },
            { label: 'Award', value: 'award' },
            { label: 'Badge Check', value: 'badgeCheck' },
            { label: 'Thumbs Up', value: 'thumbsUp' },
            { label: 'Briefcase', value: 'briefcase' },
            { label: 'Handshake', value: 'handshake' },
          ],
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Badge Text',
          localized: true,
          required: true,
        },
        {
          name: 'iconColor',
          type: 'text',
          label: 'Icon Color',
          admin: {
            components: { Field: '@/components/ThemeColorPicker#default' },
            description: 'Leave empty to use the theme primary colour.',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns (Desktop)',
      defaultValue: '4',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
    },
  ],
}
