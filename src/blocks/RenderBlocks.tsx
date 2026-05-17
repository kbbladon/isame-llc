import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
import type { Page } from '@/payload-types'

// ---------------------------------------------------------------------------
// Lightweight loading skeleton – shown while a block’s code is being fetched
// ---------------------------------------------------------------------------
const BlockLoading = () => (
  <div className="w-full py-12 flex justify-center">
    <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-32 w-full max-w-7xl rounded-lg" />
  </div>
)

// ---------------------------------------------------------------------------
// Block registry – every slug → lazy‑loaded component
// ---------------------------------------------------------------------------
const blockComponents: Record<string, React.ComponentType<any>> = {
  archive: dynamic(
    () => import('@/blocks/ArchiveBlock/Component').then((mod) => mod.ArchiveBlock),
    {
      loading: BlockLoading,
    },
  ),
  content: dynamic(() => import('@/blocks/Content/Component').then((mod) => mod.ContentBlock), {
    loading: BlockLoading,
  }),
  cta: dynamic(
    () => import('@/blocks/CallToAction/Component').then((mod) => mod.CallToActionBlock),
    {
      loading: BlockLoading,
    },
  ),
  formBlock: dynamic(() => import('@/blocks/Form/Component').then((mod) => mod.FormBlock), {
    loading: BlockLoading,
  }),
  mediaBlock: dynamic(() => import('@/blocks/MediaBlock/Component').then((mod) => mod.MediaBlock), {
    loading: BlockLoading,
  }),
  cardGrid: dynamic(() => import('@/blocks/CardGrid/Component').then((mod) => mod.CardGridBlock), {
    loading: BlockLoading,
  }),
  parallaxHero: dynamic(
    () => import('@/blocks/ParallaxHero/Component').then((mod) => mod.ParallaxHeroBlock),
    {
      loading: BlockLoading,
    },
  ),
  splitContent: dynamic(
    () => import('@/blocks/SplitContent/Component').then((mod) => mod.SplitContentBlock),
    {
      loading: BlockLoading,
    },
  ),
  videoHero: dynamic(
    () => import('@/blocks/VideoHero/Component').then((mod) => mod.VideoHeroBlock),
    {
      loading: BlockLoading,
    },
  ),
  imageGrid: dynamic(
    () => import('@/blocks/ImageGrid/Component').then((mod) => mod.ImageGridBlock),
    {
      loading: BlockLoading,
    },
  ),
  crossSectionCta: dynamic(
    () => import('@/blocks/CrossSectionCTA/Component').then((mod) => mod.CrossSectionCTA),
    {
      loading: BlockLoading,
    },
  ),
  cards: dynamic(() => import('@/blocks/Cards/Component').then((mod) => mod.CardsBlock), {
    loading: BlockLoading,
  }),
  slickerSlide: dynamic(() =>
    import('@/blocks/SlickerSlide/Component').then((mod) => mod.SlickerSlideComponent),
  ),
  menuTabs: dynamic(() => import('@/blocks/MenuTabs/Component').then((mod) => mod.MenuTabsBlock), {
    loading: BlockLoading,
  }),
  menuTable: dynamic(
    () => import('@/blocks/MenuTable/Component').then((mod) => mod.MenuTableBlock),
    {
      loading: BlockLoading,
    },
  ),
  imageRow: dynamic(() => import('@/blocks/ImageRow/Component').then((mod) => mod.ImageRowBlock), {
    loading: BlockLoading,
  }),
  table: dynamic(() => import('@/blocks/Table/Component').then((mod) => mod.TableBlockComponent), {
    loading: BlockLoading,
  }),
  'trust-badges': dynamic(
    () => import('@/blocks/TrustBadges/Component').then((mod) => mod.TrustBadgesBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  'feature-section': dynamic(
    () =>
      import('@/blocks/FeatureSection/Component').then((mod) => mod.FeatureSectionBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  'team-section': dynamic(
    () => import('@/blocks/TeamSection/Component').then((mod) => mod.TeamSectionBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  testimonials: dynamic(
    () => import('@/blocks/Testimonials/Component').then((mod) => mod.TestimonialsBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  'service-showcase': dynamic(
    () =>
      import('@/blocks/ServiceShowcase/Component').then((mod) => mod.ServiceShowcaseBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  splitContainer: dynamic(
    () => import('@/blocks/SplitContainer/Component').then((mod) => mod.SplitContainerBlock),
    {
      loading: BlockLoading,
    },
  ),
  values: dynamic(
    () => import('@/blocks/Values/Component').then((mod) => mod.ValuesBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  'team-grid': dynamic(
    () => import('@/blocks/TeamGrid/Component').then((mod) => mod.TeamGridBlockComponent),
    {
      loading: BlockLoading,
    },
  ),
  mediaContent: dynamic(() =>
    import('@/blocks/MediaContent/Component').then((mod) => mod.MediaContentBlock),
  ),
  contactInfo: dynamic(() =>
    import('@/blocks/ContactInfo/Component').then((mod) => mod.ContactInfoBlockComponent),
  ),
}

// ---------------------------------------------------------------------------
// RenderBlocks
// ---------------------------------------------------------------------------
export const RenderBlocks: React.FC<{
  blocks: Page['layout']
  settings?: any
}> = ({ blocks, settings }) => {
  if (!blocks?.length) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        if (!block || typeof block !== 'object') return null

        const { blockType } = block
        if (!blockType) return null

        const Block = blockComponents[blockType]
        if (!Block) {
          console.warn(`⚠️ Missing block component for blockType: ${blockType}`)
          return null
        }

        return <Block key={block.id || index} {...block} settings={settings} />
      })}
    </Fragment>
  )
}

export default RenderBlocks
