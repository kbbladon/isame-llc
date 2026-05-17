import type { Block } from 'payload'

export const TeamGridBlock: Block = {
  slug: 'team-grid',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    // Section background – at the top
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
      defaultValue: 'Meet the Team',
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
      defaultValue: 'Local women leading with expertise and integrity',
    },
    {
      name: 'subheadingColor',
      type: 'text',
      label: 'Subheading Colour',
      admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
    },
    // Team members
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo (optional)',
          admin: { description: 'If no photo, a placeholder colour will be shown.' },
        },
        {
          name: 'placeholderColor',
          type: 'text',
          label: 'Placeholder Colour (if no photo)',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Job Title',
          localized: true,
        },
        {
          name: 'languages',
          type: 'text',
          label: 'Languages',
        },
        // Card & text colour overrides
        {
          name: 'cardBackgroundColor',
          type: 'text',
          label: 'Card Background Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'nameColor',
          type: 'text',
          label: 'Name Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'titleColor',
          type: 'text',
          label: 'Job Title Colour',
          admin: { components: { Field: '@/components/ThemeColorPicker#default' } },
        },
        {
          name: 'languagesColor',
          type: 'text',
          label: 'Languages Colour',
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
