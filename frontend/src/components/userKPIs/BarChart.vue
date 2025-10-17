<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>
    <div class="space-y-3">
      <div v-for="item in data" :key="item.label" class="flex items-center gap-3">
        <div class="w-32 text-sm text-gray-600 font-medium truncate">{{ item.label }}</div>
        <div class="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
          <div 
            class="h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all duration-500"
            :style="{ width: item.percentage + '%', backgroundColor: item.color }"
          >
            {{ item.value }}
          </div>
        </div>
        <div class="w-16 text-sm text-gray-500 text-right">{{ item.percentage }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>