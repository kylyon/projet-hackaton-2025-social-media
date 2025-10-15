<template>
  <div class="flex justify-center items-center w-full">
    <button
      :class="[
        'inline-flex items-center justify-center px-4 py-0.5 rounded-md text-white font-medium shadow-md bg-sky-600 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 w-auto',
        customClass
      ]"
      @click="handleClick"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  customClass: { type: String, default: '' }
})

const emit = defineEmits(['click'])

function handleClick(e) {
  emit('click', e)
}
</script>
