<template>
  <header
    class="max-w-6xl mx-auto mt-4 mb-4 bg-sky-100 text-[#01588A] flex items-center justify-between px-8 py-1 rounded-2xl shadow-lg"
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
    </nav>
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

const logout = async () => {

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

    router.push('/login')
  }

  
}
</script>
