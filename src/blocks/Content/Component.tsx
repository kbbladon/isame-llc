'use client'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'

// ---------------------------------------------------------------------------
// Helper – safely resolve the link href from the CMS link object
// ---------------------------------------------------------------------------
const getLinkHref = (link: any): string => {
  if (!link) return '#'
  if (link.type === 'reference' && link.reference?.slug) {
    return `/${link.reference.slug}`
  }
  return link.url || '#'
}

// ---------------------------------------------------------------------------
// Helper – convert a hex colour to rgba (for background opacity)
// ---------------------------------------------------------------------------
const hexToRgba = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

type Props = { className?: string } & ContentBlockProps

export const ContentBlock: React.FC<Props> = ({
  className,
  columns,
  containerMaxWidth,
  backgroundColor,
  backgroundOpacity,
  enableAnimation = true,
}) => {
  // -------------------------------------------------------------------------
  // Width / alignment / animation helpers
  // -------------------------------------------------------------------------
  const sizeToClass = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const buttonAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // -------------------------------------------------------------------------
  // Section background (with optional opacity)
  // -------------------------------------------------------------------------
  const opacity = backgroundOpacity ?? 1
  let bgStyle: React.CSSProperties = {}
  if (backgroundColor && backgroundColor !== 'transparent') {
    if (opacity < 1) {
      bgStyle.backgroundColor = hexToRgba(backgroundColor, opacity)
    } else {
      bgStyle.backgroundColor = backgroundColor
    }
  } else {
    bgStyle.backgroundColor = 'transparent'
  }

  const containerStyle: React.CSSProperties = containerMaxWidth
    ? { maxWidth: `${containerMaxWidth}px` }
    : {}

  return (
    <section className={cn('w-full py-6 lg:py-8', className)} style={bgStyle}>
      <div className="flex justify-center px-6">
        <div className="w-full" style={containerStyle}>
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-16">
            {columns?.map((col, index) => {
              const enableLink = col.enableLink ?? false
              const richText = col.richText
              const size = col.size ?? 'full'
              const alignment = col.alignment ?? 'center'
              const alignmentClass =
                buttonAlignmentClasses[alignment as keyof typeof buttonAlignmentClasses] ||
                'text-center'
              const spanClass = sizeToClass[size] || 'lg:col-span-4'

              // ---------------------------------------------------------------
              // Reconstruct the link object from the separate CMS fields
              // ---------------------------------------------------------------
              const linkType = (col as any).linkType || 'custom'
              const linkRef = (col as any).linkReference
              const linkUrl = (col as any).linkUrl
              const linkLabel = (col as any).linkLabel
              const linkNewTab = (col as any).linkNewTab ?? false

              const linkObject = enableLink
                ? {
                    type: linkType,
                    ...(linkType === 'reference' ? { reference: linkRef } : { url: linkUrl }),
                    label: linkLabel || 'Learn More',
                    newTab: linkNewTab,
                  }
                : undefined

              const href = linkObject ? getLinkHref(linkObject) : '#'

              // ---------------------------------------------------------------
              // Button style customisation (solid / outline)
              // ---------------------------------------------------------------
              const buttonStyle = (col as any).buttonStyle || 'solid'
              const customBg = (col as any).buttonBgColor
              const customText = (col as any).buttonTextColor
              const customHoverBg = (col as any).buttonHoverBgColor
              const customHoverText = (col as any).buttonHoverTextColor
              const customBorder = (col as any).buttonBorderColor
              const customRadius = (col as any).buttonBorderRadius || '0.375rem'

              const linkStyle: React.CSSProperties = {
                borderRadius: customRadius,
                padding: '0.75rem 2rem',
                transition: 'all 0.2s ease',
              }

              if (buttonStyle === 'solid') {
                linkStyle.backgroundColor = customBg || 'var(--color-primary)'
                linkStyle.color = customText || '#1A1A1A'
                linkStyle.border = 'none'
              } else {
                linkStyle.backgroundColor = 'transparent'
                linkStyle.color = customText || 'var(--color-primary)'
                linkStyle.border = `2px solid ${customBorder || 'var(--color-primary)'}`
              }

              // ---------------------------------------------------------------
              // Hover effect (scoped <style>)
              // ---------------------------------------------------------------
              const hoverId = `cta-hover-${index}`
              const hoverStyles = `
                #${hoverId}:hover {
                  background-color: ${customHoverBg || (buttonStyle === 'solid' ? 'var(--color-secondary)' : 'transparent')} !important;
                  color: ${customHoverText || (buttonStyle === 'solid' ? '#1A1A1A' : 'var(--color-primary)')} !important;
                  ${buttonStyle === 'outline' ? `border-color: ${customHoverBg || 'var(--color-secondary)'} !important;` : ''}
                }
              `

              // ---------------------------------------------------------------
              // Column content
              // ---------------------------------------------------------------
              const content = (
                <>
                  {richText && (
                    <div className="w-full">
                      <RichText data={richText} enableGutter={false} />
                    </div>
                  )}
                  {enableLink && linkObject && (
                    <div className={cn('mt-8', alignmentClass)}>
                      <style>{hoverStyles}</style>
                      <span id={hoverId} style={linkStyle} className="inline-block">
                        <a
                          href={href}
                          target={linkObject.newTab ? '_blank' : undefined}
                          rel={linkObject.newTab ? 'noopener noreferrer' : undefined}
                          style={{
                            display: 'inline-block',
                            width: '100%',
                            height: '100%',
                            color: 'inherit',
                            textDecoration: 'none',
                          }}
                        >
                          {linkObject.label}
                        </a>
                      </span>
                    </div>
                  )}
                </>
              )

              // ---------------------------------------------------------------
              // Animation wrapper (optional)
              // ---------------------------------------------------------------
              return enableAnimation ? (
                <motion.div
                  key={index}
                  className={cn('col-span-4 flex flex-col', spanClass)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUpVariant}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {content}
                </motion.div>
              ) : (
                <div key={index} className={cn('col-span-4 flex flex-col', spanClass)}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentBlock
