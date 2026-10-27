<script setup lang="ts">
// 导航链接单一数据源：桌面导航与移动菜单共用，避免两处维护
const navLinks = [
  { to: '/printable-barcode-generator/', label: 'Printable' },
  { to: '/sku-barcode-generator/', label: 'SKU Generator' },
  { to: '/bulk-barcode-generator/', label: 'Bulk Generator' },
  { to: '/barcode-generator-for-excel/', label: 'Excel Generator' },
  { to: '/barcode-label-generator/', label: 'Label Generator' }
]

// 移动端菜单元素引用：点击链接跳转后收起菜单
const mobileMenu = ref<HTMLDetailsElement | null>(null)
const closeMobileMenu = () => {
  if (mobileMenu.value) mobileMenu.value.open = false
}
</script>

<template>
  <header class="relative border-b border-gray-200 bg-white">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="inline-flex min-h-11 items-center text-base font-semibold text-gray-950">
        Barcode Generator
      </NuxtLink>
      <nav class="hidden items-center gap-5 text-sm font-medium text-gray-600 lg:flex" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="hover:text-blue-600"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <!-- 移动端菜单：复用站内 details 披露模式，零依赖、原生键盘支持 -->
      <details ref="mobileMenu" class="group lg:hidden">
        <summary
          class="flex min-h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition group-open:border-blue-600 group-open:text-blue-700"
          aria-label="Toggle navigation menu"
        >
          <svg class="size-5 group-open:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg class="hidden size-5 group-open:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </summary>
        <nav class="absolute inset-x-0 top-16 border-b border-gray-200 bg-white shadow-sm" aria-label="Mobile navigation">
          <div class="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-700"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </nav>
      </details>
    </div>
  </header>
</template>
