import React from 'react'
import ReactDOM from 'react-dom/client'
import { getNavigatorLocale, getSupportedLocale } from './helpers/locale'
import locales from './assets/locales'
import { IntlProvider } from 'react-intl'
import './assets/fonts/lato/font.css'
import './index.css'
import './spinner.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

const navigatorLocale = getNavigatorLocale()
const supportedLocale = getSupportedLocale(navigatorLocale)

if (process.env.NODE_ENV === 'production') {
  window.onbeforeunload = (e) => {
    return true
  }
}

root.render(
  <React.StrictMode>
    <IntlProvider locale={navigatorLocale} messages={locales[supportedLocale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
)
