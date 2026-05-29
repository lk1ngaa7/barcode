<script setup lang="ts">
import SeoContent from '~/components/seo/SeoContent.vue'
import LabelDesigner from '~/components/tool/LabelDesigner.vue'
import { toolPages } from '../../utils/seoPages'

const page = toolPages.label

useToolPageHead(page)
</script>

<template>
  <div>
    <LabelDesigner>
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
    </LabelDesigner>

    <SeoContent :page="page" />
  </div>
</template>
