<template>
  <header
    class="w-full max-w-[95%] mx-auto mt-4 mb-4 bg-sky-100 text-[#01588A] flex items-center justify-between px-4 sm:px-8 py-1 rounded-2xl shadow-lg"
  >
    <!-- Logo -->
    <div
      class="flex items-center space-x-2 cursor-pointer overflow-hidden"
      style="height: 45px"
      @click="goHome"
    >
      <img
        src="@/assets/logo.svg"
        alt="Logo Link Up"
        class="h-22 w-22 object-contain -my-2"
      />
    </div>

    <!-- Menu utilisateur -->
    <nav class="flex items-center space-x-4">
      <!-- Si connecté -->
      <template v-if="isLoggedIn">
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
          @click="logout"
        />
      </template>

      <!-- Si non connecté -->
      <template v-else>
        <AppButton
          label="Connexion"
          icon="LoginIcon"
          variant="solid"
          @click="goToLogin"
        />
      </template>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AppButton from '@/components/Button.vue'
import { logoutAction } from '@/actions/auth/authAction'

const router = useRouter()
const userStore = useUserStore()

// ✅ état réactif
const isLoggedIn = computed(() => userStore.isLoggedIn)

// ✅ Vérifie le localStorage à chaque montage
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')

  if (savedUser && savedToken) {
    userStore.setUser(JSON.parse(savedUser), savedToken)
  }
})

// Navigation
const goHome = () => router.push('/')
const goToProfile = () => router.push('/profil')
const goToLogin = () => router.push('/login')

// Déconnexion
const logout = async () => {
  await logoutAction()
  userStore.logout()
  router.push('/login')
}
</script>
