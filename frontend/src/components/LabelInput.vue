<template>
  <div class="w-full flex flex-col mb-4">
    <label :for="id" class="mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="px-3 py-0.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full text-sm"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  id: { type: String, default: 'input-' + Math.random().toString(36).substr(2, 5) },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' } //
})

const emit = defineEmits(['update:modelValue'])

function updateValue(e) {
  emit('update:modelValue', e.target.value)
}
</script>
