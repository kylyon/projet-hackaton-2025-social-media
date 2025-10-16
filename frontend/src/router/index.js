import { createRouter, createWebHistory } from 'vue-router'

// Import de tes pages
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'

//Import des middelware
import {authMiddleware} from '@/middleware/authMiddleware'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profile,
    meta : {
      middleware: [authMiddleware]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
