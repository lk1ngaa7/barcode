<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  placeholder: string
  hint: string
  describedBy: string
  invalid: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="grid gap-2 text-sm font-semibold text-gray-800" :for="id">
    {{ label }}
    <input
      :id="id"
      class="min-h-11 rounded-xl border bg-white px-3 text-base text-gray-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      :class="invalid ? 'border-red-500' : 'border-gray-300'"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-describedby="describedBy"
      :aria-invalid="invalid ? 'true' : 'false'"
      autocomplete="off"
      spellcheck="false"
      @input="handleInput"
    >
    <span class="text-xs font-normal leading-5 text-gray-500">{{ hint }}</span>
  </label>
</template>
