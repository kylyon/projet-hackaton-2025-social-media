<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full"
    >
      <h1 class="text-2xl text-center font-bold mb-6 text-sky-700">
        Connexion
      </h1>

      <form class="w-full flex flex-col gap-4" @submit.prevent="login">
        <InputField
          label="Nom d’utilisateur"
          v-model="identifier"
          placeholder="Entrez votre nom d’utilisateur"
          typeField="text"
        />

        <InputField
          label="Mot de passe"
          v-model="password"
          placeholder="Entrez votre mot de passe"
          typeField="password"
        />

        <p
          v-if="errorMessage"
          class="text-red-600 text-center text-sm bg-red-100 py-2 rounded-md animate-fadeIn"
        >
          {{ errorMessage }}
        </p>

        <AppButton label="Connexion" class="mt-2" :loading="loading" />
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
import InputField from './InputField.vue'
import AppButton from './Button.vue'
import { loginAction } from '@/actions/auth/authAction.js'
import { useUserStore } from '@/stores/userStore.js'
import { hashPassword } from '../../utils/getCrypto'

const router = useRouter()
const userStore = useUserStore()

const identifier = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function login() {
  if (!identifier.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Remplis tous les champs'
    setTimeout(() => (errorMessage.value = ''), 3000)
    return
  }

  loading.value = true

  try {
    console.log('Tentative de connexion avec:', identifier.value, password.value)


    const res = await loginAction(identifier.value, password.value)
    console.log('Réponse API:', res)

    if (res?.user?.token?.tokenId) {
      // Stocke les données utilisateur dans le store et localStorage
      userStore.setUser(res.user, res.user.token.tokenId)

      identifier.value = ''
      password.value = ''
      errorMessage.value = ''

      if(userStore.user.role === "admin") return router.push('/admin')
      router.push('/')
      
    } else {
      throw new Error('Identifiants incorrects')
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = '❌ Nom d’utilisateur ou mot de passe incorrect.'
    setTimeout(() => (errorMessage.value = ''), 3000)
  } finally {
    loading.value = false
  }
}
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
