import type { BarcodeType } from './barcodeTypes'

export type LabelTemplate = 'simple' | 'product' | 'inventory'
export type LabelSize = '2x1' | '3x2'
export type PaperSize = 'letter' | 'a4'

export interface LabelTemplateDefinition {
  id: LabelTemplate
  label: string
  description: string
}

export interface LabelSizeDefinition {
  id: LabelSize
  label: string
  widthInches: number
  heightInches: number
}

export interface PaperSizeDefinition {
  id: PaperSize
  label: string
  width: number
  height: number
}

export interface LabelDesign {
  barcodeType: BarcodeType
  barcodeValue: string
  template: LabelTemplate
  labelSize: LabelSize
  paperSize: PaperSize
  productName: string
  locationText: string
}

export const LABEL_TEMPLATES: Record<LabelTemplate, LabelTemplateDefinition> = {
  simple: {
    id: 'simple',
    label: 'Simple',
    description: 'Barcode with the barcode value below it.'
  },
  product: {
    id: 'product',
    label: 'Product',
    description: 'Product name, barcode, and barcode value.'
  },
  inventory: {
    id: 'inventory',
    label: 'Inventory',
    description: 'Item name, barcode, location, and barcode value.'
  }
}

export const LABEL_SIZES: Record<LabelSize, LabelSizeDefinition> = {
  '2x1': {
    id: '2x1',
    label: '2 x 1 inch',
    widthInches: 2,
    heightInches: 1
  },
  '3x2': {
    id: '3x2',
    label: '3 x 2 inch',
    widthInches: 3,
    heightInches: 2
  }
}

export const PAPER_SIZES: Record<PaperSize, PaperSizeDefinition> = {
  letter: {
    id: 'letter',
    label: 'US Letter',
    width: 612,
    height: 792
  },
  a4: {
    id: 'a4',
    label: 'A4',
    width: 595,
    height: 842
  }
}

export function getLabelTextLines(design: Omit<LabelDesign, 'barcodeType' | 'labelSize' | 'paperSize'>, normalizedValue: string): string[] {
  const productName = design.productName.trim() || 'Black T-Shirt'
  const locationText = design.locationText.trim() || 'Aisle 3 / Bin 12'

  if (design.template === 'product') {
    return [productName, normalizedValue]
  }

  if (design.template === 'inventory') {
    return [`Item: ${productName}`, `Location: ${locationText}`, normalizedValue]
  }

  return [normalizedValue]
}
