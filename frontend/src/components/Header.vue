<template>
  <header class="w-full bg-sky-100 text-[#01588A] flex items-center justify-between px-6 py-1 rounded-b-lg shadow-md">
    <!-- Logo -->
    <div class="px-6">
    <div class="flex items-center space-x-2 cursor-pointer" @click="goHome">
      <img src="@/assets/logo.svg" alt="Logo Link Up" class="h-10 w-10" />
    </div>

    <!-- Menu utilisateur -->
    <nav class="flex items-center space-x-4">
      <AppButton
        label="Mon compte"
        icon="UserIcon"
        variant="text"
        @click="goToProfile"
      />
      <AppButton
        label="Déconnexion"
        icon="LogoutIcon"
        variant="solid"
        class="bg-white text-[#01588A] hover:bg-[#DEF3FE]"
        @click="logout"
      />
    </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/Button.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToProfile = () => {
  router.push('/profil')
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
