<script setup lang="ts">
// 隐私政策：扩充运营主体、分析工具披露与 GDPR/CCPA 权利（审计发现过薄且不署主体）
import { absoluteUrl } from '../../utils/seoPages'

const siteUrl = useRuntimeConfig().public.siteUrl
const canonical = absoluteUrl('/privacy', siteUrl)
const title = 'Privacy Policy | Barcode Mint'
const description =
  'How Barcode Mint handles your data: barcode values are processed locally in your browser, never uploaded or stored. Read our full privacy policy.'

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
        Barcode Mint (www.barcode-mint.com) is a free online barcode generator that works in your browser without sign-up. This policy explains who operates the site, what happens to the data you enter, and the rights you have over it.
      </p>
      <p class="mt-3 text-sm text-gray-500">
        Last updated: October 2026
      </p>

      <div class="mt-8 space-y-7">
        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Who operates this site
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Barcode Mint is operated as an independent free tool project. You can reach us at any time by email at
            <a class="font-semibold text-blue-600 hover:text-blue-700" href="mailto:support@barcode-mint.com">support@barcode-mint.com</a>
            for privacy questions, data requests, or any other matter.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Browser-based barcode processing
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            Barcode values you type or paste into the tool are processed locally in your browser using JavaScript. The generator does not upload your barcode values, product codes, label text, spreadsheet rows, or uploaded lists to our servers or to any third party for processing. Generation, validation, check-digit calculation, and file export all happen on your device.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            We do not save your input
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            We do not create user accounts, store barcode values, keep generated barcode files, or maintain a database of your inputs. There is no server-side storage connected to this tool. If you close or refresh the page, your current form data is not saved by this site.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Anonymous analytics
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            We use Cloudflare Web Analytics to understand aggregate usage, such as page views, country-level visitor counts, and download events. Cloudflare Web Analytics does not use cookies and does not track or identify individual visitors across sites. Analytics never include the barcode values, label text, or spreadsheet contents you enter, because that data never leaves your browser.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Cookies
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            This site does not set advertising cookies and does not use cross-site trackers. The only third-party script loaded is the Cloudflare Web Analytics beacon described above, which operates without cookies.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Your privacy rights
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            If you are in the European Economic Area, the United Kingdom, or Switzerland, you have rights under the GDPR, including access, rectification, erasure, restriction, and objection. If you are a California resident, you have rights under the CCPA/CPRA, including the right to know what personal information is collected and the right to request deletion. Because this tool does not collect or store your barcode data in the first place, there is normally nothing to access or delete. For any request relating to this site, email
            <a class="font-semibold text-blue-600 hover:text-blue-700" href="mailto:support@barcode-mint.com">support@barcode-mint.com</a>
            and we will respond within the statutory time frame.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            No login required
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            The site does not include registration, login, subscriptions, payments, cloud saving, or account-based history, so we never ask for your name, email address, or payment details to use the generator.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold tracking-normal text-gray-950">
            Changes to this policy
          </h2>
          <p class="mt-3 leading-7 text-gray-600">
            If we change this policy, we will update the date above and, for material changes, describe them on this page. Continued use of the site after an update means you accept the revised policy.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
