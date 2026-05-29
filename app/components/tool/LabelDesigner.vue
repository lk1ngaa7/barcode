<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'
import { BARCODE_TYPES, type BarcodeType } from '../../../utils/barcodeTypes'
import { createLabelSheetPdf } from '../../../utils/exportPdf'
import { exportBarcodeSvg } from '../../../utils/exportSvg'
import {
  getLabelTextLines,
  LABEL_SIZES,
  LABEL_TEMPLATES,
  PAPER_SIZES,
  type LabelSize,
  type LabelTemplate,
  type PaperSize
} from '../../../utils/labelTemplates'
import { validateBarcode } from '../../../utils/validateBarcode'
import BarcodeInput from './BarcodeInput.vue'
import BarcodeTypeSelector from './BarcodeTypeSelector.vue'
import BarcodeValidationMessage from './BarcodeValidationMessage.vue'
import PdfExportPanel from './PdfExportPanel.vue'

const props = withDefaults(defineProps<{
  defaultTemplate?: LabelTemplate
  defaultPaper?: PaperSize
  defaultLabelSize?: LabelSize
}>(), {
  defaultTemplate: 'simple',
  defaultPaper: 'letter',
  defaultLabelSize: '2x1'
})

const selectedType = ref<BarcodeType>('code128')
const barcodeValue = ref('SKU001')
const template = ref<LabelTemplate>(props.defaultTemplate)
const labelSize = ref<LabelSize>(props.defaultLabelSize)
const paperSize = ref<PaperSize>(props.defaultPaper)
const productName = ref('Black T-Shirt')
const locationText = ref('Aisle 3 / Bin 12')
const exportError = ref('')
const analytics = useAnalytics()
const lastGeneratedKey = ref('')
const lastValidationErrorKey = ref('')

const validation = computed(() => validateBarcode(selectedType.value, barcodeValue.value))
const currentTypeDefinition = computed(() => BARCODE_TYPES[selectedType.value])
const currentLabelSize = computed(() => LABEL_SIZES[labelSize.value])
const currentPaperSize = computed(() => PAPER_SIZES[paperSize.value])
const labelTextLines = computed(() => (
  validation.value.isValid
    ? getLabelTextLines({
      barcodeValue: barcodeValue.value,
      template: template.value,
      productName: productName.value,
      locationText: locationText.value
    }, validation.value.normalizedValue)
    : []
))
const previewSvg = computed(() => {
  if (!validation.value.isValid) {
    return ''
  }

  return exportBarcodeSvg(selectedType.value, validation.value.normalizedValue, {
    height: labelSize.value === '2x1' ? 42 : 72,
    includeText: false,
    moduleWidth: labelSize.value === '2x1' ? 1.2 : 1.7,
    quietZone: 10
  }).svg
})
const previewRatio = computed(() => `${currentLabelSize.value.widthInches} / ${currentLabelSize.value.heightInches}`)
const inputDescriptionId = 'label-barcode-input-message'
const canExport = computed(() => validation.value.isValid)

watch(selectedType, (nextType, previousType) => {
  const previousExample = BARCODE_TYPES[previousType].example

  if (!barcodeValue.value.trim() || barcodeValue.value === previousExample) {
    barcodeValue.value = BARCODE_TYPES[nextType].example
  }

  exportError.value = ''
  analytics.track('barcode_type_change', {
    from_type: previousType,
    to_type: nextType,
    tool: 'label'
  })
})

watch([barcodeValue, template, labelSize, paperSize, productName, locationText], () => {
  exportError.value = ''
})

watch(template, (nextTemplate, previousTemplate) => {
  analytics.track('label_template_select', {
    from_template: previousTemplate,
    to_template: nextTemplate
  })
})

watch(validation, (nextValidation) => {
  if (nextValidation.isValid) {
    const generatedKey = `${selectedType.value}:${nextValidation.normalizedValue.length}:${template.value}`

    if (generatedKey !== lastGeneratedKey.value) {
      analytics.track('barcode_generate', {
        barcode_type: selectedType.value,
        value_length: nextValidation.normalizedValue.length,
        label_template: template.value,
        tool: 'label'
      })
      lastGeneratedKey.value = generatedKey
    }

    return
  }

  const errorKey = `${selectedType.value}:${nextValidation.error}`

  if (nextValidation.error && errorKey !== lastValidationErrorKey.value) {
    analytics.track('barcode_validation_error', {
      barcode_type: selectedType.value,
      error_message: nextValidation.error,
      tool: 'label'
    })
    lastValidationErrorKey.value = errorKey
  }
})

function exportPdf(): void {
  if (!validation.value.isValid) {
    return
  }

  try {
    const pdf = createLabelSheetPdf({
      barcodeType: selectedType.value,
      barcodeValue: barcodeValue.value,
      template: template.value,
      labelSize: labelSize.value,
      paperSize: paperSize.value,
      productName: productName.value,
      locationText: locationText.value
    }, validation.value.normalizedValue)

    downloadBlob(pdf, `barcode-labels-${sanitizeFilePart(validation.value.normalizedValue)}.pdf`)
    analytics.track('export_pdf', {
      barcode_type: selectedType.value,
      value_length: validation.value.normalizedValue.length,
      label_template: template.value,
      label_size: labelSize.value,
      paper_size: paperSize.value,
      tool: 'label'
    })
  } catch (error) {
    exportError.value = error instanceof Error ? error.message : 'PDF export failed. Check the barcode value and try again.'
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
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8">
      <div class="min-w-0 space-y-5 sm:space-y-6">
        <slot name="intro" />

        <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
            <NuxtLink class="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/">
              Single Barcode
            </NuxtLink>
            <NuxtLink class="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/bulk-barcode-generator">
              Bulk Barcodes
            </NuxtLink>
            <button class="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-white" type="button">
              Label Sheet
            </button>
          </div>

          <div class="grid gap-5">
            <BarcodeTypeSelector v-model="selectedType" />

            <BarcodeInput
              id="label-barcode-value"
              v-model="barcodeValue"
              label="Barcode Value"
              :placeholder="currentTypeDefinition.placeholder"
              :hint="currentTypeDefinition.allowedInput"
              :described-by="inputDescriptionId"
              :invalid="!validation.isValid"
            />

            <fieldset class="grid gap-3">
              <legend class="text-sm font-semibold text-gray-800">
                Label Template
              </legend>
              <div class="grid gap-2 sm:grid-cols-3">
                <label
                  v-for="option in LABEL_TEMPLATES"
                  :key="option.id"
                  class="flex cursor-pointer rounded-xl border bg-white p-3 transition"
                  :class="template === option.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input
                    v-model="template"
                    class="sr-only"
                    name="label-template"
                    type="radio"
                    :value="option.id"
                  >
                  <span class="grid gap-1">
                    <span class="text-sm font-semibold text-gray-950">{{ option.label }}</span>
                    <span class="text-xs leading-5 text-gray-600">{{ option.description }}</span>
                  </span>
                </label>
              </div>
            </fieldset>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="grid gap-2 text-sm font-semibold text-gray-800" for="label-size">
                Label Size
                <select
                  id="label-size"
                  v-model="labelSize"
                  class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-base text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option
                    v-for="option in LABEL_SIZES"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </label>

              <label class="grid gap-2 text-sm font-semibold text-gray-800" for="paper-size">
                Paper
                <select
                  id="paper-size"
                  v-model="paperSize"
                  class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-base text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option
                    v-for="option in PAPER_SIZES"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </label>
            </div>

            <label class="grid gap-2 text-sm font-semibold text-gray-800" for="product-name">
              Product or Item Name
              <input
                id="product-name"
                v-model="productName"
                class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-base text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Black T-Shirt"
                autocomplete="off"
              >
            </label>

            <label class="grid gap-2 text-sm font-semibold text-gray-800" for="location-text">
              Location Text
              <input
                id="location-text"
                v-model="locationText"
                class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-base text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Aisle 3 / Bin 12"
                autocomplete="off"
              >
            </label>

            <BarcodeValidationMessage
              :id="inputDescriptionId"
              :validation="validation"
            />

            <p v-if="exportError" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" aria-live="polite">
              {{ exportError }}
            </p>
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
              {{ template }}
            </span>
          </div>

          <div class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
            <div
              class="mx-auto grid max-w-full place-items-center rounded-xl border border-gray-300 bg-white p-3 shadow-sm"
              :style="{ aspectRatio: previewRatio, width: labelSize === '2x1' ? '288px' : '324px' }"
              aria-label="Barcode label preview"
            >
              <template v-if="validation.isValid">
                <div class="grid w-full gap-1 text-center">
                  <p v-if="template !== 'simple'" class="truncate text-sm font-semibold text-gray-950">
                    {{ template === 'inventory' ? `Item: ${productName || 'Black T-Shirt'}` : productName || 'Black T-Shirt' }}
                  </p>
                  <div class="label-preview-barcode" v-html="previewSvg" />
                  <p v-if="template === 'inventory'" class="truncate text-xs text-gray-700">
                    Location: {{ locationText || 'Aisle 3 / Bin 12' }}
                  </p>
                  <p class="truncate text-xs font-semibold text-gray-950">
                    {{ labelTextLines.at(-1) }}
                  </p>
                </div>
              </template>
              <p v-else class="px-3 text-center text-sm leading-6 text-red-700">
                Fix the barcode value to preview the label.
              </p>
            </div>
          </div>
        </div>

        <PdfExportPanel
          :disabled="!canExport"
          :paper-label="currentPaperSize.label"
          :label-size-label="currentLabelSize.label"
          @export-pdf="exportPdf"
        />

        <div class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
          Label data is processed in your browser and is not uploaded to our servers.
        </div>
      </aside>
    </div>
  </section>
</template>
