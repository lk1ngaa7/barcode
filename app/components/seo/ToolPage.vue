<script setup lang="ts">
import type { ToolPageContent } from '../../../utils/seoPages'
import BarcodeGenerator from '../tool/BarcodeGenerator.vue'
import SeoContent from './SeoContent.vue'

defineProps<{
  page: ToolPageContent
}>()
</script>

<template>
  <div>
    <BarcodeGenerator
      :default-type="page.defaultType"
      :default-value="page.defaultValue"
    >
      <template #intro>
        <div class="space-y-2 sm:space-y-3">
          <p class="text-pretty text-xs font-semibold uppercase leading-5 text-blue-600 sm:text-sm">
            {{ page.trustNote }}
          </p>
          <h1 class="max-w-3xl text-balance text-3xl font-bold leading-tight text-gray-950 sm:text-5xl">
            {{ page.h1 }}
          </h1>
          <p class="max-w-2xl text-pretty text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {{ page.subtitle }}
          </p>
        </div>
      </template>
    </BarcodeGenerator>

    <section
      v-if="page.featuredTools?.length"
      class="border-y border-blue-100 bg-blue-50/60"
      aria-labelledby="featured-tools-title"
    >
      <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <h2 id="featured-tools-title" class="text-2xl font-bold tracking-normal text-gray-950">
            Choose the right barcode tool
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            Start with the barcode tool that matches what you want to create, print, or export.
          </p>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="tool in page.featuredTools"
            :key="tool.path"
            class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <NuxtLink
              :to="tool.path"
              class="text-base font-semibold text-gray-950 hover:text-blue-700"
            >
              {{ tool.title }}
            </NuxtLink>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              {{ tool.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <SeoContent :page="page" />
  </div>
</template>
