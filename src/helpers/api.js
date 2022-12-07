function postJson(url, data) {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export function getDieFi(email) {
  const url = 'https://api.fortknoxster.dev/email/seedshuffler/get-diefi'
  return postJson(url, { email })
}
