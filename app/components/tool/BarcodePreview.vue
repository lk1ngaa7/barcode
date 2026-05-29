<script setup lang="ts">
defineProps<{
  svg: string
  value: string
  isValid: boolean
}>()
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-base font-semibold text-gray-950">
        Preview
      </h2>
      <span
        class="rounded-full px-2.5 py-1 text-xs font-semibold"
        :class="isValid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
      >
        {{ isValid ? 'Ready' : 'Waiting' }}
      </span>
    </div>

    <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 sm:p-5">
      <div
        v-if="isValid"
        class="barcode-preview rounded-lg bg-white px-3 py-6 text-center"
        v-html="svg"
      />
      <div v-else class="rounded-lg bg-white px-4 py-10 text-center text-sm leading-6 text-gray-500">
        Enter a valid barcode value to preview your barcode.
      </div>
    </div>

    <p v-if="isValid" class="mt-3 break-all text-center text-sm text-gray-600">
      {{ value }}
    </p>
  </div>
</template>

<style scoped>
.barcode-preview {
  overflow-x: auto;
}

.barcode-preview :deep(svg) {
  display: block;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
}
</style>
