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
  WL_CHINESE_SI_NAME,
  WL_CHINESE_TR_NAME,
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
  { value: WL_CHINESE_SI, label: WL_CHINESE_SI_NAME },
  { value: WL_CHINESE_TR, label: WL_CHINESE_TR_NAME },
  { value: WL_FRENCH, label: WL_FRENCH_NAME },
  { value: WL_ITALIAN, label: WL_ITALIAN_NAME },
  { value: WL_CZECH, label: WL_CZECH_NAME },
  { value: WL_KOREAN, label: WL_KOREAN_NAME },
  { value: WL_PORTUGUESE, label: WL_PORTUGUESE_NAME },
]

export const AngleDown = (props) => (
  <FontAwesomeIcon icon={solid('angle-down')} {...props} />
)

export const AngleUp = (props) => (
  <FontAwesomeIcon icon={solid('angle-up')} {...props} />
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
