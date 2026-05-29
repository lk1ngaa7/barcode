<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'
import { type BarcodeType } from '../../../utils/barcodeTypes'
import type { BulkBarcodeRow } from '../../../utils/bulkBarcode'
import { createBulkBarcodePdf } from '../../../utils/exportPdf'
import { exportBarcodeSvg } from '../../../utils/exportSvg'
import { validateBarcode } from '../../../utils/validateBarcode'
import BarcodeTypeSelector from './BarcodeTypeSelector.vue'
import BulkBarcodeInput from './BulkBarcodeInput.vue'
import BulkBarcodeTable from './BulkBarcodeTable.vue'

const BULK_LIMIT = 100
const sampleInput = 'SKU001\nSKU002\nSKU003'

const selectedType = ref<BarcodeType>('code128')
const draftInput = ref(sampleInput)
const committedInput = ref(sampleInput)
const analytics = useAnalytics()

const rawValues = computed(() => parseBulkValues(committedInput.value))
const draftRowCount = computed(() => parseBulkValues(draftInput.value).length)
const overLimit = computed(() => draftRowCount.value > BULK_LIMIT)
const visibleValues = computed(() => rawValues.value.slice(0, BULK_LIMIT))
const rows = computed<BulkBarcodeRow[]>(() => visibleValues.value.map((item) => createBulkRow(selectedType.value, item)))
const validRows = computed(() => rows.value.filter((row) => row.isValid))
const validCount = computed(() => validRows.value.length)
const errorCount = computed(() => rows.value.length - validCount.value)
const canExportPdf = computed(() => validCount.value > 0 && rawValues.value.length <= BULK_LIMIT)

watch(selectedType, (nextType, previousType) => {
  analytics.track('barcode_type_change', {
    from_type: previousType,
    to_type: nextType,
    tool: 'bulk'
  })
})

function generateBarcodes(): void {
  committedInput.value = draftInput.value
  analytics.track('bulk_generate', {
    barcode_type: selectedType.value,
    row_count: rawValues.value.length,
    valid_count: validCount.value,
    error_count: errorCount.value,
    over_limit: rawValues.value.length > BULK_LIMIT
  })

  if (errorCount.value > 0) {
    analytics.track('barcode_validation_error', {
      barcode_type: selectedType.value,
      error_count: errorCount.value,
      tool: 'bulk'
    })
  }
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
      label: row.normalizedValue
    }))
  )

  downloadBlob(pdf, 'bulk-barcodes.pdf')
  analytics.track('export_pdf', {
    barcode_type: selectedType.value,
    row_count: validRows.value.length,
    tool: 'bulk'
  })
}

function downloadSvg(row: BulkBarcodeRow): void {
  if (!row.isValid) {
    return
  }

  const svg = exportBarcodeSvg(selectedType.value, row.normalizedValue, {
    height: 110,
    includeText: true,
    moduleWidth: 3,
    quietZone: 14,
    text: row.normalizedValue
  }).svg

  downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `barcode-${sanitizeFilePart(row.normalizedValue)}.svg`)
  analytics.track('download_svg', {
    barcode_type: selectedType.value,
    value_length: row.normalizedValue.length,
    tool: 'bulk'
  })
}

function trackBulkPaste(value: string): void {
  analytics.track('bulk_paste', {
    row_count: parseBulkValues(value).length,
    has_multiple_rows: /\r?\n/.test(value)
  })
}

function parseBulkValues(input: string): Array<{ lineNumber: number, value: string }> {
  return input
    .split(/\r?\n/)
    .map((line, index) => ({
      lineNumber: index + 1,
      value: line.trim()
    }))
    .filter((line) => line.value.length > 0)
}

function createBulkRow(type: BarcodeType, item: { lineNumber: number, value: string }): BulkBarcodeRow {
  const validation = validateBarcode(type, item.value)
  const svg = validation.isValid
    ? exportBarcodeSvg(type, validation.normalizedValue, {
      height: 56,
      includeText: true,
      moduleWidth: 1.4,
      quietZone: 10,
      text: validation.normalizedValue
    }).svg
    : ''

  return {
    id: `${item.lineNumber}-${item.value}`,
    lineNumber: item.lineNumber,
    inputValue: item.value,
    normalizedValue: validation.normalizedValue,
    isValid: validation.isValid,
    message: validation.message,
    svg
  }
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
  <section class="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-8">
      <div class="min-w-0 space-y-5 sm:space-y-6">
        <slot name="intro" />

        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
            <NuxtLink class="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/">
              Single Barcode
            </NuxtLink>
            <button class="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-white" type="button">
              Bulk Barcodes
            </button>
            <NuxtLink class="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/barcode-label-generator">
              Label Sheet
            </NuxtLink>
          </div>

          <div class="grid gap-5">
            <BarcodeTypeSelector v-model="selectedType" />
            <BulkBarcodeInput
              v-model="draftInput"
              :limit="BULK_LIMIT"
              :row-count="draftRowCount"
              :over-limit="overLimit"
              @generate="generateBarcodes"
              @clear="clearInput"
              @paste="trackBulkPaste"
            />
          </div>
        </div>
      </div>

      <aside class="min-w-0 space-y-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 class="text-base font-semibold text-gray-950">
            Export
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            Export all valid rows in a basic printable PDF. Invalid rows are skipped until fixed.
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
          Bulk barcode values are processed in your browser and are not uploaded to our servers.
        </div>
      </aside>
    </div>

    <div class="mt-8">
      <BulkBarcodeTable
        :rows="rows"
        :type="selectedType"
        :valid-count="validCount"
        :error-count="errorCount"
        @download-svg="downloadSvg"
      />
    </div>
  </section>
</template>
