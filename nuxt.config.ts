import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-05-29',
  srcDir: 'app/',
  css: ['~/assets/css/main.css'],
  modules: [],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.barcode-mint.com'
    }
  },
  nitro: {
    preset: 'static',
    output: {
      publicDir: 'dist'
    }
  },
  features: {
    inlineStyles: true
  },
  experimental: {
    payloadExtraction: 'client'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Free Barcode Generator | Create Barcode Labels Online',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Create free barcodes online for products, inventory, and labels. Generate Code 128, UPC-A, and EAN-13 barcodes and download as PNG, SVG, or PDF.'
        },
        {
          name: 'google-site-verification',
          content: '0669NpPiUiYnlZNfS3_hW1FdaYNip5UlEshlQwZKtqc'
        },
        {
          name: 'yandex-verification',
          content: '1caeb07a6917187c'
        }
      ]
    }
  }
})
