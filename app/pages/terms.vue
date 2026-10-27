<script setup lang="ts">
// 条款页：补充运营主体、输出版权与可接受使用条款
import { absoluteUrl } from '../../utils/seoPages'

const siteUrl = useRuntimeConfig().public.siteUrl
const canonical = absoluteUrl('/terms', siteUrl)
const title = 'Terms of Use | Barcode Mint'
const description =
  'Terms for using Barcode Mint: free commercial use of generated barcodes, GS1 registration guidance, tool availability, and your responsibilities.'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` }
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
        By using Barcode Mint (www.barcode-mint.com), you agree to these terms and confirm that generated barcodes fit your own business, printing, and retail requirements.
      </p>
      <p class="mt-3 text-sm text-gray-500">
        Last updated: October 2026
      </p>

      <div class="mt-8 space-y-7">
        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Tool provided as-is
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            This barcode generator is provided as-is and free of charge for convenience. We aim to make the tool accurate and useful, but we do not guarantee uninterrupted availability or error-free output in every environment, browser, or printer.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Your generated output
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Barcode images and label PDFs you generate with this tool belong to you. You may use them for personal and commercial purposes, including product packaging, retail labels, warehouse shelves, and asset tracking, with no attribution required. We claim no ownership over your barcode values, label text, or exported files.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Confirm barcode suitability
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            You are responsible for confirming that each barcode type, barcode value, label size, and exported file is suitable for your products, inventory process, printer, scanner, and sales channel. Always test-scan a printed sample before rolling labels out across live inventory.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            No GS1 registration
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            This tool does not provide official GS1 company prefixes, UPC registration, EAN registration, or product identity licensing. If your retailer, marketplace, or distributor requires official UPC or EAN codes, obtain them from
            <a class="font-semibold text-blue-600 hover:text-blue-700" href="https://www.gs1.org/" rel="noopener">GS1</a>
            or another accepted issuing authority.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Retail system acceptance
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            We do not guarantee that generated UPC-A, EAN-13, Code 128, Code 39, ITF, PNG, SVG, or PDF outputs will be accepted by every retail system, warehouse system, marketplace, scanner, or printer.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Acceptable use
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            You agree not to use the tool to infringe third-party rights, to create counterfeit product identifiers, or to attempt to disrupt the service. We may update, limit, or discontinue features at any time.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Contact
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Questions about these terms can be sent to
            <a class="font-semibold text-blue-600 hover:text-blue-700" href="mailto:support@barcode-mint.com">support@barcode-mint.com</a>. See also our
            <NuxtLink to="/privacy/" class="font-semibold text-blue-600 hover:text-blue-700">privacy policy</NuxtLink>.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
