import { type BarcodeType } from './barcodeTypes'
import { encodeBarcodeModules } from './exportSvg'
import {
  getLabelTextLines,
  LABEL_SIZES,
  PAPER_SIZES,
  type LabelDesign
} from './labelTemplates'

export interface BulkBarcodePdfItem {
  value: string
  label?: string
}

const LETTER_WIDTH = 612
const LETTER_HEIGHT = 792
const PRINT_HINT = 'For best results, print at 100% scale and disable "Fit to page".'

export function createSingleBarcodePdf(type: BarcodeType, value: string, text = ''): Blob {
  const modules = encodeBarcodeModules(type, value)
  const moduleWidth = Math.min(3, 468 / modules.length)
  const barHeight = 120
  const barcodeWidth = modules.length * moduleWidth
  const startX = (LETTER_WIDTH - barcodeWidth) / 2
  const startY = 520
  const displayText = text || value
  const commands = [
    '1 1 1 rg',
    `0 0 ${LETTER_WIDTH} ${LETTER_HEIGHT} re f`,
    '0.067 0.094 0.153 rg',
    ...modulesToPdfRects(modules, startX, startY, moduleWidth, barHeight),
    '0.067 0.094 0.153 rg',
    '/F1 16 Tf',
    `BT ${centerTextX(displayText, LETTER_WIDTH)} ${startY - 34} Td (${escapePdfText(displayText)}) Tj ET`,
    '/F1 10 Tf',
    `BT 72 72 Td (${escapePdfText(PRINT_HINT)}) Tj ET`
  ].join('\n')

  return new Blob([buildPdf([commands], LETTER_WIDTH, LETTER_HEIGHT)], { type: 'application/pdf' })
}

export function createBulkBarcodePdf(type: BarcodeType, items: BulkBarcodePdfItem[]): Blob {
  const pageCommands = buildBulkPages(type, items)

  return new Blob([buildPdf(pageCommands, LETTER_WIDTH, LETTER_HEIGHT)], { type: 'application/pdf' })
}

export function createLabelSheetPdf(design: LabelDesign, normalizedValue: string): Blob {
  const paper = PAPER_SIZES[design.paperSize]
  const commands = buildLabelSheetPages(design, normalizedValue, paper.width, paper.height)

  return new Blob([buildPdf(commands, paper.width, paper.height)], { type: 'application/pdf' })
}

function buildLabelSheetPages(design: LabelDesign, normalizedValue: string, pageWidth: number, pageHeight: number): string[] {
  const labelSize = LABEL_SIZES[design.labelSize]
  const labelWidth = labelSize.widthInches * 72
  const labelHeight = labelSize.heightInches * 72
  const marginX = 36
  const marginTop = 36
  const marginBottom = 54
  const gapX = 8
  const gapY = 8
  const columns = Math.max(1, Math.floor((pageWidth - marginX * 2 + gapX) / (labelWidth + gapX)))
  const rows = Math.max(1, Math.floor((pageHeight - marginTop - marginBottom + gapY) / (labelHeight + gapY)))
  const sheetCapacity = rows * columns
  const labelCount = Math.max(1, Math.min(design.quantity ?? sheetCapacity, 100))
  const pages: string[] = []

  for (let pageStart = 0; pageStart < labelCount; pageStart += sheetCapacity) {
    const pageLabelCount = Math.min(sheetCapacity, labelCount - pageStart)
    const commands = [
      '1 1 1 rg',
      `0 0 ${pageWidth} ${pageHeight} re f`
    ]

    for (let index = 0; index < pageLabelCount; index += 1) {
      const row = Math.floor(index / columns)
      const column = index % columns
      const x = marginX + column * (labelWidth + gapX)
      const y = pageHeight - marginTop - (row + 1) * labelHeight - row * gapY

      commands.push(...designedLabelToPdfCommands(design, normalizedValue, x, y, labelWidth, labelHeight))
    }

    commands.push('/F1 9 Tf')
    commands.push(`BT 36 24 Td (${escapePdfText(PRINT_HINT)}) Tj ET`)
    pages.push(commands.join('\n'))
  }

  return pages
}

function designedLabelToPdfCommands(
  design: LabelDesign,
  normalizedValue: string,
  x: number,
  y: number,
  width: number,
  height: number
): string[] {
  const padding = 8
  const modules = encodeBarcodeModules(design.barcodeType, normalizedValue)
  const textLines = getLabelTextLines(design, normalizedValue)
  const hasTopLine = design.template !== 'simple'
  const hasLocationLine = design.template === 'inventory'
  const topLine = hasTopLine ? textLines[0] : ''
  const bottomLine = normalizedValue
  const locationLine = hasLocationLine ? textLines[1] : ''
  const topTextY = y + height - padding - 11
  const bottomTextY = y + padding + 5
  const locationTextY = y + padding + 19
  const barcodeTop = hasTopLine ? topTextY - 9 : y + height - padding
  const barcodeBottom = y + padding + (hasLocationLine ? 34 : 20)
  const barHeight = Math.max(24, barcodeTop - barcodeBottom)
  const moduleWidth = Math.min(1.6, (width - padding * 2) / modules.length)
  const barcodeWidth = modules.length * moduleWidth
  const startX = x + (width - barcodeWidth) / 2
  const commands = [
    '0.898 0.906 0.922 RG',
    `${formatPdfNumber(x)} ${formatPdfNumber(y)} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re S`,
    '0.067 0.094 0.153 rg'
  ]

  if (topLine) {
    commands.push('/F1 9 Tf')
    commands.push(`BT ${centerTextXInBox(topLine, x, width)} ${formatPdfNumber(topTextY)} Td (${escapePdfText(trimPdfText(topLine, 34))}) Tj ET`)
  }

  commands.push(...modulesToPdfRects(modules, startX, barcodeBottom, moduleWidth, barHeight))

  if (locationLine) {
    commands.push('/F1 8 Tf')
    commands.push(`BT ${centerTextXInBox(locationLine, x, width)} ${formatPdfNumber(locationTextY)} Td (${escapePdfText(trimPdfText(locationLine, 38))}) Tj ET`)
  }

  commands.push('/F1 8 Tf')
  commands.push(`BT ${centerTextXInBox(bottomLine, x, width)} ${formatPdfNumber(bottomTextY)} Td (${escapePdfText(trimPdfText(bottomLine, 38))}) Tj ET`)

  return commands
}

function buildBulkPages(type: BarcodeType, items: BulkBarcodePdfItem[]): string[] {
  const marginX = 36
  const marginTop = 48
  const marginBottom = 54
  const gapX = 18
  const gapY = 14
  const columns = 2
  const labelWidth = (LETTER_WIDTH - marginX * 2 - gapX) / columns
  const labelHeight = 88
  const rows = Math.floor((LETTER_HEIGHT - marginTop - marginBottom + gapY) / (labelHeight + gapY))
  const labelsPerPage = rows * columns
  const pages: string[] = []

  for (let pageStart = 0; pageStart < items.length; pageStart += labelsPerPage) {
    const pageItems = items.slice(pageStart, pageStart + labelsPerPage)
    const commands = [
      '1 1 1 rg',
      `0 0 ${LETTER_WIDTH} ${LETTER_HEIGHT} re f`,
      '0.067 0.094 0.153 rg'
    ]

    pageItems.forEach((item, index) => {
      const row = Math.floor(index / columns)
      const column = index % columns
      const x = marginX + column * (labelWidth + gapX)
      const y = LETTER_HEIGHT - marginTop - (row + 1) * labelHeight - row * gapY

      commands.push(...labelToPdfCommands(type, item, x, y, labelWidth, labelHeight))
    })

    commands.push('/F1 9 Tf')
    commands.push(`BT 36 28 Td (${escapePdfText(PRINT_HINT)}) Tj ET`)
    pages.push(commands.join('\n'))
  }

  return pages
}

function labelToPdfCommands(
  type: BarcodeType,
  item: BulkBarcodePdfItem,
  x: number,
  y: number,
  width: number,
  height: number
): string[] {
  const padding = 10
  const modules = encodeBarcodeModules(type, item.value)
  const moduleWidth = Math.min(1.6, (width - padding * 2) / modules.length)
  const barcodeWidth = modules.length * moduleWidth
  const barHeight = 44
  const startX = x + (width - barcodeWidth) / 2
  const startY = y + height - padding - barHeight
  const label = item.label || item.value

  return [
    '0.898 0.906 0.922 RG',
    `${formatPdfNumber(x)} ${formatPdfNumber(y)} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re S`,
    '0.067 0.094 0.153 rg',
    ...modulesToPdfRects(modules, startX, startY, moduleWidth, barHeight),
    '/F1 10 Tf',
    `BT ${centerTextXInBox(label, x, width)} ${formatPdfNumber(y + 14)} Td (${escapePdfText(label)}) Tj ET`
  ]
}

function modulesToPdfRects(
  modules: string,
  startX: number,
  startY: number,
  moduleWidth: number,
  height: number
): string[] {
  const rects: string[] = []
  let runStart = -1

  for (let index = 0; index <= modules.length; index += 1) {
    const isBar = modules[index] === '1'

    if (isBar && runStart === -1) {
      runStart = index
    }

    if ((!isBar || index === modules.length) && runStart !== -1) {
      const width = (index - runStart) * moduleWidth
      rects.push(`${formatPdfNumber(startX + runStart * moduleWidth)} ${formatPdfNumber(startY)} ${formatPdfNumber(width)} ${height} re f`)
      runStart = -1
    }
  }

  return rects
}

function buildPdf(contentStreams: string[], pageWidth: number, pageHeight: number): string {
  const pageObjectNumbers = contentStreams.map((_, index) => 3 + index)
  const fontObjectNumber = 3 + contentStreams.length
  const contentObjectNumbers = contentStreams.map((_, index) => 4 + contentStreams.length + index)
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${pageObjectNumbers.map((pageNumber) => `${pageNumber} 0 R`).join(' ')}] /Count ${contentStreams.length} >>`,
    ...contentStreams.map((_, index) => (
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontObjectNumber} 0 R >> >> /Contents ${contentObjectNumbers[index]} 0 R >>`
    )),
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    ...contentStreams.map((content) => `<< /Length ${content.length} >>\nstream\n${content}\nendstream`)
  ]
  const parts = ['%PDF-1.4\n']
  const offsets = [0]

  for (const [index, object] of objects.entries()) {
    offsets.push(parts.join('').length)
    parts.push(`${index + 1} 0 obj\n${object}\nendobj\n`)
  }

  const xrefOffset = parts.join('').length
  parts.push(`xref\n0 ${objects.length + 1}\n`)
  parts.push('0000000000 65535 f \n')
  for (let index = 1; index < offsets.length; index += 1) {
    parts.push(`${String(offsets[index]).padStart(10, '0')} 00000 n \n`)
  }
  parts.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

  return parts.join('')
}

function centerTextX(text: string, pageWidth: number): number {
  return Math.max(72, (pageWidth - text.length * 7) / 2)
}

function centerTextXInBox(text: string, x: number, width: number): string {
  return formatPdfNumber(Math.max(x + 8, x + (width - text.length * 5.5) / 2))
}

function formatPdfNumber(value: number): string {
  return value.toFixed(2).replace(/\.?0+$/, '')
}

function escapePdfText(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')
}

function trimPdfText(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value
}
