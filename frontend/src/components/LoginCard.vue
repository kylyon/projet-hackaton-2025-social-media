<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full">
      <h1 class="text-2xl text-center font-bold mb-6 text-sky-700">
        Connexion
      </h1>

      <form class="w-full flex flex-col gap-4" @submit.prevent="login">
        <InputField label="Email" v-model="email" placeholder="Entrez votre email" typeField="text" />

        <InputField label="Mot de passe" v-model="password" placeholder="Entrez votre mot de passe"
          typeField="password" />

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
import InputField from './InputField.vue'
import AppButton from './Button.vue'
import { loginAction } from "@/actions/auth/authAction.js"

const router = useRouter()

const email = ref('')
const password = ref('')

async function login() {
  console.log('Connexion avec', email.value, password.value)
  const isLogged = await loginAction(email.value, password.value)

  if(isLogged)
  {
    if(isLogged.user.role !== "admin") router.push("/profil")
    else router.push("/admin")
  } 
    

}
</script>
