import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  AlignFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
  TextSizeFeature,
  TextFontFamilyFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
} from 'payload-lexical-typography'
import { THEME_PRESETS } from '../theme/themePresets' // ✅ relative import

console.log('🔥 richTextEditor is being loaded!')

// Collect every unique heading & body font across all presets
const allFonts = new Set<string>()
Object.values(THEME_PRESETS).forEach((preset) => {
  const h = preset.typography?.headingFont
  const b = preset.typography?.bodyFont
  if (h) allFonts.add(h)
  if (b) allFonts.add(b)
})

// Build the dropdown options: "Theme Default" first, then all unique fonts
const fontFamilies = [
  { label: 'Theme Default', value: '' }, // clears inline font, CSS variable applies
  ...Array.from(allFonts)
    .sort()
    .map((font) => ({
      label: font,
      value: `${font}, sans-serif`,
    })),
]

export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
    AlignFeature(),
    LinkFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    TextColorFeature({
      colors: ['#ffd28d', '#FFFFFF', '#000000', '#C0C0C0', '#FF0000', '#00FF00', '#0000FF'],
      colorPicker: true,
    }),
    TextSizeFeature(),
    TextFontFamilyFeature({
      fontFamilies,
      customFontFamily: true, // still allows typing a custom font
    }),
    TextLetterSpacingFeature(),
    TextLineHeightFeature(),
  ],
})
