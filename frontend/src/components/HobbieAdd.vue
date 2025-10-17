<template>
  <div
    class="bg-sky-800 text-white flex justify-between items-center px-4 py-2 rounded-lg shadow hover:bg-sky-700 transition cursor-pointer"
  >
    <span class="font-medium text-sm">{{ name }}</span>
    <button
      @click.stop="$emit('add')"
      class="rounded-full w-6 h-6 flex items-center justify-center hover:bg-sky-700 transition"
      title="Ajouter ce hobby"
    >
      <!-- Icon Lucide en blanc -->
      <CirclePlus class="w-4 h-4 text-white" />
    </button>
  </div>
</template>

<script setup>
import { CirclePlus } from 'lucide-vue-next' // Import du composant Lucide

defineProps({
  name: String
})
</script>
