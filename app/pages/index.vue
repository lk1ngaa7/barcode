<script setup lang="ts">
import BarcodeGenerator from '~/components/tool/BarcodeGenerator.vue'
</script>

<template>
  <BarcodeGenerator>
    <template #intro>
      <div class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-blue-600">
          No sign-up required · Works in your browser · PNG, SVG, PDF
        </p>
        <h1 class="max-w-3xl text-4xl font-bold tracking-normal text-gray-950 sm:text-5xl">
          Free Barcode Generator for Products, Inventory, and Labels
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-gray-600">
          Create single or bulk barcodes online. Import SKUs from Excel and export printable barcode labels as PNG, SVG, or PDF.
        </p>
      </div>
    </template>
  </BarcodeGenerator>
</template>
