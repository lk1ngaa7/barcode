<template>
  <header class="border-b border-gray-200 bg-white">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="inline-flex min-h-11 items-center text-base font-semibold text-gray-950">
        Barcode Generator
      </NuxtLink>
      <nav class="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex" aria-label="Main navigation">
        <NuxtLink to="/" class="hover:text-blue-600">
          Barcode Generator
        </NuxtLink>
        <NuxtLink to="/bulk-barcode-generator" class="hover:text-blue-600">
          Bulk Generator
        </NuxtLink>
        <NuxtLink to="/barcode-generator-for-excel" class="hover:text-blue-600">
          Excel Generator
        </NuxtLink>
        <NuxtLink to="/barcode-label-generator" class="hover:text-blue-600">
          Label Generator
        </NuxtLink>
        <span class="text-gray-400">
          Guides
        </span>
      </nav>
    </div>
  </header>
</template>
