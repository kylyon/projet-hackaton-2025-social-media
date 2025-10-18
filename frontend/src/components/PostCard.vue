<template>
  <main class="min-h-screen flex justify-center">
    <div
      class="bg-sky-100 border border-gray-300 rounded-lg shadow p-6 max-w-2xl w-full overflow-hidden space-y-6">
      <User :userId="userId" />
      
      <div class="overflow-hidden p-2 space-y-4">
        <PostSection />
      </div>
    </div>
  </main>
</template>

<script setup>
import User from '@/components/User.vue'
import PostSection from '@/components/PostSection.vue'

// Récupérer l'UUID du user
function getUserIdFromLocalStorage() {
  try {
    const raw = localStorage.getItem("user")
    if (raw) {
      const obj = JSON.parse(raw)
      if (obj?.uuid) return obj.uuid
    }
    return localStorage.getItem("uuid")
  } catch (e) {
    console.error("Erreur lecture localStorage", e)
    return null
  }
}

const userId = getUserIdFromLocalStorage() || null
console.log("UserId dans PostCard.vue :", userId)
</script>