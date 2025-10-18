<template>
  <div class="bg-white text-gray-800 rounded-xl shadow p-4 space-y-3">
    <!-- Info utilisateur du post -->
    <div class="flex flex-col md:flex-row gap-4 items-center mb-3">
      <img :src="user.photo" :alt="user.username" class="w-12 h-12 object-cover rounded-lg border border-gray-300" />
      <div class="flex-1 flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold">{{ user.nom }}</h2>
          <p class="text-sm text-gray-500">@{{ user.username }}</p>
          | <p v-if="hobby" class="text-sm text-gray-400 italic">
          {{ hobby }}
        </p>
        </div>
        
      </div>
    </div>

    <!-- Contenu du post -->
    <p class="text-gray-700 leading-relaxed">{{ content }}</p>

    <div class="border-t border-gray-300 my-2"></div>

    <!-- Zone commentaire -->
    <div class="flex items-center gap-3">
      <input v-model="comment" type="text" placeholder="Ajouter un commentaire…"
        class="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
      <AppButton label="Envoyer" @click="sendComment" />
    </div>

    <!-- Toggle commentaires -->
    <p class="text-sm text-sky-500 mt-2 cursor-pointer hover:underline" @click="toggleComments">
      {{ showComments ? 'Cacher les commentaires' : 'Voir les commentaires' }}
    </p>

    <!-- Section commentaires -->
    <CommentSection :visible="showComments" :comments="comments" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppButton from './Button.vue'
import CommentSection from './CommentSection.vue'

const props = defineProps({
  user: Object,
  content: String,
  postId: String,
  hobby: String
})

const comment = ref('')
const showComments = ref(false)
const comments = ref([])

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

async function fetchComments() {
  try {
    const resComments = await fetch('https://hackaton-backend-api.vercel.app/comments')
    const dataComments = await resComments.json()
    
    const resUsers = await fetch('https://hackaton-backend-api.vercel.app/users')
    const dataUsers = await resUsers.json()

    const postComments = (dataComments.data || []).filter(
      c => String(c.post_id).trim() === String(props.postId).trim()
    )
    
    comments.value = postComments.map(c => {
      const user = dataUsers.data.find(u => String(u.uuid) === String(c.user_id))

      return {
        _id: c._id,
        description: c.description,
        user: {
          nom: user?.firstname || user?.lastname || 'Utilisateur',
          username: user?.username || 'inconnu',
          photo: formatAvatarUrl(user?.avatar)
        }
      }
    })
  } catch (err) {
    console.error('Erreur fetch comments:', err)
  }
}


onMounted(fetchComments)

function toggleComments() {
  showComments.value = !showComments.value
}

async function sendComment() {
  const text = comment.value.trim()
  if (!text) return

  const uuid = getUserIdFromLocalStorage()
  if (!uuid) {
    console.error('Utilisateur non connecté')
    return
  }

  try {
    const res = await fetch('https://hackaton-backend-api.vercel.app/comments/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: text,
        post_id: props.postId,
        user_id: uuid
      })
    })

    const data = await res.json()
    if (res.ok) {
      comment.value = ''
      await fetchComments()
      showComments.value = true
      console.log('Commentaire ajouté avec succès !')
    } else {
      console.error('Erreur ajout commentaire:', data)
    }
  } catch (err) {
    console.error('Erreur ajout commentaire:', err)
  }
}
function formatAvatarUrl(avatar) {
  if (!avatar) return '/avatar-default.jpg'
  if (avatar.startsWith('http')) return avatar
  return `http://localhost:3000${avatar.startsWith('/') ? '' : '/'}${avatar}`
}
</script>
