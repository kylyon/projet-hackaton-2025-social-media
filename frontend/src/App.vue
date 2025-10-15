<template>
  <main class="flex flex-col justify-center">
    <LoginCard />
     <Footer />

     <!--Intégration du Menu avec Headless UI -->
  

  </main>
</template>

<script setup>

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import LoginCard from './components/LoginCard.vue';
import Footer from './components/Footer.vue';
import Login from './pages/Login.vue';


const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ];

</script>



