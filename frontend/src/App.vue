<template>
  <div>
    <Header />
    <router-view />
  </div>
  <main class="flex flex-col justify-center">
    <Profile />
    <Footer />
  </main>
</template>


<script setup>

import Header from './components/Header.vue';

import Footer from './components/Footer.vue';
import Profile from './pages/Profile.vue';

</script>
