<script setup lang="ts">
defineProps<{
  disabled: boolean
  paperLabel: string
  labelSizeLabel: string
}>()

const emit = defineEmits<{
  exportPdf: []
  downloadPng: []
  downloadSvg: []
}>()
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    <h2 class="text-base font-semibold text-gray-950">
      Export Label Sheet
    </h2>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Export a {{ paperLabel }} PDF with repeated {{ labelSizeLabel }} barcode labels.
    </p>
    <button
      class="mt-4 min-h-11 w-full rounded-xl bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      type="button"
      :disabled="disabled"
      @click="emit('exportPdf')"
    >
      Export PDF
    </button>
    <div class="mt-3 grid gap-3 sm:grid-cols-2">
      <button
        class="min-h-11 rounded-xl border border-gray-300 bg-white px-4 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
        type="button"
        :disabled="disabled"
        @click="emit('downloadPng')"
      >
        Download PNG
      </button>
      <button
        class="min-h-11 rounded-xl border border-gray-300 bg-white px-4 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
        type="button"
        :disabled="disabled"
        @click="emit('downloadSvg')"
      >
        Download SVG
      </button>
    </div>
    <p class="mt-4 text-sm leading-6 text-gray-500">
      For best results, print at 100% scale and disable "Fit to page".
    </p>
    <div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm leading-6 text-gray-600">
      <p class="font-semibold text-gray-800">
        Printing tips
      </p>
      <ul class="mt-2 list-disc space-y-1 pl-5">
        <li>Print at 100% scale.</li>
        <li>Disable "Fit to page".</li>
        <li>Use US Letter or A4 paper based on your selected paper size.</li>
        <li>Test with one sheet before printing large batches.</li>
      </ul>
    </div>
  </div>
</template>
