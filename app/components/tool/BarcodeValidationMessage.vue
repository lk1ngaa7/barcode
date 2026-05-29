<script setup lang="ts">
import type { BarcodeValidationResult } from '../../../utils/validateBarcode'

defineProps<{
  id: string
  validation: BarcodeValidationResult
}>()
</script>

<template>
  <div
    :id="id"
    class="rounded-xl border px-3 py-2 text-sm leading-6"
    :class="validation.isValid ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'"
    role="status"
  >
    <p class="font-medium">
      {{ validation.message }}
    </p>
    <p v-if="validation.wasCheckDigitAdded" class="mt-1">
      Check digit {{ validation.checkDigit }} was added. Final value: {{ validation.normalizedValue }}.
    </p>
    <p v-if="validation.recommendation" class="mt-1">
      {{ validation.recommendation }}
    </p>
  </div>
</template>
