<template>
  <!---
      Ce composant vérifie l'état de l'API backend.
      Affiche le message et le statut de l'API.
      
      NB : NE PAS MODIFIER CE FICHIER ou SUPPRIMER. 
      DANS LE CAS CONTRAIRE, LES TESTS AUTOMATISÉS NE PASSERONT PAS.
  -->
  <div class="wrapper max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <!-- Titre principal -->
    <h1 class="text-3xl font-bold text-green-500 mb-4 border-b-2 border-red-200 pb-2">
      Message API : <span class="text-gray-800">{{ users.message }}</span>
    </h1>

    <!-- Statut -->
    <h2 class="text-xl text-gray-600 mb-6">
      Statut : <span class="font-semibold text-green-600">{{ users.status }}</span>
    </h2>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const users = ref({}); 
const url= import.meta.env.VITE_API_URL

onMounted(async () => {
  const response = await fetch(url)
  users.value = await response.json()
})

</script>