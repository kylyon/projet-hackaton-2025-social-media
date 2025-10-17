<template>
  <div class="bg-white text-gray-800 rounded-xl shadow p-4 max-w-4xl mx-auto">
    <!-- Info utilisateur -->
    <div class="flex flex-col md:flex-row gap-4 items-center mb-3">
      <img
        :src="user.photo"
        :alt="user.username"
        class="w-12 h-12 object-cover rounded-lg border border-gray-300"
      />
      <div class="flex-1 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold">{{ user.nom }}</h2>
          <p class="text-sm text-gray-500">@{{ user.username }}</p>
        </div>
<p v-if="user.hobby" class="text-sm text-gray-400 italic">
  Hobby : {{ user.hobby }}
</p>      </div>
    </div>

    <!-- Contenu du post -->
    <p class="text-gray-700 leading-relaxed mb-3">{{ content }}</p>

    <!-- Ligne de séparation -->
    <div class="border-t border-gray-300 my-3"></div>

    <!-- Zone commentaire -->
    <div class="flex items-center text-gray-500 gap-3">
      <input
        v-model="comment"
        type="text"
        placeholder="Ajouter un commentaire |"
        class="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      />
      <div class="flex justify-end">
        <AppButton label="Envoyer" @click="sendComment" />
      </div>
    </div>

    <!-- Voir les commentaires -->
    <p
      class="text-sm text-sky-500 mt-2 cursor-pointer hover:underline"
      @click="toggleComments"
    >
      {{ showComments ? 'Cacher les commentaires' : 'Voir les commentaires' }}
    </p>

    <!-- Section commentaires -->
    <CommentSection :visible="showComments" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from './Button.vue'
import CommentSection from './CommentSection.vue'

defineProps({
  user: Object,
  content: String
})

const comment = ref('')
const showComments = ref(false)

function sendComment() {
  if (!comment.value.trim()) return
  console.log(`💬 Commentaire envoyé : ${comment.value}`)
  comment.value = ''
}

function toggleComments() {
  showComments.value = !showComments.value
}
</script>
