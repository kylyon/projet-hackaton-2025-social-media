<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <div class="">
=======
  <div class="min-h-screen bg-gray-100 p-8">
>>>>>>> be6e9e1 (evol (frontend) intégration Kpis User)
=======
  <div class="">
>>>>>>> daed2bc (evol frontend : admin / profile)
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Tableau de bord - Profils Utilisateurs</h1>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Dashboard Content -->
      <template v-else>
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Total Utilisateurs" 
            :value="stats.totalUsers" 
            subtitle="Profils enregistrés"
            icon-name="users"
          />
          <KpiCard 
            title="Total Posts" 
            :value="stats.totalPosts" 
            :subtitle="`${stats.avgPostsPerUser} posts/utilisateur`"
            icon-name="fileText"
          />
          <KpiCard 
            title="Total Hobbies" 
            :value="hobbies.length" 
            subtitle="Hobbies disponibles"
            icon-name="heart"
          />
          <KpiCard 
            title="Comptes Admin" 
            :value="stats.adminUsers" 
            :subtitle="`${stats.adminPercentage}% des utilisateurs`"
            icon-name="shield"
          />
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PieChart :data="stats.roleDistribution" title="Répartition par Rôle" />
          <BarChart :data="stats.hobbiesDistribution" title="Top 5 Hobbies" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart :data="stats.postsDistribution" title="Distribution des Posts" />
          <PieChart :data="stats.hobbiesEngagement" title="Engagement par Hobbies" />
        </div>

        <!-- User Table -->
        <UserTable :users="usersWithStats" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import KpiCard from './KpiCard.vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import UserTable from './UserTable.vue'

// État réactif
const users = ref([])
const hobbies = ref([])
const posts = ref([])
const loading = ref(false)
const error = ref(null)

// Fonction pour récupérer les utilisateurs depuis l'API
const fetchUsers = async () => {
  try {
    const response = await fetch(`https://hackaton-backend-api.vercel.app/users/`)
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs')
    }
    
    const data = await response.json()
    users.value = Array.isArray(data) ? data : (data.data || [])
  } catch (err) {
    console.error('Erreur API users:', err)
    // Données de fallback
    users.value = [
      {
        uuid: '673758792ec353b69a9e428cf5630886f3c6c4ceab054974a91e8d4b720ca23038e',
        email: 'dan3@gmail.com',
        lastname: 'Doe203',
        username: 'dancodeur78',
        avatar: 'photo.jpg',
        hobbiesList: ['Sport', 'Musique'],
        password: '12346',
        role: 'user'
      }
    ]
  }
}

// Fonction pour récupérer les hobbies depuis l'API
const fetchHobbies = async () => {
  try {
    const response = await fetch(`https://hackaton-backend-api.vercel.app/hobbies/`)
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des hobbies')
    }
    
    const data = await response.json()
    hobbies.value = data.hobbies || []
  } catch (err) {
    console.error('Erreur API hobbies:', err)
    // Données de fallback
    hobbies.value = [
      { _id: '1', name: 'Sport' },
      { _id: '2', name: 'Musique' },
      { _id: '3', name: 'Cinéma' },
      { _id: '4', name: 'Nature' },
      { _id: '5', name: 'Travail' }
    ]
  }
}

// Fonction pour récupérer les posts depuis l'API
const fetchPosts = async () => {
  try {
    const response = await fetch(`https://hackaton-backend-api.vercel.app/posts/`)
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des posts')
    }
    
    const data = await response.json()
    posts.value = data.data || []
  } catch (err) {
    console.error('Erreur API posts:', err)
    // Données de fallback
    posts.value = []
  }
}

// Fonction pour charger toutes les données
const fetchAllData = async () => {
  loading.value = true
  error.value = null
  
  try {
    await Promise.all([
      fetchUsers(),
      fetchHobbies(),
      fetchPosts()
    ])
  } catch (err) {
    error.value = 'Erreur lors du chargement des données'
  } finally {
    loading.value = false
  }
}

// Utilisateurs enrichis avec le nombre de posts
const usersWithStats = computed(() => {
  if (!Array.isArray(users.value) || !Array.isArray(posts.value)) {
    return []
  }

  return users.value.map(user => {
    const userPosts = posts.value.filter(post => post.userId === user.uuid)
    return {
      ...user,
      postsCount: userPosts.length
    }
  })
})

// Statistiques calculées
const stats = computed(() => {
  if (!Array.isArray(users.value)) {
    return {
      totalUsers: 0,
      totalPosts: 0,
      avgPostsPerUser: '0.0',
      adminUsers: 0,
      adminPercentage: '0.0',
      roleDistribution: [],
      hobbiesDistribution: [],
      postsDistribution: [],
      hobbiesEngagement: []
    }
  }

  const totalUsers = users.value.length
  
  if (totalUsers === 0) {
    return {
      totalUsers: 0,
      totalPosts: 0,
      avgPostsPerUser: '0.0',
      adminUsers: 0,
      adminPercentage: '0.0',
      roleDistribution: [],
      hobbiesDistribution: [],
      postsDistribution: [],
      hobbiesEngagement: []
    }
  }

  const totalPosts = Array.isArray(posts.value) ? posts.value.length : 0
  const avgPostsPerUser = (totalPosts / totalUsers).toFixed(1)
  
  const adminUsers = users.value.filter(u => u.role === 'admin').length
  const adminPercentage = ((adminUsers / totalUsers) * 100).toFixed(1)

  // Répartition par rôle
  const roleCounts = {}
  users.value.forEach(u => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1
  })

  const roleColors = {
    'admin': '#8b5cf6',
    'user': '#3b82f6',
    'moderator': '#10b981'
  }

  const roleDistribution = Object.entries(roleCounts).map(([role, count]) => ({
    label: role.charAt(0).toUpperCase() + role.slice(1),
    value: count,
    color: roleColors[role] || '#6b7280',
    percentage: ((count / totalUsers) * 100).toFixed(1)
  }))

  // Distribution des hobbies (top 5)
  const hobbiesCounts = {}
  users.value.forEach(u => {
    if (u.hobbiesList && Array.isArray(u.hobbiesList)) {
      u.hobbiesList.forEach(hobby => {
        hobbiesCounts[hobby] = (hobbiesCounts[hobby] || 0) + 1
      })
    }
  })

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  const hobbiesDistribution = Object.entries(hobbiesCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([hobby, count], index) => ({
      label: hobby,
      value: count,
      percentage: ((count / totalUsers) * 100).toFixed(1),
      color: colors[index]
    }))

  // Distribution des posts par utilisateur
  const postsPerUser = usersWithStats.value.map(u => u.postsCount)
  const postsRanges = [
    { label: '0 post', min: 0, max: 0, color: '#ef4444' },
    { label: '1-5 posts', min: 1, max: 5, color: '#f59e0b' },
    { label: '6-10 posts', min: 6, max: 10, color: '#10b981' },
    { label: '11+ posts', min: 11, max: Infinity, color: '#3b82f6' }
  ]

  const postsDistribution = postsRanges.map(range => {
    const count = postsPerUser.filter(p => p >= range.min && p <= range.max).length
    return {
      label: range.label,
      value: count,
      percentage: ((count / totalUsers) * 100).toFixed(1),
      color: range.color
    }
  })

  // Engagement par hobbies (utilisateurs avec hobbies)
  const usersWithHobbies = users.value.filter(u => u.hobbiesList && u.hobbiesList.length > 0).length
  const usersWithoutHobbies = totalUsers - usersWithHobbies

  const hobbiesEngagement = [
    {
      label: 'Avec hobbies',
      value: usersWithHobbies,
      color: '#10b981',
      percentage: ((usersWithHobbies / totalUsers) * 100).toFixed(1)
    },
    {
      label: 'Sans hobbies',
      value: usersWithoutHobbies,
      color: '#ef4444',
      percentage: ((usersWithoutHobbies / totalUsers) * 100).toFixed(1)
    }
  ]

  return {
    totalUsers,
    totalPosts,
    avgPostsPerUser,
    adminUsers,
    adminPercentage,
    roleDistribution,
    hobbiesDistribution,
    postsDistribution,
    hobbiesEngagement
  }
})

// Charger les données au montage du composant
onMounted(() => {
  fetchAllData()
})
</script>