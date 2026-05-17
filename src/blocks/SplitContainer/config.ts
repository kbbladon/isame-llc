import type { Block } from 'payload'
import { Content } from '../Content/config'
import { MediaBlock } from '../MediaBlock/config'
import { FormBlock } from '../Form/config'
import { ContactInfoBlock } from '../ContactInfo/config'

export const SplitContainer: Block = {
  slug: 'splitContainer',
  labels: {
    singular: 'Split Container',
    plural: 'Split Containers',
  },
  fields: [
    // =============================================
    // BACKGROUND COLOUR – top of the block for easy access
    // =============================================
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Colour',
      admin: {
        components: { Field: '@/components/ThemeColorPicker#default' },
        description: 'Leave empty for the theme default.',
      },
    },
    // =============================================
    // VERTICAL PADDING
    // =============================================
    {
      name: 'verticalPadding',
      type: 'select',
      label: 'Vertical Padding',
      defaultValue: 'lg',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    // Number of columns (desktop)
    {
      name: 'columnsCount',
      type: 'select',
      label: 'Columns (Desktop)',
      defaultValue: '1',
      options: [
        { label: '1 (stacked)', value: '1' },
        { label: '2 (side by side)', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    // Gap between items
    {
      name: 'gap',
      type: 'select',
      label: 'Gap',
      defaultValue: 'lg',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    // =============================================
    // NESTED BLOCKS – you can add any combination
    // =============================================
    {
      name: 'columns',
      type: 'blocks',
      label: 'Nested Blocks',
      blocks: [Content, MediaBlock, FormBlock, ContactInfoBlock], // add more as needed
      required: true,
      admin: {
        description: 'Add one or more content, media, or form blocks.',
      },
    },
    // =============================================
    // ANIMATION TOGGLE
    // =============================================
    {
      name: 'enableAnimation',
      type: 'checkbox',
      label: 'Enable scroll animations on nested blocks',
      defaultValue: false,
    },
  ],
}
