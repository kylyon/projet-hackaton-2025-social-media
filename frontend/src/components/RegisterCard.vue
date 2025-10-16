<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-sky-100 flex flex-col items-center justify-center border border-gray-500 rounded-lg shadow m-10 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full">
            <form class="text-card-text-color">
                <h1 class="text-xl text-center font-bold mb-4">Inscription</h1>
                <LabelInput label="Email" placeholder="Entrez un email" v-model="email" />
                <LabelInput label="Nom" placeholder="Entrez un nom" v-model="nom" />
                <LabelInput label="Prénom" placeholder="Entrez un prénom" v-model="prenom" />
                 <!-- Ajouter à la suite un champ de description du profil-->
                <!-- Ajouter à la suite un champ de chargement d'un avatar pour le profil-->
                <LabelInput label="Mot de passe" placeholder="Entrez un mot de passe" v-model="password" type="password" />
                <LabelInput label="Confirmer le mot de passe" placeholder="Confirmez le mot de passe" v-model="confirmPassword" type="password" />
                <AppButton label="S'inscrire" @click="register" class="mt-4" />
            </form>

            <div className="max-w-sm mx-auto p-6">
                <p>Déjà inscrit ? <a class="hover:underline" href="/login">Connectez vous</a></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import LabelInput from './LabelInput.vue'
import AppButton from './Button.vue'

const email = ref('')
const password = ref('')

function login() {
  console.log('Connexion avec', email.value, password.value)
}
</script>