<template>
  <div>
    <!-- Composant utilisateur -->
    <div class="flex flex-col md:flex-row rounded-lg p-2 gap-4 max-w-4xl mx-auto items-center">
      <!-- Colonne gauche : image -->
      <div class="flex-shrink-0">
        <img
          :src="user.photo || require('@/assets/avatar.jpg')"
          :alt="user.username"
          class="w-18 h-18 object-cover rounded-lg border border-gray-300"
        />
      </div>

      <!-- Colonne droite : infos utilisateur -->
      <div class="flex-1 flex flex-col justify-start gap-2">
        <!-- Ligne 1 : nom + username côte à côte -->
        <div class="flex items-center gap-2">
          <h2 class="text-gray-800 font-semibold text-lg">{{ user.nom }}</h2>
          <p class="text-gray-600 text-sm">| @{{ user.username }}</p>
        </div>

        <!-- Ligne 2 : hobbies -->
        <div>
          <HobbiesList :apiUrl="`http://localhost:3000/users/${user.id}/hobbies`" />
        </div>
      </div>
    </div>

    <!-- Ligne de séparation -->
    <div class="my-2 border-t border-gray-300 w-full max-w-4xl mx-auto"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HobbiesList from './HobbiesList.vue'
import avatar from '@/assets/avatar.jpg'

const user = ref({
  id: 1,
  nom: 'Jean',
  username: 'jean123',
  photo: avatar
})

// Exemple fictif : on pourrait fetcher plus tard
async function fetchUser() {
  try {
    const res = await fetch(`http://localhost:3000/users/${user.value.id}`)
    if (!res.ok) throw new Error('Erreur lors du chargement de l’utilisateur')
    const data = await res.json()
    user.value = { ...user.value, ...data }
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchUser)
</script>
