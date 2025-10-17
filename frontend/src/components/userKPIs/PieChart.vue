<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>
    <div class="flex items-center gap-8">
      <svg viewBox="0 0 100 100" class="w-48 h-48">
        <path
          v-for="segment in segments"
          :key="segment.label"
          :d="getPath(segment)"
          :fill="segment.color"
          class="hover:opacity-80 transition-opacity cursor-pointer"
        />
      </svg>
      <div class="flex-1 space-y-2">
        <div v-for="segment in segments" :key="segment.label" class="flex items-center gap-3">
          <div class="w-4 h-4 rounded" :style="{ backgroundColor: segment.color }"></div>
          <span class="text-sm text-gray-700">{{ segment.label }}</span>
          <span class="text-sm font-semibold text-gray-900 ml-auto">
            {{ segment.value }} ({{ segment.percentage }}%)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const total = computed(() => 
  props.data.reduce((sum, item) => sum + item.value, 0)
)

const segments = computed(() => {
  let currentAngle = -90
  return props.data.map(item => {
    const percentage = (item.value / total.value) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    currentAngle += angle
    return {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle,
      angle
    }
  })
})

const getPath = (segment) => {
  const centerX = 50
  const centerY = 50
  const radius = 40
  const startAngle = (segment.startAngle * Math.PI) / 180
  const endAngle = ((segment.startAngle + segment.angle) * Math.PI) / 180
  
  const x1 = centerX + radius * Math.cos(startAngle)
  const y1 = centerY + radius * Math.sin(startAngle)
  const x2 = centerX + radius * Math.cos(endAngle)
  const y2 = centerY + radius * Math.sin(endAngle)
  
  const largeArc = segment.angle > 180 ? 1 : 0
  
  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
}
</script>