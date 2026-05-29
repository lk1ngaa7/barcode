export interface BulkBarcodeRow {
  id: string
  lineNumber: number
  inputValue: string
  normalizedValue: string
  isValid: boolean
  message: string
  svg: string
}
