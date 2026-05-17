'use client'

import React from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Building,
  User,
  MessageCircle,
  Smartphone,
  ExternalLink,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const ICON_MAP: Record<string, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  globe: Globe,
  clock: Clock,
  building: Building,
  user: User,
  messageCircle: MessageCircle,
  smartphone: Smartphone,
  externalLink: ExternalLink,
  helpCircle: HelpCircle,
}

type ContactItem = {
  icon: string
  label: string
  value: string
  subtitle?: string | null
  id?: string | null
}

type ContactInfoProps = {
  backgroundColor?: string | null
  heading?: string | null
  headingColor?: string | null
  textColor?: string | null
  iconBackgroundColor?: string | null
  iconColor?: string | null
  contactItems?: ContactItem[] | null
  enableMap?: boolean
  mapEmbedUrl?: string | null
  mapHeight?: string | null
  enableAnimation?: boolean
  id?: string | null
}

export const ContactInfoBlockComponent: React.FC<ContactInfoProps> = ({
  backgroundColor,
  heading = 'Contact Information',
  headingColor,
  textColor,
  iconBackgroundColor,
  iconColor,
  contactItems,
  enableMap = false,
  mapEmbedUrl,
  mapHeight = '16rem',
  enableAnimation = false,
}) => {
  if (!contactItems || contactItems.length === 0) return null

  const wrapper = (children: React.ReactNode, delay?: number) =>
    enableAnimation ? (
      <AnimateOnScroll preset="fadeUp" delay={delay}>
        {children}
      </AnimateOnScroll>
    ) : (
      <>{children}</>
    )

  return (
    <div
      style={{
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      {wrapper(
        <div>
          {heading && (
            <h2
              className="text-4xl mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                color: headingColor || 'var(--color-primary)',
              }}
            >
              {heading}
            </h2>
          )}

          <div className="space-y-6 mb-8">
            {contactItems.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon] || HelpCircle
              return (
                <div key={item.id || idx} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: iconBackgroundColor || 'var(--color-primary)',
                    }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: iconColor || '#1A1A1A' }} />
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-1"
                      style={{ color: textColor || 'var(--color-text)' }}
                    >
                      {item.label}
                    </h3>
                    <div style={{ color: textColor || 'var(--color-text)' }}>
                      {item.value.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    {item.subtitle && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: textColor || 'var(--color-text)', opacity: 0.8 }}
                      >
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Google Map embed */}
          {enableMap && mapEmbedUrl && (
            <div
              className="rounded-lg overflow-hidden border-2"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height={mapHeight || '16rem'}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          )}
        </div>,
      )}
    </div>
  )
}

export default ContactInfoBlockComponent
