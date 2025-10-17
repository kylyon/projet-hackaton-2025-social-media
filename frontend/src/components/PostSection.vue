<template>
  <div class="overflow-y-auto h-[80vh] p-4 space-y-6 rounded-lg custom-scroll">
    <Post
      v-for="post in posts"
      :key="post.id"
      :user="post.user"
      :content="post.content"
      :hobby="post.hobby"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Post from './Post.vue'
import avatar from '@/assets/avatar.jpg'

const posts = ref([])

onMounted(async () => {
  try {
    // Récupération des posts
    const postRes = await fetch('https://hackaton-backend-api.vercel.app/posts')
    const postData = await postRes.json()

    // Récupération des utilisateurs
    const userRes = await fetch('https://hackaton-backend-api.vercel.app/users')
    const userData = await userRes.json()

    // Récupération des hobbies
    const hobbyRes = await fetch('https://hackaton-backend-api.vercel.app/hobbies')
    const hobbyData = await hobbyRes.json()

    // Construction des posts avec user et hobby
    posts.value = postData.data.map(post => {
      const user = userData?.data?.find(u => u._id === post.user_id)
      const hobby = hobbyData?.data?.find(h => h._id === post.hobby_id)

      return {
        id: post._id,
        content: post.description,
        user: {
          id: user?._id || 'inconnu',
          nom: user?.lastname || 'Nom inconnu',
          username: user?.username || 'utilisateur',
          photo: avatar
        },
        hobby: hobby?.name || null
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement des posts :', error)
  }
})
</script>

<style scoped>
/* Personnalisation du scroll */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #e2e8f000;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #38bdf8;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #0284c7;
}

/* Firefox */
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #38bdf8 #ffffff00;
}
</style>
