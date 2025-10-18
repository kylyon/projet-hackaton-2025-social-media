<template>
    <div class="min-h-screen flex flex-col justify-center p-4">
        <div
            class="elements bg-sky-100 border border-gray-300 flex flex-col items-center px-6 py-8 md:px-10 md:py-12 rounded-3xl gap-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto shadow-lg">
            <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg border border-gray-300 overflow-hidden">
                <img :src="formatAvatarUrl(user?.avatar)" alt="avatar" class="w-full h-full object-cover" />
            </div>
            <div class="user-infos text-center flex flex-col gap-2">
                <div class="name">
                    <p class="font-bold text-base sm:text-lg md:text-xl">{{ user?.firstname || 'lastname' }}</p>
                </div>
                <div class="username">
                    <p class="text-xs sm:text-sm">@{{ user?.username || 'username' }}</p>
                </div>
                <!-- Si admin ou modérateur on affiche le rôle-->
                <div class="role" v-if="user && (user.role === 'admin' || user.role === 'moderateur')">
                    <p class="text-xs">{{ user.role || 'user' }}</p>
                </div>
                <div class="hobbies" v-if="user">
                    <HobbiesList :apiUrl="`https://hackaton-backend-api.vercel.app/users/${userId}/hobbies`" />
                </div>
                <div class="description">
                    <p class="text-xs sm:text-sm md:text-sm">{{ user?.description || '' }}</p>
                </div>
            </div>
            <div class="user-components w-full space-y-4">
                <AppButton label="Modifier mon profil" icon="UserIcon" variant="text" @click="showModalUser = true" />
                <AppButton label="Modifier mes hobbies" icon="UserIcon" variant="text"
                    @click="showModalHobbies = true" />
            </div>
        </div>
        <UpdateUserCard v-if="showModalUser" :user="user" @close="showModalUser = false" />
        <UpdateHobbieCard v-if="showModalHobbies" :user="user" @close="showModalHobbies = false" />

    </div>
</template>

<script setup>
import AppButton from '@/components/Button.vue'
import UpdateUserCard from '@/components/UpdateUserCard.vue'
import UpdateHobbieCard from '@/components/UpdateHobbieCard.vue'
import HobbiesList from './HobbiesList.vue'
import { ref, onMounted, computed } from 'vue'

const API_ROUTE = "https://hackaton-backend-api.vercel.app"
const showModalUser = ref(false);
const showModalHobbies = ref(false)
const user = ref(null)
const loading = ref(false)
const error = ref(null)

// map id -> name des hobbies
const hobbiesMap = ref({})

function getUserIdFromLocalStorage() {
    try {
        const keys = ['user']
        for (const k of keys) {
            const raw = localStorage.getItem(k)
            if (!raw) continue
            try {
                const obj = JSON.parse(raw)
                if (obj && (obj.uuid)) return obj.uuid
            } catch {
                if (raw && raw.length > 0) return raw
            }
        }
        const direct = localStorage.getItem('uuid')
        if (direct) return direct
    } catch (e) {
        console.error('Erreur lecture localStorage', e)
    }
    return null
}



async function loadHobbiesMap() {
    try {
        const res = await fetch('https://hackaton-backend-api.vercel.app/hobbies/')
        if (!res.ok) throw new Error('Impossible de charger les hobbies')
        const data = await res.json()
        const list = Array.isArray(data) ? data : (data.hobbies ?? [])
        const map = {}
        for (const h of list) {
            const id = h._id ?? h.id ?? null
            const name = h.name ?? h.title ?? null
            if (id && name) map[id] = name
        }
        hobbiesMap.value = map
    } catch (e) {
        console.error('Erreur loadHobbiesMap', e)
        hobbiesMap.value = {}
    }
}

async function fetchUser() {
    error.value = null
    loading.value = true
    const userId = getUserIdFromLocalStorage()
    if (!userId) {
        error.value = "ID utilisateur introuvable dans le localStorage."
        loading.value = false
        return
    }
    try {
        const res = await fetch(`https://hackaton-backend-api.vercel.app/users/${encodeURIComponent(userId)}`)
        if (!res.ok) throw new Error('Erreur lors du chargement du user')
        const data = await res.json()
        user.value = data?.data ? data.data : data
        console.log('User chargé:', user.value)

       user.value.avatar = formatAvatarUrl(user.value.avatar)
    } catch (e) {
        console.error(e)
        error.value = e.message || 'Erreur'
        user.value = null
    } finally {
        loading.value = false
    }
}

function formatAvatarUrl(avatarUrl) {
console.log('formatAvatarUrl', avatarUrl)
  if (!avatarUrl) return '/avatar-default.jpg'
  if (avatarUrl.startsWith('http')) return avatarUrl
  return `${API_ROUTE}${avatarUrl}`
}


onMounted(() => {
    loadHobbiesMap()
    fetchUser()

})
</script>