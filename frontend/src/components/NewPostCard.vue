<template>
    <div
        class="container bg-sky-100 border border-gray-300 mx-auto max-w-3xl flex flex-col justify-center p-4 rounded-2xl shadow-lg gap-4">
        <h1 class="text-xl md:text-2xl font-semibold text-sky-800">Nouvelle publication</h1>

        <div class="w-full">
            <InputField v-model="description" placeholder="Quoi de neuf ?" typeField="textarea" />
        </div>

        <div class="w-full flex flex-row justify-between items-center gap-4">
            <!-- Dropdown des hobbies -->
            <div>
                <select class="w-full px-3 py-2 border rounded-md bg-white">
                    <option value="">Sélectionner un hobby</option>
                </select>
            </div>

            <!-- Bouton publier-->
            <div>
                <AppButton label="Publier" icon="UserIcon" variant="text" />
            </div>
        </div>
    </div>
</template>
<script setup>
import InputField from "./InputField.vue"
import AppButton from '@/components/Button.vue'

</script>