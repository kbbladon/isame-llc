import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { draftMode, cookies } from 'next/headers' // 👈 added cookies
import Image from 'next/image'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { optimizedCloudinaryUrl } from '@/utilities/optimizedCloudinaryUrl'
import type { Metadata } from 'next'
import type { Post } from '@/payload-types'

type Args = {
  params: Promise<{ slug: string }>
}

// ---------- HELPERS ----------
const hexToRgba = (hex: string, alpha: number): string => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getImageUrl = (media: any): string | null => {
  if (!media || typeof media === 'string') return null
  if (typeof media === 'object' && 'url' in media) return media.url as string
  return null
}

// Updated locale helper – now async
const getLocale = async (): Promise<'en' | 'es'> => {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')
  return localeCookie?.value === 'es' ? 'es' : 'en'
}

// ---------- DATA FETCHING (locale‑aware) ----------
const getPageData = cache(async (slug: string, draft = false, locale: 'en' | 'es' = 'en') => {
  const payload = await getPayload({ config: configPromise })

  const [pageResult, settings] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      draft,
      locale, // 👈 locale passed to query
      select: {
        title: true,
        slug: true,
        hero: true,
        layout: true,
        meta: true,
        backgroundImage: true,
        overlayColor: true,
        overlayOpacity: true,
        contentWidth: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    payload.findGlobal({ slug: 'settings', depth: 1, locale }), // 👈 locale for settings too
  ])

  const page = pageResult.docs[0] || null
  return { page, settings }
})

const getCachedPageData = (slug: string, locale: 'en' | 'es') =>
  unstable_cache(async () => getPageData(slug, false, locale), [`page-${slug}-${locale}`], {
    revalidate: 3600,
    tags: [`page-${slug}`],
  })()

// ---------- PAGE COMPONENT ----------
export default async function Page({ params }: Args) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const locale = await getLocale() // 👈 await the async helper

  const { isEnabled: isDraftMode } = await draftMode()

  const { page, settings } = isDraftMode
    ? await getPageData(decodedSlug, true, locale)
    : process.env.NODE_ENV === 'production'
      ? await getCachedPageData(decodedSlug, locale)
      : await getPageData(decodedSlug, false, locale)

  if (!page) notFound()

  // ---------- RESOLVE BLOCK DATA (locale‑aware) ----------
  let layout = page.layout ?? []
  if (layout.length > 0) {
    const payload = await getPayload({ config: configPromise })

    layout = await Promise.all(
      layout.map(async (block) => {
        if (block.blockType === 'archive') {
          const { categories, limit: limitFromProps, populateBy, selectedDocs } = block
          const limit = limitFromProps || 3
          let posts: Post[] = []

          if (populateBy === 'collection') {
            const flattenedCategories =
              categories?.map((c) => (typeof c === 'object' ? c.id : c)) ?? []
            const result = await payload.find({
              collection: 'posts',
              depth: 1,
              limit,
              locale, // 👈 locale for posts
              ...(flattenedCategories.length
                ? { where: { categories: { in: flattenedCategories } } }
                : {}),
            })
            posts = result.docs
          } else if (selectedDocs?.length) {
            posts = selectedDocs
              .map((doc) => (typeof doc.value === 'object' ? (doc.value as Post) : null))
              .filter((p): p is Post => p !== null)
          }

          return { ...block, posts }
        }
        return block
      }),
    )
  }

  // ---------- PAGE DISPLAY ----------
  const bodyBgColor = settings?.colors?.bodyBgColor || '#040d10'
  const bodyFont = settings?.typography?.bodyFontFamily || 'Prompt, sans-serif'

  const overlayColor = page.overlayColor || '#0f3d2e'
  const overlayOpacity = page.overlayOpacity ?? 0.7
  const bgUrl = getImageUrl(page.backgroundImage)
  const contentWidth = page.contentWidth || 'contained'
  const showOverlay = overlayOpacity > 0

  return (
    <div style={{ backgroundColor: bodyBgColor, fontFamily: bodyFont }}>
      {isDraftMode && <LivePreviewListener />}

      <div className="relative">
        {bgUrl && (
          <Image
            src={optimizedCloudinaryUrl(bgUrl)}
            alt=""
            fill
            className="object-cover z-0"
            priority
            sizes="100vw"
          />
        )}

        {showOverlay && (
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor: hexToRgba(overlayColor, overlayOpacity) }}
          />
        )}

        <div className="relative z-10">
          <RenderHero {...page.hero} />
          <div className={contentWidth === 'contained' ? 'max-w-7xl mx-auto px-4' : ''}>
            <RenderBlocks
              blocks={layout}
              settings={{
                headingFontFamily: settings?.typography?.headingFontFamily,
                bodyFontFamily: settings?.typography?.bodyFontFamily,
                primaryColor: settings?.colors?.primaryColor,
                secondaryColor: settings?.colors?.secondaryColor,
                linkColor: settings?.colors?.linkColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- METADATA (locale‑aware) ----------
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const locale = await getLocale()
  const { page } = await getPageData(decodedSlug, false, locale)
  if (!page) return {}
  return generateMeta({ doc: page })
}

// ---------- STATIC PARAMS (unchanged) ----------
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    where: { _status: { equals: 'published' } },
    select: { slug: true },
  })
  return pages.docs.map(({ slug }) => ({ slug: slug! }))
}
