import { type BarcodeType } from './barcodeTypes'
import { validateBarcode } from './validateBarcode'

const CODE128_PATTERNS = [
  '212222',
  '222122',
  '222221',
  '121223',
  '121322',
  '131222',
  '122213',
  '122312',
  '132212',
  '221213',
  '221312',
  '231212',
  '112232',
  '122132',
  '122231',
  '113222',
  '123122',
  '123221',
  '223211',
  '221132',
  '221231',
  '213212',
  '223112',
  '312131',
  '311222',
  '321122',
  '321221',
  '312212',
  '322112',
  '322211',
  '212123',
  '212321',
  '232121',
  '111323',
  '131123',
  '131321',
  '112313',
  '132113',
  '132311',
  '211313',
  '231113',
  '231311',
  '112133',
  '112331',
  '132131',
  '113123',
  '113321',
  '133121',
  '313121',
  '211331',
  '231131',
  '213113',
  '213311',
  '213131',
  '311123',
  '311321',
  '331121',
  '312113',
  '312311',
  '332111',
  '314111',
  '221411',
  '431111',
  '111224',
  '111422',
  '121124',
  '121421',
  '141122',
  '141221',
  '112214',
  '112412',
  '122114',
  '122411',
  '142112',
  '142211',
  '241211',
  '221114',
  '413111',
  '241112',
  '134111',
  '111242',
  '121142',
  '121241',
  '114212',
  '124112',
  '124211',
  '411212',
  '421112',
  '421211',
  '212141',
  '214121',
  '412121',
  '111143',
  '111341',
  '131141',
  '114113',
  '114311',
  '411113',
  '411311',
  '113141',
  '114131',
  '311141',
  '411131',
  '211412',
  '211214',
  '211232',
  '2331112'
] as const

const EAN_L_PATTERNS: Record<string, string> = {
  '0': '0001101',
  '1': '0011001',
  '2': '0010011',
  '3': '0111101',
  '4': '0100011',
  '5': '0110001',
  '6': '0101111',
  '7': '0111011',
  '8': '0110111',
  '9': '0001011'
}

const EAN_G_PATTERNS: Record<string, string> = {
  '0': '0100111',
  '1': '0110011',
  '2': '0011011',
  '3': '0100001',
  '4': '0011101',
  '5': '0111001',
  '6': '0000101',
  '7': '0010001',
  '8': '0001001',
  '9': '0010111'
}

const EAN_R_PATTERNS: Record<string, string> = {
  '0': '1110010',
  '1': '1100110',
  '2': '1101100',
  '3': '1000010',
  '4': '1011100',
  '5': '1001110',
  '6': '1010000',
  '7': '1000100',
  '8': '1001000',
  '9': '1110100'
}

const EAN_LEFT_PARITY: Record<string, string> = {
  '0': 'LLLLLL',
  '1': 'LLGLGG',
  '2': 'LLGGLG',
  '3': 'LLGGGL',
  '4': 'LGLLGG',
  '5': 'LGGLLG',
  '6': 'LGGGLL',
  '7': 'LGLGLG',
  '8': 'LGLGGL',
  '9': 'LGGLGL'
}

export interface BarcodeSvgOptions {
  moduleWidth?: number
  height?: number
  quietZone?: number
  includeText?: boolean
  text?: string
  background?: string
  foreground?: string
  fontSize?: number
}

export interface BarcodeSvgResult {
  svg: string
  type: BarcodeType
  value: string
  width: number
  height: number
}

export function exportBarcodeSvg(
  type: BarcodeType,
  value: string,
  options: BarcodeSvgOptions = {}
): BarcodeSvgResult {
  const validation = validateBarcode(type, value)

  if (!validation.isValid) {
    throw new Error(validation.error ?? validation.message)
  }

  const modules = encodeBarcodeModules(type, validation.normalizedValue)
  const svg = renderModulesToSvg(modules, validation.normalizedValue, options)

  return {
    ...svg,
    type,
    value: validation.normalizedValue
  }
}

export function createBarcodeSvg(
  type: BarcodeType,
  value: string,
  options: BarcodeSvgOptions = {}
): string {
  return exportBarcodeSvg(type, value, options).svg
}

export function encodeBarcodeModules(type: BarcodeType, normalizedValue: string): string {
  if (type === 'code128') {
    return encodeCode128BModules(normalizedValue)
  }

  if (type === 'upc-a') {
    return encodeEan13Modules(`0${normalizedValue}`)
  }

  return encodeEan13Modules(normalizedValue)
}

function encodeCode128BModules(value: string): string {
  const startCodeB = 104
  const dataCodes = value.split('').map((character) => character.charCodeAt(0) - 32)
  const checksum =
    (startCodeB + dataCodes.reduce((total, code, index) => total + code * (index + 1), 0)) % 103
  const codes = [startCodeB, ...dataCodes, checksum, 106]

  return codes.map((code) => widthPatternToModules(CODE128_PATTERNS[code])).join('')
}

function encodeEan13Modules(value: string): string {
  const firstDigit = value[0]
  const parity = EAN_LEFT_PARITY[firstDigit]

  if (!parity) {
    throw new Error('EAN-13 encoding requires numeric input.')
  }

  const leftModules = value
    .slice(1, 7)
    .split('')
    .map((digit, index) => (parity[index] === 'L' ? EAN_L_PATTERNS[digit] : EAN_G_PATTERNS[digit]))
    .join('')
  const rightModules = value
    .slice(7)
    .split('')
    .map((digit) => EAN_R_PATTERNS[digit])
    .join('')

  return `101${leftModules}01010${rightModules}101`
}

function widthPatternToModules(pattern: string): string {
  return pattern
    .split('')
    .map((width, index) => (index % 2 === 0 ? '1' : '0').repeat(Number(width)))
    .join('')
}

function renderModulesToSvg(
  modules: string,
  value: string,
  options: BarcodeSvgOptions
): Pick<BarcodeSvgResult, 'svg' | 'width' | 'height'> {
  const moduleWidth = options.moduleWidth ?? 2
  const barHeight = options.height ?? 96
  const quietZone = options.quietZone ?? 10
  const includeText = options.includeText ?? true
  const fontSize = options.fontSize ?? 14
  const textHeight = includeText ? fontSize + 10 : 0
  const width = (modules.length + quietZone * 2) * moduleWidth
  const height = barHeight + textHeight
  const foreground = options.foreground ?? '#111827'
  const background = options.background ?? '#FFFFFF'
  const text = options.text ?? value
  const bars = modulesToRects(modules, quietZone * moduleWidth, moduleWidth, barHeight, foreground)

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Barcode ${escapeXml(text)}">`,
    `<rect width="100%" height="100%" fill="${escapeXml(background)}"/>`,
    bars,
    includeText
      ? `<text x="${width / 2}" y="${barHeight + fontSize}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" fill="${escapeXml(foreground)}">${escapeXml(text)}</text>`
      : '',
    '</svg>'
  ]
    .filter(Boolean)
    .join('')

  return { svg, width, height }
}

function modulesToRects(
  modules: string,
  startX: number,
  moduleWidth: number,
  height: number,
  color: string
): string {
  const rects: string[] = []
  let runStart = -1

  for (let index = 0; index <= modules.length; index += 1) {
    const isBar = modules[index] === '1'

    if (isBar && runStart === -1) {
      runStart = index
    }

    if ((!isBar || index === modules.length) && runStart !== -1) {
      rects.push(
        `<rect x="${startX + runStart * moduleWidth}" y="0" width="${(index - runStart) * moduleWidth}" height="${height}" fill="${escapeXml(color)}"/>`
      )
      runStart = -1
    }
  }

  return rects.join('')
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
