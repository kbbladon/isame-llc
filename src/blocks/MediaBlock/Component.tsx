'use client'

import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { optimizedCloudinaryUrl } from '@/utilities/optimizedCloudinaryUrl'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  // responsive props
  layout?: 'cover' | 'contain' | 'natural'
  maxWidth?: string | null
  aspectRatio?: string | null
  objectPosition?: string | null
  alignment?: 'left' | 'center' | 'right'
  enableBackground?: boolean
  backgroundColor?: string | null
  backgroundPadding?: string | null
  roundedCorners?: string | null
  enableOverlay?: boolean
  overlayOpacity?: number
  caption?: any
  link?: string | null
  newTab?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    layout = 'cover',
    maxWidth,
    aspectRatio = 'auto',
    objectPosition = 'center',
    alignment = 'center',
    enableBackground = false,
    backgroundColor,
    backgroundPadding = 'p-6',
    roundedCorners = 'rounded-md',
    enableOverlay = false,
    overlayOpacity = 0.5,
    caption: captionFromProps,
    link,
    newTab = false,
  } = props

  // image source
  const imgSrc =
    media && typeof media === 'object' && 'url' in media
      ? ((media as any).url as string)
      : staticImage?.src || ''

  const optimizedSrc = optimizedCloudinaryUrl(imgSrc, undefined)

  // caption
  let caption = captionFromProps
  if (!caption && media && typeof media === 'object') caption = (media as any).caption

  const alignmentClass = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  }[alignment]

  const objectFitClass =
    layout === 'cover'
      ? 'object-cover'
      : layout === 'contain'
        ? 'object-contain'
        : 'object-scale-down'

  const aspectClass = aspectRatio !== 'auto' ? `aspect-[${aspectRatio}]` : ''

  const imageElement = (
    <div
      className={cn(
        'relative w-full h-full',
        !aspectClass && layout !== 'natural' && 'aspect-[16/9]',
        aspectClass,
        alignmentClass,
      )}
      style={{ maxWidth: maxWidth || undefined }}
    >
      <div
        className={cn(
          'h-full overflow-hidden',
          enableBackground && backgroundColor,
          enableBackground && backgroundPadding,
          roundedCorners,
        )}
        style={enableBackground ? { backgroundColor: backgroundColor || undefined } : undefined}
      >
        <div className="relative w-full h-full">
          <Image
            src={optimizedSrc}
            alt={(media as any)?.alt || ''}
            fill
            className={cn(objectFitClass, imgClassName)}
            style={{ objectPosition: objectPosition ?? 'center' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
      </div>

      {enableOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity}))`,
          }}
        />
      )}
    </div>
  )

  const content = (
    <div className={cn('my-8', alignmentClass, className)}>
      {link ? (
        <Link
          href={link}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
        >
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}
      {caption && (
        <div className={cn('mt-6', { container: !disableInnerContainer }, captionClassName)}>
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )

  if (!enableGutter) return content

  return <div className="container">{content}</div>
}
