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
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide text-blue-600">
            {{ page.trustNote }}
          </p>
          <h1 class="max-w-3xl text-4xl font-bold tracking-normal text-gray-950 sm:text-5xl">
            {{ page.h1 }}
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-gray-600">
            {{ page.subtitle }}
          </p>
        </div>
      </template>
    </BarcodeGenerator>

    <SeoContent :page="page" />
  </div>
</template>
