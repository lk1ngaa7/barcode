<script setup lang="ts">
import { computed, ref } from 'vue'
import { type BarcodeType } from '../../../utils/barcodeTypes'
import { createBulkBarcodePdf } from '../../../utils/exportPdf'
import { exportBarcodeSvg } from '../../../utils/exportSvg'
import { parseSpreadsheetPaste } from '../../../utils/parseSpreadsheetPaste'
import type { SpreadsheetBarcodeRow } from '../../../utils/spreadsheetBarcode'
import { validateBarcode } from '../../../utils/validateBarcode'
import BarcodeTypeSelector from './BarcodeTypeSelector.vue'
import SpreadsheetBarcodeTable from './SpreadsheetBarcodeTable.vue'
import SpreadsheetPasteInput from './SpreadsheetPasteInput.vue'

const ROW_LIMIT = 100
const sampleInput = 'SKU001\tBlack T-Shirt\t$19.99\nSKU002\tWhite Mug\t$12.99\nSKU003\tPhone Case\t$9.99'

const selectedType = ref<BarcodeType>('code128')
const draftInput = ref(sampleInput)
const committedInput = ref(sampleInput)

const draftRows = computed(() => parseSpreadsheetPaste(draftInput.value))
const parsedRows = computed(() => parseSpreadsheetPaste(committedInput.value))
const draftRowCount = computed(() => draftRows.value.length)
const overLimit = computed(() => draftRowCount.value > ROW_LIMIT)
const visibleRows = computed(() => parsedRows.value.slice(0, ROW_LIMIT))
const rows = computed<SpreadsheetBarcodeRow[]>(() => visibleRows.value.map((row) => createSpreadsheetRow(selectedType.value, row)))
const validRows = computed(() => rows.value.filter((row) => row.isValid))
const validCount = computed(() => validRows.value.length)
const errorCount = computed(() => rows.value.length - validCount.value)
const canExportPdf = computed(() => validCount.value > 0 && parsedRows.value.length <= ROW_LIMIT)

function generateBarcodes(): void {
  committedInput.value = draftInput.value
}

function clearInput(): void {
  draftInput.value = ''
  committedInput.value = ''
}

function exportPdf(): void {
  if (!canExportPdf.value) {
    return
  }

  const pdf = createBulkBarcodePdf(
    selectedType.value,
    validRows.value.map((row) => ({
      value: row.normalizedValue,
      label: buildPdfLabel(row)
    }))
  )

  downloadBlob(pdf, 'excel-spreadsheet-barcodes.pdf')
}

function downloadSvg(row: SpreadsheetBarcodeRow): void {
  if (!row.isValid) {
    return
  }

  const displayText = buildDisplayText(row)
  const svg = exportBarcodeSvg(selectedType.value, row.normalizedValue, {
    height: 110,
    includeText: true,
    moduleWidth: 3,
    quietZone: 14,
    text: displayText
  }).svg

  downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `barcode-${sanitizeFilePart(row.normalizedValue)}.svg`)
}

function createSpreadsheetRow(type: BarcodeType, row: ReturnType<typeof parseSpreadsheetPaste>[number]): SpreadsheetBarcodeRow {
  const validation = validateBarcode(type, row.barcodeValue)
  const displayText = row.labelText || validation.normalizedValue
  const svg = validation.isValid
    ? exportBarcodeSvg(type, validation.normalizedValue, {
      height: 56,
      includeText: true,
      moduleWidth: 1.4,
      quietZone: 10,
      text: displayText
    }).svg
    : ''

  return {
    id: row.id,
    lineNumber: row.lineNumber,
    barcodeValue: row.barcodeValue,
    labelText: row.labelText,
    extraText: row.extraText,
    normalizedValue: validation.normalizedValue,
    isValid: validation.isValid,
    message: validation.message,
    svg
  }
}

function buildDisplayText(row: SpreadsheetBarcodeRow): string {
  return row.labelText || row.normalizedValue
}

function buildPdfLabel(row: SpreadsheetBarcodeRow): string {
  if (row.labelText && row.extraText) {
    return `${row.labelText} ${row.extraText}`
  }

  return row.labelText || row.extraText || row.normalizedValue
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function sanitizeFilePart(value: string): string {
  return value.trim().replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'barcode'
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
    <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
      <div class="space-y-6">
        <slot name="intro" />

        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
            <NuxtLink class="min-h-11 rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/">
              Single Barcode
            </NuxtLink>
            <NuxtLink class="min-h-11 rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/bulk-barcode-generator">
              Bulk Barcodes
            </NuxtLink>
            <button class="min-h-11 rounded-xl bg-blue-600 px-4 text-white" type="button">
              Excel Paste
            </button>
            <button class="min-h-11 rounded-xl px-4 text-gray-500" type="button" disabled>
              Label Sheet
            </button>
          </div>

          <div class="grid gap-5">
            <BarcodeTypeSelector v-model="selectedType" />
            <SpreadsheetPasteInput
              v-model="draftInput"
              :limit="ROW_LIMIT"
              :row-count="draftRowCount"
              :over-limit="overLimit"
              @generate="generateBarcodes"
              @clear="clearInput"
            />
          </div>
        </div>
      </div>

      <aside class="space-y-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 class="text-base font-semibold text-gray-950">
            Export
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            Export valid spreadsheet rows in a basic printable PDF. Invalid rows are skipped until fixed.
          </p>
          <button
            class="mt-4 min-h-11 w-full rounded-xl bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            type="button"
            :disabled="!canExportPdf"
            @click="exportPdf"
          >
            Export PDF
          </button>
          <p class="mt-4 text-sm leading-6 text-gray-500">
            For best results, print at 100% scale and disable "Fit to page".
          </p>
        </div>

        <div class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
          Spreadsheet rows are parsed in your browser and are not uploaded to our servers.
        </div>
      </aside>
    </div>

    <div class="mt-8">
      <SpreadsheetBarcodeTable
        :rows="rows"
        :type="selectedType"
        :valid-count="validCount"
        :error-count="errorCount"
        @download-svg="downloadSvg"
      />
    </div>
  </section>
</template>
