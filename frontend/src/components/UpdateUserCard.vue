<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-md md:max-w-lg lg:max-w-xl p-6 w-full">
      <!-- Bouton de fermeture -->
      <button type="button" class="text-black mb-4 self-end cursor-pointer" @click="closeModal">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Fermer</span>
      </button>

      <h1 class="text-2xl font-bold text-center text-sky-900 mb-8">
        Modifier mon profil
      </h1>

      <form class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="updateUser">
        <div class="flex flex-col gap-3">
          <div>
            <InputField label="Modifier votre email" v-model="email" placeholder="Modifier votre email"
              typeField="text" />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <InputField label="Modifier votre username" v-model="username" placeholder="Modifier votre username"
              typeField="text" />
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <InputField label="Modifiez la description de votre profil" v-model="description" placeholder="Quelques mots sur toi"
            typeField="textarea" /> 
        </div>

        <div class="flex flex-col gap-3">
          <div>
            <InputField label="Modifiez votre nom" v-model="firstname" placeholder="Modifiez votre nom"
              typeField="text" />
            <p v-if="errors.nom" class="text-red-600 text-sm mt-1">{{ errors.nom }}</p>
          </div>

          <div>
            <InputField label="Modifiez votre avatar" v-model="avatar" typeField="file" />
            <p v-if="errors.photo" class="text-red-600 text-sm mt-1">{{ errors.photo }}</p>
          </div>
        </div>
      </form>

      <div class="flex justify-center mt-8 w-full md:w-1/2">
        <AppButton label="Mettre à jour" @click="updateUser" class="w-full" />
      </div>
      <p v-if="success" class="text-green-600 text-md mt-6 text-center">
        Profil mis à jour !
      </p>

      <p v-if="errors.general" class="text-red-600 text-md mt-6 text-center">
        {{ errors.general }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import InputField from "./InputField.vue"
import AppButton from "@/components/Button.vue"

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

console.log(props.user)

const emits = defineEmits(["close"])

function closeModal() {
  emits("close")
}

// Champs du formulaire
const email = ref("")
const firstname = ref("")
const username = ref("")
const avatar = ref("")
const description = ref("")
const errors = ref({})
const loading = ref(false)
const success = ref(false)

// Initialisation des champs quand la prop user change
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      email.value = newUser.email || ""
      firstname.value = newUser.firstname || ""
      username.value = newUser.username || ""
      avatar.value = newUser.avatar || ""
      description.value = newUser.description || ""
    }
  },
  { immediate: true }
)

// Validation simple
function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value)
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

// Fonction pour mettre à jour le user
async function updateUser() {
  errors.value = {}
  success.value = false

  // validations simples
  if (!email.value || !validateEmail(email.value)) {
    errors.value.email = "Email invalide."
    return
  }

  const userId = getUserIdFromLocalStorage()
  if (!userId) {
    errors.value.general = "Utilisateur introuvable."
    return
  }

  // Préparer le payload
  const payload = {
    email: email.value,
    username: username.value,
    firstname: firstname.value,
    avatar: avatar.value, // si c'est un input file, il faudra gérer FormData
    description: description.value,
  }

  loading.value = true
  try {
    const res = await fetch(`https://hackaton-backend-api.vercel.app/users/update/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const txt = await res.text()
      throw new Error(txt || "Erreur lors de la mise à jour du profil")
    }

    const data = await res.json()
    success.value = true
    // on ferme la modale après 2 secondes
    setTimeout(() => {
      emits("close")
      window.location.reload()
    }, 2000)

  } catch (err) {
    console.error(err)
    errors.value.general = err.message || "Erreur"
  } finally {
    loading.value = false
    setTimeout(() => (success.value = false), 3000)
  }
}
</script>
