<template>
  <div class="w-full flex flex-col mb-4">
    <label :for="id" class="mb-2 text-sm font-medium text-gray-700 cursor-pointer">
      {{ label }}
    </label>

    <!-- Champ texte / mot de passe -->
    <div v-if="typeField === 'text'" class="relative">
      <input
        :id="id"
        :type="computedInputType"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        :placeholder="placeholder"
        class="px-3 py-0.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full text-sm"
        :aria-label="label"
        autocomplete="off"
      />

      <!-- bouton afficher/masquer pour password -->
      <button
        v-if="inputType === 'password'"
        type="button"
        @click="toggleShow"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm p-1"
        :aria-pressed="showPassword.toString()"
        :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
      >
        <!-- simple icône œil (svg) -->
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0114.12 14.12M9.88 9.88L3 3m18 18L14.12 14.12" />
        </svg>
      </button>
    </div>

    <!-- Upload image -->
    <div v-else-if="typeField === 'file'" class="w-full">
      <input
        ref="fileInput"
        :id="id"
        type="file"
        @change="updateFile"
        accept="image/*"
        class="hidden"
      />
      <div
        class="border border-gray-300 rounded-md px-2 py-0.5 bg-white text-gray-700 w-full text-sm cursor-pointer hover:bg-gray-50"
        @click="$refs.fileInput.click()"
      >
        {{ placeholder || 'Cliquez pour sélectionner une image' }}
      </div>
      <p v-if="fileName" class="text-xs text-gray-500 mt-1">Fichier sélectionné : {{ fileName }}</p>
    </div>

    <!-- Select multiple -->
    <select
      v-else-if="typeField === 'select'"
      :id="id"
      multiple
      :value="modelValue"
      @change="updateSelect"
      class="px-3 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full text-sm"
      size="5"
    >
      <option
        v-for="item in options"
        :key="item.id || item.name"
        :value="item.name"
      >
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

  // modelValue doit accepter string (text/password), Array (select), File (file) ou null
  modelValue: { type: [String, Array, Object, null], default: '' },

  // typeField = 'text' | 'file' | 'select'
  typeField: { type: String, default: 'text' },

  // inputType utile pour préciser 'text' | 'email' | 'password' | 'tel' etc.
  inputType: { type: String, default: 'text' },

  apiUrl: { type: String, default: 'http://localhost:3000/hobbies/' }
})

const emit = defineEmits(['update:modelValue'])

const options = ref([])
const fileName = ref('')

// pour toggler affichage mdp
const showPassword = ref(false)
const computedInputType = computed(() => {
  if (props.inputType === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.inputType
})

function toggleShow() {
  showPassword.value = !showPassword.value
}

// Gestion du texte
function updateValue(value) {
  emit('update:modelValue', value)
}

// Gestion du fichier image
function updateFile(e) {
  const file = e.target.files ? e.target.files[0] || null : null
  fileName.value = file ? file.name : ''
  emit('update:modelValue', file)
}

// Gestion du select multiple
function updateSelect(e) {
  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value)
  emit('update:modelValue', selected)
}

// Charger les données pour le select
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
