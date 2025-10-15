<template>
  <header class="w-full bg-[#01588A] text-white flex items-center justify-between px-6 py-4 shadow-md">
    <!-- Logo -->
    <div class="flex items-center space-x-2 cursor-pointer" @click="goHome">
      <img src="@/assets/logo.svg" alt="Logo Link Up" class="h-8 w-8" />
      <h1 class="font-bold text-xl tracking-wide">Link Up</h1>
    </div>

    <!-- Menu utilisateur -->
    <nav class="flex items-center space-x-6">
      <button
        class="flex items-center space-x-1 hover:underline"
        @click="goToProfile"
      >
        <UserIcon class="w-5 h-5 text-white" />
        <span>Mon compte</span>
      </button>

      <button
        class="flex items-center space-x-1 bg-white text-[#01588A] px-3 py-1 rounded-md hover:bg-[#DEF3FE] transition"
        @click="logout"
      >
        <LogoutIcon class="w-5 h-5" />
        <span>Déconnexion</span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { UserIcon, LogOut as LogoutIcon } from 'lucide-vue-next' // ou heroicons si tu préfères

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToProfile = () => {
  router.push('/profil')
}

const logout = () => {
  // Ici tu gères la déconnexion : suppression du token, redirection, etc.
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
