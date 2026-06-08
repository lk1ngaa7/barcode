import { VERTICAL_BATCH_LIMIT } from './verticalBarcodePages'

export interface LpnSequenceInput {
  prefix: string
  startNumber: number
  quantity: number
  digits: number
}

export interface LpnSequenceResult {
  values: string[]
  error: string
}

export function generateLpnSequence(input: LpnSequenceInput): LpnSequenceResult {
  const prefix = input.prefix.trim()

  if (!prefix) {
    return { values: [], error: 'Prefix cannot be empty.' }
  }

  if (!Number.isInteger(input.startNumber) || input.startNumber < 0) {
    return { values: [], error: 'Start number must be zero or a positive integer.' }
  }

  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > VERTICAL_BATCH_LIMIT) {
    return { values: [], error: `Sequence quantity must be between 1 and ${VERTICAL_BATCH_LIMIT}.` }
  }

  if (!Number.isInteger(input.digits) || input.digits < 1 || input.digits > 12) {
    return { values: [], error: 'Digits must be between 1 and 12.' }
  }

  const finalNumber = input.startNumber + input.quantity - 1

  if (String(finalNumber).length > input.digits) {
    return { values: [], error: 'Digits must be large enough for the largest generated number.' }
  }

  return {
    values: Array.from({ length: input.quantity }, (_, index) => `${prefix}${String(input.startNumber + index).padStart(input.digits, '0')}`),
    error: ''
  }
}
