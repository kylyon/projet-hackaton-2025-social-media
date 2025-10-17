<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">Liste des profils</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom d'utilisateur</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hobbies</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.uuid" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <img 
                v-if="user.avatar" 
                :src="user.avatar" 
                :alt="user.username"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div v-else class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                {{ getUserInitials(user) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ user.username }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.lastname || '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span v-if="user.hobbiesList && user.hobbiesList.length > 0" class="text-blue-600">
                ✓ {{ user.hobbiesList.length }} hobby(ies)
              </span>
              <span v-else class="text-gray-400">✗ Aucun hobby</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span v-if="user.postsCount > 0" class="text-green-600 font-semibold">
                {{ user.postsCount }} post(s)
              </span>
              <span v-else class="text-gray-400">Aucun post</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="getRoleBadgeClass(user.role)"
              >
                {{ user.role }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true
  }
})

const getUserInitials = (user) => {
  if (user.lastname) {
    return user.lastname.substring(0, 2).toUpperCase()
  }
  if (user.username) {
    return user.username.substring(0, 2).toUpperCase()
  }
  return '??'
}

const getRoleBadgeClass = (role) => {
  const roleClasses = {
    'admin': 'bg-purple-100 text-purple-800',
    'user': 'bg-blue-100 text-blue-800',
    'moderator': 'bg-green-100 text-green-800'
  }
  return roleClasses[role] || 'bg-gray-100 text-gray-800'
}
</script>