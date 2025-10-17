<template>
  <div class="relative bg-sky-100 border border-gray-300 rounded-xl shadow p-6 max-w-3xl mx-auto">
    <h2 class="text-sky-900 font-semibold text-lg mb-4">🎯 Ajouter des Hobbies</h2>

    <!-- Liste de hobbies -->
    <HobbieSection @hobbie-added="showConfirmation" />

    <!-- Message de confirmation (toast local) -->
    <div
      v-if="confirmationMessage"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-sky-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-all duration-500 animate-fadeInOut"
    >
      {{ confirmationMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HobbieSection from './HobbieSection.vue'

const confirmationMessage = ref('')

function showConfirmation(hobbieName) {
  confirmationMessage.value = `✅ Votre hobby "${hobbieName}" a été ajouté !`
  setTimeout(() => {
    confirmationMessage.value = ''
  }, 2500)
}
</script>

<!-- Animation pure Tailwind -->
<style>
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(10px); }
  10%, 90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
}
.animate-fadeInOut {
  animation: fadeInOut 2.5s ease-in-out forwards;
}
</style>
