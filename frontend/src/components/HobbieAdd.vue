<template>
  <div
    class="bg-sky-800 text-white flex justify-between items-center px-4 py-2 rounded-lg shadow hover:bg-sky-700 transition cursor-pointer"
  >
    <span class="font-medium text-sm">{{ name }}</span>
    <button
      @click.stop="$emit('add')"
      class="bg-white text-sky-800 rounded-full w-6 h-6 flex items-center justify-center hover:bg-sky-200 transition"
      title="Ajouter ce hobby"
    >
      <span class="text-lg font-bold leading-none">+</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  name: String
})
</script>
