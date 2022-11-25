import { DEFAULT_LOCALE } from 'constants/variables'

export function getNavigatorLocale() {
  const navigatorLocale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    DEFAULT_LOCALE
  return navigatorLocale
}

export function getLocaleLanguage(locale) {
  if (locale.length >= 2) {
    return locale.substring(0, 2).toLowerCase()
  }
  return 'en'
}

export function getSupportedLocale(locale) {
  switch (getLocaleLanguage(locale)) {
    case 'es':
      return 'es-ES'
    case 'en':
      return 'en-US'
    default:
      return DEFAULT_LOCALE
  }
}

export const languageData = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Español',
    value: 'es',
  },
]
