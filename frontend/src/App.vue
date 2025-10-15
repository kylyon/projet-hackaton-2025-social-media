<template>
  <main class="flex flex-col justify-center">
     <LabelInput label="Email" placeholder="Entrez votre nom" v-model="name" />
     <LabelInput label="Mot de passe" placeholder="Entrez votre email" v-model="email" />
    <AppButton label="Connexion" @click="login" />



  </main>
</template>

<script setup>

import LabelInput from './components/LabelInput.vue';
import AppButton from './components/Button.vue';



const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ];

</script>
