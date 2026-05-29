<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { BARCODE_TYPES, type BarcodeType } from '../../../utils/barcodeTypes'
import { createSingleBarcodePdf } from '../../../utils/exportPdf'
import { exportBarcodeSvg } from '../../../utils/exportSvg'
import { validateBarcode } from '../../../utils/validateBarcode'
import BarcodeDownloadActions from './BarcodeDownloadActions.vue'
import BarcodeInput from './BarcodeInput.vue'
import BarcodePreview from './BarcodePreview.vue'
import BarcodeTypeSelector from './BarcodeTypeSelector.vue'
import BarcodeValidationMessage from './BarcodeValidationMessage.vue'

const props = withDefaults(defineProps<{
  defaultType?: BarcodeType
  defaultValue?: string
}>(), {
  defaultType: 'code128',
  defaultValue: ''
})

const selectedType = ref<BarcodeType>(props.defaultType)
const barcodeValue = ref(props.defaultValue || BARCODE_TYPES[props.defaultType].example)
const labelText = ref('')
const showText = ref(true)
const isWorking = ref(false)
const downloadError = ref('')

const validation = computed(() => validateBarcode(selectedType.value, barcodeValue.value))
const currentTypeDefinition = computed(() => BARCODE_TYPES[selectedType.value])
const normalizedText = computed(() => labelText.value.trim() || validation.value.normalizedValue)
const previewSvg = computed(() => {
  if (!validation.value.isValid) {
    return ''
  }

  return exportBarcodeSvg(selectedType.value, validation.value.normalizedValue, {
    height: 96,
    includeText: showText.value,
    moduleWidth: 2,
    quietZone: 12,
    text: normalizedText.value
  }).svg
})
const inputDescriptionId = 'barcode-input-message'
const safeFileValue = computed(() => sanitizeFilePart(validation.value.normalizedValue || barcodeValue.value))

watch(selectedType, (nextType, previousType) => {
  const previousExample = BARCODE_TYPES[previousType].example

  if (!barcodeValue.value.trim() || barcodeValue.value === previousExample) {
    barcodeValue.value = BARCODE_TYPES[nextType].example
  }

  downloadError.value = ''
})

watch([barcodeValue, showText, labelText], () => {
  downloadError.value = ''
})

function downloadSvg(): void {
  if (!validation.value.isValid) {
    return
  }

  const svg = exportBarcodeSvg(selectedType.value, validation.value.normalizedValue, {
    height: 120,
    includeText: showText.value,
    moduleWidth: 3,
    quietZone: 14,
    text: normalizedText.value
  }).svg

  downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `barcode-${safeFileValue.value}.svg`)
}

async function downloadPng(): Promise<void> {
  if (!validation.value.isValid || isWorking.value) {
    return
  }

  isWorking.value = true

  try {
    const svgResult = exportBarcodeSvg(selectedType.value, validation.value.normalizedValue, {
      height: 120,
      includeText: showText.value,
      moduleWidth: 3,
      quietZone: 14,
      text: normalizedText.value
    })
    const blob = await svgToPngBlob(svgResult.svg, svgResult.width, svgResult.height)

    downloadBlob(blob, `barcode-${safeFileValue.value}.png`)
  } catch (error) {
    downloadError.value = error instanceof Error ? error.message : 'PNG download failed. Try SVG instead.'
  } finally {
    isWorking.value = false
  }
}

function exportPdf(): void {
  if (!validation.value.isValid) {
    return
  }

  const pdf = createSingleBarcodePdf(
    selectedType.value,
    validation.value.normalizedValue,
    showText.value ? normalizedText.value : ''
  )

  downloadBlob(pdf, `barcode-${safeFileValue.value}.pdf`)
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

async function svgToPngBlob(svg: string, width: number, height: number): Promise<Blob> {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  const image = new Image()
  const scale = 2

  image.decoding = 'async'
  image.src = url

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('PNG render failed. Try SVG instead.'))
  })

  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale

  const context = canvas.getContext('2d')

  if (!context) {
    URL.revokeObjectURL(url)
    throw new Error('PNG render failed. Try SVG instead.')
  }

  context.fillStyle = '#FFFFFF'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  URL.revokeObjectURL(url)

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
        return
      }

      reject(new Error('PNG export failed. Try SVG instead.'))
    }, 'image/png')
  })
}

function sanitizeFilePart(value: string): string {
  return value.trim().replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'barcode'
}
</script>

<template>
  <section class="mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 lg:px-8 lg:py-12">
    <div class="min-w-0 space-y-5 sm:space-y-6">
      <slot name="intro" />

      <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
          <button class="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-white" type="button">
            Single Barcode
          </button>
          <NuxtLink class="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/bulk-barcode-generator">
            Bulk Barcodes
          </NuxtLink>
          <NuxtLink class="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-gray-600 hover:text-blue-700" to="/barcode-label-generator">
            Label Sheet
          </NuxtLink>
        </div>

        <div class="grid gap-5">
          <BarcodeTypeSelector v-model="selectedType" />

          <BarcodeInput
            id="barcode-value"
            v-model="barcodeValue"
            label="Barcode Value"
            :placeholder="currentTypeDefinition.placeholder"
            :hint="currentTypeDefinition.allowedInput"
            :described-by="inputDescriptionId"
            :invalid="!validation.isValid"
          />

          <label class="grid gap-2 text-sm font-semibold text-gray-800" for="barcode-label">
            Label Text <span class="font-normal text-gray-500">(optional)</span>
            <input
              id="barcode-label"
              v-model="labelText"
              class="min-h-11 rounded-xl border border-gray-300 bg-white px-3 text-base text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Shown below the barcode"
              autocomplete="off"
            >
          </label>

          <label class="flex min-h-11 items-center gap-3 text-sm font-medium text-gray-700">
            <input v-model="showText" class="h-5 w-5 rounded border-gray-300 text-blue-600" type="checkbox">
            Show text below barcode
          </label>

          <BarcodeValidationMessage
            :id="inputDescriptionId"
            :validation="validation"
          />

          <p v-if="downloadError" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {{ downloadError }}
          </p>
        </div>
      </div>
    </div>

    <aside class="min-w-0 space-y-4 lg:pt-2">
      <BarcodePreview
        :svg="previewSvg"
        :value="validation.normalizedValue"
        :is-valid="validation.isValid"
      />
      <BarcodeDownloadActions
        :disabled="!validation.isValid"
        :is-working="isWorking"
        @download-png="downloadPng"
        @download-svg="downloadSvg"
        @export-pdf="exportPdf"
      />
      <p class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
        Your barcode data is processed in your browser and is not uploaded to our servers.
      </p>
    </aside>
  </section>
</template>
