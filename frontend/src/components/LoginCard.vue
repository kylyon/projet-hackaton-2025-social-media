<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow m-10 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full"
    >
      <h1 class="text-xl text-center font-bold mb-6">Connexion</h1>
      <InputField label="Email" v-model="name" placeholder="Entrez votre mail" typeField="text" />
      <InputField label="Mot de passe" v-model="password" typeField="text" inputType="password" placeholder="Entrez votre mot de passe" />

      <AppButton label="Connexion" @click="login" class="mt-4" />

      <p class="text-center text-sm mt-4">
        Pas de compte ? <a href="./register" class="text-sky-600 hover:underline">S'inscrire</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LabelInput from './LabelInput.vue'
import AppButton from './Button.vue'

const router = useRouter()

const email = ref('')
const password = ref('')

async function login() {
  console.log('Connexion avec', email.value, password.value)

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "post",
    body: JSON.stringify({
      usernameInput: email.value,
      hashedPassword: password.value
    }),
    headers: 
    {
      "Access-Control-Allow-Origin" : "*",
      "Content-type" : "application/json"

    }
  })

  if(res.ok)
  {
    const json = await res.json()
    window.cookieStore.set("auth_token", json.user.token.tokenId)
    router.push("/profil")
  }else{
    //Mettre les erreurs ici
    console.log(res)
  }

}
</script>
