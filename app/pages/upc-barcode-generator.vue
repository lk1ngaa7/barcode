<script setup lang="ts">
import ToolPage from '~/components/seo/ToolPage.vue'
import { toolPages } from '../../utils/seoPages'

const page = {
  ...toolPages.upcA,
  path: '/upc-barcode-generator',
  title: 'Free UPC Barcode Generator for Retail Products | Barcode Mint',
  description:
    'Generate UPC barcodes online for 12-digit retail product codes. Create UPC-A barcode images and export PNG, SVG, or PDF files.',
  h1: 'Free UPC Barcode Generator',
  subtitle: 'Create UPC-A retail barcodes online and download them as PNG, SVG, or PDF.'
}

useToolPageHead(page)
</script>

<template>
  <ToolPage :page="page" />
</template>
