<template>
  <!---
      Ce composant vérifie l'état de l'API backend.
      Affiche le message et le statut de l'API.
      
      NB : NE PAS MODIFIER CE FICHIER ou SUPPRIMER. 
      DANS LE CAS CONTRAIRE, LES TESTS AUTOMATISÉS NE PASSERONT PAS.
  -->
  <div class="wrapper max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mb-5">
    <!-- Titre principal -->
    <h1 class="text-3xl font-bold text-green-500 mb-4 border-b-2 border-red-200 pb-2">
      Message API : <span class="text-gray-800">{{ users.message }}</span>
    </h1>

    <!-- Statut -->
    <h2 class="text-xl text-gray-600 mb-6">
      Statut : <span class="font-semibold text-green-600">{{ users.status }}</span>
    </h2>
  </div>

  <section class="w-[60%] mx-auto">
    <h2 class="text-2xl font-bold text-zinc-600 mb-4"> Exemple Get multiple data :  {{ `../../utils/getMultipleData.js` }}</h2>
    <div v-if="Object.keys(items).length" class="space-y-6">
      <div v-for="(data, index) in items" :key="index" class="p-4 border rounded-lg bg-gray-50">
        <h3 class="text-xl font-semibold text-green-600 mb-2">Endpoint {{ index + 1 }}:</h3>
        <pre class="bg-white p-4 rounded shadow overflow-x-auto"><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
      </div>
    </div>
    <div v-else class="text-gray-500">Chargement des données...</div>
  </section>

</template>

<script setup>

import { ref, onMounted } from 'vue'  
import { getData } from '../../utils/getData.js';   
import { getMultipleData } from '../../utils/getMultipleData.js';

const users = ref({}); 
const items = ref({});
const url= import.meta.env.VITE_API_URL

onMounted(async () => {
  const response = await fetch(url)
  users.value = await response.json()
})

// Exemple Get multiple data from more endpoints
const urls = [
  `${url}/comments`,
  `${url}/users`,
  `${url}/roles`,
  `${url}/hobbies`
];

onMounted(async () => {
  const getMultiple= await getMultipleData(urls);
  items.value = getMultiple;
})


</script>