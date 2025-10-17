<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full"
    >
      <h1 class="text-2xl text-center font-bold mb-6 text-sky-700">
        Connexion
      </h1>

      <form class="w-full flex flex-col gap-4" @submit.prevent="login">
        <InputField
          label="Username"
          v-model="username"
          placeholder="Entrez votre username"
          typeField="text"
        />

        <InputField
          label="Mot de passe"
          v-model="password"
          placeholder="Entrez votre mot de passe"
          typeField="password"
        />

        <!-- Message d'erreur -->
        <p
          v-if="errorMessage"
          class="text-red-600 text-center text-sm bg-red-100 py-2 rounded-md animate-fadeIn"
        >
          {{ errorMessage }}
        </p>

        <AppButton label="Connexion" class="mt-2" />
      </form>

      <p class="text-center text-sm mt-4">
        Pas encore de compte ?
        <a href="/register" class="text-sky-700 font-medium hover:underline">
          S'inscrire
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import InputField from './InputField.vue'
import AppButton from './Button.vue'
import { loginAction } from '@/actions/auth/authAction.js' // ton action existante

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function fetchUserByUsername(usernameToFind) {
  try {
    const res = await fetch('https://hackaton-backend-api.vercel.app/users')
    if (!res.ok) throw new Error('Erreur récupération users')
    const json = await res.json()
    // Adapte selon la forme: ici endpoint renvoie { message, data: [...] }
    const list = json.data || json.users || []
    return list.find(u => u.username === usernameToFind || u.email === usernameToFind) || null
  } catch (err) {
    console.error(err)
    return null
  }
}

async function login() {
  if (!username.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Remplis tous les champs'
    setTimeout(() => (errorMessage.value = ''), 3000)
    return
  }

  loading.value = true
  try {
    const res = await loginAction(username.value, password.value)
    // Plusieurs formats possibles de retour => gère les principaux
    // 1) res.data.user + res.data.token
    if (res && res.data && (res.data.user || res.data.token)) {
      const user = res.data.user || res.data
      const token = res.data.token || null
      userStore.setUser(user, token)
      errorMessage.value = ''
      router.push('/profil')
      return
    }
    // 2) res.user / res.token
    if (res && res.user) {
      userStore.setUser(res.user, res.token || null)
      router.push('/profil')
      return
    }
    // 3) res === true (action ne renvoie pas user) => fallback: récupérer user via /users
    if (res === true || res === 'ok') {
      const found = await fetchUserByUsername(username.value)
      if (found) {
        userStore.setUser(found, null)
        router.push('/profil')
        return
      }
    }

    // Si on arrive ici, échec
    throw new Error('Identifiants incorrects')
  } catch (err) {
    console.error(err)
    errorMessage.value = '❌ Nom d’utilisateur ou mot de passe incorrect.'
    username.value = ''
    password.value = ''
    setTimeout(() => (errorMessage.value = ''), 3000)
  } finally {
    loading.value = false
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
