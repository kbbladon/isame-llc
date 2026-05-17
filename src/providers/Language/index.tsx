'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Locale = 'en' | 'es'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
})

export const useLocale = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en')

  // Read locale from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/)
    if (match) {
      const cookieValue = match[1]
      if (cookieValue === 'en' || cookieValue === 'es') {
        setLocaleState(cookieValue)
      }
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
  )
}
