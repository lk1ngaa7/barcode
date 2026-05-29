<script setup lang="ts">
import type { RelatedTool } from '../../../utils/seoPages'

defineProps<{
  tools: RelatedTool[]
}>()
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-bold tracking-normal text-gray-950">
        Related tools
      </h2>
      <p class="mt-2 text-sm leading-6 text-gray-600">
        Switch to the barcode format that matches your product or inventory workflow.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
      >
        <span class="text-base font-semibold text-gray-950">
          {{ tool.title }}
        </span>
        <span class="mt-2 block text-sm leading-6 text-gray-600">
          {{ tool.description }}
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
