import type { BarcodeType } from './barcodeTypes'
import type { LabelSize, LabelTemplate, PaperSize } from './labelTemplates'
import { parseSpreadsheetPaste } from './parseSpreadsheetPaste'
import { validateBarcode } from './validateBarcode'

export type BarcodePageContext =
  | 'home'
  | 'printable'
  | 'sku'
  | 'label'
  | 'excel'
  | 'bulk'
  | 'garment'
  | 'mrp'
  | 'lpn'
  | 'inventory'

export type BarcodeMode = 'single' | 'bulk' | 'label'
export type VerticalTemplateId = 'garment' | 'mrp' | 'lpn' | 'inventory'

export interface VerticalSampleRow {
  barcodeValue: string
  productName?: string
  labelText?: string
  location?: string
  quantity?: string
  category?: string
  batch?: string
  packSize?: string
  salePrice?: string
  mrp?: string
  color?: string
  size?: string
  style?: string
  warehouse?: string
  unitType?: string
}

export interface VerticalFieldDefinition {
  key: keyof VerticalSampleRow
  label: string
  required?: boolean
  placeholder?: string
  type?: 'text' | 'price' | 'integer'
}

export interface VerticalBarcodePageConfig {
  context: Extract<BarcodePageContext, 'garment' | 'mrp' | 'lpn' | 'inventory'>
  path: string
  defaultMode: BarcodeMode
  defaultBarcodeType: BarcodeType
  defaultTemplate: LabelTemplate
  defaultValue: string
  barcodePlaceholder: string
  labelTextPlaceholder: string
  defaultLabelSize: LabelSize
  defaultPaper: PaperSize
  zipFilename: string
  csvFilename: string
  historyKey: string
  fields: VerticalFieldDefinition[]
  sampleRows: VerticalSampleRow[]
}

export interface VerticalParsedRow extends VerticalSampleRow {
  id: string
  lineNumber: number
  normalizedValue: string
  isValid: boolean
  message: string
  errors: string[]
}

export const VERTICAL_BATCH_LIMIT = 100

export const verticalBarcodePages = {
  garment: {
    context: 'garment',
    path: '/garment-barcode-generator',
    defaultMode: 'label',
    defaultBarcodeType: 'code128',
    defaultTemplate: 'garment',
    defaultValue: 'TSHIRT-BLK-M',
    barcodePlaceholder: 'TSHIRT-BLK-M',
    labelTextPlaceholder: 'Black T-Shirt / Size M',
    defaultLabelSize: '25x1',
    defaultPaper: 'letter',
    zipFilename: 'garment-barcode-labels.zip',
    csvFilename: 'garment-barcode-template.csv',
    historyKey: 'barcode-mint-history-garment',
    fields: [
      { key: 'barcodeValue', label: 'Barcode Value', required: true, placeholder: 'TSHIRT-BLK-M' },
      { key: 'productName', label: 'Product Name', required: true, placeholder: 'Black T-Shirt' },
      { key: 'color', label: 'Color', placeholder: 'Black' },
      { key: 'size', label: 'Size', placeholder: 'M' },
      { key: 'style', label: 'Style Number', placeholder: 'TS-2026' },
      { key: 'mrp', label: 'Optional Price', type: 'price', placeholder: '$19.99' }
    ],
    sampleRows: [
      { barcodeValue: 'TSHIRT-BLK-M', productName: 'Black T-Shirt', color: 'Black', size: 'M', style: 'TS-2026' },
      { barcodeValue: 'HOODIE-GRY-L', productName: 'Grey Hoodie', color: 'Grey', size: 'L', style: 'HD-1001' },
      { barcodeValue: 'DRESS-RED-S', productName: 'Red Dress', color: 'Red', size: 'S', style: 'DR-551' }
    ]
  },
  mrp: {
    context: 'mrp',
    path: '/mrp-sticker-with-barcode-generator',
    defaultMode: 'label',
    defaultBarcodeType: 'code128',
    defaultTemplate: 'mrp',
    defaultValue: 'SKU-001',
    barcodePlaceholder: 'SKU-001',
    labelTextPlaceholder: 'Product Name',
    defaultLabelSize: '2x1',
    defaultPaper: 'letter',
    zipFilename: 'mrp-barcode-stickers.zip',
    csvFilename: 'mrp-barcode-sticker-template.csv',
    historyKey: 'barcode-mint-history-mrp',
    fields: [
      { key: 'barcodeValue', label: 'Barcode Value', required: true, placeholder: 'SKU-001' },
      { key: 'productName', label: 'Product Name', required: true, placeholder: 'Cotton T-Shirt' },
      { key: 'mrp', label: 'MRP / Price', required: true, type: 'price', placeholder: '$19.99' },
      { key: 'salePrice', label: 'Sale Price', type: 'price', placeholder: '$14.99' },
      { key: 'packSize', label: 'Pack / Size', placeholder: '1 pc' },
      { key: 'batch', label: 'Batch', placeholder: 'BATCH-01' }
    ],
    sampleRows: [
      { barcodeValue: 'SKU-001', productName: 'Cotton T-Shirt', mrp: '$19.99', salePrice: '$14.99', packSize: '1 pc' },
      { barcodeValue: 'SKU-002', productName: 'Coffee Mug', mrp: '$12.99', salePrice: '', packSize: '1 pc' },
      { barcodeValue: 'SKU-003', productName: 'Notebook Pack', mrp: '$8.99', salePrice: '$6.99', packSize: 'Pack of 3' }
    ]
  },
  lpn: {
    context: 'lpn',
    path: '/lpn-barcode-generator',
    defaultMode: 'label',
    defaultBarcodeType: 'code128',
    defaultTemplate: 'lpn',
    defaultValue: 'LPN-000001',
    barcodePlaceholder: 'LPN-000001',
    labelTextPlaceholder: 'Warehouse / Location',
    defaultLabelSize: '4x2',
    defaultPaper: 'letter',
    zipFilename: 'lpn-barcode-labels.zip',
    csvFilename: 'lpn-barcode-template.csv',
    historyKey: 'barcode-mint-history-lpn',
    fields: [
      { key: 'barcodeValue', label: 'LPN Value', required: true, placeholder: 'LPN-000001' },
      { key: 'warehouse', label: 'Warehouse / Location', placeholder: 'WH-A1' },
      { key: 'unitType', label: 'Carton / Pallet / Bin', placeholder: 'Pallet' },
      { key: 'batch', label: 'Batch', placeholder: 'Inbound-01' }
    ],
    sampleRows: [
      { barcodeValue: 'LPN-000001', warehouse: 'WH-A1', unitType: 'Pallet' },
      { barcodeValue: 'LPN-000002', warehouse: 'WH-A2', unitType: 'Carton' },
      { barcodeValue: 'LPN-000003', warehouse: 'WH-B1', unitType: 'Bin' }
    ]
  },
  inventory: {
    context: 'inventory',
    path: '/inventory-barcode-label-generator',
    defaultMode: 'label',
    defaultBarcodeType: 'code128',
    defaultTemplate: 'inventory',
    defaultValue: 'INV-1001',
    barcodePlaceholder: 'INV-1001',
    labelTextPlaceholder: 'Item Name',
    defaultLabelSize: '3x2',
    defaultPaper: 'letter',
    zipFilename: 'inventory-barcode-labels.zip',
    csvFilename: 'inventory-barcode-template.csv',
    historyKey: 'barcode-mint-history-inventory',
    fields: [
      { key: 'barcodeValue', label: 'Barcode Value', required: true, placeholder: 'INV-1001' },
      { key: 'productName', label: 'Item Name', required: true, placeholder: 'Shipping Box' },
      { key: 'location', label: 'Location', placeholder: 'WH-A1' },
      { key: 'quantity', label: 'Quantity', type: 'integer', placeholder: '24' },
      { key: 'category', label: 'Category', placeholder: 'Packing supplies' }
    ],
    sampleRows: [
      { barcodeValue: 'INV-1001', productName: 'Shipping Box', location: 'WH-A1', quantity: '24' },
      { barcodeValue: 'INV-1002', productName: 'Packing Tape', location: 'WH-B2', quantity: '12' },
      { barcodeValue: 'INV-1003', productName: 'Product Sample', location: 'Shelf-03', quantity: '8' }
    ]
  }
} satisfies Record<VerticalTemplateId, VerticalBarcodePageConfig>

export function buildVerticalSampleInput(config: VerticalBarcodePageConfig): string {
  return config.sampleRows.map((row) => config.fields.map((field) => row[field.key] || '').join('\t')).join('\n')
}

export function buildVerticalCsvTemplate(config: VerticalBarcodePageConfig): string {
  const escapeCell = (value: string) => `"${value.replaceAll('"', '""')}"`
  const header = config.fields.map((field) => escapeCell(field.label)).join(',')
  const rows = config.sampleRows.map((row) => config.fields.map((field) => escapeCell(String(row[field.key] || ''))).join(','))

  return [header, ...rows].join('\n')
}

export function mapVerticalRows(input: string, config: VerticalBarcodePageConfig, barcodeType: BarcodeType, fieldOrder = config.fields.map((field) => field.key)): VerticalParsedRow[] {
  return parseSpreadsheetPaste(input).map((parsedRow) => {
    const row: VerticalSampleRow = { barcodeValue: parsedRow.barcodeValue }
    const source = [parsedRow.barcodeValue, parsedRow.labelText, parsedRow.extraText, ...parseExtraCells(input, parsedRow.lineNumber)]

    fieldOrder.forEach((fieldKey, index) => {
      row[fieldKey] = (source[index] || '').trim()
    })

    const validation = validateBarcode(barcodeType, row.barcodeValue || '')
    const errors = buildFieldErrors(row, config)

    if (!validation.isValid) {
      errors.push(validation.message)
    }

    return {
      ...row,
      id: `${parsedRow.lineNumber}-${row.barcodeValue}-${config.context}`,
      lineNumber: parsedRow.lineNumber,
      normalizedValue: validation.normalizedValue,
      isValid: errors.length === 0,
      message: errors.length ? errors.join(' ') : validation.message,
      errors
    }
  })
}

function parseExtraCells(input: string, lineNumber: number): string[] {
  const line = input.split(/\r?\n/)[lineNumber - 1] || ''

  if (line.includes('\t')) {
    return line.split('\t').slice(3)
  }

  if (line.includes(',')) {
    return parseCsvLine(line).slice(3)
  }

  return []
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = []
  let currentCell = ''
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (character === '"' && inQuotes && nextCharacter === '"') {
      currentCell += '"'
      index += 1
      continue
    }

    if (character === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (character === ',' && !inQuotes) {
      cells.push(currentCell)
      currentCell = ''
      continue
    }

    currentCell += character
  }

  cells.push(currentCell)

  return cells
}

function buildFieldErrors(row: VerticalSampleRow, config: VerticalBarcodePageConfig): string[] {
  const errors: string[] = []

  config.fields.forEach((field) => {
    const value = String(row[field.key] || '').trim()

    if (field.required && !value) {
      errors.push(field.key === 'barcodeValue' ? 'Missing barcode value.' : `Missing ${field.label.toLowerCase()}.`)
    }

    if (field.type === 'price' && value && !/^[A-Z$€£₹]?\s?\d+(?:[.,]\d{1,2})?$/.test(value)) {
      errors.push(`Invalid ${field.label.toLowerCase()} format.`)
    }

    if (field.type === 'integer' && value && !/^\d+$/.test(value)) {
      errors.push(`Invalid ${field.label.toLowerCase()}.`)
    }
  })

  return errors
}
