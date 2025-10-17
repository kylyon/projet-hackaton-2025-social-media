<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2 rounded-lg scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-100 hover:scrollbar-thumb-sky-600"
  >
    <HobbieAdd
      v-for="hobbie in hobbies"
      :key="hobbie._id"
      :name="hobbie.name"
      @add="addHobbie(hobbie)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HobbieAdd from './HobbieAdd.vue'

const emit = defineEmits(['hobbie-added'])
const apiUrl = 'https://hackaton-backend-api.vercel.app/hobbies/'

const hobbies = ref([])

async function fetchHobbies() {
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Erreur lors du chargement des hobbies')
    const data = await res.json()
    hobbies.value = data.hobbies || []
  } catch (err) {
    console.error(err)
    hobbies.value = []
  }
}

function addHobbie(hobbie) {
  emit('hobbie-added', hobbie.name)
}

// On récupère les hobbies dès que le composant est monté
onMounted(fetchHobbies)
</script>
