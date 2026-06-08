import type { BarcodeType } from './barcodeTypes'

export type LabelTemplate = 'simple' | 'product' | 'inventory' | 'garment' | 'mrp' | 'lpn'
export type LabelSize = '2x1' | '3x2' | '1x05' | '25x1' | '4x2' | '4x3'
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
  quantity?: number
  salePrice?: string
  mrp?: string
  color?: string
  size?: string
  style?: string
  packSize?: string
  warehouse?: string
  unitType?: string
  category?: string
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
    label: 'Inventory Label',
    description: 'Item name, barcode, location, and barcode value.'
  },
  garment: {
    id: 'garment',
    label: 'Garment Label',
    description: 'Clothing SKU label with product name, style, color, and size.'
  },
  mrp: {
    id: 'mrp',
    label: 'MRP Price Sticker',
    description: 'Product price sticker with MRP, sale price, pack size, and barcode.'
  },
  lpn: {
    id: 'lpn',
    label: 'LPN Warehouse Label',
    description: 'Warehouse license plate label for pallets, cartons, bins, and inventory units.'
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
  },
  '1x05': {
    id: '1x05',
    label: '1 x 0.5 inch',
    widthInches: 1,
    heightInches: 0.5
  },
  '25x1': {
    id: '25x1',
    label: '2.5 x 1 inch',
    widthInches: 2.5,
    heightInches: 1
  },
  '4x2': {
    id: '4x2',
    label: '4 x 2 inch',
    widthInches: 4,
    heightInches: 2
  },
  '4x3': {
    id: '4x3',
    label: '4 x 3 inch',
    widthInches: 4,
    heightInches: 3
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

  if (design.template === 'garment') {
    const details = [
      design.style ? `Style: ${design.style}` : '',
      design.color ? `Color: ${design.color}` : '',
      design.size ? `Size: ${design.size}` : ''
    ].filter(Boolean).join(' / ')

    return [productName, details, normalizedValue].filter(Boolean)
  }

  if (design.template === 'mrp') {
    return [
      productName,
      design.mrp ? `MRP / Price: ${design.mrp}` : '',
      design.salePrice ? `Sale: ${design.salePrice}` : '',
      design.packSize ? `Pack: ${design.packSize}` : '',
      normalizedValue
    ].filter(Boolean)
  }

  if (design.template === 'lpn') {
    return [
      normalizedValue,
      design.warehouse ? `Warehouse: ${design.warehouse}` : '',
      design.unitType || 'License Plate Number'
    ].filter(Boolean)
  }

  return [normalizedValue]
}
