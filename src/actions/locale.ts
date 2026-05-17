'use server'

import { cookies } from 'next/headers'

export async function setLocaleCookie(locale: 'en' | 'es') {
  const cookieStore = await cookies()
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
  })
}
