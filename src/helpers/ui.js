import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import {
  WL_CHINESE_SI,
  WL_CHINESE_TR,
  WL_CZECH,
  WL_ENGLISH,
  WL_FRENCH,
  WL_ITALIAN,
  WL_JAPANESE,
  WL_KOREAN,
  WL_PORTUGUESE,
  WL_SPANISH,
  //WL_CHINESE_SI_NAME,
  //WL_CHINESE_TR_NAME,
  WL_CZECH_NAME,
  WL_ENGLISH_NAME,
  WL_FRENCH_NAME,
  WL_ITALIAN_NAME,
  WL_JAPANESE_NAME,
  WL_KOREAN_NAME,
  WL_PORTUGUESE_NAME,
  WL_SPANISH_NAME,
} from '../constants/variables'

export const bip39LanguageOptions = [
  { value: WL_ENGLISH, label: WL_ENGLISH_NAME },
  { value: WL_JAPANESE, label: WL_JAPANESE_NAME },
  { value: WL_SPANISH, label: WL_SPANISH_NAME },
  //{ value: WL_CHINESE_SI, label: WL_CHINESE_SI_NAME },
  //{ value: WL_CHINESE_TR, label: WL_CHINESE_TR_NAME },
  { value: WL_FRENCH, label: WL_FRENCH_NAME },
  { value: WL_ITALIAN, label: WL_ITALIAN_NAME },
  { value: WL_CZECH, label: WL_CZECH_NAME },
  { value: WL_KOREAN, label: WL_KOREAN_NAME },
  { value: WL_PORTUGUESE, label: WL_PORTUGUESE_NAME },
]

export async function loadFont(language) {
  switch (language) {
    case WL_JAPANESE: {
      const { MPLUS1 } = await import('../assets/fonts/mplus1/MPLUS1-normal.js')
      return {
        font: MPLUS1,
        fontName: 'MPLUS1',
        fileName: 'MPLUS1.ttf',
        fontSize: 8,
      }
    }
    case WL_CHINESE_SI: {
      const { ZCOOLKuaiLe } = await import(
        '../assets/fonts/zcoolkuaiLe/ZCOOLKuaiLe-Regular-normal.js'
      )
      return {
        font: ZCOOLKuaiLe,
        fontName: 'ZCOOLKuaiLe-Regular',
        fileName: 'ZCOOLKuaiLe-Regular-normal.ttf',
        fontSize: 9,
      }
    }
    case WL_KOREAN: {
      const { NanumGothicRegular } = await import(
        '../assets/fonts/nanumgothic/NanumGothic-Regular-normal.js'
      )
      return {
        font: NanumGothicRegular,
        fontName: 'NanumGothic-Regular',
        fileName: 'NanumGothic-Regular-normal.ttf',
        fontSize: 7,
      }
    }
    case WL_ENGLISH:
    case WL_SPANISH:
    case WL_ITALIAN:
    case WL_FRENCH:
    case WL_PORTUGUESE:
    case WL_CZECH:
    default: {
      const { NotoSansRegular } = await import(
        '../assets/fonts/noto-sans/NotoSans-Regular-normal.js'
      )
      return {
        font: NotoSansRegular,
        fontName: 'NotoSans-Regular',
        fileName: 'NotoSans-Regular-normal.ttf',
        fontSize: 9,
      }
    }
  }
}

export function hasAlphabet(language) {
  switch (language) {
    case WL_CHINESE_SI:
    case WL_CHINESE_TR:
      return false
    default:
      return true
  }
}

export const AngleDown = (props) => (
  <FontAwesomeIcon icon={solid('angle-down')} {...props} />
)

export const AngleUp = (props) => (
  <FontAwesomeIcon icon={solid('angle-up')} {...props} />
)

export const Dark = (props) => (
  <FontAwesomeIcon icon={solid('moon')} {...props} />
)

export const Light = (props) => (
  <FontAwesomeIcon icon={solid('lightbulb')} {...props} />
)

export const MenuToggle = (props) => (
  <FontAwesomeIcon icon={solid('bars')} {...props} />
)

export const Envelope = (props) => (
  <FontAwesomeIcon icon={solid('envelope')} {...props} />
)

export const Twitter = (props) => (
  <FontAwesomeIcon icon={brands('twitter')} {...props} />
)

export const Telegram = (props) => (
  <FontAwesomeIcon icon={brands('telegram')} {...props} />
)

export const Reddit = (props) => (
  <FontAwesomeIcon icon={brands('reddit')} {...props} />
)

export const Github = (props) => (
  <FontAwesomeIcon icon={brands('github')} {...props} />
)

export const Discord = (props) => (
  <FontAwesomeIcon icon={brands('Discord')} {...props} />
)

export const Tiktok = (props) => (
  <FontAwesomeIcon icon={brands('tiktok')} {...props} />
)

export const Instagram = (props) => (
  <FontAwesomeIcon icon={brands('instagram')} {...props} />
)

export const Facebook = (props) => (
  <FontAwesomeIcon icon={brands('facebook')} {...props} />
)

export const WhatsApp = (props) => (
  <FontAwesomeIcon icon={brands('whatsapp')} {...props} />
)

export const Linkedin = (props) => (
  <FontAwesomeIcon icon={brands('linkedin')} {...props} />
)

export function checkDarkTheme() {
  if (localStorage.getItem('theme') === 'light') {
    setLightMode()
    return false
  } else {
    setDarkMode()
    return true
  }
}

export function setDarkMode() {
  document.querySelector('html').setAttribute('data-theme', 'dark')
  document.querySelector('body').setAttribute('class', 'ui-dark')
  localStorage.setItem('theme', 'dark')
}

export function setLightMode() {
  document.querySelector('html').removeAttribute('data-theme')
  document.querySelector('body').removeAttribute('class')
  localStorage.setItem('theme', 'light')
}
