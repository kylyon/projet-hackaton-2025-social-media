<template>
  <footer
    class="w-full max-w-[95%] mx-auto mt-4 mb-4 bg-sky-100 text-[#01588A] flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 rounded-2xl shadow-lg"
  >
    <!-- Logo -->
    <div class="flex items-center space-x-2 cursor-pointer overflow-hidden" style="height: 45px" @click="goHome">
      <img
        src="@/assets/logo.svg"
        alt="Logo Link Up"
        class="h-22 w-22 object-contain -my-2"
      />
    </div>

    <!-- Liens ou informations -->
    <nav class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
      <a href="/profil" class="hover:underline">Mon Compte</a>
      <a href="/contact" class="hover:underline">Contact</a>
      <a href="/privacy" class="hover:underline">Politique de confidentialité</a>
      <a href="/admin" class="hover:underline">Gestionnaire</a>
    </nav>

    <!-- Copyright -->
    <div class="mt-2 sm:mt-0 text-sm">
      &copy; 2025 Link Up. Tous droits réservés.
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
