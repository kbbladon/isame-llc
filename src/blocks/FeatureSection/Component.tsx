'use client'

import React from 'react'
import {
  Heart,
  FileText,
  Users,
  Star,
  Shield,
  Award,
  BadgeCheck,
  ThumbsUp,
  Globe,
  Briefcase,
  Handshake,
  type LucideIcon,
} from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll' // relative import

// Icon map (same as block config options)
const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  fileText: FileText,
  users: Users,
  star: Star,
  shield: Shield,
  award: Award,
  badgeCheck: BadgeCheck,
  thumbsUp: ThumbsUp,
  globe: Globe,
  briefcase: Briefcase,
  handshake: Handshake,
}

type FeatureSectionProps = {
  heading?: string
  headingColor?: string
  subheading?: string
  subheadingColor?: string
  backgroundColor?: string
  columns?: string
  features?: {
    icon: string
    title: string
    description: string
    titleColor?: string
    descriptionColor?: string
    cardBgColor?: string
    cardBorderColor?: string
    iconBgColor?: string
    iconColor?: string
    id?: string | null
  }[]
  enableAnimation?: boolean
  id?: string | null
}

export const FeatureSectionBlockComponent: React.FC<FeatureSectionProps> = ({
  heading,
  headingColor,
  subheading,
  subheadingColor,
  backgroundColor,
  columns = '3',
  features,
  enableAnimation = true,
}) => {
  if (!features || features.length === 0) return null

  const cols = parseInt(columns, 10)
  const gridCols = ['', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4']
  const colClass = gridCols[Math.min(cols, 4)] || 'grid-cols-3'

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: backgroundColor || 'var(--bg-body)',
      }}
    >
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
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: subheadingColor || 'var(--color-text)' }}
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Feature cards */}
        <div className={`grid grid-cols-1 md:${colClass} gap-8`}>
          {features.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.icon] || Heart
            const isAnimated = enableAnimation

            const content = (
              <div
                className="p-8 rounded-lg border-2 hover:shadow-xl transition-shadow"
                style={{
                  backgroundColor: feature.cardBgColor || 'var(--color-surface)',
                  borderColor: feature.cardBorderColor || 'var(--color-border)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: feature.iconBgColor || 'var(--color-primary)',
                  }}
                >
                  <IconComponent
                    className="w-8 h-8"
                    style={{ color: feature.iconColor || '#1A1A1A' }}
                  />
                </div>

                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: feature.titleColor || 'var(--color-text)',
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  className="leading-relaxed"
                  style={{ color: feature.descriptionColor || 'var(--color-muted)' }}
                >
                  {feature.description}
                </p>
              </div>
            )

            return isAnimated ? (
              <AnimateOnScroll key={feature.id || index} preset="fadeUp" delay={index * 0.1}>
                {content}
              </AnimateOnScroll>
            ) : (
              <div key={feature.id || index}>{content}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeatureSectionBlockComponent
