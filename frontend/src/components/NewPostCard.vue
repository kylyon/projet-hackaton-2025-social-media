<template>
  <div
    class="container bg-sky-100 border border-gray-300 mx-auto max-w-3xl flex flex-col justify-center p-4 rounded-2xl shadow-lg gap-4">
    <h1 class="text-xl md:text-2xl font-semibold text-sky-800">Nouvelle publication</h1>

    <div class="w-full">
      <InputField v-model="description" placeholder="Quoi de neuf ?" typeField="textarea" />
    </div>

    <div class="w-full flex flex-row justify-between items-center gap-4">
      <!-- Dropdown des hobbies -->
      <div class="w-2/3">
        <select v-model="selectedHobby" class="w-full px-3 py-2 border rounded-md bg-white">
          <option disabled value="">{{ loading ? 'Chargement...' : 'Choisir un hobby' }}</option>
          <option v-for="hobby in userHobbies" :key="hobby._id" :value="hobby._id">
            {{ hobby.name }}
          </option>
        </select>
      </div>

      <!-- Bouton publier -->
      <div>
        <AppButton
          @click="submitPost"
          :disabled="loading || !description"
          label="Publier"
          icon="UserIcon"
          variant="text"
        />
      </div>
    </div>

    <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    <p v-if="success" class="text-green-600 text-sm mt-2">Publication envoyée.</p>
  </div>
</template>

<script setup>
import InputField from "./InputField.vue"
import AppButton from '@/components/Button.vue'
import { ref, onMounted } from "vue"

const description = ref("")
const selectedHobby = ref("")
const loading = ref(false)
const error = ref(null)
const success = ref(false)

const allHobbies = ref([])     // tous les hobbies
const userHobbies = ref([])    // hobbies filtrés pour le user
const apiBase = 'https://hackaton-backend-api.vercel.app'

// recupération de l'UUID du user connecté sur localStorage
function getUserIdFromLocalStorage() {
  try {
    const raw = localStorage.getItem('user')
    if (raw) {
      const obj = JSON.parse(raw)
      if (obj?.uuid) return obj.uuid
    }
    return localStorage.getItem('uuid')
  } catch (e) {
    console.error('Erreur lecture localStorage', e)
    return null
  }
}

// charge tous les hobbies depuis l'API
async function loadAllHobbies() {
  try {
    const res = await fetch(`${apiBase}/hobbies/`)
    const data = await res.json()
    allHobbies.value = Array.isArray(data) ? data : data.hobbies ?? []
  } catch (e) {
    console.error("Erreur chargement hobbies:", e)
    allHobbies.value = []
  }
}

// on charge le user connecté et on mappe ses hobbies (id et noms)
async function loadUserHobbies() {
  loading.value = true
  error.value = null
  try {
    const userId = getUserIdFromLocalStorage()
    if (!userId) throw new Error("UUID utilisateur introuvable")

    // Récupérer l'user
    const res = await fetch(`${apiBase}/users/${encodeURIComponent(userId)}`)
    const data = await res.json()
    const user = data?.data ? data.data : data

    // On récupère ses hobbies (ids)
    const hobbyIds = Array.isArray(user?.hobbies) ? user.hobbies : []

    // Mapper chaque id vers son nom à partir de allHobbies
    userHobbies.value = hobbyIds.map(id => {
      const found = allHobbies.value.find(h => h._id === id || h.id === id)
      return found ? { _id: found._id, name: found.name } : { _id: id, name: id }
    })

    if (userHobbies.value.length > 0 && !selectedHobby.value) {
      selectedHobby.value = userHobbies.value[0]._id
    }

  } catch (e) {
    console.error(e)
    error.value = e.message || 'Erreur'
  } finally {
    loading.value = false
  }
}


onMounted(async () => {
  await loadAllHobbies()
  await loadUserHobbies()
})

// envoi post 
const emit = defineEmits(['posted'])

async function submitPost() {
  error.value = null
  success.value = false

  if (!description.value.trim()) {
    error.value = "La description ne peut pas être vide."
    return
  }

  const userId = getUserIdFromLocalStorage()
  if (!userId) {
    error.value = "Utilisateur introuvable."
    return
  }

  const payload = {
    description: description.value,
    user_id: userId,
    comment_id: "0",
    hobby_id: selectedHobby.value
  }

  loading.value = true
  try {
    const res = await fetch(`${apiBase}/posts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error(await res.text())

    const data = await res.json()
    description.value = ""
    success.value = true
    emit('posted', data)
    setTimeout(() => {
    window.location.reload()
  }, 2000)
  } catch (err) {
    console.error(err)
    error.value = err.message || "Erreur"
  } finally {
    loading.value = false
    setTimeout(() => (success.value = false), 3000)
  }
}
</script>
