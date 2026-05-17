'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/providers/Language'
import { cn } from '@/utilities/ui'

export const LanguageToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { locale, setLocale } = useLocale()
  const router = useRouter()

  const handleToggle = (newLocale: 'en' | 'es') => {
    setLocale(newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  const buttonClass = (active: boolean) =>
    cn(
      'px-3 py-1 text-sm border rounded transition-colors',
      active
        ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)]'
        : 'border-[var(--color-secondary)] text-white hover:bg-white/10',
    )

  return (
    <div className={cn('flex gap-2', className)}>
      <button onClick={() => handleToggle('en')} className={buttonClass(locale === 'en')}>
        English
      </button>
      <button onClick={() => handleToggle('es')} className={buttonClass(locale === 'es')}>
        Español
      </button>
    </div>
  )
}

export default LanguageToggle
