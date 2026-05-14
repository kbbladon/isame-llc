'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import { Type, Link2 } from 'lucide-react'
import { THEME_PRESETS } from '@/theme/themePresets'

const fieldToPresetKey: Record<string, 'heading' | 'body'> = {
  headingFontFamily: 'heading',
  bodyFontFamily: 'body',
  subheadingFontFamily: 'body',
}

type Props = {
  path: string
  field: {
    name: string
    label?: string
  }
}

export default function ThemeFontPicker({ path, field }: Props) {
  const { value, setValue } = useField<string>({ path })

  const themePreset = useFormFields(([fields]) => fields?.themePreset?.value) || 'luxury'

  const preset = THEME_PRESETS[themePreset as keyof typeof THEME_PRESETS]
  const presetKey = fieldToPresetKey[field.name]
  const presetFont =
    presetKey === 'heading' ? preset.typography.headingFont : preset.typography.bodyFont

  const [inputValue, setInputValue] = useState(value || presetFont)
  const usingTheme = !value

  useEffect(() => {
    if (!value) {
      setInputValue(presetFont)
    }
  }, [presetFont, value])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setInputValue(val)
      setValue(val || undefined)
    },
    [setValue],
  )

  const resetToTheme = useCallback(() => {
    setValue(undefined)
    setInputValue(presetFont)
  }, [setValue, presetFont])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">{field.label}</label>
        <button
          type="button"
          onClick={resetToTheme}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-gray-300 hover:border-white/20 hover:bg-white/5"
        >
          <Link2 className="h-3 w-3" />
          {usingTheme ? 'Using Theme' : 'Reset to Theme'}
        </button>
      </div>
      <div className="relative">
        <Type className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={inputValue}
          onChange={handleChange}
          className="h-11 w-full rounded-xl border border-white/10 bg-[#111827] pl-10 pr-4 font-mono text-sm text-white outline-none focus:border-blue-500"
          placeholder={presetFont}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Theme: {presetFont}</span>
      </div>
    </div>
  )
}
