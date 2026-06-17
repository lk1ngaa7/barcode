<script setup lang="ts">
import { canonicalPath, type ToolPageContent } from '../../../utils/seoPages'
import FaqBlock from './FaqBlock.vue'
import RelatedTools from './RelatedTools.vue'

defineProps<{
  page: ToolPageContent
}>()
</script>

<template>
  <div class="seo-content mx-auto max-w-6xl space-y-10 px-4 pb-12 sm:px-6 lg:px-8">
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
        <ul v-if="section.items?.length" class="mt-4 grid gap-2 text-sm leading-6 text-gray-700">
          <li
            v-for="item in section.items"
            :key="item"
            class="flex gap-2"
          >
            <span class="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
        <div v-if="section.table" class="mt-4 overflow-hidden rounded-xl border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <tr>
                <th
                  v-for="header in section.table.headers"
                  :key="header"
                  class="px-3 py-2"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white text-gray-700">
              <tr
                v-for="row in section.table.rows"
                :key="row.join('|')"
              >
                <td
                  v-for="cell in row"
                  :key="cell"
                  class="px-3 py-2"
                >
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="section.links?.length" class="mt-4 flex flex-wrap gap-2">
          <NuxtLink
            v-for="link in section.links"
            :key="link.path"
            :to="canonicalPath(link.path)"
            class="inline-flex min-h-11 items-center rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
      </article>
    </section>

    <FaqBlock :items="page.faqs" />
    <RelatedTools :tools="page.relatedTools" />
  </div>
</template>
