<template>
  <main class="min-h-screen flex justify-center">
    <div class="bg-sky-100 border border-gray-300 rounded-lg shadow p-6 max-w-3xl w-full space-y-6">
      <User :userId="userId" />
      <PostSection />
    </div>
  </main>
</template>

<script setup>
import User from '@/components/User.vue'
import PostSection from '@/components/PostSection.vue'

const userId = 1
</script>
