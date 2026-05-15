import React from 'react'
import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SliderHero } from '@/heros/SliderHero'
import { LowGradientHero } from '@/heros/LowGradientHero'
import { LargeGradientComponent } from '@/heros/LargeGradient'

// -----------------------------------------------------
// Hero registry
// -----------------------------------------------------
const HEROES = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  lowGradient: LowGradientHero,
  largeGradient: LargeGradientComponent,
} as const

type HeroType = keyof typeof HEROES | 'slider' | 'sliderHero' | 'none'

// -----------------------------------------------------
// Slider normalization
// -----------------------------------------------------
function normalizeSliderData(slider: any) {
  if (!slider) return slider

  const cleaned = { ...slider }

  if (cleaned.staticContent) {
    cleaned.staticContent = { ...cleaned.staticContent }

    if (cleaned.staticContent.cta) {
      cleaned.staticContent.cta = {
        ...cleaned.staticContent.cta,
        label: cleaned.staticContent.cta.label ?? undefined,
        url: cleaned.staticContent.cta.url ?? undefined,
      }
    }

    if (cleaned.staticContent.overlayText == null) {
      cleaned.staticContent.overlayText = undefined
    }
  }

  const nullableFields = [
    'animationPreset',
    'height',
    'autoplay',
    'showArrows',
    'showDots',
    'autoplaySpeed',
    'overlayColor',
    'mode',
  ] as const

  for (const field of nullableFields) {
    if (cleaned[field] === null) cleaned[field] = undefined
  }

  return cleaned
}

// -----------------------------------------------------
// Main Renderer
// -----------------------------------------------------
export const RenderHero: React.FC<Page['hero']> = (props) => {
  const isDev = process.env.NODE_ENV === 'development'

  const heroType = (props?.type as HeroType) ?? 'none'
  if (heroType === 'none') return null

  // ----------------------------
  // Slider case
  // ----------------------------
  if (heroType === 'slider' || heroType === 'sliderHero') {
    const slider = (props as any)?.slider
    if (!slider) return null

    return <SliderHero sliderData={normalizeSliderData(slider)} />
  }

  // ----------------------------
  // Resolve hero component
  // ----------------------------
  const HeroComponent = HEROES[heroType as keyof typeof HEROES]

  if (!HeroComponent) {
    if (isDev) console.warn(`⚠️ Unknown hero type: ${heroType}`)
    return null
  }

  // ----------------------------
  // LOW GRADIENT (flat structure)
  // ----------------------------
  if (heroType === 'lowGradient') {
    const heroData = (props as any)?.lowGradient
    if (!heroData) return null

    return <HeroComponent {...heroData} />
  }

  // ----------------------------
  // LARGE GRADIENT (IMPORTANT FIX)
  // ----------------------------
  if (heroType === 'largeGradient') {
    const heroData = (props as any)?.largeGradientFields
    if (!heroData) return null

    return <HeroComponent {...heroData} />
  }

  // ----------------------------
  // Nested hero structure (standard)
  // ----------------------------
  const heroData = (props as any)?.[heroType]
  if (!heroData) return null

  if (isDev) {
    console.log(`✅ Rendering ${heroType} hero`)
  }

  return <HeroComponent {...heroData} />
}

export default RenderHero
