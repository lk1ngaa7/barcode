<script setup lang="ts">
defineProps<{
  disabled: boolean
  isWorking: boolean
}>()

const emit = defineEmits<{
  downloadPng: []
  downloadSvg: []
  exportPdf: []
}>()
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    <h2 class="text-base font-semibold text-gray-950">
      Download
    </h2>

    <div class="mt-4 grid gap-3">
      <button
        class="min-h-11 rounded-xl bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        type="button"
        :disabled="disabled || isWorking"
        @click="emit('downloadPng')"
      >
        Download PNG
      </button>
      <button
        class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
        type="button"
        :disabled="disabled || isWorking"
        @click="emit('downloadSvg')"
      >
        Download SVG
      </button>
      <button
        class="min-h-11 rounded-xl border border-gray-300 px-4 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
        type="button"
        :disabled="disabled || isWorking"
        @click="emit('exportPdf')"
      >
        Export PDF
      </button>
    </div>

    <p class="mt-4 text-sm leading-6 text-gray-500">
      For best results, print at 100% scale and disable "Fit to page".
    </p>
  </div>
</template>
