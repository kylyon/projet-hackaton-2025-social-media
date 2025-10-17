<template>
    <div class="container mx-auto max-w-3xl flex flex-col justify-center p-4 rounded-2xl border border-gray-200 shadow-lg gap-4">
        <h1 class="text-xl md:text-2xl font-semibold text-sky-800">Nouvelle publication</h1>

        <div class="w-full">
            <InputField v-model="description" placeholder="Quoi de neuf ?" typeField="textarea" />
        </div>

        <div class="w-full flex flex-row justify-between items-center gap-4">
            <!-- Dropdown des hobbies -->
            <div>
                <select
                    class="w-full px-3 py-2 border rounded-md bg-white">
                    <option value="">Sélectionner un hobby</option>
                </select>
            </div>

            <!-- Bouton publier-->
            <div>
                <button type="button"
                    class="w-full md:w-40 px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed">
                    Publier
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import InputField from "./InputField.vue"

</script>