<template>
  <div v-if="visible" class="bg-sky-800 p-4 rounded-xl space-y-3 mt-3 max-h-60 overflow-y-auto">
    <Comment v-for="comment in comments" :key="comment._id || comment.id" :comment="comment" />
  </div>
</template>

<script setup>
import Comment from './Comment.vue'

const props = defineProps({
  visible: Boolean,
  comments: {
    type: Array,
    default: () => []
  }
})
</script>
