<template>
    <div class="min-h-screen flex items-center justify-center">
        <div
            class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-md md:max-w-lg lg:max-w-xl p-6 w-full">
            <h1 class="text-2xl font-bold text-center text-sky-900 mb-8">
                Crée ton compte
            </h1>

            <form ref="formRef" class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="register"
                enctype="multipart/form-data">
                <div class="flex flex-col gap-3">
                    <div>
                        <InputField label="Email" v-model="email" placeholder="Entrez votre email" typeField="text" />
                        <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
                    </div>

                    <div>
                        <InputField label="Nom d'utilisateur" v-model="username" placeholder="Entrez votre username"
                            typeField="text" />
                        <p v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</p>
                    </div>

                    <InputField label="Description du profil" v-model="description" placeholder="Quelques mots sur toi"
                        typeField="textarea" />

                    <div>
                        <InputField label="Mot de passe" v-model="password" placeholder="Entrez un mot de passe"
                            typeField="password" />
                        <p v-if="errors.password" class="text-red-600 text-sm mt-1">
                            {{ errors.password }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <div>
                        <InputField label="Nom" v-model="nom" placeholder="Entrez votre nom" typeField="text" />
                        <p v-if="errors.nom" class="text-red-600 text-sm mt-1">{{ errors.nom }}</p>
                    </div>

                    <div>
                        <InputField label="Photo de profil" v-model="avatar" typeField="file" />
                        <p v-if="errors.avatar" class="text-red-600 text-sm mt-1">{{ errors.avatar }}</p>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-1">Hobbies</label>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="hobby in allHobbies" :key="hobby._id" type="button"
                                @click="toggleHobby(hobby._id)" :class="[
                                    'px-3 py-1 rounded-full border transition-all duration-200',
                                    selectedHobbies.includes(hobby._id)
                                        ? 'bg-sky-600 text-white border-sky-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-sky-100'
                                ]">
                                {{ hobby.name }}
                            </button>
                        </div>
                        <p v-if="errors.hobbies" class="text-red-600 text-sm mt-1">
                            {{ errors.hobbies }}
                        </p>
                    </div>
                    <div>
                        <InputField label="Confirmer le mot de passe" v-model="verifmotdepasse"
                            placeholder="Confirmez votre mot de passe" typeField="password" />
                        <p v-if="errors.verifmotdepasse" class="text-red-600 text-sm mt-1">
                            {{ errors.verifmotdepasse }}
                        </p>
                    </div>
                </div>
            </form>

            <div class="flex justify-center mt-8 w-full md:w-1/2">
                <AppButton label="S'inscrire" @click="register" class="w-full" />
            </div>

            <p class="text-center text-sm mt-6">
                Déjà inscrit ?
                <a href="/login" class="text-sky-700 font-medium hover:underline">
                    Connecte-toi ici
                </a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import InputField from "./InputField.vue"
import AppButton from "./Button.vue"
import { registerAction } from "@/actions/auth/authAction"
import { useRouter } from 'vue-router'
import { hashPassword } from "../../utils/getCrypto"

const router = useRouter()

const formRef = ref(null)
const email = ref("")
const nom = ref("")
const username = ref("")
const description = ref("")
const avatar = ref("")
const password = ref("")
const verifmotdepasse = ref("")
const errors = ref({})

const allHobbies = ref([]) 
const selectedHobbies = ref([]) 

function toggleHobby(id) {
  if (selectedHobbies.value.includes(id)) {
    selectedHobbies.value = selectedHobbies.value.filter(h => h !== id)
  } else {
    selectedHobbies.value.push(id)
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Charger tous les hobbies depuis l'API distante
async function loadHobbies() {
  try {
    const res = await fetch("https://hackaton-backend-api.vercel.app/hobbies/")
    const data = await res.json()
    allHobbies.value = data.hobbies || []
  } catch (e) {
    console.error("Erreur lors du chargement des hobbies :", e)
  }
}

onMounted(loadHobbies)

// Fonction d'inscription
async function register() {
  errors.value = {} // reset des erreurs

  // Vérification des champs obligatoires
  if (!email.value) errors.value.email = "L'email est obligatoire"
  else if (!validateEmail(email.value)) errors.value.email = "L'email n’est pas valide"

  if (!username.value) errors.value.username = "Le nom d’utilisateur est obligatoire"
  if (!nom.value) errors.value.nom = "Le nom est obligatoire"
  if (!avatar.value) errors.value.avatar = "La photo de profil est obligatoire"
  if (selectedHobbies.value.length === 0)
    errors.value.hobbies = "Veuillez sélectionner au moins un hobby"
  if (!password.value) errors.value.password = "Le mot de passe est obligatoire"
  if (!verifmotdepasse.value)
    errors.value.verifmotdepasse = "Veuillez confirmer votre mot de passe"

  // Vérification des mots de passe
  if (password.value && verifmotdepasse.value && password.value !== verifmotdepasse.value) {
    errors.value.verifmotdepasse = "Les mots de passe ne correspondent pas"
  }

  // Si des erreurs existent, on bloque la soumission
  if (Object.keys(errors.value).length > 0) {
    console.warn("Formulaire invalide", errors.value)
    return
  }

  // Données à envoyer
  console.log("Inscription :", {
    email: email.value,
    nom: nom.value,
    username: username.value,
    description: description.value,
    avatar: avatar.value,
    hobbies: selectedHobbies.value,
    password: password.value,
  })

  const formData = new FormData()
  formData.append("email", email.value)
  formData.append("firstname", nom.value)
  formData.append("username", username.value)
  formData.append("avatar", avatar.value)
  formData.append("description", description.value)
  formData.append("password", password.value)

  selectedHobbies.value.forEach((hobbyId) => {
    formData.append("hobbies", hobbyId)
  })

  const isRegistered = await registerAction(formData)
  const json = await isRegistered.json()

  if (isRegistered.ok) {
    router.push("/login")
    return
  }

  if (json.error?.code === "ALREADY_USED_FIELD") {
    json.error.fields.map((e) => {
      errors.value[e.key] = e.message
    })
  }
}
</script>

