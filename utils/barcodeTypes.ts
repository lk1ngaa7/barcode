export type BarcodeType = 'code128' | 'upc-a' | 'ean-13' | 'code39' | 'itf'

export type BarcodeSymbology = 'CODE128' | 'UPC' | 'EAN13' | 'CODE39' | 'ITF'

export interface BarcodeTypeDefinition {
  id: BarcodeType
  symbology: BarcodeSymbology
  label: string
  description: string
  example: string
  placeholder: string
  allowedInput: string
}

export const BARCODE_TYPES: Record<BarcodeType, BarcodeTypeDefinition> = {
  code128: {
    id: 'code128',
    symbology: 'CODE128',
    label: 'Code 128',
    description: 'Best for SKUs and inventory',
    example: 'SKU-001',
    placeholder: 'e.g. SKU-001',
    allowedInput: '1-80 printable ASCII characters'
  },
  'upc-a': {
    id: 'upc-a',
    symbology: 'UPC',
    label: 'UPC-A',
    description: '12-digit retail product barcode',
    example: '03600029145',
    placeholder: 'e.g. 03600029145',
    allowedInput: '11 digits, or 12 digits with a valid check digit'
  },
  'ean-13': {
    id: 'ean-13',
    symbology: 'EAN13',
    label: 'EAN-13',
    description: '13-digit international product barcode',
    example: '590123412345',
    placeholder: 'e.g. 590123412345',
    allowedInput: '12 digits, or 13 digits with a valid check digit'
  },
  code39: {
    id: 'code39',
    symbology: 'CODE39',
    label: 'Code 39',
    description: 'Inventory and industrial labels',
    example: 'SKU-001',
    placeholder: 'e.g. SKU-001',
    allowedInput: 'Uppercase letters, numbers, spaces, and - . $ / + %'
  },
  itf: {
    id: 'itf',
    symbology: 'ITF',
    label: 'ITF',
    description: 'Cartons and warehouse packaging',
    example: '123456',
    placeholder: 'e.g. 123456',
    allowedInput: 'Even number of numeric digits'
  }
}

export const BARCODE_ERROR_MESSAGES = {
  empty: 'Enter a barcode value to generate a preview.',
  code128TooLong: 'Code 128 supports up to 80 characters. Shorten the value and try again.',
  code128Unsupported:
    'Code 128 supports letters, numbers, spaces, and common symbols. Remove unsupported characters and try again.',
  upcNonNumeric:
    'UPC-A only supports numeric digits. Use Code 128 for custom SKU values like "SKU-001".',
  upcLength:
    'UPC-A requires 12 numeric digits, or 11 digits if you want us to calculate the check digit.',
  upcInvalidCheckDigit:
    'The UPC-A check digit is not valid. Check the number or enter the first 11 digits so we can calculate it.',
  eanNonNumeric:
    'EAN-13 only supports numeric digits. Use Code 128 for custom SKU values like "SKU-001".',
  eanLength:
    'EAN-13 requires 13 numeric digits, or 12 digits if you want us to calculate the check digit.',
  eanInvalidCheckDigit:
    'The EAN-13 check digit is not valid. Check the number or enter the first 12 digits so we can calculate it.',
  code39Unsupported:
    'Code 39 supports uppercase letters, numbers, spaces, and these symbols: - . $ / + %',
  itfNonNumeric: 'ITF only supports numeric digits.',
  itfOddLength:
    'ITF usually requires an even number of digits. Add a leading zero or check your packaging code.',
  unsupportedType: 'Choose a supported barcode type.'
} as const

export const BARCODE_SUCCESS_MESSAGES: Record<BarcodeType, string> = {
  code128: 'Valid Code 128 barcode. Good for SKUs and inventory labels.',
  'upc-a': 'Valid UPC-A barcode. Good for 12-digit retail product barcodes.',
  'ean-13': 'Valid EAN-13 barcode. Good for international retail product barcodes.',
  code39: 'Valid Code 39 barcode. Good for inventory, industrial labels, and logistics.',
  itf: 'Valid ITF barcode. Good for cartons, shipping boxes, and warehouse packaging.'
}

export function isBarcodeType(value: string): value is BarcodeType {
  return value in BARCODE_TYPES
}

export function getBarcodeTypeDefinition(type: BarcodeType): BarcodeTypeDefinition {
  return BARCODE_TYPES[type]
}
