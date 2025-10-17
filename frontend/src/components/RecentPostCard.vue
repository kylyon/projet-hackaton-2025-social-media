<template>
    <div class="container bg-sky-100 border border-gray-300 mx-auto max-w-3xl flex flex-col justify-center p-4 rounded-2xl shadow-lg gap-4">
        <h1 class="text-xl md:text-2xl font-semibold text-sky-800">Mes posts récents</h1>
        <div class="posts p-2 space-y-4">
            <PostSection />
        </div>
    </div>
</template>
<script>
import PostSection from './PostSection.vue';

export default {
  name: "RecentPostCard",
  components: {
    PostSection
  }
}
</script>
