<template>
  <div class="overflow-y-auto h-[80vh] p-4 space-y-6 rounded-lg custom-scroll">
    <Post v-for="post in filteredPosts" :key="post.id" :user="post.user" :content="post.content" :postId="post.id"
      :hobby="post.hobby" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Post from './Post.vue'

const props = defineProps({
  userId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['postsLoaded'])
const posts = ref([])
const BASE_URL = 'http://localhost:3000'

// formatage d’avatar
function formatAvatarUrl(avatarUrl) {
  if (!avatarUrl) return '/avatar-default.jpg'
  if (avatarUrl.startsWith('http')) return avatarUrl
  return `${BASE_URL}${avatarUrl.startsWith('/') ? '' : '/'}${avatarUrl}`
}

// Récupération des posts
onMounted(async () => {
  try {
    // --- Récupération des données ---
    const postRes = await fetch('https://hackaton-backend-api.vercel.app/posts')
    const postData = await postRes.json()

    const userRes = await fetch('https://hackaton-backend-api.vercel.app/users')
    const userData = await userRes.json()

    const hobbyRes = await fetch('https://hackaton-backend-api.vercel.app/hobbies')
    const hobbyData = await hobbyRes.json()

    const postsArray = postData.data || postData || []
    const usersArray = userData.data || userData || []
    const hobbiesArray = hobbyData.data || hobbyData.hobbies || hobbyData || []

    posts.value = postsArray.map(post => {
      const user = usersArray.find(u => String(u.uuid) === String(post.user_id))
      const hobby = hobbiesArray.find(h => String(h._id) === String(post.hobby_id))

      return {
        id: post._id,
        content: post.description,
        user: {
          id: user?.uuid || 'inconnu',
          nom: user?.firstname || user?.lastname || 'Nom inconnu',
          username: user?.username || 'utilisateur',
          photo: formatAvatarUrl(user?.avatar)
        },
        hobby: hobby?.name || null,
        user_id: post.user_id
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement des posts :', error)
  }
})

// Filtrage selon userId
const filteredPosts = computed(() => {
  if (!props.userId) return posts.value
  return posts.value.filter(p => String(p.user_id) === String(props.userId))
})

// 🔹 Émettre le nombre de posts filtrés à chaque changement
watch(filteredPosts, (newVal) => {
  emit('postsLoaded', newVal.length)
}, { immediate: true })
</script>