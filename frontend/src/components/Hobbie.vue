<template>
  <div :class="cardClasses">
    {{ displayName }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' }
})

// Si pas de nom, afficher "Aucune passion"
const displayName = computed(() =>
  props.name && props.name.trim() !== '' ? props.name : 'Aucune hobbie'
)

// Classes dynamiques selon si on a une passion ou non
const cardClasses = computed(() => {
  if (displayName.value === 'Aucune passion') {
    return 'bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 text-gray-600 text-xs font-medium shadow-sm'
  }
  return 'bg-sky-800 border border-gray-300 rounded-lg px-2 py-1 text-white text-xs font-medium shadow-sm'
})
</script>
