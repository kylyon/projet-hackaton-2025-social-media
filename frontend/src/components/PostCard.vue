<template>
  <main class="min-h-screen flex justify-center ">
    <div class="bg-sky-100 border border-gray-300 rounded-lg shadow p-6 max-w-3xl w-full">
      <User :userId="userId" />
    </div>
  </main>
</template>

<script setup>
import User from '@/components/User.vue'

// On passe l'ID de l'utilisateur (peut être dynamique selon ton post)
const userId = 1
</script>
