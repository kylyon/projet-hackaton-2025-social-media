<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2 rounded-lg scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-100 hover:scrollbar-thumb-sky-600"
  >
    <HobbieAdd
      v-for="hobbie in hobbies"
      :key="hobbie.id"
      :name="hobbie.name"
      @add="addHobbie(hobbie)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HobbieAdd from './HobbieAdd.vue'

const emit = defineEmits(['hobbie-added'])

const hobbies = ref([
  { id: 1, name: 'Lecture' },
  { id: 2, name: 'Voyage' },
  { id: 3, name: 'Musique' },
  { id: 4, name: 'Cuisine' },
  { id: 5, name: 'Jeux vidéo' },
  { id: 6, name: 'Sport' },
  { id: 7, name: 'Randonnée' },
  { id: 8, name: 'Photographie' }
])

function addHobbie(hobbie) {
  emit('hobbie-added', hobbie.name)
}
</script>
