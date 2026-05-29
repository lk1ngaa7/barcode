const DIGITS_ONLY = /^\d+$/

function assertNumericInput(value: string, expectedLength: number, label: string): void {
  if (!DIGITS_ONLY.test(value) || value.length !== expectedLength) {
    throw new Error(`${label} check digit requires exactly ${expectedLength} numeric digits.`)
  }
}

export function calculateUpcACheckDigit(firstElevenDigits: string): string {
  assertNumericInput(firstElevenDigits, 11, 'UPC-A')

  const sum = firstElevenDigits
    .split('')
    .reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0)

  return String((10 - (sum % 10)) % 10)
}

export function completeUpcA(value: string): string {
  return `${value}${calculateUpcACheckDigit(value)}`
}

export function hasValidUpcACheckDigit(value: string): boolean {
  if (!DIGITS_ONLY.test(value) || value.length !== 12) {
    return false
  }

  return calculateUpcACheckDigit(value.slice(0, 11)) === value.at(-1)
}

export function calculateEan13CheckDigit(firstTwelveDigits: string): string {
  assertNumericInput(firstTwelveDigits, 12, 'EAN-13')

  const sum = firstTwelveDigits
    .split('')
    .reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0)

  return String((10 - (sum % 10)) % 10)
}

export function completeEan13(value: string): string {
  return `${value}${calculateEan13CheckDigit(value)}`
}

export function hasValidEan13CheckDigit(value: string): boolean {
  if (!DIGITS_ONLY.test(value) || value.length !== 13) {
    return false
  }

  return calculateEan13CheckDigit(value.slice(0, 12)) === value.at(-1)
}
