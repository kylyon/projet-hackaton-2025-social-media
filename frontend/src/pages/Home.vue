<<<<<<< HEAD
<template>
<<<<<<< HEAD
  <main class="min-h-screen flex justify-center items-center">
    <div class="flex flex-col md:flex-row gap-6 w-full max-w-6xl h-[90vh] mx-2 md:mx-10">
      <!-- Colonne gauche : création d’un nouveau post -->
      <div class="md:w-1/3 w-full">
        <NewPostCard />
        <HobbieCard />
      </div>

      <!-- Colonne droite : liste des posts -->
      <div class="md:w-2/3 w-full">
        <PostCard />
      </div>
    </div>
  </main>
</template>

<script setup>
import HobbieCard from '@/components/HobbieCard.vue';
import NewPostCard from '@/components/NewPostCard.vue'
import PostCard from '@/components/PostCard.vue'
</script>
=======
    <main>
        <UserKpiView/>
    </main>
</template>

<script setup>

import UserKpiView from '@/components/userKPIs/UserKpiView.vue'
</script>
>>>>>>> be6e9e1 (evol (frontend) intégration Kpis User)
=======
>>>>>>> daed2bc (evol frontend : admin / profile)
