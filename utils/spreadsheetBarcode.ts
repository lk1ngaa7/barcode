export interface SpreadsheetBarcodeRow {
  id: string
  lineNumber: number
  barcodeValue: string
  labelText: string
  extraText: string
  normalizedValue: string
  isValid: boolean
  message: string
  svg: string
}
