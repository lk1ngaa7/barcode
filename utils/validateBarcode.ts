import {
  BARCODE_ERROR_MESSAGES,
  BARCODE_SUCCESS_MESSAGES,
  type BarcodeType,
  isBarcodeType
} from './barcodeTypes'
import {
  calculateEan13CheckDigit,
  calculateUpcACheckDigit,
  completeEan13,
  completeUpcA,
  hasValidEan13CheckDigit,
  hasValidUpcACheckDigit
} from './checkDigit'

const PRINTABLE_ASCII_PATTERN = /^[\x20-\x7E]+$/
const DIGITS_ONLY_PATTERN = /^\d+$/

export interface BarcodeValidationResult {
  isValid: boolean
  type: BarcodeType
  inputValue: string
  normalizedValue: string
  message: string
  error?: string
  checkDigit?: string
  wasCheckDigitAdded: boolean
  recommendation?: string
}

export function getBarcodeRecommendation(value: string): string | undefined {
  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return undefined
  }

  if (!DIGITS_ONLY_PATTERN.test(normalizedValue)) {
    return 'This looks like a custom SKU. Code 128 is recommended.'
  }

  if (normalizedValue.length === 12) {
    return 'This looks like a UPC-A barcode.'
  }

  if (normalizedValue.length === 13) {
    return 'This looks like an EAN-13 barcode.'
  }

  return undefined
}

export function validateBarcode(type: BarcodeType, value: string): BarcodeValidationResult {
  if (!isBarcodeType(type)) {
    return createErrorResult('code128', value, BARCODE_ERROR_MESSAGES.unsupportedType)
  }

  if (type === 'code128') {
    return validateCode128(value)
  }

  if (type === 'upc-a') {
    return validateUpcA(value)
  }

  return validateEan13(value)
}

export function validateCode128(value: string): BarcodeValidationResult {
  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return createErrorResult('code128', value, BARCODE_ERROR_MESSAGES.empty)
  }

  if (normalizedValue.length > 80) {
    return createErrorResult('code128', value, BARCODE_ERROR_MESSAGES.code128TooLong)
  }

  if (!PRINTABLE_ASCII_PATTERN.test(normalizedValue)) {
    return createErrorResult('code128', value, BARCODE_ERROR_MESSAGES.code128Unsupported)
  }

  return createValidResult('code128', value, normalizedValue)
}

export function validateUpcA(value: string): BarcodeValidationResult {
  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return createErrorResult('upc-a', value, BARCODE_ERROR_MESSAGES.empty)
  }

  if (!DIGITS_ONLY_PATTERN.test(normalizedValue)) {
    return createErrorResult('upc-a', value, BARCODE_ERROR_MESSAGES.upcNonNumeric)
  }

  if (normalizedValue.length === 11) {
    const checkDigit = calculateUpcACheckDigit(normalizedValue)

    return createValidResult('upc-a', value, completeUpcA(normalizedValue), checkDigit, true)
  }

  if (normalizedValue.length !== 12) {
    return createErrorResult('upc-a', value, BARCODE_ERROR_MESSAGES.upcLength)
  }

  if (!hasValidUpcACheckDigit(normalizedValue)) {
    return createErrorResult('upc-a', value, BARCODE_ERROR_MESSAGES.upcInvalidCheckDigit)
  }

  return createValidResult('upc-a', value, normalizedValue, normalizedValue.at(-1), false)
}

export function validateEan13(value: string): BarcodeValidationResult {
  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return createErrorResult('ean-13', value, BARCODE_ERROR_MESSAGES.empty)
  }

  if (!DIGITS_ONLY_PATTERN.test(normalizedValue)) {
    return createErrorResult('ean-13', value, BARCODE_ERROR_MESSAGES.eanNonNumeric)
  }

  if (normalizedValue.length === 12) {
    const checkDigit = calculateEan13CheckDigit(normalizedValue)

    return createValidResult('ean-13', value, completeEan13(normalizedValue), checkDigit, true)
  }

  if (normalizedValue.length !== 13) {
    return createErrorResult('ean-13', value, BARCODE_ERROR_MESSAGES.eanLength)
  }

  if (!hasValidEan13CheckDigit(normalizedValue)) {
    return createErrorResult('ean-13', value, BARCODE_ERROR_MESSAGES.eanInvalidCheckDigit)
  }

  return createValidResult('ean-13', value, normalizedValue, normalizedValue.at(-1), false)
}

function createValidResult(
  type: BarcodeType,
  inputValue: string,
  normalizedValue: string,
  checkDigit?: string,
  wasCheckDigitAdded = false
): BarcodeValidationResult {
  return {
    isValid: true,
    type,
    inputValue,
    normalizedValue,
    message: BARCODE_SUCCESS_MESSAGES[type],
    checkDigit,
    wasCheckDigitAdded,
    recommendation: getBarcodeRecommendation(normalizedValue)
  }
}

function createErrorResult(
  type: BarcodeType,
  inputValue: string,
  error: string
): BarcodeValidationResult {
  return {
    isValid: false,
    type,
    inputValue,
    normalizedValue: inputValue.trim(),
    message: error,
    error,
    wasCheckDigitAdded: false,
    recommendation: getBarcodeRecommendation(inputValue)
  }
}
