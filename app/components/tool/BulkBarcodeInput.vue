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
  paste: [value: string]
}>()

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function handlePaste(event: ClipboardEvent): void {
  emit('paste', event.clipboardData?.getData('text') || '')
}
</script>

<template>
  <div class="grid gap-4">
    <label class="grid gap-2 text-sm font-semibold text-gray-800" for="bulk-barcode-values">
      Paste barcode values
      <textarea
        id="bulk-barcode-values"
        class="min-h-44 rounded-xl border bg-white px-3 py-3 text-base leading-6 text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        :class="overLimit ? 'border-red-500' : 'border-gray-300'"
        :value="modelValue"
        placeholder="SKU001&#10;SKU002&#10;SKU003"
        aria-describedby="bulk-barcode-help bulk-barcode-limit"
        spellcheck="false"
        @input="handleInput"
        @paste="handlePaste"
      />
      <span id="bulk-barcode-help" class="text-xs font-normal leading-5 text-gray-500">
        Enter one barcode value per line. Empty lines are skipped.
      </span>
    </label>

    <div
      id="bulk-barcode-limit"
      class="rounded-xl border px-3 py-2 text-sm leading-6"
      :class="overLimit ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue-100 bg-blue-50 text-blue-900'"
      role="status"
    >
      <template v-if="overLimit">
        This tool can generate up to {{ limit }} barcodes at once. Remove {{ rowCount - limit }} value<span v-if="rowCount - limit !== 1">s</span> and try again.
      </template>
      <template v-else>
        {{ rowCount }} of {{ limit }} barcode values ready to check.
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
