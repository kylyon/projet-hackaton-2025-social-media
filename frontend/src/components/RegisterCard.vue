<template>
    <div class="min-h-screen flex items-center justify-center">
        <div
            class="bg-sky-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md m-6 max-w-md md:max-w-lg lg:max-w-xl p-6 w-full">
            <h1 class="text-2xl font-bold text-center text-sky-900 mb-8">
                Crée ton compte
            </h1>

            <form class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="register">
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
                        <InputField label="Mot de passe" v-model="motdepasse" placeholder="Entrez un mot de passe"
                            typeField="password" />
                        <p v-if="errors.motdepasse" class="text-red-600 text-sm mt-1">
                            {{ errors.motdepasse }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <div>
                        <InputField label="Nom" v-model="nom" placeholder="Entrez votre nom" typeField="text" />
                        <p v-if="errors.nom" class="text-red-600 text-sm mt-1">{{ errors.nom }}</p>
                    </div>

                    <div>
                        <InputField label="Photo de profil" v-model="photo" typeField="file" />
                        <p v-if="errors.photo" class="text-red-600 text-sm mt-1">{{ errors.photo }}</p>
                    </div>

                    <div>
                        <InputField label="Hobbies" v-model="hobbies" typeField="select"
                            apiUrl="http://localhost:3000/hobbies/" />
                        <p v-if="errors.hobbies" class="text-red-600 text-sm mt-1">{{ errors.hobbies }}</p>
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
import { ref } from "vue"
import InputField from "./InputField.vue"
import AppButton from "./Button.vue"

const email = ref("")
const nom = ref("")
const username = ref("")
const description = ref("")
const photo = ref("")
const hobbies = ref("")
const motdepasse = ref("")
const verifmotdepasse = ref("")
const errors = ref({})

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

async function register() {
    errors.value = {} // reset des erreurs

    // Vérification des champs obligatoires
    if (!email.value) errors.value.email = "L'email est obligatoire"
    else if (!validateEmail(email.value)) errors.value.email = "L'email n’est pas valide"

    if (!username.value) errors.value.username = "Le nom d’utilisateur est obligatoire"
    if (!nom.value) errors.value.nom = "Le nom est obligatoire"
    if (!photo.value) errors.value.photo = "La photo de profil est obligatoire"
    if (!hobbies.value) errors.value.hobbies = "Veuillez sélectionner un hobby"
    if (!motdepasse.value) errors.value.motdepasse = "Le mot de passe est obligatoire"
    if (!verifmotdepasse.value)
        errors.value.verifmotdepasse = "Veuillez confirmer votre mot de passe"

    // Vérification des mots de passe
    if (motdepasse.value && verifmotdepasse.value && motdepasse.value !== verifmotdepasse.value) {
        errors.value.verifmotdepasse = "Les mots de passe ne correspondent pas"
    }

    // Si des erreurs existent, on bloque la soumission
    if (Object.keys(errors.value).length > 0) {
        console.warn("Formulaire invalide", errors.value)
        return
    }

    // Sinon on peut envoyer
    console.log("Inscription :", {
        email: email.value,
        nom: nom.value,
        username: username.value,
        description: description.value,
        photo: photo.value,
        hobbies: hobbies.value,
        motdepasse: motdepasse.value,
    })

    // Appel API ici
}
</script>
