<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'
import { BARCODE_TYPES, type BarcodeType } from '../../../utils/barcodeTypes'
import { downloadBlob, sanitizeFilePart, svgToPngBlob } from '../../../utils/downloadHelpers'
import { createScenarioLabelSheetPdf, validatePdfLayout } from '../../../utils/exportPdf'
import { exportBarcodeSvg } from '../../../utils/exportSvg'
import { LABEL_SIZES, LABEL_TEMPLATES, PAPER_SIZES, type LabelSize, type PaperSize } from '../../../utils/labelTemplates'
import { clearLocalBarcodeHistory, loadLocalBarcodeHistory, saveLocalBarcodeHistory, type LocalBarcodeHistoryEntry } from '../../../utils/localHistory'
import { generateLpnSequence } from '../../../utils/lpnSequence'
import { createZipBlob } from '../../../utils/zipExport'
import {
  buildVerticalCsvTemplate,
  buildVerticalSampleInput,
  mapVerticalRows,
  VERTICAL_BATCH_LIMIT,
  type VerticalBarcodePageConfig,
  type VerticalParsedRow,
  type VerticalSampleRow
} from '../../../utils/verticalBarcodePages'

const props = defineProps<{
  config: VerticalBarcodePageConfig
}>()

const analytics = useAnalytics()
const mode = ref(props.config.defaultMode)
const selectedType = ref<BarcodeType>(props.config.defaultBarcodeType)
const selectedTemplate = ref(props.config.defaultTemplate)
const labelSize = ref<LabelSize>(props.config.defaultLabelSize)
const paperSize = ref<PaperSize>(props.config.defaultPaper)
const draftInput = ref(buildVerticalSampleInput(props.config))
const committedInput = ref(buildVerticalSampleInput(props.config))
const singleRow = ref<VerticalSampleRow>({ barcodeValue: props.config.defaultValue, ...(props.config.sampleRows[0] || {}) })
const history = ref<LocalBarcodeHistoryEntry[]>([])
const fieldOrder = ref(props.config.fields.map((field) => field.key))
const exportError = ref('')
const sequenceError = ref('')
const isWorking = ref(false)
const prefix = ref('LPN-')
const startNumber = ref(1)
const sequenceQuantity = ref(10)
const digits = ref(6)
const customStaticLine = ref('')
const visibleFields = ref<Record<string, boolean>>(Object.fromEntries(props.config.fields.map((field) => [field.key, field.key !== 'barcodeValue'])))
const customFieldOrder = ref(props.config.fields.filter((field) => field.key !== 'barcodeValue').map((field) => field.key))
const customTemplateEnabled = ref(false)
const customTemplateKey = `barcode-mint-custom-template-${props.config.context}`
const layout = ref({
  marginTop: 36,
  marginLeft: 36,
  gapX: 8,
  gapY: 8,
  rows: 0,
  columns: 0
})

const templateOptions = computed(() => Object.values(LABEL_TEMPLATES).filter((template) => (
  ['simple', 'product', 'inventory', props.config.defaultTemplate].includes(template.id)
)))
const fieldLabels = computed(() => Object.fromEntries(props.config.fields.map((field) => [field.key, field.label])))
const rows = computed(() => {
  if (mode.value === 'single') {
    return mapVerticalRows(rowToInput(singleRow.value), props.config, selectedType.value, props.config.fields.map((field) => field.key))
  }

  return mapVerticalRows(committedInput.value, props.config, selectedType.value, fieldOrder.value)
})
const draftRowCount = computed(() => mapVerticalRows(draftInput.value, props.config, selectedType.value, fieldOrder.value).length)
const rowsDetected = computed(() => rows.value.length)
const validRows = computed(() => rows.value.filter((row) => row.isValid).slice(0, VERTICAL_BATCH_LIMIT))
const errorRows = computed(() => rows.value.filter((row) => !row.isValid))
const overLimit = computed(() => rows.value.length > VERTICAL_BATCH_LIMIT || draftRowCount.value > VERTICAL_BATCH_LIMIT)
const currentLabelSize = computed(() => LABEL_SIZES[labelSize.value])
const currentPaperSize = computed(() => PAPER_SIZES[paperSize.value])
const layoutInput = computed(() => ({
  marginTop: Number(layout.value.marginTop) || 36,
  marginLeft: Number(layout.value.marginLeft) || 36,
  gapX: Number(layout.value.gapX) || 0,
  gapY: Number(layout.value.gapY) || 0,
  rows: Number(layout.value.rows) || inferredLayout.value.rows,
  columns: Number(layout.value.columns) || inferredLayout.value.columns
}))
const inferredLayout = computed(() => {
  const labelWidth = currentLabelSize.value.widthInches * 72
  const labelHeight = currentLabelSize.value.heightInches * 72
  return {
    rows: Math.max(1, Math.floor((currentPaperSize.value.height - 36 - 54 + 8) / (labelHeight + 8))),
    columns: Math.max(1, Math.floor((currentPaperSize.value.width - 72 + 8) / (labelWidth + 8)))
  }
})
const layoutWarning = computed(() => validatePdfLayout(pdfOptions.value))
const canExport = computed(() => validRows.value.length > 0 && !overLimit.value && !layoutWarning.value)
const previewRow = computed(() => validRows.value[0] || rows.value[0])
const previewSvg = computed(() => {
  if (!previewRow.value?.isValid) {
    return ''
  }

  return exportBarcodeSvg(selectedType.value, previewRow.value.normalizedValue, {
    height: labelSize.value === '1x05' ? 30 : labelSize.value === '2x1' || labelSize.value === '25x1' ? 48 : 78,
    includeText: false,
    moduleWidth: labelSize.value === '1x05' ? 0.9 : 1.35,
    quietZone: 10
  }).svg
})
const previewRatio = computed(() => `${currentLabelSize.value.widthInches} / ${currentLabelSize.value.heightInches}`)
const pdfOptions = computed(() => ({
  barcodeType: selectedType.value,
  template: selectedTemplate.value,
  labelSize: labelSize.value,
  paperSize: paperSize.value,
  items: validRows.value.map((row) => ({ ...row, normalizedValue: row.normalizedValue })),
  layout: layoutInput.value,
  customTemplate: customTemplateEnabled.value
    ? {
        staticLine: customStaticLine.value,
        fieldOrder: customFieldOrder.value.map(String),
        visibleFields: visibleFields.value
      }
    : undefined
}))

watch([selectedType, selectedTemplate, labelSize, paperSize, committedInput], () => {
  exportError.value = ''
})

watch(selectedTemplate, (to_template, from_template) => {
  analytics.track('label_template_select', {
    from_template,
    to_template,
    context: props.config.context
  })
})

onMounted(() => {
  history.value = loadLocalBarcodeHistory(props.config.historyKey)

  try {
    const saved = JSON.parse(localStorage.getItem(customTemplateKey) || 'null')
    if (saved) {
      customTemplateEnabled.value = Boolean(saved.enabled)
      customStaticLine.value = saved.staticLine || ''
      visibleFields.value = { ...visibleFields.value, ...(saved.visibleFields || {}) }
      customFieldOrder.value = Array.isArray(saved.fieldOrder) ? saved.fieldOrder : customFieldOrder.value
    }
  } catch {
    customTemplateEnabled.value = false
  }
})

function generateRows(): void {
  committedInput.value = draftInput.value
  saveHistory()
  analytics.track('bulk_generate', {
    barcode_type: selectedType.value,
    context: props.config.context,
    row_count: rows.value.length,
    valid_count: validRows.value.length,
    error_count: errorRows.value.length,
    over_limit: overLimit.value
  })
}

function useSampleRows(): void {
  draftInput.value = buildVerticalSampleInput(props.config)
  committedInput.value = draftInput.value
}

function clearRows(): void {
  draftInput.value = ''
  committedInput.value = ''
}

function applySequence(): void {
  const result = generateLpnSequence({
    prefix: prefix.value,
    startNumber: Number(startNumber.value),
    quantity: Number(sequenceQuantity.value),
    digits: Number(digits.value)
  })

  sequenceError.value = result.error

  if (result.error) {
    analytics.track('barcode_validation_error', {
      tool: 'lpn_sequence',
      context: props.config.context,
      error_message: result.error
    })
    return
  }

  const nextInput = result.values.map((value) => `${value}\tWH-A1\tPallet`).join('\n')
  draftInput.value = nextInput
  committedInput.value = nextInput
  saveHistory()
  analytics.track('bulk_generate', {
    tool: 'lpn_sequence',
    context: props.config.context,
    row_count: result.values.length
  })
}

function exportPdf(): void {
  if (!canExport.value) {
    return
  }

  try {
    downloadBlob(createScenarioLabelSheetPdf(pdfOptions.value), `${props.config.context}-barcode-labels.pdf`)
    saveHistory()
    analytics.track('export_pdf', {
      barcode_type: selectedType.value,
      context: props.config.context,
      label_template: selectedTemplate.value,
      row_count: validRows.value.length,
      label_size: labelSize.value,
      paper_size: paperSize.value
    })
  } catch (error) {
    exportError.value = error instanceof Error ? error.message : 'PDF export failed. Check the rows and try again.'
  }
}

function downloadSvg(row = previewRow.value): void {
  if (!row?.isValid) {
    return
  }

  const svg = buildRowSvg(row)
  downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `barcode-label-${sanitizeFilePart(row.normalizedValue)}.svg`)
  analytics.track('download_svg', {
    barcode_type: selectedType.value,
    context: props.config.context,
    value_length: row.normalizedValue.length
  })
}

async function downloadPng(row = previewRow.value): Promise<void> {
  if (!row?.isValid || isWorking.value) {
    return
  }

  isWorking.value = true

  try {
    const result = exportBarcodeSvg(selectedType.value, row.normalizedValue, {
      height: 96,
      includeText: true,
      moduleWidth: 2.2,
      quietZone: 14,
      text: buildDisplayLines(row).join(' ')
    })
    const blob = await svgToPngBlob(result.svg, result.width, result.height)

    downloadBlob(blob, `barcode-label-${sanitizeFilePart(row.normalizedValue)}.png`)
    analytics.track('download_png', {
      barcode_type: selectedType.value,
      context: props.config.context,
      value_length: row.normalizedValue.length
    })
  } catch (error) {
    exportError.value = error instanceof Error ? error.message : 'PNG download failed. Try SVG instead.'
  } finally {
    isWorking.value = false
  }
}

function downloadZip(): void {
  if (!canExport.value) {
    return
  }

  try {
    const files = validRows.value.map((row) => ({
      name: `barcode-${sanitizeFilePart(row.normalizedValue)}.svg`,
      content: buildRowSvg(row)
    }))

    downloadBlob(createZipBlob(files), props.config.zipFilename)
    saveHistory()
    analytics.track('download_zip', {
      barcode_type: selectedType.value,
      context: props.config.context,
      row_count: validRows.value.length,
      format: 'svg'
    })
  } catch (error) {
    exportError.value = error instanceof Error ? error.message : 'ZIP creation failed. Try exporting PDF or individual SVG files.'
  }
}

function downloadCsvTemplate(): void {
  downloadBlob(new Blob([buildVerticalCsvTemplate(props.config)], { type: 'text/csv;charset=utf-8' }), props.config.csvFilename)
  analytics.track('download_csv_template', {
    tool: props.config.context,
    format: 'csv'
  })
}

function saveHistory(): void {
  if (!validRows.value.length) {
    return
  }

  history.value = saveLocalBarcodeHistory(props.config.historyKey, {
    id: `${props.config.context}-${Date.now()}`,
    context: props.config.context,
    template: selectedTemplate.value,
    barcodeType: selectedType.value,
    timestamp: Date.now(),
    rowCount: validRows.value.length,
    rows: validRows.value.map((row) => props.config.fields.reduce<VerticalSampleRow>((next, field) => {
      next[field.key] = String(row[field.key] || '')
      return next
    }, { barcodeValue: row.barcodeValue }))
  })
}

function restoreHistory(entry: LocalBarcodeHistoryEntry): void {
  selectedTemplate.value = entry.template
  selectedType.value = entry.barcodeType
  draftInput.value = entry.rows.map((row) => props.config.fields.map((field) => row[field.key] || '').join('\t')).join('\n')
  committedInput.value = draftInput.value
}

function clearHistory(): void {
  clearLocalBarcodeHistory(props.config.historyKey)
  history.value = []
}

function saveCustomTemplate(): void {
  localStorage.setItem(customTemplateKey, JSON.stringify({
    enabled: customTemplateEnabled.value,
    staticLine: customStaticLine.value,
    fieldOrder: customFieldOrder.value,
    visibleFields: visibleFields.value
  }))
}

function resetCustomTemplate(): void {
  customTemplateEnabled.value = false
  customStaticLine.value = ''
  visibleFields.value = Object.fromEntries(props.config.fields.map((field) => [field.key, field.key !== 'barcodeValue']))
  customFieldOrder.value = props.config.fields.filter((field) => field.key !== 'barcodeValue').map((field) => field.key)
  localStorage.removeItem(customTemplateKey)
}

function buildRowSvg(row: VerticalParsedRow): string {
  return exportBarcodeSvg(selectedType.value, row.normalizedValue, {
    height: 110,
    includeText: true,
    moduleWidth: 2.4,
    quietZone: 14,
    text: buildDisplayLines(row).join(' ')
  }).svg
}

function buildDisplayLines(row: VerticalParsedRow): string[] {
  if (customTemplateEnabled.value) {
    return [
      customStaticLine.value,
      ...customFieldOrder.value
        .filter((field) => visibleFields.value[field])
        .map((field) => String(row[field as keyof VerticalParsedRow] || ''))
    ].filter(isNonEmptyString)
  }

  if (selectedTemplate.value === 'garment') {
    return [row.productName || 'Garment', [row.style && `Style: ${row.style}`, row.color && `Color: ${row.color}`, row.size && `Size: ${row.size}`].filter(isNonEmptyString).join(' / '), row.normalizedValue].filter(isNonEmptyString)
  }

  if (selectedTemplate.value === 'mrp') {
    return [row.productName || 'Product', row.mrp && `MRP / Price: ${row.mrp}`, row.salePrice && `Sale: ${row.salePrice}`, row.packSize && `Pack: ${row.packSize}`, row.normalizedValue].filter(isNonEmptyString)
  }

  if (selectedTemplate.value === 'lpn') {
    return [row.normalizedValue, row.warehouse && `Warehouse: ${row.warehouse}`, row.unitType || 'License Plate Number'].filter(isNonEmptyString)
  }

  if (selectedTemplate.value === 'inventory') {
    return [row.productName || 'Item', [row.location && `Location: ${row.location}`, row.quantity && `Qty: ${row.quantity}`].filter(isNonEmptyString).join(' / '), row.normalizedValue].filter(isNonEmptyString)
  }

  return [row.productName || row.normalizedValue, row.normalizedValue].filter(isNonEmptyString)
}

function rowToInput(row: VerticalSampleRow): string {
  return props.config.fields.map((field) => row[field.key] || '').join('\t')
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8">
      <div class="min-w-0 space-y-5 sm:space-y-6">
        <slot name="intro" />

        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium" aria-label="Barcode mode">
            <button class="inline-flex min-h-11 items-center rounded-xl px-4 py-3" :class="mode === 'label' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-700'" type="button" @click="mode = 'label'">
              Label Sheet
            </button>
            <button class="inline-flex min-h-11 items-center rounded-xl px-4 py-3" :class="mode === 'bulk' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-700'" type="button" @click="mode = 'bulk'">
              Excel Paste
            </button>
            <button class="inline-flex min-h-11 items-center rounded-xl px-4 py-3" :class="mode === 'single' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-700'" type="button" @click="mode = 'single'">
              Single Barcode
            </button>
          </div>

          <div class="grid gap-5">
            <div class="grid gap-2">
              <label class="text-sm font-medium text-gray-900" for="vertical-barcode-type">Barcode type</label>
              <select id="vertical-barcode-type" v-model="selectedType" class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900">
                <option v-for="type in BARCODE_TYPES" :key="type.id" :value="type.id">
                  {{ type.label }} - {{ type.description }}
                </option>
              </select>
            </div>

            <div class="grid gap-2">
              <label class="text-sm font-medium text-gray-900" for="vertical-template">Label template</label>
              <select id="vertical-template" v-model="selectedTemplate" class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900">
                <option v-for="template in templateOptions" :key="template.id" :value="template.id">
                  {{ template.label }}
                </option>
              </select>
              <p class="text-sm leading-6 text-gray-500">
                {{ LABEL_TEMPLATES[selectedTemplate].description }}
              </p>
            </div>

            <div v-if="config.context === 'lpn'" class="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <h2 class="text-base font-semibold text-gray-950">
                LPN sequence generator
              </h2>
              <div class="mt-4 grid gap-3 sm:grid-cols-4">
                <label class="grid gap-1 text-sm font-medium text-gray-900">
                  Prefix
                  <input v-model="prefix" class="min-h-11 rounded-xl border border-gray-300 px-3" placeholder="LPN-" type="text">
                </label>
                <label class="grid gap-1 text-sm font-medium text-gray-900">
                  Start number
                  <input v-model.number="startNumber" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number">
                </label>
                <label class="grid gap-1 text-sm font-medium text-gray-900">
                  Quantity
                  <input v-model.number="sequenceQuantity" class="min-h-11 rounded-xl border border-gray-300 px-3" min="1" :max="VERTICAL_BATCH_LIMIT" type="number">
                </label>
                <label class="grid gap-1 text-sm font-medium text-gray-900">
                  Digits
                  <input v-model.number="digits" class="min-h-11 rounded-xl border border-gray-300 px-3" min="1" max="12" type="number">
                </label>
              </div>
              <button class="mt-4 min-h-11 rounded-xl bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700" type="button" @click="applySequence">
                Generate LPN sequence
              </button>
              <p v-if="sequenceError" class="mt-2 text-sm text-red-600">
                {{ sequenceError }}
              </p>
            </div>

            <div v-if="mode === 'single'" class="grid gap-4 sm:grid-cols-2">
              <label v-for="field in config.fields" :key="field.key" class="grid gap-1 text-sm font-medium text-gray-900">
                {{ field.label }}
                <input
                  v-model="singleRow[field.key]"
                  class="min-h-11 rounded-xl border border-gray-300 px-3"
                  :placeholder="field.placeholder || config.barcodePlaceholder"
                  :type="field.type === 'integer' ? 'number' : 'text'"
                >
              </label>
            </div>

            <div v-else class="grid gap-3">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <label class="text-sm font-medium text-gray-900" for="vertical-bulk-input">
                  Paste spreadsheet rows
                </label>
                <button class="min-h-11 rounded-xl border border-gray-300 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50" type="button" @click="downloadCsvTemplate">
                  Download CSV template
                </button>
              </div>
              <textarea
                id="vertical-bulk-input"
                v-model="draftInput"
                class="min-h-44 rounded-xl border border-gray-300 p-3 font-mono text-sm leading-6 text-gray-900"
                :placeholder="config.fields.map((field) => field.placeholder || field.label).join('\t')"
              />
              <div class="grid gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 sm:grid-cols-3">
                <p>Rows detected: <strong class="text-gray-950">{{ rowsDetected }}</strong></p>
                <p>Valid rows: <strong class="text-green-700">{{ validRows.length }}</strong></p>
                <p>Rows with errors: <strong class="text-red-700">{{ errorRows.length }}</strong></p>
              </div>
              <p v-if="overLimit" class="text-sm text-red-600">
                This tool supports up to {{ VERTICAL_BATCH_LIMIT }} rows per batch. Reduce the batch size before export.
              </p>
              <div class="flex flex-wrap gap-2">
                <button class="min-h-11 rounded-xl bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700" type="button" @click="generateRows">
                  Generate label sheet
                </button>
                <button class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-700 hover:bg-gray-50" type="button" @click="useSampleRows">
                  Use sample rows
                </button>
                <button class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-700 hover:bg-gray-50" type="button" @click="clearRows">
                  Clear
                </button>
              </div>
            </div>

            <details class="rounded-xl border border-gray-200 p-4">
              <summary class="cursor-pointer text-sm font-semibold text-gray-950">
                Field mapping and template editor
              </summary>
              <div class="mt-4 grid gap-5">
                <div>
                  <h3 class="text-sm font-semibold text-gray-950">
                    Spreadsheet field mapping
                  </h3>
                  <div class="mt-3 grid gap-3 sm:grid-cols-2">
                    <label v-for="(_, index) in fieldOrder" :key="index" class="grid gap-1 text-sm font-medium text-gray-900">
                      Column {{ index + 1 }}
                      <select v-model="fieldOrder[index]" class="min-h-11 rounded-xl border border-gray-300 bg-white px-3">
                        <option v-for="field in config.fields" :key="field.key" :value="field.key">
                          {{ field.label }}
                        </option>
                      </select>
                    </label>
                  </div>
                </div>

                <div class="grid gap-3">
                  <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                    <input v-model="customTemplateEnabled" class="h-4 w-4" type="checkbox">
                    Enable custom template
                  </label>
                  <label class="grid gap-1 text-sm font-medium text-gray-900">
                    Static text line
                    <input v-model="customStaticLine" class="min-h-11 rounded-xl border border-gray-300 px-3" placeholder="Optional store or label line" type="text">
                  </label>
                  <div class="grid gap-2 sm:grid-cols-2">
                    <label v-for="field in config.fields.filter((item) => item.key !== 'barcodeValue')" :key="field.key" class="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 px-3 text-sm text-gray-700">
                      <input v-model="visibleFields[field.key]" class="h-4 w-4" type="checkbox">
                      Show {{ field.label }}
                    </label>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-700 hover:bg-gray-50" type="button" @click="saveCustomTemplate">
                      Save local template
                    </button>
                    <button class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-700 hover:bg-gray-50" type="button" @click="resetCustomTemplate">
                      Reset template
                    </button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      <aside class="min-w-0 space-y-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-semibold text-gray-950">
                Label Preview
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                {{ currentLabelSize.label }} · {{ currentPaperSize.label }}
              </p>
            </div>
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-600">
              {{ selectedTemplate }}
            </span>
          </div>

          <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3">
            <div class="mx-auto grid max-w-full place-items-center rounded-lg border border-gray-300 bg-white p-3 shadow-sm" :style="{ aspectRatio: previewRatio, width: labelSize === '4x3' || labelSize === '4x2' ? '340px' : '300px' }" aria-label="Barcode label preview">
              <template v-if="previewRow?.isValid">
                <div class="grid w-full gap-1 text-center">
                  <p v-for="line in buildDisplayLines(previewRow).slice(0, -1)" :key="line" class="truncate text-xs font-semibold text-gray-950">
                    {{ line }}
                  </p>
                  <div class="label-preview-barcode" v-html="previewSvg" />
                  <p class="truncate font-mono text-xs text-gray-700">
                    {{ previewRow.normalizedValue }}
                  </p>
                </div>
              </template>
              <p v-else class="text-center text-sm text-gray-500">
                Enter a valid {{ BARCODE_TYPES[selectedType].label }} value to preview a label.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 class="text-base font-semibold text-gray-950">
            Export
          </h2>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <button class="min-h-11 rounded-xl bg-blue-600 px-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300" type="button" :disabled="!previewRow?.isValid || isWorking" @click="downloadPng()">
              Download PNG
            </button>
            <button class="min-h-11 rounded-xl bg-blue-600 px-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300" type="button" :disabled="!previewRow?.isValid" @click="downloadSvg()">
              Download SVG
            </button>
            <button class="min-h-11 rounded-xl bg-blue-600 px-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300" type="button" :disabled="!canExport" @click="exportPdf">
              Export PDF
            </button>
            <button class="min-h-11 rounded-xl bg-blue-600 px-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300" type="button" :disabled="!canExport" @click="downloadZip">
              Download ZIP
            </button>
          </div>
          <p class="mt-4 text-sm leading-6 text-gray-500">
            For best results, print at 100% scale and disable "Fit to page".
          </p>
          <p v-if="layoutWarning" class="mt-2 text-sm text-amber-700">
            {{ layoutWarning }}
          </p>
          <p v-if="exportError" class="mt-2 text-sm text-red-600">
            {{ exportError }}
          </p>
        </div>

        <details class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <summary class="cursor-pointer text-base font-semibold text-gray-950">
            Advanced label layout
          </summary>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Label size
              <select v-model="labelSize" class="min-h-11 rounded-xl border border-gray-300 bg-white px-3">
                <option v-for="size in LABEL_SIZES" :key="size.id" :value="size.id">
                  {{ size.label }}
                </option>
              </select>
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Page size
              <select v-model="paperSize" class="min-h-11 rounded-xl border border-gray-300 bg-white px-3">
                <option v-for="paper in PAPER_SIZES" :key="paper.id" :value="paper.id">
                  {{ paper.label }}
                </option>
              </select>
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Top margin
              <input v-model.number="layout.marginTop" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number">
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Left margin
              <input v-model.number="layout.marginLeft" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number">
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Horizontal gap
              <input v-model.number="layout.gapX" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number">
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Vertical gap
              <input v-model.number="layout.gapY" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number">
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Rows
              <input v-model.number="layout.rows" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number" :placeholder="String(inferredLayout.rows)">
            </label>
            <label class="grid gap-1 text-sm font-medium text-gray-900">
              Columns
              <input v-model.number="layout.columns" class="min-h-11 rounded-xl border border-gray-300 px-3" min="0" type="number" :placeholder="String(inferredLayout.columns)">
            </label>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-500">
            Use these Avery-compatible layout fields to match common sheet spacing. Confirm dimensions with your paper before printing a full batch.
          </p>
        </details>

        <details class="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-950">
          <summary class="cursor-pointer text-sm font-semibold">
            Recent batches
          </summary>
          <p class="mt-3 text-sm leading-6">
            Recent batches are saved only in this browser. You can clear them at any time.
          </p>
          <div class="mt-3 grid gap-2">
            <button v-for="entry in history" :key="entry.id" class="min-h-11 rounded-xl bg-white px-3 text-left text-sm text-blue-950 hover:bg-blue-100" type="button" @click="restoreHistory(entry)">
              {{ new Date(entry.timestamp).toLocaleString() }} · {{ entry.rowCount }} rows
            </button>
            <p v-if="!history.length" class="text-sm text-blue-800">
              No recent batches saved yet.
            </p>
            <button class="min-h-11 rounded-xl border border-blue-200 px-3 text-sm font-semibold text-blue-900 hover:bg-white" type="button" @click="clearHistory">
              Clear history
            </button>
          </div>
        </details>

        <div class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
          User-entered barcode values are processed in the browser and are not uploaded to our servers.
        </div>
      </aside>
    </div>

    <div class="mx-auto mt-8 max-w-6xl px-0">
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="border-b border-gray-200 p-4">
          <h2 class="text-base font-semibold text-gray-950">
            Batch rows
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Valid rows can be exported. Fix rows with errors before adding them to label sheets.
          </p>
        </div>
        <div class="hidden overflow-x-auto md:block">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th class="px-4 py-3">Line</th>
                <th class="px-4 py-3">Barcode Value</th>
                <th v-for="field in config.fields.filter((item) => item.key !== 'barcodeValue')" :key="field.key" class="px-4 py-3">
                  {{ field.label }}
                </th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">SVG</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="row in rows.slice(0, VERTICAL_BATCH_LIMIT)" :key="row.id">
                <td class="px-4 py-3 text-gray-500">{{ row.lineNumber }}</td>
                <td class="px-4 py-3 font-mono text-gray-950">{{ row.barcodeValue }}</td>
                <td v-for="field in config.fields.filter((item) => item.key !== 'barcodeValue')" :key="field.key" class="px-4 py-3 text-gray-600">
                  {{ row[field.key] || '-' }}
                </td>
                <td class="px-4 py-3" :class="row.isValid ? 'text-green-700' : 'text-red-700'">
                  {{ row.message }}
                </td>
                <td class="px-4 py-3">
                  <button class="min-h-11 rounded-xl border border-gray-300 px-3 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300" type="button" :disabled="!row.isValid" @click="downloadSvg(row)">
                    SVG
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="grid gap-3 p-4 md:hidden">
          <article v-for="row in rows.slice(0, VERTICAL_BATCH_LIMIT)" :key="row.id" class="rounded-xl border border-gray-200 p-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase text-gray-500">Line {{ row.lineNumber }}</p>
                <p class="font-mono text-sm font-semibold text-gray-950">{{ row.barcodeValue }}</p>
              </div>
              <span class="text-xs font-semibold" :class="row.isValid ? 'text-green-700' : 'text-red-700'">
                {{ row.isValid ? 'Valid' : 'Fix' }}
              </span>
            </div>
            <dl class="mt-3 grid gap-1 text-sm text-gray-600">
              <template v-for="field in config.fields.filter((item) => item.key !== 'barcodeValue')" :key="field.key">
                <div class="flex justify-between gap-3">
                  <dt>{{ field.label }}</dt>
                  <dd class="text-right text-gray-950">{{ row[field.key] || '-' }}</dd>
                </div>
              </template>
            </dl>
            <p class="mt-3 text-sm" :class="row.isValid ? 'text-green-700' : 'text-red-700'">
              {{ row.message }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.label-preview-barcode :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
