<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { BARCODE_TYPES, type BarcodeType } from '../../../utils/barcodeTypes'
import { encodeBarcodeModules, exportBarcodeSvg } from '../../../utils/exportSvg'
import { validateBarcode } from '../../../utils/validateBarcode'
import BarcodeDownloadActions from './BarcodeDownloadActions.vue'
import BarcodeInput from './BarcodeInput.vue'
import BarcodePreview from './BarcodePreview.vue'
import BarcodeTypeSelector from './BarcodeTypeSelector.vue'
import BarcodeValidationMessage from './BarcodeValidationMessage.vue'

const selectedType = ref<BarcodeType>('code128')
const barcodeValue = ref(BARCODE_TYPES.code128.example)
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

  const pdf = createBarcodePdf(
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

function createBarcodePdf(type: BarcodeType, value: string, text: string): Blob {
  const pageWidth = 612
  const pageHeight = 792
  const modules = encodeBarcodeModules(type, value)
  const moduleWidth = Math.min(3, 468 / modules.length)
  const barHeight = 120
  const barcodeWidth = modules.length * moduleWidth
  const startX = (pageWidth - barcodeWidth) / 2
  const startY = 520
  const commands = [
    '1 1 1 rg',
    `0 0 ${pageWidth} ${pageHeight} re f`,
    '0.067 0.094 0.153 rg',
    ...modulesToPdfRects(modules, startX, startY, moduleWidth, barHeight),
    '0.067 0.094 0.153 rg',
    '/F1 16 Tf',
    `BT ${centerTextX(text || value, pageWidth)} ${startY - 34} Td (${escapePdfText(text || value)}) Tj ET`,
    '/F1 10 Tf',
    `BT 72 72 Td (${escapePdfText('For best results, print at 100% scale and disable "Fit to page".')}) Tj ET`
  ].join('\n')

  return new Blob([buildPdf(commands, pageWidth, pageHeight)], { type: 'application/pdf' })
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
      rects.push(`${formatPdfNumber(startX + runStart * moduleWidth)} ${startY} ${formatPdfNumber(width)} ${height} re f`)
      runStart = -1
    }
  }

  return rects
}

function buildPdf(content: string, pageWidth: number, pageHeight: number): string {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
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

function formatPdfNumber(value: number): string {
  return value.toFixed(2).replace(/\.?0+$/, '')
}

function escapePdfText(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')
}

function sanitizeFilePart(value: string): string {
  return value.trim().replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'barcode'
}
</script>

<template>
  <section class="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:py-12">
    <div class="space-y-6">
      <slot name="intro" />

      <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
          <button class="min-h-11 rounded-xl bg-blue-600 px-4 text-white" type="button">
            Single Barcode
          </button>
          <button class="min-h-11 rounded-xl px-4 text-gray-500" type="button" disabled>
            Bulk Barcodes
          </button>
          <button class="min-h-11 rounded-xl px-4 text-gray-500" type="button" disabled>
            Label Sheet
          </button>
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

          <label class="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input v-model="showText" class="h-4 w-4 rounded border-gray-300 text-blue-600" type="checkbox">
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

    <aside class="space-y-4 lg:pt-2">
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
