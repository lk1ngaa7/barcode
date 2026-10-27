<script setup lang="ts">
// 联系页：E-E-A-T 信任基础设施（审计发现全站零联系途径）
import { absoluteUrl } from '../../utils/seoPages'

const siteUrl = useRuntimeConfig().public.siteUrl
const canonical = absoluteUrl('/contact', siteUrl)
const title = 'Contact Barcode Mint | Support & Feedback'
const description =
  'Contact the Barcode Mint team at support@barcode-mint.com for bug reports, feature requests, or questions about our free online barcode generator.'

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
        Contact
      </p>
      <h1 class="mt-3 text-3xl font-bold tracking-normal text-gray-950">
        Contact Barcode Mint
      </h1>
      <p class="mt-4 leading-7 text-gray-600">
        We read every message. The fastest way to reach the team is email:
      </p>

      <div class="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4">
        <p class="text-sm font-semibold text-blue-900">
          Email
        </p>
        <a
          class="mt-1 inline-flex min-h-11 items-center text-base font-semibold text-blue-700 hover:text-blue-800"
          href="mailto:support@barcode-mint.com"
        >
          support@barcode-mint.com
        </a>
        <p class="mt-2 text-sm leading-6 text-blue-900">
          Typical response time: 1–2 business days.
        </p>
      </div>

      <div class="mt-8 space-y-7">
        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            What to include
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            For bug reports, tell us the page you were on, the barcode type and value you entered, and the browser you use. For feature requests, describe the product or labeling workflow you are trying to complete — it helps us prioritize the right generators and export formats.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Common questions
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Many questions about check digits, GS1 prefixes, label sheets, and printing are answered in the FAQ section of each tool — for example the
            <NuxtLink to="/upc-a-barcode-generator/" class="font-semibold text-blue-600 hover:text-blue-700">UPC-A generator</NuxtLink>
            and the
            <NuxtLink to="/barcode-label-generator/" class="font-semibold text-blue-600 hover:text-blue-700">label generator</NuxtLink>. Privacy questions are covered in our
            <NuxtLink to="/privacy/" class="font-semibold text-blue-600 hover:text-blue-700">privacy policy</NuxtLink>.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
