<script setup lang="ts">
// 页脚工具链接统一取自 SEO 数据源，与工具页保持同步
import { FOOTER_TOOLS } from '../../../utils/seoPages'
</script>

<template>
  <footer class="border-t border-gray-200 bg-white">
    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- 工具链接区：覆盖全部生成器，弥补移动端页眉导航缺口 -->
      <nav aria-label="Footer tools">
        <h2 class="mb-2 text-sm font-semibold text-gray-950">Barcode tools</h2>
        <ul class="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-4">
          <li v-for="tool in FOOTER_TOOLS" :key="tool.path">
            <NuxtLink
              :to="`${tool.path}/`"
              class="inline-flex min-h-11 items-center text-sm text-gray-600 hover:text-blue-600"
            >
              {{ tool.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div
        class="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between"
      >
        <p>Free online barcode tools for products, inventory, and labels.</p>
        <nav class="flex flex-wrap gap-3" aria-label="Footer navigation">
          <NuxtLink to="/about/" class="inline-flex min-h-11 items-center hover:text-blue-600">
            About
          </NuxtLink>
          <NuxtLink to="/contact/" class="inline-flex min-h-11 items-center hover:text-blue-600">
            Contact
          </NuxtLink>
          <NuxtLink to="/privacy/" class="inline-flex min-h-11 items-center hover:text-blue-600">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms/" class="inline-flex min-h-11 items-center hover:text-blue-600">
            Terms
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
