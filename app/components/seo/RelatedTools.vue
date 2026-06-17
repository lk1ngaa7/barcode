<script setup lang="ts">
import { useAnalytics } from '../../composables/useAnalytics'
import { canonicalPath, type RelatedTool } from '../../../utils/seoPages'

defineProps<{
  tools: RelatedTool[]
}>()

const analytics = useAnalytics()

function trackRelatedToolClick(tool: RelatedTool): void {
  analytics.track('related_tool_click', {
    target_path: canonicalPath(tool.path),
    target_title: tool.title
  })
}
</script>

<template>
  <section class="space-y-4" aria-labelledby="related-tools-title">
    <div>
      <h2 id="related-tools-title" class="text-2xl font-bold tracking-normal text-gray-950">
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
        :to="canonicalPath(tool.path)"
        class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
        @click="trackRelatedToolClick(tool)"
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
