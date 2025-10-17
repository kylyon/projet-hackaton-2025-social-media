<template>
  <div
    v-if="visible"
    class="bg-sky-800 p-4 rounded-xl space-y-3 mt-3 max-h-60 overflow-y-auto"
  >
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Comment from './Comment.vue'
import avatar from '@/assets/avatar.jpg'

// Faux commentaires
const comments = ref([
  { id: 1, content: "Trop vrai ! Ce post me parle beaucoup 😎", user: { id: 1, nom: 'Nami', username: 'navigator', photo: avatar } },
  { id: 2, content: "Excellent point, merci pour ce partage ⚓", user: { id: 2, nom: 'Zoro', username: 'swordsman', photo: avatar } },
  { id: 3, content: "Je suis d'accord ! 🌊", user: { id: 3, nom: 'Luffy', username: 'pirate_king', photo: avatar } },
  { id: 4, content: "Haha, ça me fait rire 😂", user: { id: 4, nom: 'Usopp', username: 'sniper', photo: avatar } }
])

// Contrôle de visibilité (vraiment utile pour le Post.vue)
defineProps({
  visible: Boolean
})
</script>
