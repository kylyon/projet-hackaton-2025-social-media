<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow m-10 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full"
    >
      <h1 class="text-xl text-center font-bold mb-6">Connexion</h1>

      <LabelInput label="Email" placeholder="Entrez votre email" v-model="email" />
      <LabelInput label="Mot de passe" placeholder="Entrez votre mot de passe" v-model="password" type="password" />

      <AppButton label="Connexion" @click="login" class="mt-4" />

      <AppButton label="Deconnexion" @click="logout" class="mt-4" />

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
    console.log(json)
    window.cookieStore.set("auth_token", json.user.token.tokenId)
  }

}

async function logout() {
  console.log('Connexion avec', email.value, password.value)

  const res = await fetch("http://localhost:3000/auth/logout", {
    method: "post",
    headers: 
    {
      "Access-Control-Allow-Origin" : "*",
      "Authorization" : "Bearer " + (await window.cookieStore.get("auth_token")).value

    }
  })

  if(res.ok)
  {
    const json = await res.json()
    console.log(json)

    if(json.user)
    {
      window.cookieStore.delete("auth_token")
    }
  }
  
}
</script>
