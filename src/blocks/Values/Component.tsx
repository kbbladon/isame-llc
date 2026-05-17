'use client'

import React from 'react'
import {
  Heart,
  Award,
  Target,
  Globe,
  Star,
  Shield,
  ThumbsUp,
  Briefcase,
  Handshake,
  type LucideIcon,
} from 'lucide-react'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  award: Award,
  target: Target,
  globe: Globe,
  star: Star,
  shield: Shield,
  thumbsUp: ThumbsUp,
  briefcase: Briefcase,
  handshake: Handshake,
}

type ValueCard = {
  icon: string
  title: string
  description: string
  cardBackgroundColor?: string | null
  iconBackgroundColor?: string | null
  iconColor?: string | null
  titleColor?: string | null
  descriptionColor?: string | null
  id?: string | null
}

type ValuesProps = {
  sectionBackgroundColor?: string | null
  heading?: string | null
  headingColor?: string | null
  subheading?: string | null
  subheadingColor?: string | null
  values?: ValueCard[] | null
  enableAnimation?: boolean | null
  id?: string | null
}

export const ValuesBlockComponent: React.FC<ValuesProps> = ({
  sectionBackgroundColor,
  heading,
  headingColor,
  subheading,
  subheadingColor,
  values,
  enableAnimation = true,
}) => {
  if (!values || values.length === 0) return null

  return (
    <section
      className="py-20"
      style={{ backgroundColor: sectionBackgroundColor || 'var(--bg-body)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        {(heading || subheading) && (
          <div className="text-center mb-12">
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
              <p className="text-xl" style={{ color: subheadingColor || 'var(--color-text)' }}>
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = ICON_MAP[value.icon] || Heart

            const cardContent = (
              <div
                className="flex flex-col items-center text-center h-full p-8 rounded-lg shadow-lg"
                style={{
                  backgroundColor: value.cardBackgroundColor || 'var(--color-surface)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: value.iconBackgroundColor || 'var(--color-primary)',
                  }}
                >
                  <IconComponent
                    className="w-8 h-8"
                    style={{ color: value.iconColor || '#1A1A1A' }}
                  />
                </div>
                <h3
                  className="text-xl mb-3"
                  style={{ color: value.titleColor || 'var(--color-text)' }}
                >
                  {value.title}
                </h3>
                <p
                  className="flex-1"
                  style={{ color: value.descriptionColor || 'var(--color-muted)' }}
                >
                  {value.description}
                </p>
              </div>
            )

            // Ensure the wrapper fills the grid cell height
            const wrapperClasses = 'h-full'

            return enableAnimation ? (
              <AnimateOnScroll
                key={value.id || index}
                preset="fadeUp"
                delay={index * 0.1}
                className={wrapperClasses}
              >
                {cardContent}
              </AnimateOnScroll>
            ) : (
              <div key={value.id || index} className={wrapperClasses}>
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ValuesBlockComponent
