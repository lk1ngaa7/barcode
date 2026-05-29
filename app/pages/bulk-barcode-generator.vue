<script setup lang="ts">
import BulkBarcodeGenerator from '~/components/tool/BulkBarcodeGenerator.vue'
import SeoContent from '~/components/seo/SeoContent.vue'
import { toolPages } from '../../utils/seoPages'

const page = toolPages.bulk

useToolPageHead(page)
</script>

<template>
  <div>
    <BulkBarcodeGenerator>
      <template #intro>
        <div class="space-y-2 sm:space-y-3">
          <p class="text-xs font-semibold uppercase leading-5 tracking-wide text-blue-600 sm:text-sm">
            {{ page.trustNote }}
          </p>
          <h1 class="max-w-3xl text-3xl font-bold leading-tight tracking-normal text-gray-950 sm:text-5xl">
            {{ page.h1 }}
          </h1>
          <p class="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {{ page.subtitle }}
          </p>
        </div>
      </template>
    </BulkBarcodeGenerator>

    <SeoContent :page="page" />
  </div>
</template>
