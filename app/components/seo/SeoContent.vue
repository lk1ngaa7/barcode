<script setup lang="ts">
import type { ToolPageContent } from '../../../utils/seoPages'
import FaqBlock from './FaqBlock.vue'
import RelatedTools from './RelatedTools.vue'

defineProps<{
  page: ToolPageContent
}>()
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-10 px-4 pb-12 sm:px-6 lg:px-8">
    <section class="grid gap-4 md:grid-cols-3">
      <article
        v-for="section in page.sections"
        :key="section.title"
        class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <h2 class="text-lg font-semibold tracking-normal text-gray-950">
          {{ section.title }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-gray-600">
          {{ section.body }}
        </p>
      </article>
    </section>

    <FaqBlock :items="page.faqs" />
    <RelatedTools :tools="page.relatedTools" />
  </div>
</template>
