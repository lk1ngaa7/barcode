<script setup lang="ts">
import type { BarcodeType } from '../../../utils/barcodeTypes'
import type { BulkBarcodeRow } from '../../../utils/bulkBarcode'

defineProps<{
  rows: BulkBarcodeRow[]
  type: BarcodeType
  validCount: number
  errorCount: number
}>()

const emit = defineEmits<{
  downloadSvg: [row: BulkBarcodeRow]
}>()
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-base font-semibold text-gray-950">
          Bulk Preview
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ validCount }} valid · {{ errorCount }} error<span v-if="errorCount !== 1">s</span>
        </p>
      </div>
      <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-600">
        {{ type }}
      </span>
    </div>

    <div v-if="rows.length === 0" class="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
      Paste barcode values and generate a bulk preview.
    </div>

    <div v-else class="mt-4">
      <div class="hidden overflow-hidden rounded-xl border border-gray-200 md:block">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th class="px-4 py-3">
                Line
              </th>
              <th class="px-4 py-3">
                Barcode Value
              </th>
              <th class="px-4 py-3">
                Preview
              </th>
              <th class="px-4 py-3">
                Status
              </th>
              <th class="px-4 py-3">
                Download
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="row in rows"
              :key="row.id"
              :class="row.isValid ? '' : 'bg-red-50'"
            >
              <td class="px-4 py-3 text-gray-500">
                {{ row.lineNumber }}
              </td>
              <td class="max-w-56 break-all px-4 py-3 font-medium text-gray-950">
                {{ row.inputValue }}
                <p v-if="row.isValid && row.normalizedValue !== row.inputValue" class="mt-1 text-xs font-normal text-gray-500">
                  Final: {{ row.normalizedValue }}
                </p>
              </td>
              <td class="px-4 py-3">
                <div
                  v-if="row.isValid"
                  class="bulk-preview rounded-lg border border-gray-200 bg-white p-2"
                  v-html="row.svg"
                />
                <span v-else class="text-xs text-gray-400">No preview</span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="row.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                >
                  {{ row.isValid ? 'Valid' : 'Error' }}
                </span>
                <p class="mt-2 max-w-72 text-xs leading-5" :class="row.isValid ? 'text-gray-500' : 'text-red-700'">
                  {{ row.message }}
                </p>
              </td>
              <td class="px-4 py-3">
                <button
                  class="min-h-11 rounded-xl border border-gray-300 px-3 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                  type="button"
                  :disabled="!row.isValid"
                  @click="emit('downloadSvg', row)"
                >
                  SVG
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid gap-3 md:hidden">
        <article
          v-for="row in rows"
          :key="row.id"
          class="rounded-xl border p-3"
          :class="row.isValid ? 'border-gray-200 bg-white' : 'border-red-200 bg-red-50'"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase text-gray-500">
                Line {{ row.lineNumber }}
              </p>
              <p class="mt-1 break-all text-sm font-semibold text-gray-950">
                {{ row.inputValue }}
              </p>
              <p v-if="row.isValid && row.normalizedValue !== row.inputValue" class="mt-1 break-all text-xs text-gray-500">
                Final: {{ row.normalizedValue }}
              </p>
            </div>
            <span
              class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
              :class="row.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ row.isValid ? 'Valid' : 'Error' }}
            </span>
          </div>

          <div
            v-if="row.isValid"
            class="bulk-preview mt-3 rounded-lg border border-gray-200 bg-white p-2"
            v-html="row.svg"
          />
          <p class="mt-3 text-sm leading-6" :class="row.isValid ? 'text-gray-600' : 'text-red-700'">
            {{ row.message }}
          </p>
          <button
            class="mt-3 min-h-11 w-full rounded-xl border border-gray-300 px-3 font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
            type="button"
            :disabled="!row.isValid"
            @click="emit('downloadSvg', row)"
          >
            Download SVG
          </button>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bulk-preview {
  overflow-x: auto;
}

.bulk-preview :deep(svg) {
  display: block;
  height: auto;
  max-width: 220px;
  margin: 0 auto;
}
</style>
