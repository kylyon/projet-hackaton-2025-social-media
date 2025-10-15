<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-sky-100 flex flex-col items-center justify-center border border-gray-500 rounded-lg shadow m-10 max-w-xs md:max-w-sm lg:max-w-md p-6 w-full">
            <form class="text-card-text-color">
                <h1 class="text-xl text-center font-bold mb-4"> Connexion</h1>
            </form>
            <LabelInput label="Email" placeholder="Entrez votre nom" v-model="email" />
            <LabelInput label="Mot de passe" placeholder="Entrez votre email" v-model="email" />
            <AppButton label="Connexion" @click="login" />
            <div className="max-w-sm mx-auto p-6">
                <p>Pas de compte ? <a class="hover:underline" href="#">S'inscrire</a></p>
            </div>
        </div>
    </div>
</template>


<script setup>
import LabelInput from './LabelInput.vue';
import AppButton from './Button.vue';
</script>