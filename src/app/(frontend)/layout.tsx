import type { Metadata } from 'next'
import { Baskervville, Prompt, Playfair_Display, Poppins } from 'next/font/google'
import Script from 'next/script'
import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import Footer from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode, cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { THEME_PRESETS } from '@/theme/themePresets'
import ThemeInit from '@/components/ThemeInit'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { SiteSettingsProvider } from '@/providers/SiteSettingsProvider'
import { LanguageProvider } from '@/providers/Language'

// Preload all possible font families as CSS variables (fallback)
const baskervville = Baskervville({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-baskervville',
  display: 'swap',
})
const prompt = Prompt({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

// Helper to extract media URL
const getMediaUrl = (media: any): string | null => {
  if (!media || typeof media === 'string') return null
  return media.url || null
}

// ------------------------------------------------------------
// Locale helper – reads the cookie set by the language toggle
// ------------------------------------------------------------
const getLocale = async (): Promise<'en' | 'es'> => {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')
  return localeCookie?.value === 'es' ? 'es' : 'en'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config })

  // Read the current locale from the cookie
  const locale = await getLocale()

  // Fetch globals in the correct language
  const settings = await payload.findGlobal({ slug: 'settings', locale })
  const footer = await payload.findGlobal({ slug: 'footer', locale })
  const header = await payload.findGlobal({ slug: 'header', locale }) // 👈 new

  // ----- THEME PRESET -----
  const themePreset = settings?.themePreset || 'isame'
  const preset = THEME_PRESETS[themePreset as keyof typeof THEME_PRESETS] ?? THEME_PRESETS.isame

  // ----- FONT FAMILIES (with overrides) -----
  const headingFont =
    settings?.typography?.headingFontFamily ||
    preset?.typography?.headingFont ||
    'Playfair Display, serif'
  const bodyFont =
    settings?.typography?.bodyFontFamily || preset?.typography?.bodyFont || 'Inter, sans-serif'
  const heroHeadingFont = settings?.hero?.headingFontFamily || headingFont
  const heroSubheadingFont = settings?.hero?.subheadingFontFamily || bodyFont

  // ----- COLOURS (with overrides) -----
  const primaryColor = settings?.colors?.primaryColor || preset?.colors?.primary || '#D4AF37'
  const secondaryColor = settings?.colors?.secondaryColor || preset?.colors?.secondary || '#A7A9AC'
  const linkColor = settings?.colors?.linkColor || preset?.colors?.link || '#D4AF37'
  const bodyBgColor = settings?.colors?.bodyBgColor || preset?.colors?.background || '#1A1A1A'

  // ----- FAVICONS -----
  const favicon = getMediaUrl(settings?.branding?.favicon)
  const favicon16 = getMediaUrl(settings?.branding?.favicon16)
  const appleTouchIcon = getMediaUrl(settings?.branding?.appleTouchIcon)
  const androidChrome192 = getMediaUrl(settings?.branding?.androidChrome192)
  const androidChrome512 = getMediaUrl(settings?.branding?.androidChrome512)
  const manifest = getMediaUrl(settings?.branding?.manifest)

  // ----- TRACKING & ANALYTICS -----
  const tracking = settings?.tracking || {}
  const googleAnalyticsId = tracking.googleAnalyticsId
  const googleTagManagerId = tracking.googleTagManagerId
  const metaPixelId = tracking.metaPixelId
  const customHeadScripts = tracking.customHeadScripts
  const customBodyScripts = tracking.customBodyScripts

  // ----- CSS VARIABLES TO INJECT -----
  const cssVars: Record<string, string> = {
    '--font-heading': headingFont,
    '--font-body': bodyFont,
    '--hero-heading-font': heroHeadingFont,
    '--hero-subheading-font': heroSubheadingFont,
    '--color-primary': primaryColor,
    '--color-secondary': secondaryColor,
    '--color-link': linkColor,
    '--bg-body': bodyBgColor,
  }

  // ----- UNIQUE GOOGLE FONTS TO LOAD -----
  const fontFamilies = [headingFont, bodyFont, heroHeadingFont, heroSubheadingFont]
    .map((f) => f.split(',')[0].trim())
    .filter((f) => f.includes(' '))
    .filter((v, i, a) => a.indexOf(v) === i)

  const fontClasses = cn(
    baskervville.variable,
    prompt.variable,
    playfair.variable,
    poppins.variable,
  )

  return (
    <html
      className={fontClasses}
      lang="en"
      suppressHydrationWarning
      style={{ ...cssVars } as React.CSSProperties}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicons */}
        {favicon && <link rel="icon" type="image/png" sizes="32x32" href={favicon} />}
        {favicon16 && <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />}
        {appleTouchIcon && <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />}
        {androidChrome192 && (
          <link rel="icon" type="image/png" sizes="192x192" href={androidChrome192} />
        )}
        {androidChrome512 && (
          <link rel="icon" type="image/png" sizes="512x512" href={androidChrome512} />
        )}
        {manifest && <link rel="manifest" href={manifest} />}

        {/* Dynamic Google Fonts Loader */}
        <Script
          id="google-fonts-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var fonts = ${JSON.stringify(fontFamilies)};
                fonts.forEach(function(family) {
                  if (!family) return;
                  var link = document.createElement('link');
                  link.href = 'https://fonts.googleapis.com/css2?family=' +
                    encodeURIComponent(family) +
                    ':wght@400;500;600;700&display=swap';
                  link.rel = 'stylesheet';
                  document.head.appendChild(link);
                });
              })();
            `,
          }}
        />

        {/* Google Analytics */}
        {googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`,
            }}
          />
        )}

        {/* Meta Pixel */}
        {metaPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
            }}
          />
        )}

        {/* Custom head scripts */}
        {customHeadScripts && <script dangerouslySetInnerHTML={{ __html: customHeadScripts }} />}
      </head>

      <body suppressHydrationWarning style={{ backgroundColor: bodyBgColor }}>
        {googleTagManagerId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        <SiteSettingsProvider settings={settings as any}>
          <LanguageProvider>
            <ThemeInit />
            <Providers>
              <AdminBar adminBarProps={{ preview: isEnabled }} />
              {/* 👇 Now passes both settings and header */}
              <Header settings={settings} header={header} />
              <main className="w-full">{children}</main>
              <Footer footer={footer} />
            </Providers>
          </LanguageProvider>
        </SiteSettingsProvider>

        {/* Custom body scripts */}
        {customBodyScripts && <script dangerouslySetInnerHTML={{ __html: customBodyScripts }} />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
