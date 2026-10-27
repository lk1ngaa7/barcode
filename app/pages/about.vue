<script setup lang="ts">
// 关于页：E-E-A-T 信任基础设施（审计发现全站缺运营方信息）
import { absoluteUrl } from '../../utils/seoPages'

const siteUrl = useRuntimeConfig().public.siteUrl
const canonical = absoluteUrl('/about', siteUrl)
const title = 'About Barcode Mint | Free Online Barcode Tools'
const description =
  'Learn about Barcode Mint, the free browser-based barcode generator for products, inventory, and labels. No sign-up, no uploads, no data collection.'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonical }
  ],
  link: [
    { rel: 'canonical', href: canonical }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
    <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-600">
        About
      </p>
      <h1 class="mt-3 text-3xl font-bold tracking-normal text-gray-950">
        About Barcode Mint
      </h1>
      <p class="mt-4 leading-7 text-gray-600">
        Barcode Mint is a free online barcode generator for small businesses, online sellers, and inventory teams. It creates Code 128, UPC-A, EAN-13, Code 39, and ITF barcodes, printable label sheets, and bulk exports without requiring an account.
      </p>

      <div class="mt-8 space-y-7">
        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Why we built this tool
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Many sellers on Etsy, Shopify, Amazon, and eBay need a handful of barcodes for a new product line, a restock, or a warehouse relabel — not a subscription. Existing generators often watermark downloads, paywall SVG exports, restrict commercial use, or ask you to upload your product list to their servers. Barcode Mint takes the opposite approach: every barcode is generated locally in your browser, every export is free for commercial use, and nothing you type ever leaves your device.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            How the tool works
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            The generator runs entirely on the client side. Barcode values you enter, spreadsheet rows you paste, and label text you configure are processed by JavaScript in your browser — never uploaded, never logged, never stored on a server. Downloads include PNG and SVG image files plus print-ready PDF label sheets for US Letter and A4 paper. Check digits for UPC-A and EAN-13 are calculated and validated automatically.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Free to use, free for commercial work
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            There is no registration, no paid tier, and no watermark. Barcodes you generate with Barcode Mint are yours to use on products, packaging, warehouse shelves, and retail labels. Note that this tool creates barcode images — it does not issue official GS1 company prefixes or register UPC/EAN numbers for retail marketplaces. If you need official codes, obtain them from GS1.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Contact us
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Questions, bug reports, or feature requests are welcome at
            <NuxtLink to="/contact/" class="font-semibold text-blue-600 hover:text-blue-700">
              our contact page
            </NuxtLink>. You can also read our
            <NuxtLink to="/privacy/" class="font-semibold text-blue-600 hover:text-blue-700">privacy policy</NuxtLink>
            and
            <NuxtLink to="/terms/" class="font-semibold text-blue-600 hover:text-blue-700">terms of use</NuxtLink>.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
