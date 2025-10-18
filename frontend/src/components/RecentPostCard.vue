<template>
  <div
    class="container bg-sky-100 border border-gray-300 mx-auto max-w-3xl flex flex-col justify-center p-4 rounded-2xl shadow-lg gap-4"
  >
    <h1 class="text-xl md:text-2xl font-semibold text-sky-800">
      Mes posts récents
    </h1>

    <div class="posts p-2 space-y-4">
      <div
        v-if="!hasPosts"
        class="text-center text-gray-800 italic mt-12"
      >
        Vous n'avez pas encore publié de post.
      </div>
      <PostSection :userId="userId" @postsLoaded="updatePostCount" />      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostSection from './PostSection.vue'

function getUserIdFromLocalStorage() {
  try {
    const raw = localStorage.getItem('user')
    if (raw) {
      const obj = JSON.parse(raw)
      if (obj?.uuid) return obj.uuid
    }
    return localStorage.getItem('uuid')
  } catch (e) {
    console.error('Erreur lecture localStorage', e)
    return null
  }
}

const userId = ref(getUserIdFromLocalStorage())
const hasPosts = ref(true)

// Callback appelé depuis PostSection
function updatePostCount(count) {
  hasPosts.value = count > 0
}
</script>