<template>
  <main class="min-h-screen flex justify-center">
    <div
      class="bg-sky-100 border border-gray-300 rounded-lg shadow p-6 max-w-2xl w-full h-[90vh] overflow-hidden space-y-6">
      <div
        class="bg-sky-100 border border-gray-300 rounded-lg shadow p-6 max-w-2xl w-full h-[90vh] overflow-hidden space-y-6">
        <User :userId="userId" />
        <div class="overflow-y-auto h-full pr-2">
          <PostSection />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import User from '@/components/User.vue'
import PostSection from '@/components/PostSection.vue'

const userId = 1
</script>
