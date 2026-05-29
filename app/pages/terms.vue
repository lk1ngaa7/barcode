<script setup lang="ts">
import { absoluteUrl } from '../../utils/seoPages'

const siteUrl = useRuntimeConfig().public.siteUrl
const canonical = absoluteUrl('/terms', siteUrl)
const title = 'Terms of Use | Free Barcode Generator'
const description =
  'Review the terms for using Free Barcode Generator, including barcode suitability, GS1 registration, and as-is tool availability.'

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
        Terms
      </p>
      <h1 class="mt-3 text-3xl font-bold tracking-normal text-gray-950">
        Terms of Use
      </h1>
      <p class="mt-4 leading-7 text-gray-600">
        By using Free Barcode Generator, you agree to use the tool responsibly and confirm that generated barcodes fit your own business, printing, and retail requirements.
      </p>

      <div class="mt-8 space-y-7">
        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Tool provided as-is
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            This barcode generator is provided as-is for convenience. We aim to make the tool accurate and useful, but we do not guarantee uninterrupted availability or error-free output in every environment.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Confirm barcode suitability
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            You are responsible for confirming that each barcode type, barcode value, label size, and exported file is suitable for your products, inventory process, printer, scanner, and sales channel.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            No GS1 registration
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            This tool does not provide official GS1 company prefixes, UPC registration, EAN registration, or product identity licensing. If your retailer, marketplace, or distributor requires official UPC or EAN codes, obtain them from GS1 or another accepted issuing authority.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Retail system acceptance
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            We do not guarantee that generated UPC-A, EAN-13, Code 128, PNG, SVG, or PDF outputs will be accepted by every retail system, warehouse system, marketplace, scanner, or printer.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
