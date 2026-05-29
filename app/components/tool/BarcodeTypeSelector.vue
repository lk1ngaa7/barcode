<script setup lang="ts">
import { BARCODE_TYPES, type BarcodeType } from '../../../utils/barcodeTypes'

const model = defineModel<BarcodeType>({ required: true })

const barcodeTypes = Object.values(BARCODE_TYPES)
</script>

<template>
  <fieldset class="grid gap-3">
    <legend class="text-sm font-semibold text-gray-800">
      Barcode Type
    </legend>

    <div class="grid gap-2 sm:grid-cols-3">
      <label
        v-for="type in barcodeTypes"
        :key="type.id"
        class="flex cursor-pointer rounded-xl border bg-white p-3 transition"
        :class="model === type.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'"
      >
        <input
          v-model="model"
          class="sr-only"
          name="barcode-type"
          type="radio"
          :value="type.id"
        >
        <span class="grid gap-1">
          <span class="text-sm font-semibold text-gray-950">{{ type.label }}</span>
          <span class="text-xs leading-5 text-gray-600">{{ type.description }}</span>
        </span>
      </label>
    </div>
  </fieldset>
</template>
