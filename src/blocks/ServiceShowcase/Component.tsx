'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  TrendingUp,
  Scale,
  Users,
  FileText,
  Shield,
  CheckCircle,
  Star,
  Award,
  Briefcase,
  Handshake,
  Heart,
  BadgeCheck,
  ThumbsUp,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { cn } from '@/utilities/ui'

const ICON_MAP: Record<string, LucideIcon> = {
  trendingUp: TrendingUp,
  scale: Scale,
  users: Users,
  fileText: FileText,
  shield: Shield,
  checkCircle: CheckCircle,
  star: Star,
  award: Award,
  briefcase: Briefcase,
  handshake: Handshake,
  heart: Heart,
  badgeCheck: BadgeCheck,
  thumbsUp: ThumbsUp,
  globe: Globe,
}

type ServiceCard = {
  icon: string
  title: string
  description: string
  features?: { text: string; id?: string | null }[]
  cardBgColor?: string | null
  cardBorderColor?: string | null
  iconBgColor?: string | null
  iconColor?: string | null
  titleColor?: string | null
  descriptionColor?: string | null
  featureCheckColor?: string | null
  featureTextColor?: string | null
  id?: string | null
}

type WhyChooseUsItem = {
  icon: string
  title: string
  description: string
  iconBgColor?: string | null
  iconColor?: string | null
  titleColor?: string | null
  descriptionColor?: string | null
  id?: string | null
}

type ServiceShowcaseProps = {
  // Top section
  topBackgroundImage?: { url?: string } | null
  topBackgroundColor?: string | null
  topHeight?: string | null
  topCustomHeight?: string | null
  heading?: string | null
  headingColor?: string | null
  subheading?: string | null
  subheadingColor?: string | null

  // Service cards area
  serviceBackgroundColor?: string | null
  services?: ServiceCard[] | null

  // Why Choose Us (with integrated CTA)
  whyChooseUsBackgroundColor?: string | null
  whyChooseUsHeading?: string | null
  whyChooseUsHeadingColor?: string | null
  whyChooseUsItems?: WhyChooseUsItem[] | null

  // CTA (will appear inside Why Choose Us)
  ctaLabel?: string | null
  ctaUrl?: string | null
  ctaNewTab?: boolean | null
  ctaBgColor?: string | null
  ctaTextColor?: string | null

  // Animation
  enableAnimation?: boolean | null
  id?: string | null
}

export const ServiceShowcaseBlockComponent: React.FC<ServiceShowcaseProps> = ({
  topBackgroundImage,
  topBackgroundColor,
  topHeight = 'md',
  topCustomHeight,
  heading,
  headingColor,
  subheading,
  subheadingColor,
  serviceBackgroundColor,
  services,
  whyChooseUsBackgroundColor,
  whyChooseUsHeading,
  whyChooseUsHeadingColor,
  whyChooseUsItems,
  ctaLabel,
  ctaUrl,
  ctaNewTab,
  ctaBgColor,
  ctaTextColor,
  enableAnimation = true,
}) => {
  const wrapper = (children: React.ReactNode, delay?: number) =>
    enableAnimation ? (
      <AnimateOnScroll preset="fadeUp" delay={delay}>
        {children}
      </AnimateOnScroll>
    ) : (
      <>{children}</>
    )

  // Map height preset to Tailwind classes
  const heightMap: Record<string, string> = {
    sm: 'min-h-[300px]',
    md: 'min-h-[420px]',
    lg: 'min-h-[560px]',
  }

  return (
    <div>
      {/* ========== TOP HERO / HEADING AREA ========== */}
      <section
        className={`relative flex items-center justify-center ${heightMap[topHeight ?? 'md'] || heightMap.md}`}
        style={{
          backgroundColor: topBackgroundColor || 'var(--bg-body)',
          ...(topHeight === 'custom' && topCustomHeight ? { minHeight: topCustomHeight } : {}),
        }}
      >
        {topBackgroundImage?.url && (
          <Image
            src={topBackgroundImage.url}
            alt=""
            fill
            className="absolute inset-0 object-cover z-0"
            unoptimized
          />
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {wrapper(
            <>
              {heading && (
                <h1
                  className="text-5xl md:text-6xl mb-6"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: headingColor || 'var(--color-primary)',
                  }}
                >
                  {heading}
                </h1>
              )}
              {subheading && (
                <p
                  className="text-xl max-w-3xl mx-auto"
                  style={{ color: subheadingColor || 'var(--color-text)' }}
                >
                  {subheading}
                </p>
              )}
            </>,
          )}
        </div>
      </section>

      {/* ========== SERVICE CARDS AREA ========== */}
      <section
        className="py-20"
        style={{ backgroundColor: serviceBackgroundColor || 'var(--color-surface)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services?.map((service, index) => {
              const IconComponent = ICON_MAP[service.icon] || TrendingUp
              return (
                <React.Fragment key={service.id || index}>
                  {wrapper(
                    <div
                      className="rounded-lg p-8 shadow-lg border-2 hover:shadow-xl transition-shadow"
                      style={{
                        backgroundColor: service.cardBgColor || 'var(--color-surface)',
                        borderColor: service.cardBorderColor || 'var(--color-border)',
                      }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Icon and Title */}
                        <div className="lg:col-span-1">
                          <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                            style={{
                              backgroundColor: service.iconBgColor || 'var(--color-primary)',
                            }}
                          >
                            <IconComponent
                              className="w-10 h-10"
                              style={{ color: service.iconColor || '#1A1A1A' }}
                            />
                          </div>
                          <h3
                            className="text-3xl mb-2"
                            style={{
                              fontFamily: 'var(--font-heading)',
                              color: service.titleColor || 'var(--color-text)',
                            }}
                          >
                            {service.title}
                          </h3>
                        </div>

                        {/* Description and Features */}
                        <div className="lg:col-span-2">
                          <p
                            className="text-lg mb-6"
                            style={{
                              color: service.descriptionColor || 'var(--color-muted)',
                            }}
                          >
                            {service.description}
                          </p>
                          {service.features && service.features.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.features.map((feature, idx) => (
                                <div key={feature.id || idx} className="flex items-center gap-2">
                                  <CheckCircle
                                    className="w-5 h-5 flex-shrink-0"
                                    style={{
                                      color: service.featureCheckColor || 'var(--color-primary)',
                                    }}
                                  />
                                  <span
                                    style={{
                                      color: service.featureTextColor || 'var(--color-text)',
                                    }}
                                  >
                                    {feature.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>,
                    index * 0.1,
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US (with integrated CTA) ========== */}
      {whyChooseUsItems && whyChooseUsItems.length > 0 && (
        <section
          className="py-20"
          style={{ backgroundColor: whyChooseUsBackgroundColor || 'var(--bg-body)' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {whyChooseUsHeading && (
              <div className="text-center mb-12">
                {wrapper(
                  <h2
                    className="text-4xl md:text-5xl mb-4"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: whyChooseUsHeadingColor || 'var(--color-primary)',
                    }}
                  >
                    {whyChooseUsHeading}
                  </h2>,
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUsItems.map((item, index) => {
                const IconComponent = ICON_MAP[item.icon] || Shield
                return (
                  <React.Fragment key={item.id || index}>
                    {wrapper(
                      <div className="text-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ backgroundColor: item.iconBgColor || 'var(--color-primary)' }}
                        >
                          <IconComponent
                            className="w-8 h-8"
                            style={{ color: item.iconColor || '#1A1A1A' }}
                          />
                        </div>
                        <h3
                          className="text-2xl mb-3"
                          style={{ color: item.titleColor || 'var(--color-primary)' }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ color: item.descriptionColor || 'var(--color-text)' }}>
                          {item.description}
                        </p>
                      </div>,
                      index * 0.1,
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* CTA – right inside the same section */}
            {ctaLabel && ctaUrl && (
              <div className="text-center mt-16">
                {wrapper(
                  <Link
                    href={ctaUrl}
                    target={ctaNewTab ? '_blank' : undefined}
                    className="inline-block px-8 py-4 rounded-lg text-lg transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: ctaBgColor || 'var(--color-primary)',
                      color: ctaTextColor || '#1A1A1A',
                    }}
                  >
                    {ctaLabel}
                  </Link>,
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default ServiceShowcaseBlockComponent
