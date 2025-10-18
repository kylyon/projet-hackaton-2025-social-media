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
import { useUserStore } from '@/stores/userStore.js'

const emit = defineEmits(['hobbie-added'])
const hobbies = ref([])
const apiUrl = 'https://hackaton-backend-api.vercel.app/hobbies/'
const userStore = useUserStore()

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

async function addHobbie(hobbie) {
  if (!userStore.user?.uuid) {
    alert('Veuillez vous connecter pour ajouter un hobby.')
    return
  }

  const alreadyAdded = userStore.user.hobbies?.includes(hobbie._id)
  if (alreadyAdded) {
    emit('hobbie-added', `Le hobby "${hobbie.name}" est déjà dans votre liste.`)
    return
  }

  try {
    const updatedHobbies = [...(userStore.user.hobbies || []), hobbie._id]

    const userId = userStore.user.uuid

    const res = await fetch(
      `https://hackaton-backend-api.vercel.app/users/update/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.token}`
        },
        body: JSON.stringify({ hobbies: updatedHobbies })
      }
    )

    if (!res.ok) throw new Error('Erreur lors de la mise à jour du hobby')

    const data = await res.json()

    userStore.user.hobbies = updatedHobbies
    localStorage.setItem('user', JSON.stringify(userStore.user))

    emit('hobbie-added', hobbie.name)
    console.log('✅ Hobby ajouté avec succès :', data)
  } catch (err) {
    console.error('Erreur lors de l’ajout du hobby :', err)
    emit('hobbie-added', '❌ Une erreur est survenue.')
  }
}

onMounted(fetchHobbies)
</script>
