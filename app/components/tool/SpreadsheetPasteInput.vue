<script setup lang="ts">
defineProps<{
  modelValue: string
  limit: number
  rowCount: number
  overLimit: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  generate: []
  clear: []
  pasteDetected: [value: string]
  downloadCsvTemplate: []
}>()

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function handlePaste(event: ClipboardEvent): void {
  emit('pasteDetected', event.clipboardData?.getData('text') || '')
}
</script>

<template>
  <div class="grid gap-4">
    <div class="rounded-xl border border-blue-100 bg-blue-50 p-3">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm leading-6 text-blue-950">
          Use this template to prepare barcode values, label text, and extra text in Excel or Google Sheets.
        </p>
        <a
          class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 transition hover:border-blue-600 hover:text-blue-800"
          href="/templates/barcode-template.csv"
          download
          @click="emit('downloadCsvTemplate')"
        >
          Download CSV Template
        </a>
      </div>
    </div>

    <label class="grid gap-2 text-sm font-semibold text-gray-800" for="spreadsheet-barcode-values">
      Paste spreadsheet rows
      <textarea
        id="spreadsheet-barcode-values"
        class="min-h-48 rounded-xl border bg-white px-3 py-3 text-base leading-6 text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        :class="overLimit ? 'border-red-500' : 'border-gray-300'"
        :value="modelValue"
        placeholder="SKU-001&#9;Black T-Shirt&#9;$19.99&#10;SKU-002&#9;White Mug&#9;$12.99&#10;SKU-003&#9;Phone Case&#9;$9.99"
        aria-describedby="spreadsheet-barcode-help spreadsheet-barcode-limit"
        spellcheck="false"
        @input="handleInput"
        @paste="handlePaste"
      />
      <span id="spreadsheet-barcode-help" class="text-xs font-normal leading-5 text-gray-500">
        Paste from Excel or Google Sheets. Column 1 is Barcode Value, column 2 is Label Text, and column 3 is Extra Text.
      </span>
    </label>

    <div
      id="spreadsheet-barcode-limit"
      class="rounded-xl border px-3 py-2 text-sm leading-6"
      :class="overLimit ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue-100 bg-blue-50 text-blue-900'"
      role="status"
    >
      <template v-if="overLimit">
        You pasted more than {{ limit }} rows. This free browser tool currently supports up to {{ limit }} barcodes at once.
      </template>
      <template v-else>
        {{ rowCount }} of {{ limit }} spreadsheet rows detected.
      </template>
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <button
        class="min-h-11 rounded-xl bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        type="button"
        :disabled="!modelValue.trim()"
        @click="emit('generate')"
      >
        Generate Barcodes
      </button>
      <button
        class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
        type="button"
        :disabled="!modelValue.trim()"
        @click="emit('clear')"
      >
        Clear
      </button>
    </div>
  </div>
</template>
