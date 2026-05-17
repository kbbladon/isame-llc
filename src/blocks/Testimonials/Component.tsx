'use client'

import React from 'react'
import Link from 'next/link'
import { Quote } from 'lucide-react'
import AnimateOnScroll from '../../components/AnimateOnScroll' // ✅ relative import

type TestimonialsProps = {
  backgroundColor?: string
  heading?: string
  headingColor?: string
  subheading?: string
  subheadingColor?: string
  testimonials?: {
    quote: string
    author: string
    business?: string
    quoteIconColor?: string
    cardBgColor?: string
    cardBorderColor?: string
    authorColor?: string
    businessColor?: string
    id?: string | null
  }[]
  columns?: string
  ctaLabel?: string
  ctaUrl?: string
  ctaNewTab?: boolean
  ctaBgColor?: string
  ctaTextColor?: string
  enableAnimation?: boolean
  id?: string | null
}

export const TestimonialsBlockComponent: React.FC<TestimonialsProps> = ({
  backgroundColor,
  heading,
  headingColor,
  subheading,
  subheadingColor,
  testimonials,
  columns = '2',
  ctaLabel,
  ctaUrl,
  ctaNewTab,
  ctaBgColor,
  ctaTextColor,
  enableAnimation = true,
}) => {
  if (!testimonials || testimonials.length === 0) return null

  const cols = parseInt(columns, 10)
  const gridCols = ['', 'grid-cols-2', 'grid-cols-3']
  const colClass = gridCols[Math.min(cols, 3)] || 'grid-cols-2'

  const wrapper = (children: React.ReactNode, delay: number = 0) =>
    enableAnimation ? (
      <AnimateOnScroll preset="fadeUp" delay={delay}>
        {children}
      </AnimateOnScroll>
    ) : (
      <>{children}</>
    )

  return (
    <section className="py-20" style={{ backgroundColor: backgroundColor || 'var(--bg-body)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          {heading && (
            <h2
              className="text-4xl md:text-5xl mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                color: headingColor || 'var(--color-primary)',
              }}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-xl" style={{ color: subheadingColor || 'var(--color-muted)' }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Testimonial cards */}
        <div className={`grid grid-cols-1 md:${colClass} gap-8`}>
          {testimonials.map((testimonial, index) => {
            const cardBg = testimonial.cardBgColor || 'var(--color-surface)'
            const cardBorder = testimonial.cardBorderColor || 'var(--color-border)'
            const iconColor = testimonial.quoteIconColor || 'var(--color-primary)'
            const authorColor = testimonial.authorColor || 'var(--color-text)'
            const businessColor = testimonial.businessColor || 'var(--color-muted)'

            const content = (
              <div
                className="p-8 rounded-lg relative"
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <Quote
                  className="absolute top-6 right-6 w-12 h-12 opacity-20"
                  style={{ color: iconColor }}
                />

                <p
                  className="text-lg mb-6 italic relative z-10"
                  style={{ color: 'var(--color-text)' }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="border-t pt-4" style={{ borderColor: iconColor }}>
                  <p className="text-gray-900" style={{ color: authorColor }}>
                    {testimonial.author}
                  </p>
                  {testimonial.business && (
                    <p className="text-sm" style={{ color: businessColor }}>
                      {testimonial.business}
                    </p>
                  )}
                </div>
              </div>
            )

            return (
              <React.Fragment key={testimonial.id || index}>
                {wrapper(content, index * 0.1)}
              </React.Fragment>
            )
          })}
        </div>

        {/* CTA */}
        {ctaLabel && ctaUrl && (
          <div className="mt-16 text-center">
            <Link
              href={ctaUrl}
              target={ctaNewTab ? '_blank' : undefined}
              rel={ctaNewTab ? 'noopener noreferrer' : undefined}
              className="inline-block px-8 py-4 rounded-lg text-lg transition-all hover:shadow-lg"
              style={{
                backgroundColor: ctaBgColor || 'var(--color-primary)',
                color: ctaTextColor || '#1A1A1A',
              }}
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsBlockComponent
