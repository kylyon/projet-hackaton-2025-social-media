<template>
  <div class="flex flex-wrap gap-2">
    <template v-if="userHobbies.length > 0">
      <Hobbie
        v-for="(hobby, index) in userHobbies"
        :key="index"
        :name="hobby.name"
      />
    </template>
    <template v-else>
      <p class="text-gray-500">Aucun hobby associé à l'utilisateur</p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import Hobbie from '@/components/Hobbie.vue'

const userStore = useUserStore()
const allHobbies = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://hackaton-backend-api.vercel.app/hobbies')
    const data = await response.json()
    allHobbies.value = data.hobbies
  } catch (error) {
    console.error('Erreur lors du chargement des hobbies :', error)
  }
})

const userHobbies = computed(() => {
  const userHobbyIds = userStore.user?.hobbies || []
  return allHobbies.value.filter(hobby => userHobbyIds.includes(hobby._id))
})
</script>
