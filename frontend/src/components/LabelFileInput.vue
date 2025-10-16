<template>
  <div class="w-full flex flex-col mb-4">
    <label :for="id" class="mb-2 text-sm font-medium text-gray-700 cursor-pointer">
      {{ label }}
    </label>
    <input
      ref="fileInput"
      :id="id"
      type="file"
      @change="updateValue"
      accept="image/*"
      class="hidden"
    />
    <div
      class="border border-gray-300 rounded-md px-2 py-0.5 bg-white text-gray-700 w-full text-sm cursor-pointer hover:bg-gray-50"
      @click="$refs.fileInput.click()"
    >
      {{ placeholder || 'Cliquez pour sélectionner une image' }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  id: { type: String, default: 'file-' + Math.random().toString(36).substr(2, 5) }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(e) {
  const file = e.target.files[0] || null
  emit('update:modelValue', file)
}
</script>
