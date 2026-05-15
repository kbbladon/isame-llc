import type { Field } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { richTextEditor } from '@/fields/richTextEditor'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: 'Hero Section',
  admin: {
    description: 'Configure the main hero section for this page.',
  },
  fields: [
    // =========================================================
    // HERO TYPE
    // =========================================================
    {
      name: 'type',
      type: 'radio',
      label: 'Hero Type',
      defaultValue: 'lowImpact',
      admin: {
        layout: 'horizontal',
        description: 'Choose the hero layout style.',
      },
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Slider', value: 'slider' },
        { label: 'Low Gradient', value: 'lowGradient' },
        { label: 'Large Gradient', value: 'largeGradient' },
      ],
    },
    // =========================================================
    // LARGE GRADIENT HERO
    // =========================================================
    {
      name: 'largeGradientFields',
      type: 'group',
      label: 'Large Gradient Hero',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'largeGradient',
        description: 'Large cinematic hero with layered gradients and CTA controls.',
      },
      fields: [
        // =====================================================
        // LAYOUT
        // =====================================================
        {
          type: 'collapsible',
          label: 'Layout & Sizing',
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'heroHeight',
              type: 'select',
              label: 'Hero Height',
              defaultValue: 'screen',
              admin: {
                width: '50%',
                description: 'Choose how tall the hero should appear.',
              },
              options: [
                { label: 'Full Screen', value: 'screen' },
                { label: 'Large (80vh)', value: '80vh' },
                { label: 'Medium (60vh)', value: '60vh' },
                { label: 'Small (40vh)', value: '40vh' },
                { label: 'Custom Height', value: 'custom' },
              ],
            },

            {
              name: 'customHeight',
              type: 'text',
              label: 'Custom Height',
              admin: {
                width: '50%',
                placeholder: 'ex: 720px or 75vh',
                condition: (_, siblingData) => siblingData?.heroHeight === 'custom',
              },
            },

            {
              name: 'contentAlignment',
              type: 'select',
              label: 'Content Alignment',
              defaultValue: 'center',
              admin: {
                width: '50%',
              },
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },

            {
              name: 'contentMaxWidth',
              type: 'select',
              label: 'Content Width',
              defaultValue: 'xl',
              admin: {
                width: '50%',
              },
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Extra Large', value: 'xl' },
                { label: 'Full Width', value: 'full' },
              ],
            },
          ],
        },

        // =====================================================
        // MEDIA
        // =====================================================
        {
          type: 'collapsible',
          label: 'Background Media',
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
              admin: {
                description: 'Recommended size: 1920x1080 or larger.',
              },
            },

            {
              name: 'backgroundVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Video',
              admin: {
                description: 'Optional MP4/WebM cinematic background.',
              },
            },

            {
              name: 'backgroundPosition',
              type: 'select',
              label: 'Background Position',
              defaultValue: 'center',
              admin: {
                width: '50%',
              },
              options: [
                { label: 'Center', value: 'center' },
                { label: 'Top', value: 'top' },
                { label: 'Bottom', value: 'bottom' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
            },

            {
              name: 'enableParallax',
              type: 'checkbox',
              label: 'Enable Parallax',
              defaultValue: false,
              admin: {
                width: '50%',
              },
            },
          ],
        },

        // =====================================================
        // OVERLAY
        // =====================================================
        {
          type: 'collapsible',
          label: 'Overlay & Gradient',
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'overlayType',
              type: 'radio',
              label: 'Overlay Type',
              defaultValue: 'gradient',
              admin: {
                layout: 'horizontal',
              },
              options: [
                { label: 'Gradient', value: 'gradient' },
                { label: 'Solid', value: 'solid' },
              ],
            },

            {
              name: 'solidColor',
              type: 'text',
              label: 'Solid Overlay Color',
              admin: {
                condition: (_, siblingData) => siblingData?.overlayType === 'solid',
                components: {
                  Field: '@/components/ThemeColorPicker#default',
                },
              },
            },

            {
              name: 'gradientType',
              type: 'select',
              label: 'Gradient Type',
              defaultValue: 'linear',
              admin: {
                width: '50%',
                condition: (_, siblingData) => siblingData?.overlayType === 'gradient',
              },
              options: [
                { label: 'Linear', value: 'linear' },
                { label: 'Radial', value: 'radial' },
              ],
            },

            {
              name: 'gradientDirection',
              type: 'select',
              label: 'Gradient Direction',
              defaultValue: 'to right',
              admin: {
                width: '50%',
                condition: (_, siblingData) => siblingData?.overlayType === 'gradient',
              },
              options: [
                { label: 'To Right', value: 'to right' },
                { label: 'To Left', value: 'to left' },
                { label: 'To Bottom', value: 'to bottom' },
                { label: 'To Top', value: 'to top' },
                { label: '45°', value: '45deg' },
                { label: '135°', value: '135deg' },
                { label: '225°', value: '225deg' },
                { label: '315°', value: '315deg' },
              ],
            },

            {
              name: 'gradientStops',
              type: 'array',
              label: 'Gradient Stops',
              minRows: 2,
              maxRows: 5,
              admin: {
                condition: (_, siblingData) => siblingData?.overlayType === 'gradient',
                description: 'Add multiple color stops for cinematic overlays.',
              },
              fields: [
                {
                  name: 'color',
                  type: 'text',
                  label: 'Color',
                  defaultValue: '#FFD700',
                  admin: {
                    width: '50%',
                    components: {
                      Field: '@/components/ThemeColorPicker#default',
                    },
                  },
                },

                {
                  name: 'position',
                  type: 'select',
                  label: 'Position',
                  admin: {
                    width: '50%',
                  },
                  options: [
                    { label: '0%', value: '0%' },
                    { label: '10%', value: '10%' },
                    { label: '20%', value: '20%' },
                    { label: '30%', value: '30%' },
                    { label: '40%', value: '40%' },
                    { label: '50%', value: '50%' },
                    { label: '60%', value: '60%' },
                    { label: '70%', value: '70%' },
                    { label: '80%', value: '80%' },
                    { label: '90%', value: '90%' },
                    { label: '100%', value: '100%' },
                  ],
                },
              ],
            },

            {
              name: 'overlayOpacity',
              type: 'number',
              label: 'Overlay Opacity',
              defaultValue: 0.75,
              min: 0,
              max: 1,
              admin: {
                step: 0.05,
                width: '50%',
              },
            },

            {
              name: 'blurBackground',
              type: 'checkbox',
              label: 'Enable Background Blur',
              defaultValue: false,
              admin: {
                width: '50%',
              },
            },
          ],
        },

        // =====================================================
        // CONTENT
        // =====================================================
        {
          type: 'collapsible',
          label: 'Hero Content',
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'headline',
              type: 'text',
              label: 'Headline',
              required: true,
              localized: true,
              admin: {
                placeholder: 'Your cinematic headline...',
              },
            },

            {
              name: 'headlineColor',
              type: 'text',
              label: 'Headline Color',
              admin: {
                width: '50%',
                components: {
                  Field: '@/components/ThemeColorPicker#default',
                },
              },
            },

            {
              name: 'headlineSize',
              type: 'select',
              label: 'Headline Size',
              defaultValue: 'xl',
              admin: {
                width: '50%',
              },
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Extra Large', value: 'xl' },
                { label: 'Massive', value: 'display' },
              ],
            },

            {
              name: 'subheadline',
              type: 'textarea',
              label: 'Subheadline',
              localized: true,
              admin: {
                rows: 4,
                placeholder: 'Optional supporting copy for the hero.',
              },
            },

            {
              name: 'subheadlineColor',
              type: 'text',
              label: 'Subheadline Color',
              admin: {
                components: {
                  Field: '@/components/ThemeColorPicker#default',
                },
              },
            },
          ],
        },

        // =====================================================
        // BUTTONS
        // =====================================================
        {
          type: 'collapsible',
          label: 'Buttons & CTAs',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'primaryCta',
              type: 'group',
              label: 'Primary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'url',
                  type: 'text',
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'bgColor',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/ThemeColorPicker#default',
                    },
                  },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/ThemeColorPicker#default',
                    },
                  },
                },
              ],
            },

            {
              name: 'secondaryCta',
              type: 'group',
              label: 'Secondary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'url',
                  type: 'text',
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'borderColor',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/ThemeColorPicker#default',
                    },
                  },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  admin: {
                    components: {
                      Field: '@/components/ThemeColorPicker#default',
                    },
                  },
                },
              ],
            },
          ],
        },

        // =====================================================
        // EFFECTS
        // =====================================================
        {
          type: 'collapsible',
          label: 'Effects & Animation',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'enableAnimation',
              type: 'checkbox',
              label: 'Enable Entrance Animation',
              defaultValue: true,
            },

            {
              name: 'animationStyle',
              type: 'select',
              label: 'Animation Style',
              defaultValue: 'fade-up',
              admin: {
                condition: (_, siblingData) => siblingData?.enableAnimation,
              },
              options: [
                { label: 'Fade Up', value: 'fade-up' },
                { label: 'Fade In', value: 'fade-in' },
                { label: 'Zoom In', value: 'zoom-in' },
                { label: 'Slide Left', value: 'slide-left' },
                { label: 'Slide Right', value: 'slide-right' },
              ],
            },

            {
              name: 'showScrollIndicator',
              type: 'checkbox',
              label: 'Show Scroll Indicator',
              defaultValue: false,
            },

            {
              name: 'scrollIndicatorColor',
              type: 'text',
              label: 'Scroll Indicator Color',
              admin: {
                condition: (_, siblingData) => siblingData?.showScrollIndicator,
                components: {
                  Field: '@/components/ThemeColorPicker#default',
                },
              },
            },
          ],
        },
      ],
    },

    // =========================================================
    // STANDARD HERO CONTENT
    // =========================================================
    {
      name: 'richText',
      type: 'richText',
      editor: richTextEditor,
      localized: true,
      admin: {
        condition: (_, { type } = {}) => !['slider', 'largeGradient'].includes(type),
      },
    },

    {
      name: 'links',
      type: 'array',
      label: 'Links',
      maxRows: 2,
      admin: {
        condition: (_, { type } = {}) => !['slider', 'largeGradient'].includes(type),
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => ['highImpact', 'mediumImpact'].includes(siblingData?.type),
      },
    },
  ],
}
