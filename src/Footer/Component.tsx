'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Music,
} from 'lucide-react'
import { optimizedCloudinaryUrl } from '@/utilities/optimizedCloudinaryUrl'
import { LanguageToggle } from '@/components/LanguageToggle'

type FooterProps = { footer?: any; className?: string }

// ----------------------------------------------------------------
// SVG inline hook – strips hardcoded width/height so the logo scales naturally
// ----------------------------------------------------------------
const useInlineSvg = (url: string | undefined) => {
  const [svgContent, setSvgContent] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch SVG')
        return res.text()
      })
      .then((text) => {
        // Remove hardcoded width/height from the root <svg> tag
        const cleaned = text
          .replace(/<svg([^>]*?)width="[^"]*"/, '<svg$1')
          .replace(/<svg([^>]*?)height="[^"]*"/, '<svg$1')
        // Ensure a viewBox exists (fallback to 0 0 500 500 if missing)
        if (!/<svg[^>]*?viewBox="/i.test(cleaned)) {
          return cleaned.replace(/<svg/, '<svg viewBox="0 0 500 500"')
        }
        return cleaned
      })
      .then(setSvgContent)
      .catch(() => setSvgContent(null))
  }, [url])

  return svgContent
}

// Social icon map – matches the select options in the footer config
const SOCIAL_ICONS: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  music: Music, // Lucide "Music" icon used for TikTok
  globe: Globe,
}

export const Footer: React.FC<FooterProps> = ({ footer, className }) => {
  if (!footer) return null
  const layout = footer.layout || 'simple'

  // ------------------------------------------------------------------
  // SIMPLE LAYOUT
  // ------------------------------------------------------------------
  if (layout === 'simple') {
    const navItems = footer.navItems || []
    return (
      <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
        <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
          <Link className="flex items-center" href="/">
            {/* Logo placeholder – you can add your Logo component here */}
          </Link>
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map((item: any, i: number) => (
              <Link
                key={i}
                href={item.url || '#'}
                target={item.newTab ? '_blank' : undefined}
                className="text-white hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    )
  }

  // ------------------------------------------------------------------
  // ADVANCED LAYOUT (multi‑column)
  // ------------------------------------------------------------------
  const {
    description,
    quickLinks = [],
    services = [],
    reachUs,
    copyright,
    socialBadges = [],
    backgroundColor,
    textColor,
    iconColor,
    mapEmbedUrl,
  } = footer

  // ----- Footer logo (uploaded in CMS) -----
  const logoValue = footer.logo
  const [logoMedia, setLogoMedia] = useState<any>(null)
  useEffect(() => {
    if (!logoValue) return
    if (typeof logoValue === 'object' && logoValue !== null) {
      setLogoMedia(logoValue)
      return
    }
    fetch(`/api/media/${logoValue}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setLogoMedia(data))
  }, [logoValue])

  const isSvg = logoMedia?.mimeType === 'image/svg+xml' || logoMedia?.format === 'svg'
  const svgContent = useInlineSvg(isSvg ? logoMedia?.url : undefined)

  // ---------------------------------------------------------------
  // Logo renderer – responsive, never cropped
  // ---------------------------------------------------------------
  const renderFooterLogo = () => {
    if (!logoMedia) return null

    if (isSvg && svgContent) {
      return (
        <div
          className="[&>svg]:block [&>svg]:max-w-full [&>svg]:h-auto"
          style={{ maxWidth: '200px' }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )
    }

    if (!isSvg && logoMedia?.url) {
      return (
        <Image
          src={optimizedCloudinaryUrl(logoMedia.url)}
          alt="Footer logo"
          width={200}
          height={80}
          className="h-auto w-auto max-w-[200px]"
        />
      )
    }

    return null
  }

  // Resolve colours – fall back to theme variables when not set in CMS
  const resolvedBg = backgroundColor || 'var(--bg-body)'
  const resolvedText = textColor || 'var(--color-text)'
  const resolvedIcon = iconColor || 'var(--color-primary)'

  return (
    <footer
      className={cn('text-white', className)}
      style={{ backgroundColor: resolvedBg, color: resolvedText }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ── Brand column ── */}
          <div>
            {logoMedia && <div className="mb-4">{renderFooterLogo()}</div>}
            {!logoMedia && (
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: resolvedIcon }}
              >
                Isame
              </h3>
            )}
            {description && (
              <div className="text-sm mb-4" style={{ color: resolvedText }}>
                <RichText data={description} enableGutter={false} enableProse={false} />
              </div>
            )}

            {/* Language switcher */}
            <LanguageToggle />

            {/* Social media icons (replaces old image badges) */}
            {socialBadges?.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialBadges.map((badge: any, i: number) => {
                  const IconComponent = SOCIAL_ICONS[badge.icon] || Globe
                  return (
                    <a
                      key={i}
                      href={badge.url || '#'}
                      target={badge.newTab ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: resolvedIcon }}
                      aria-label={badge.icon}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            )}

            {/* Optional map embed */}
            {mapEmbedUrl && (
              <div
                className="rounded-lg overflow-hidden border-2 mt-6"
                style={{ borderColor: resolvedIcon }}
              >
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            )}
          </div>

          {/* ── Quick Links column ── */}
          {quickLinks.length > 0 && (
            <div>
              <h4 className="mb-4" style={{ color: resolvedIcon }}>
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url || '#'}
                      target={link.newTab ? '_blank' : undefined}
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: resolvedText }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Services column ── */}
          {services.length > 0 && (
            <div>
              <h4 className="mb-4" style={{ color: resolvedIcon }}>
                Our Services
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: resolvedText }}>
                {services.map((service: any, i: number) => (
                  <li key={i}>{service.label}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Contact column ── */}
          <div>
            <h4 className="mb-4" style={{ color: resolvedIcon }}>
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              {reachUs?.location && (
                <li className="flex items-start gap-2" style={{ color: resolvedText }}>
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: resolvedIcon }} />
                  <span>{reachUs.location}</span>
                </li>
              )}
              {reachUs?.phone && (
                <li className="flex items-center gap-2" style={{ color: resolvedText }}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: resolvedIcon }} />
                  <a
                    href={`tel:${reachUs.phone.replace(/\s/g, '')}`}
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: resolvedText }}
                  >
                    {reachUs.phone}
                  </a>
                </li>
              )}
              {reachUs?.email && (
                <li className="flex items-center gap-2" style={{ color: resolvedText }}>
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: resolvedIcon }} />
                  <a
                    href={`mailto:${reachUs.email}`}
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: resolvedText }}
                  >
                    {reachUs.email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2" style={{ color: resolvedText }}>
                <Globe className="w-4 h-4 flex-shrink-0" style={{ color: resolvedIcon }} />
                <span>Hablamos Español</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-gray-700 mt-8 pt-8 text-center text-sm"
          style={{ color: resolvedText }}
        >
          {copyright ? (
            <p>{copyright}</p>
          ) : (
            <>
              <p>&copy; {new Date().getFullYear()} Isame Debt Collection. All rights reserved.</p>
              <p className="mt-2">
                100% Belizean-Owned • Female-Led • Ethical Practices Guaranteed
              </p>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
