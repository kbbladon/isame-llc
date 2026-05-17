'use client'

import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { optimizedCloudinaryUrl } from '@/utilities/optimizedCloudinaryUrl'
import type { Media } from '@/payload-types'

type MediaContentProps = {
  backgroundColor?: string | null
  heading?: string | null
  headingColor?: string | null
  content?: any
  textColor?: string | null
  image?: Media | string | null
  imageFit?: 'cover' | 'contain'
  imageMaxHeight?: string | null
  imagePosition?: 'left' | 'right'
  enableOverlay?: boolean
  overlayColor?: string | null
  overlayOpacity?: number
  enableAnimation?: boolean
  id?: string | null
}

export const MediaContentBlock: React.FC<MediaContentProps> = ({
  backgroundColor,
  heading,
  headingColor,
  content,
  textColor,
  image,
  imageFit = 'cover',
  imageMaxHeight,
  imagePosition = 'right',
  enableOverlay = false,
  overlayColor = '#000000',
  overlayOpacity = 0.3,
  enableAnimation = true,
}) => {
  const imgUrl =
    typeof image === 'object' && image !== null && 'url' in image
      ? image.url
      : typeof image === 'string'
        ? image
        : undefined

  const optimizedImg = imgUrl ? optimizedCloudinaryUrl(imgUrl) : undefined

  const wrapper = (children: React.ReactNode, delay?: number) =>
    enableAnimation ? (
      <AnimateOnScroll preset="fadeUp" delay={delay}>
        {children}
      </AnimateOnScroll>
    ) : (
      <>{children}</>
    )

  // Determine order: image first or text first
  const TextColumn = (
    <div className="flex flex-col justify-center">
      {heading && (
        <h2
          className="text-4xl md:text-5xl mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            color: headingColor || 'var(--color-primary)',
          }}
        >
          {heading}
        </h2>
      )}
      {content && (
        <div style={{ color: textColor || 'var(--color-text)' }}>
          <RichText data={content} enableGutter={false} enableProse={false} />
        </div>
      )}
    </div>
  )

  const ImageColumn = (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl w-full h-full"
      style={{ maxHeight: imageMaxHeight || 'none' }}
    >
      {optimizedImg ? (
        <div className="relative w-full h-full min-h-[300px]">
          <Image
            src={optimizedImg}
            alt=""
            fill
            className={`object-${imageFit}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
      ) : (
        <div className="w-full h-full min-h-[300px] bg-gray-200" />
      )}
      {enableOverlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor || '#000000',
            opacity: overlayOpacity,
          }}
        />
      )}
    </div>
  )

  const columns =
    imagePosition === 'left' ? (
      <>
        {wrapper(ImageColumn, 0)}
        {wrapper(TextColumn, 0.1)}
      </>
    ) : (
      <>
        {wrapper(TextColumn, 0)}
        {wrapper(ImageColumn, 0.1)}
      </>
    )

  return (
    <section className="py-20" style={{ backgroundColor: backgroundColor || 'var(--bg-body)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">{columns}</div>
      </div>
    </section>
  )
}

export default MediaContentBlock
