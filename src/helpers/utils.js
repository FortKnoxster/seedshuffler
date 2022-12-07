export function isMobile() {
  return navigator.userAgent.includes('Mobi')
}

export function isEmail(string) {
  return string.includes('@') && string.includes('.')
}
