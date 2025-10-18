<template>
  <footer class="bg-sky-100 border border-gray-300 m-12 rounded-lg shadow-md">
    <div class="footerTop p-7 flex justify-between md:p-10 md:items-center">
      <div class="flex items-center space-x-4">
        <img src="@/assets/logo.svg" alt="Logo" class="h-10" />
      </div>
      <div class="flex items-center space-x-5 mt-4 md:mt-0">
        <a href="#" class="text-sky-800 hover:underline">A propos</a>
        
        <!-- Affichage conditionnel pour admin -->
        <RouterLink
          v-if="isAdmin"
          to="/admin"
          class="text-sky-800 hover:underline"
        >
          Administrateur
        </RouterLink>
        
        <a href="#" class="text-sky-800 hover:underline">Contact</a>
      </div>
    </div>
    <div class="footerBottom p-4 text-center">
      <span class="text-sky-800">© 2025 LinkUp</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { RouterLink } from 'vue-router'

// Récupération du store utilisateur
const userStore = useUserStore()

// Computed pour vérifier le rôle
const isAdmin = computed(() => userStore.user?.role === 'admin')
</script>