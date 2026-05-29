<template>
  <section class="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:py-14">
    <div class="space-y-6">
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

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
          <button class="rounded-lg bg-blue-600 px-4 py-2.5 text-white" type="button">
            Single Barcode
          </button>
          <button class="rounded-lg px-4 py-2.5 text-gray-600" type="button" disabled>
            Bulk Barcodes
          </button>
          <button class="rounded-lg px-4 py-2.5 text-gray-600" type="button" disabled>
            Label Sheet
          </button>
        </div>

        <div class="grid gap-4">
          <label class="grid gap-2 text-sm font-medium text-gray-700">
            Barcode Type
            <select class="min-h-11 rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900">
              <option>Code 128 — Best for SKUs and inventory</option>
              <option>UPC-A — 12-digit retail product barcode</option>
              <option>EAN-13 — 13-digit international product barcode</option>
            </select>
          </label>

          <label class="grid gap-2 text-sm font-medium text-gray-700">
            Barcode Value
            <input
              class="min-h-11 rounded-lg border border-gray-300 px-3 text-base text-gray-900"
              value="SKU-001"
              aria-describedby="barcode-placeholder-note"
              readonly
            >
          </label>

          <p id="barcode-placeholder-note" class="text-sm text-gray-500">
            Task 01 placeholder. Barcode generation starts in Task 02 and Task 03.
          </p>
        </div>
      </div>
    </div>

    <aside class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="text-base font-semibold text-gray-950">
        Preview
      </h2>
      <div class="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6">
        <div class="rounded-lg bg-white px-4 py-8 text-center text-sm text-gray-500">
          Enter a barcode value to preview your barcode.
        </div>
      </div>
      <div class="mt-5 grid gap-3">
        <button class="min-h-11 rounded-lg bg-blue-600 px-4 font-semibold text-white disabled:bg-gray-300" type="button" disabled>
          Download PNG
        </button>
        <button class="min-h-11 rounded-lg border border-gray-300 px-4 font-semibold text-gray-500" type="button" disabled>
          Download SVG
        </button>
        <button class="min-h-11 rounded-lg border border-gray-300 px-4 font-semibold text-gray-500" type="button" disabled>
          Export PDF
        </button>
      </div>
      <p class="mt-4 text-sm text-gray-500">
        Your barcode data is processed in your browser and is not uploaded to our servers.
      </p>
    </aside>
  </section>
</template>
