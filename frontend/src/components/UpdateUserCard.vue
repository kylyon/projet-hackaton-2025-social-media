<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div
      class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-md md:max-w-lg lg:max-w-xl p-6 w-full"
    >
      <!-- Bouton de fermeture -->
      <button type="button" class="text-black mb-4 self-end cursor-pointer" @click="closeModal">
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Fermer</span>
      </button>

      <h1 class="text-2xl font-bold text-center text-sky-900 mb-8">
        Modifier mon profil
      </h1>

      <form class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="updateUser">
        <div class="flex flex-col gap-3">
          <div>
            <InputField
              label="Email"
              v-model="email"
              placeholder="Modifier votre email"
              typeField="text"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <InputField
              label="Nom d'utilisateur"
              v-model="username"
              placeholder="Modifier votre username"
              typeField="text"
            />
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <InputField
            label="Description du profil"
            v-model="description"
            placeholder="Quelques mots sur toi"
            typeField="textarea"
          />
        </div>

        <div class="flex flex-col gap-3">
          <div>
            <InputField label="Nom" v-model="nom" placeholder="Modifiez votre nom" typeField="text" />
            <p v-if="errors.nom" class="text-red-600 text-sm mt-1">{{ errors.nom }}</p>
          </div>

          <div>
            <InputField label="Photo de profil" v-model="photo" typeField="file" />
            <p v-if="errors.photo" class="text-red-600 text-sm mt-1">{{ errors.photo }}</p>
          </div>

          <!-- Hobbies -->
          <InputField
            label="Vos hobbies"
            v-model="hobbies"
            placeholder="Listez vos hobbies"
            typeField="text"
          />
        </div>
      </form>

      <div class="flex justify-center mt-8 w-full md:w-1/2">
        <AppButton label="Mettre à jour" @click="updateUser" class="w-full" />
      </div>
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

const emits = defineEmits(["close"])

function closeModal() {
  emits("close")
}

const email = ref("")
const nom = ref("")
const username = ref("")
const description = ref("")
const photo = ref("")
const hobbies = ref("")
const errors = ref({})

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      email.value = newUser.email || ""
      nom.value = newUser.nom || ""
      username.value = newUser.username || ""
      description.value = newUser.description || ""
      photo.value = newUser.photo || ""
      hobbies.value = newUser.hobbies || ""
    }
  },
  { immediate: true }
)


// Validation simple
function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value)
}


</script>
