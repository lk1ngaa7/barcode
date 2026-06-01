<script setup lang="ts">
import type { FaqItem } from '../../../utils/seoPages'

defineProps<{
  items: FaqItem[]
}>()
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-bold tracking-normal text-gray-950">
        Frequently asked questions
      </h2>
      <p class="mt-2 text-sm leading-6 text-gray-600">
        Quick answers about creating, downloading, and printing barcodes with this tool.
      </p>
    </div>

    <div class="grid gap-3">
      <details
        v-for="item in items"
        :key="item.question"
        class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <summary class="cursor-pointer text-base font-semibold text-gray-950">
          {{ item.question }}
        </summary>
        <p class="mt-3 text-sm leading-6 text-gray-600">
          {{ item.answer }}
        </p>
      </details>
    </div>
  </section>
</template>
