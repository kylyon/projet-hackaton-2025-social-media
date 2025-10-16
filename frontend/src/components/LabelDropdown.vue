<template>
  <div class="w-full flex flex-col mb-4">
    <label :for="id" class="mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <select
      :id="id"
      multiple
      :value="modelValue"
      @change="updateValue"
      class="px-3 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full text-sm"
      size="5"
    >
      <option
        v-for="hobbie in hobbies"
        :key="hobbie.id"
        :value="hobbie.name"
      >
        {{ hobbie.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  id: { type: String, default: 'select-' + Math.random().toString(36).substr(2, 5) },
  modelValue: { type: Array, default: () => [] },
  apiUrl: { type: String, default: 'http://localhost:3000/hobbies/' }
})

const emit = defineEmits(['update:modelValue'])

const hobbies = ref([])

async function fetchHobbies() {
  try {
    const res = await fetch(props.apiUrl)
    if (!res.ok) throw new Error('Erreur lors du chargement des hobbies')
    hobbies.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

function updateValue(e) {
  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value)
  emit('update:modelValue', selected)
}

onMounted(fetchHobbies)
</script>
