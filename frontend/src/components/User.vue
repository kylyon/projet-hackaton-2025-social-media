<template>
  <div v-if="isLoggedIn">
    <!-- Si l'utilisateur est connecté, affiche son profil -->
    <div
      class="flex flex-col md:flex-row rounded-lg p-2 gap-4 max-w-4xl mx-auto items-center"
    >
      <!-- Colonne gauche : image -->
      <div class="flex-shrink-0">
        <img
          :src="user.avatar || avatar"
          :alt="user.username"
          class="w-18 h-18 object-cover rounded-lg border border-gray-300"
        />
      </div>

      <!-- Colonne droite : infos utilisateur -->
      <div class="flex-1 flex flex-col justify-start gap-2">
        <!-- Ligne 1 : nom + username côte à côte -->
        <div class="flex items-center gap-2">
          <h2 class="text-gray-800 font-semibold text-lg">
            {{ user.lastname || user.firstname || 'Utilisateur' }}
          </h2>
          <p class="text-gray-600 text-sm">| @{{ user.username }}</p>
        </div>

        <!-- Ligne 2 : hobbies -->
        <div v-if="user._id">
          <HobbiesList :apiUrl="`https://hackaton-backend-api.vercel.app/users/${user._id}/hobbies`" />
        </div>
      </div>
    </div>

    <!-- Ligne de séparation -->
    <div class="my-2 border-t border-gray-300 w-full max-w-4xl mx-auto"></div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import HobbiesList from './HobbiesList.vue'
import avatar from '@/assets/avatar.jpg'

const router = useRouter()
const userStore = useUserStore()

// Computed pour récupérer l'utilisateur depuis le store
const user = computed(() => userStore.user)
const isLoggedIn = computed(() => userStore.isLoggedIn)

onMounted(() => {
  if (!isLoggedIn.value) {
    console.log('Utilisateur non connecté, redirection vers /login')
    router.push('/login')
  } else {
    user.value.avatar = "http://localhost:3000" + user.value.avatar
    console.log('Profil chargé pour', user.value.username)
  }
})
</script>
