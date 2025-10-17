<template>
  <div class="flex gap-3 p-2  text-white rounded-lg">
    <img
      :src="comment.user.photo"
      :alt="comment.user.username"
        class="w-12 h-12 object-cover rounded-lg "
    />
    <div class="flex-1 flex flex-col">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-sm">{{ comment.user.nom }}</h3>
        <p class="text-xs text-gray-200">@{{ comment.user.username }}</p>
      </div>
      <p class="text-sm mt-1">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: Object
})
</script>
