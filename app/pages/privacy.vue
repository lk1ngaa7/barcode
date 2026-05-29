<script setup lang="ts">
import { absoluteUrl } from '../../utils/seoPages'

const siteUrl = useRuntimeConfig().public.siteUrl
const canonical = absoluteUrl('/privacy', siteUrl)
const title = 'Privacy Policy | Free Barcode Generator'
const description =
  'Read how Free Barcode Generator handles barcode values, browser-based processing, anonymous analytics, and user privacy.'

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
        Privacy
      </p>
      <h1 class="mt-3 text-3xl font-bold tracking-normal text-gray-950">
        Privacy Policy
      </h1>
      <p class="mt-4 leading-7 text-gray-600">
        Free Barcode Generator is designed to let you create barcodes in your browser without signing up or sending barcode values to our servers.
      </p>

      <div class="mt-8 space-y-7">
        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Browser-based barcode processing
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Barcode values you type or paste into the tool are processed locally in your browser. The generator does not upload your barcode values, product codes, label text, or spreadsheet rows for server-side processing.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            We do not save your input
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            We do not create user accounts, store barcode values, keep generated barcode files, or maintain a database of your inputs. If you close or refresh the page, your current form data is not saved by this site.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Anonymous analytics
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            We may use privacy-friendly anonymous analytics to understand general usage, such as page views, download events, and feature popularity. Analytics should not include the barcode values or label text you enter.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            No login required
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            The MVP does not include registration, login, subscriptions, payments, cloud saving, or account-based history.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
