<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
      <!-- Bouton fermer -->
      <button
        type="button"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        @click="$emit('close')"
      >
        ✕
      </button>

      <h1 class="text-2xl font-bold text-center text-sky-900 mb-6">
        Mes hobbies
      </h1>

      <!-- Liste des hobbies -->
      <div v-if="loading" class="text-center text-gray-500 py-4">
        Chargement des hobbies...
      </div>

      <div v-else>
        <ul class="space-y-3 mb-4">
          <li
            v-for="(hobbie, index) in hobbies"
            :key="index"
            class="flex justify-between items-center bg-sky-50 px-4 py-2 rounded-md border border-sky-200"
          >
            <span class="text-sky-900">{{ hobbie }}</span>
            <button
              class="text-red-600 hover:text-red-800 text-sm"
              @click="deleteHobbie(hobbie)"
            >
              Supprimer
            </button>
          </li>
        </ul>

        <div v-if="hobbies.length === 0" class="text-gray-600 text-center">
          Aucun hobbie enregistré.
        </div>
      </div>

      <!-- Message d’erreur -->
      <p v-if="error" class="text-red-600 text-sm mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import AppButton from "@/components/Button.vue"

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(["close"])

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

const hobbies = ref([])
const loading = ref(false)
const error = ref("")

// Charger les hobbies du user
onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(`${API_BASE}/users/${props.userId}`, { credentials: "include" })
    if (!res.ok) throw new Error("Impossible de charger les hobbies")
    const data = await res.json()
    hobbies.value = data.hobbies || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

// Supprimer un hobbie
async function deleteHobbie(hobbieToRemove) {
  try {
    const newList = hobbies.value.filter(h => h !== hobbieToRemove)
    const res = await fetch(`${API_BASE}/users/${props.userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ hobbies: newList })
    })

    if (!res.ok) throw new Error("Erreur lors de la suppression")

    hobbies.value = newList
  } catch (err) {
    error.value = err.message
  }
}
</script>