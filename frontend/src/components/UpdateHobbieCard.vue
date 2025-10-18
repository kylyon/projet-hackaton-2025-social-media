<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-sky-100 flex flex-col border border-gray-300 rounded-lg shadow-md m-6 max-w-md md:max-w-lg lg:max-w-xl p-6 gap-5 w-full">
      <!-- Bouton fermer -->
      <button type="button" class="text-black mb-4 self-end cursor-pointer" @click="closeModal">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Fermer</span>
      </button>

      <h1 class="text-2xl font-bold text-center text-sky-900 mb-4">
        Modifier mes hobbies
      </h1>

      <!-- Chargement -->
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

      <!-- Liste de tous les hobbies -->
      <div v-else class="flex flex-col gap-5 pl-5 max-h-64 overflow-y-auto">
        <div v-for="hobby in allHobbies" :key="hobby._id"
          class="flex items-center justify-between border-b border-gray-200 pb-1">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" :value="hobby._id" v-model="selectedHobbies"
              class="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
            <span>{{ hobby.name }}</span>
          </label>
        </div>
      </div>
      <AppButton label="Mettre à jour" @click="updateUserHobbies" class="w-full" />
      <p v-if="success" class="text-green-600 text-md mt-6 text-center">
        Hobbies mis à jour avec succès !
      </p>
      <p v-if="error" class="text-red-600 text-md mt-6 text-center">
        {{ error }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import AppButton from '@/components/Button.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const apiBase = "https://hackaton-backend-api.vercel.app"

const allHobbies = ref([]) // Tous les hobbies de la BDD
const selectedHobbies = ref([]) // Hobbies sélectionnés pour ce user
const loading = ref(false)
const error = ref(null)
const success = ref(false)

const emits = defineEmits(["close"])

function closeModal() {
  emits("close")
}

//Charger tous les hobbies + ceux du user

async function loadHobbies() {
  loading.value = true
  error.value = null

  try {
    // tous les hobbies
    const res = await fetch(`${apiBase}/hobbies`)
    if (!res.ok) throw new Error("Erreur lors du chargement des hobbies")
    const data = await res.json()
    allHobbies.value = Array.isArray(data) ? data : data.hobbies ?? []

    // hobbies du user
    selectedHobbies.value = props.user.hobbies ? [...props.user.hobbies] : []
  } catch (e) {
    console.error(e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Récupérer l'UUID du user
function getUserIdFromLocalStorage() {
  try {
    const raw = localStorage.getItem("user")
    if (raw) {
      const obj = JSON.parse(raw)
      if (obj?.uuid) return obj.uuid
    }
    return localStorage.getItem("uuid")
  } catch (e) {
    console.error("Erreur lecture localStorage", e)
    return null
  }
}

// Mettre à jour les hobbies du user

async function updateUserHobbies() {
  error.value = null
  success.value = false
  const userId = getUserIdFromLocalStorage()
  if (!userId) {
    errors.value.general = "Utilisateur introuvable."
    return
  }

  try {
    const res = await fetch(`${apiBase}/users/update/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hobbies: selectedHobbies.value, // tableau des IDs cochés

      }),
    })
    console.log(selectedHobbies.value)
    if (!res.ok) {
      const txt = await res.text()
      throw new Error(txt || "Erreur lors de la mise à jour des hobbies")
    }

    success.value = true
    setTimeout(() => {
      emits("close")
      window.location.reload()
    }, 2000)
  } catch (e) {
    console.error(e)
    error.value = e.message
  } finally {
    loading.value = false
    setTimeout(() => (success.value = false), 3000)
  }
}

onMounted(() => {
  loadHobbies()
})
</script>
