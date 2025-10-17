<template>
  <div class="overflow-y-auto h-[80vh] p-4 space-y-6 rounded-lg custom-scroll">
    <Post v-for="post in posts" :key="post.id" :user="post.user" :content="post.content" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Post from './Post.vue'
import avatar from '@/assets/avatar.jpg'

// Données fictives pour l'UI
const posts = ref([
  {
    id: 1,
    content: "Le nouveau monde est impitoyable, mais la liberté vaut le risque ! ☠️",
    user: {
      id: 1,
      nom: 'Shanks Leroux',
      username: 'onepiece.shanks',
      photo: avatar
    }
  },
  {
    id: 2,
    content: "Toujours suivre son cap, peu importe la tempête ⚓",
    user: {
      id: 2,
      nom: 'Monkey D. Luffy',
      username: 'pirate_king',
      photo: avatar
    }
  },
  {
    id: 3,
    content: "Les rêves des hommes ne meurent jamais 🌅",
    user: {
      id: 3,
      nom: 'Gol D. Roger',
      username: 'pirate.legend',
      photo: avatar
    }
  },
  {
    id: 4,
    content: "Les rêves des hommes ne meurent jamais 🌅",
    user: {
      id: 3,
      nom: 'Gol D. Roger',
      username: 'pirate.legend',
      photo: avatar
    }
  }
])
</script>

<style scoped>
/* Personnalisation du scroll */
.custom-scroll::-webkit-scrollbar {
  width: 8px; /* largeur */
}

.custom-scroll::-webkit-scrollbar-track {
  background: #e2e8f000; /* gris clair (gray-200) */
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #38bdf8; /* sky-400 */
  border-radius: 10px;
  border: 2px solid #e2e8f0; /* petit espace entre thumb et track */
  transition: background-color 0.2s ease;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #0284c7; /* sky-600 */
}

/* Firefox */
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #38bdf8 #ffffff00;
}
</style>
