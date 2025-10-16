<template>
    <div class="w-full flex flex-col mb-4">
        <label :for="id" class="mb-2 text-sm font-medium text-gray-700 cursor-pointer">
            {{ label }}
        </label>

        <!-- Champ texte / mot de passe -->
        <div v-if="typeField === 'text' || typeField === 'password'" class="relative">
            <input :id="id" :type="computedInputType" :value="modelValue" @input="updateValue($event.target.value)"
                :placeholder="placeholder"
                class="px-3 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-800 w-full text-sm"
                :aria-label="label" autocomplete="off" />

            <!-- bouton afficher/masquer pour password -->
            <button v-if="typeField === 'password'" type="button" @click="toggleShow"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm p-1"
                :aria-pressed="showPassword.toString()"
                :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'">
                <!-- icône œil -->
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" />
                    <circle cx="12" cy="12" r="2.5" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3l18 18M9.88 9.88A3 3 0 0114.12 14.12M9.88 9.88L3 3m18 18L14.12 14.12" />
                </svg>
            </button>
        </div>

        <!-- Zone de texte (description, bio, etc.) -->
        <textarea v-else-if="typeField === 'textarea'" :id="id" :value="modelValue"
            @input="updateValue($event.target.value)" :placeholder="placeholder" rows="4"
            class="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-800 w-full text-sm resize-y"></textarea>

        <!-- Upload image -->
        <div v-else-if="typeField === 'file'" class="w-full">
            <input ref="fileInput" :id="id" type="file" @change="updateFile" accept="image/*" class="hidden" />
            <div class="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700 w-full text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                @click="$refs.fileInput.click()">
                <span>{{ placeholder || 'Sélectionner une image' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </div>

            <!-- Affichage du fichier sélectionné + bouton supprimer -->
            <div v-if="fileName"
                class="flex items-center justify-between mt-2 bg-white border border-gray-200 rounded-md p-2">
                <span class="text-xs text-gray-700 truncate max-w-[70%]">
                    Fichier sélectionné : {{ fileName }}
                </span>
                <button type="button" @click="removeFile"
                    class="text-red-600 hover:text-red-800 text-xs font-medium transition">
                    Supprimer
                </button>
            </div>
        </div>


        <!-- Select multiple -->
        <select v-else-if="typeField === 'select'" :id="id" multiple :value="modelValue" @change="updateSelect"
            class="px-3 py-09 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-800 w-full text-sm"
            size="5">
            <option v-for="item in options" :key="item.id || item.name" :value="item.name">
                {{ item.name }}
            </option>
        </select>

        <!-- Fallback -->
        <p v-else class="text-red-500 text-sm">⚠️ Type de champ inconnu</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    label: { type: String, required: true },
    id: { type: String, default: () => 'field-' + Math.random().toString(36).substr(2, 5) },
    placeholder: { type: String, default: '' },
    modelValue: { type: [String, Array, Object, null], default: '' },
    typeField: { type: String, default: 'text' }, // text | password | file | select | textarea
    apiUrl: { type: String, default: 'http://localhost:3000/hobbies/' }
})

const emit = defineEmits(['update:modelValue'])
const options = ref([])
const fileName = ref('')
const showPassword = ref(false)
const fileInput = ref(null)

// Type dynamique (password visible/masqué)
const computedInputType = computed(() =>
    props.typeField === 'password' && showPassword.value ? 'text' : props.typeField
)

// --- Fonctions de gestion ---
function toggleShow() {
    showPassword.value = !showPassword.value
}

function updateValue(value) {
    emit('update:modelValue', value)
}

function updateFile(e) {
    const file = e.target.files?.[0] || null
    fileName.value = file ? file.name : ''
    emit('update:modelValue', file)
}

function removeFile() {
    fileName.value = ''
    emit('update:modelValue', '')
    if (fileInput.value) fileInput.value.value = ''
}

function updateSelect(e) {
    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value)
    emit('update:modelValue', selected)
}

// --- Récupération des options du select ---
async function fetchOptions() {
    if (props.typeField !== 'select') return
    try {
        const res = await fetch(props.apiUrl)
        if (!res.ok) throw new Error('Erreur lors du chargement des options')
        options.value = await res.json()
    } catch (err) {
        console.error(err)
    }
}

onMounted(fetchOptions)
</script>