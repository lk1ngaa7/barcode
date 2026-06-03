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

    <SeoContent :page="page" />
  </div>
</template>
