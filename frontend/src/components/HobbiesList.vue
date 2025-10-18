<template>
    <div class="flex flex-wrap gap-1">
      <template v-if="hobbies.length > 0">
        <Hobbie
          v-for="(hobby, index) in hobbies"
          :key="index"
          :name="hobby.name"
        />
      </template>
      <template v-else>
        <Hobbie name="" />
      </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Hobbie from '@/components/Hobbie.vue'

const props = defineProps({
  apiUrl: { type: String, default: 'http://localhost:3000/hobbies/' }
})

const hobbies = ref([])

async function fetchHobbies() {
  try {
    const res = await fetch(props.apiUrl)
    if (!res.ok) throw new Error('Erreur lors du chargement des hobbies')
    hobbies.value = await res.json() // tableau d'objets { id, name }
  } catch (err) {
    console.error(err)
    hobbies.value = []
  }
}

onMounted(fetchHobbies)
</script>
