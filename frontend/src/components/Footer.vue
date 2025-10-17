<template>
  <footer class="bg-sky-100 border border-gray-300 m-12 rounded-lg shadow-md">
    <div class="footerTop p-7 flex justify-between md:p-10 md:items-center">
      <div class="flex items-center space-x-4">
        <img src="@/assets/logo.svg" alt="Logo" class="h-10" />
      </div>
      <div class="flex items-center space-x-5 mt-4 md:mt-0">
        <a href="#" class="text-sky-800 hover:underline">A propos</a>
        <a href="#" class="text-sky-800 hover:underline">Gestionnaire</a>
        <a href="#" class="text-sky-800 hover:underline">Contact</a>
      </div>
    </div>
    <div class="footerBottom p-4 text-center">
      <span class="text-sky-800">© 2025 LinkUp</span>
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
