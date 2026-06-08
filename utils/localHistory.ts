import type { BarcodeType } from './barcodeTypes'
import type { LabelTemplate } from './labelTemplates'
import type { VerticalSampleRow } from './verticalBarcodePages'

export interface LocalBarcodeHistoryEntry {
  id: string
  context: string
  template: LabelTemplate
  barcodeType: BarcodeType
  timestamp: number
  rowCount: number
  rows: VerticalSampleRow[]
}

export function loadLocalBarcodeHistory(key: string): LocalBarcodeHistoryEntry[] {
  if (typeof localStorage === 'undefined') {
    return []
  }

  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(parsed) ? parsed.slice(0, 5) : []
  } catch {
    return []
  }
}

export function saveLocalBarcodeHistory(key: string, entry: LocalBarcodeHistoryEntry): LocalBarcodeHistoryEntry[] {
  const next = [entry, ...loadLocalBarcodeHistory(key).filter((item) => item.id !== entry.id)].slice(0, 5)

  localStorage.setItem(key, JSON.stringify(next))

  return next
}

export function clearLocalBarcodeHistory(key: string): void {
  localStorage.removeItem(key)
}
