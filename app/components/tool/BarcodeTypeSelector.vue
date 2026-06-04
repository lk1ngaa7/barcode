<script setup lang="ts">
import { computed } from 'vue'
import { BARCODE_TYPES, type BarcodeType } from '../../../utils/barcodeTypes'

const model = defineModel<BarcodeType>({ required: true })

const barcodeTypes = Object.values(BARCODE_TYPES)
const selectedType = computed(() => BARCODE_TYPES[model.value])
</script>

<template>
  <fieldset class="grid gap-3">
    <legend class="text-sm font-semibold text-gray-800">
      Barcode Type
    </legend>

    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
      <label
        v-for="type in barcodeTypes"
        :key="type.id"
        class="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border bg-white p-2 transition sm:items-start sm:justify-start sm:p-3"
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
          <span class="text-center text-sm font-semibold text-gray-950 sm:text-left">{{ type.label }}</span>
          <span class="hidden text-xs leading-5 text-gray-600 sm:block">{{ type.description }}</span>
        </span>
      </label>
    </div>

    <p class="text-xs leading-5 text-gray-600 sm:hidden">
      {{ selectedType.description }}
    </p>
  </fieldset>
</template>
