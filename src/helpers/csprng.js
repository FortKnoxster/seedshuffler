// Cryptographically secure pseudorandom number generator
export function randomBytes(bytes) {
  const typedArray = new Uint8Array(bytes)
  return crypto.getRandomValues(typedArray)
}

// Inspired by https://github.com/joepie91/node-random-number-csprng/blob/master/src/index.js
export function calculateParameters(r) {
  let bitsNeeded = 0
  let bytesNeeded = 0
  let mask = 1
  let range = r

  while (range > 0) {
    if (bitsNeeded % 8 === 0) {
      bytesNeeded += 1
    }

    bitsNeeded += 1
    mask = (mask << 1) | 1 /* 0x00001111 -> 0x00011111 */

    range = range >>> 1 /* 0x01000000 -> 0x00100000 */
  }

  return { bitsNeeded, bytesNeeded, mask }
}

function validateMinMax(minimum, maximum) {
  if (!(maximum > minimum)) {
    throw new Error('The maximum value must be higher than the minimum value.')
  }
  if (minimum < -9007199254740991 || minimum > 9007199254740991) {
    throw new Error(
      'The minimum value must be inbetween MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.',
    )
  }
  if (maximum < -9007199254740991 || maximum > 9007199254740991) {
    throw new Error(
      'The maximum value must be inbetween MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.',
    )
  }
  return true
}

function validateRange(range) {
  if (range < -9007199254740991 || range > 9007199254740991) {
    throw new Error(
      'The range between the minimum and maximum value must be in between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.',
    )
  }
  return true
}

export async function secureRandomInRange(minimum, maximum) {
  validateMinMax(minimum, maximum)

  const range = maximum - minimum

  validateRange(range)

  const { bytesNeeded, mask } = calculateParameters(range)

  const rBytes = randomBytes(bytesNeeded)

  let randomValue = 0

  /* Turn the random bytes into an integer, using bitwise operations. */
  for (let i = 0; i < bytesNeeded; i++) {
    randomValue |= rBytes[i] << (8 * i)
  }

  randomValue = randomValue & mask

  if (randomValue <= range) {
    return minimum + randomValue
  } else {
    return secureRandomInRange(minimum, maximum)
  }
}

// Inspired by https://github.com/dhessler/crypto-secure-shuffle/blob/master/src/index.ts
export async function shuffleArray(array = []) {
  if (!Array.isArray(array)) {
    throw new Error('Not an array.')
  }
  if (!(array.length > 0)) {
    throw new Error('Array is empty.')
  }
  const promises = []

  for (let i = array.length - 1; i > 0; i--) {
    promises.push(secureRandomInRange(0, i))
  }

  const randomNumbers = await Promise.all(promises)

  // apply durstenfeld shuffle with previously generated random numbers
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomNumbers[array.length - i - 1]
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}
