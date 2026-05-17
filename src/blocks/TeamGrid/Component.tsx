'use client'

import React from 'react'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { cn } from '@/utilities/ui'

type TeamMember = {
  image?: { url?: string; alt?: string } | string | null
  placeholderColor?: string | null
  name: string
  title?: string | null
  languages?: string | null
  cardBackgroundColor?: string | null
  nameColor?: string | null
  titleColor?: string | null
  languagesColor?: string | null
  id?: string | null
}

type TeamGridProps = {
  sectionBackgroundColor?: string | null
  heading?: string | null
  headingColor?: string | null
  subheading?: string | null
  subheadingColor?: string | null
  members?: TeamMember[] | null
  enableAnimation?: boolean | null
  id?: string | null
}

export const TeamGridBlockComponent: React.FC<TeamGridProps> = ({
  sectionBackgroundColor,
  heading,
  headingColor,
  subheading,
  subheadingColor,
  members,
  enableAnimation = true,
}) => {
  if (!members || members.length === 0) return null

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

        {/* Members grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => {
            const imgUrl =
              typeof member.image === 'object' && member.image !== null && 'url' in member.image
                ? member.image.url
                : typeof member.image === 'string'
                  ? member.image
                  : undefined

            const content = (
              <div
                className="rounded-lg overflow-hidden shadow-lg border-2 hover:shadow-xl transition-shadow"
                style={{
                  backgroundColor: member.cardBackgroundColor || 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="relative h-80 overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: member.placeholderColor || 'var(--color-muted)',
                      }}
                    />
                  )}
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(26, 26, 26, 0.7) 0%, transparent 50%)',
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl mb-2"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: member.nameColor || 'var(--color-primary)',
                    }}
                  >
                    {member.name}
                  </h3>
                  {member.title && (
                    <p className="mb-2" style={{ color: member.titleColor || 'var(--color-text)' }}>
                      {member.title}
                    </p>
                  )}
                  {member.languages && (
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: member.languagesColor || 'var(--color-muted)' }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>{member.languages}</span>
                    </div>
                  )}
                </div>
              </div>
            )

            return enableAnimation ? (
              <AnimateOnScroll key={member.id || index} preset="fadeUp" delay={index * 0.1}>
                {content}
              </AnimateOnScroll>
            ) : (
              <div key={member.id || index}>{content}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamGridBlockComponent
