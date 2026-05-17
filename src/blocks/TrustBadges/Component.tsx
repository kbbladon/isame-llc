'use client'

import React from 'react'
import {
  Users,
  Shield,
  Globe,
  Star,
  Heart,
  Award,
  BadgeCheck,
  ThumbsUp,
  Briefcase,
  Handshake,
  type LucideIcon,
} from 'lucide-react'

// Map of icon names → Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  shield: Shield,
  globe: Globe,
  star: Star,
  heart: Heart,
  award: Award,
  badgeCheck: BadgeCheck,
  thumbsUp: ThumbsUp,
  briefcase: Briefcase,
  handshake: Handshake,
}

type TrustBadgeProps = {
  backgroundColor?: string | null
  textColor?: string | null // ← section‑wide
  badges?: {
    icon: string
    text: string
    iconColor?: string | null
    textColor?: string | null // ← per‑badge override
    id?: string | null
  }[]
  columns?: string | null
  id?: string | null
}

export const TrustBadgesBlockComponent: React.FC<TrustBadgeProps> = ({
  backgroundColor,
  textColor, // ← add this
  badges,
  columns = '4',
}) => {
  if (!badges || badges.length === 0) return null

  const cols = parseInt(columns || '4', 10)
  const gridCols = [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
  ]
  const colClass = gridCols[Math.min(cols, 6) - 1] || 'grid-cols-4'

  return (
    <div
      className="py-8"
      style={{
        backgroundColor: backgroundColor || 'var(--bg-body)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid ${colClass} gap-6`}>
          {/* Inside the badge map */}
          {badges.map((badge, idx) => {
            const IconComponent = ICON_MAP[badge.icon] || Star
            const iconColor = badge.iconColor || 'var(--color-primary)'
            const resolvedTextColor = badge.textColor || textColor || 'var(--color-text)'

            return (
              <div
                key={badge.id || idx}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <IconComponent className="h-6 w-6 flex-shrink-0" style={{ color: iconColor }} />
                <span className="text-sm" style={{ color: resolvedTextColor }}>
                  {badge.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TrustBadgesBlockComponent
