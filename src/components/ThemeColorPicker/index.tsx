'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useField, useFormFields } from '@payloadcms/ui'
import { Pipette, Link2, Check } from 'lucide-react'
// ✅ relative import – safe for import map
import { THEME_PRESETS } from '../../theme/themePresets'

const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex)

const fieldToPresetKey: Record<string, keyof (typeof THEME_PRESETS)['luxury']['colors']> = {
  primaryColor: 'primary',
  secondaryColor: 'secondary',
  linkColor: 'link',
  bodyBgColor: 'background',
  defaultOverlayColor: 'surface',
  buttonBgColor: 'primary',
  buttonTextColor: 'text',
  buttonHoverBgColor: 'secondary',
  buttonHoverTextColor: 'text',
  iconBackgroundColor: 'primary',
  iconColor: 'text',
  headingColor: 'primary',
  textColor: 'text',
  sectionBgColor: 'background',
  subheadingColor: 'muted',
  titleColor: 'text',
  descriptionColor: 'muted',
  cardBgColor: 'surface',
  cardBorderColor: 'border',
  iconBgColor: 'primary',
  crossSectionBgColor: 'background',
  heroOverlayColor: 'background',
  ctaBgColor: 'primary',
  ctaTextColor: 'text',
  cardBackgroundColor: 'surface',
  tableHeaderBg: 'primary',
  tableBorderColor: 'border',
  teamCardBg: 'surface',
  teamNameColor: 'text',
  teamRoleColor: 'muted',
  testimonialBg: 'surface',
  testimonialTextColor: 'text',
  badgeBgColor: 'surface',
  badgeIconColor: 'primary',
  valueCardBg: 'surface',
  storyBg: 'background',
  serviceCardBg: 'surface',
  sectionBackgroundColor: 'background',
  bannerBg: 'primary',
  color: 'primary',
}

type Props = {
  path: string
  field: {
    name: string
    label?: string
  }
}

export default function ThemeColorPicker({ path, field }: Props) {
  const { value, setValue } = useField<string>({ path })

  const themePreset = useFormFields(([fields]) => fields?.themePreset?.value) || 'luxury'

  const preset = THEME_PRESETS[themePreset as keyof typeof THEME_PRESETS]
  const presetKey = fieldToPresetKey[field.name]
  const presetColor = presetKey ? preset.colors[presetKey] : '#000000'

  const [inputValue, setInputValue] = useState(value || presetColor)
  const [open, setOpen] = useState(false)

  const usingTheme = !value

  useEffect(() => {
    if (!value) {
      setInputValue(presetColor)
    }
  }, [presetColor, value])

  const displayColor = useMemo(() => {
    return isValidHex(inputValue) ? inputValue : presetColor
  }, [inputValue, presetColor])

  const handleColorChange = useCallback(
    (color: string) => {
      setInputValue(color)
      setValue(color)
    },
    [setValue],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setInputValue(val)
      if (isValidHex(val)) {
        setValue(val)
      }
    },
    [setValue],
  )

  const handleSwatchClick = useCallback(
    (color: string) => {
      setInputValue(color)
      setValue(color)
    },
    [setValue],
  )

  const resetToTheme = useCallback(() => {
    setValue(undefined)
    setInputValue(presetColor)
  }, [setValue, presetColor])

  const palette = useMemo(() => {
    if (preset?.colors) {
      return Object.entries(preset.colors).map(([key, color]) => ({
        name: key,
        color,
      }))
    }
    return []
  }, [preset])

  return (
    <div className="mb-6 w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-white">{field.label}</label>
        <button
          type="button"
          onClick={resetToTheme}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-gray-300 transition-all hover:border-white/20 hover:bg-white/5"
        >
          <Link2 className="h-3 w-3" />
          {usingTheme ? 'Using Theme' : 'Reset to Theme'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="group relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all hover:scale-105 hover:border-white/20"
            style={{ backgroundColor: displayColor }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />
            <Pipette className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" />
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={presetColor}
              spellCheck={false}
              className="h-10 w-full rounded-xl border border-white/10 bg-[#111827] pl-3 pr-4 font-mono text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div
            className="min-w-[80px] rounded-xl border border-white/10 bg-[#111827] px-3 py-2 text-center font-mono text-xs"
            style={{ backgroundColor: displayColor, color: '#fff' }}
          >
            {displayColor}
          </div>
        </div>

        {open && (
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-2xl backdrop-blur">
            <HexColorPicker color={displayColor} onChange={handleColorChange} className="!w-full" />
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-medium text-gray-400">
            Theme Palette — {preset?.label || themePreset}
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {palette.map(({ name, color }) => {
              const isActive = displayColor === color
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleSwatchClick(color)}
                  className="group relative flex flex-col items-center gap-1"
                  title={name}
                >
                  <div
                    className={`
                      h-10 w-10 rounded-xl border-2 transition-all
                      hover:scale-110 hover:shadow-lg
                      ${isActive ? 'border-white scale-110 shadow-lg' : 'border-white/10'}
                    `}
                    style={{ backgroundColor: color }}
                  >
                    {isActive && (
                      <Check className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" />
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 truncate w-full text-center">
                    {name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
