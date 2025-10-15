<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow m-10 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full"
    >
      <h1 class="text-xl text-center font-bold mb-6">Connexion</h1>

      <LabelInput label="Email" placeholder="Entrez votre email" v-model="email" />
      <LabelInput label="Mot de passe" placeholder="Entrez votre mot de passe" v-model="password" type="password" />

      <AppButton label="Connexion" @click="login" class="mt-4" />

      <p class="text-center text-sm mt-4">
        Pas de compte ? <a href="#" class="text-sky-600 hover:underline">S'inscrire</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LabelInput from './LabelInput.vue'
import AppButton from './Button.vue'

const email = ref('')
const password = ref('')

function login() {
  console.log('Connexion avec', email.value, password.value)
}
</script>
