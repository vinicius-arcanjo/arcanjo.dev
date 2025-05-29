'use client'

import { createI18nClient } from 'next-international/client'

// NOTE: Also update middleware.ts to support locale
export const languages = ['br', 'en']

export const {
  useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale,
  useI18n,
} = createI18nClient({
  br: () => import('./pt-br'),
  en: () => import('./en'),
})
