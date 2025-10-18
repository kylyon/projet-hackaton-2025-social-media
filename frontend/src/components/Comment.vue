<template>
  <div class="flex gap-3 p-2 text-white rounded-lg">
    <img
      :src="formatAvatarUrl(comment.user?.photo)"
      :alt="comment.user?.username || 'user'"
      class="w-12 h-12 object-cover rounded-lg"
    />
    <div class="flex-1 flex flex-col">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-sm">{{ comment.user?.nom || 'Utilisateur' }}</h3>
        <p class="text-xs text-gray-200">@{{ comment.user?.username || 'inconnu' }}</p>
      </div>
      <p class="text-sm mt-1">{{ comment.description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: Object
})
function formatAvatarUrl(avatar) {
  if (!avatar) return '/avatar-default.jpg'
  if (avatar.startsWith('http')) return avatar
  return `http://localhost:3000${avatar.startsWith('/') ? '' : '/'}${avatar}`
}
</script>
