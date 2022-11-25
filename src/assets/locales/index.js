import en from './en.json'
import es from './es.json'

const esWithFallback = Object.assign({}, en, es)

const locales = { 'en-US': en, 'en-GB': es, 'es-ES': esWithFallback }

export default locales
