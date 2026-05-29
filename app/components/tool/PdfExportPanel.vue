<script setup lang="ts">
defineProps<{
  disabled: boolean
  paperLabel: string
  labelSizeLabel: string
}>()

const emit = defineEmits<{
  exportPdf: []
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
    <p class="mt-4 text-sm leading-6 text-gray-500">
      For best results, print at 100% scale and disable "Fit to page".
    </p>
  </div>
</template>
