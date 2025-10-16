import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'

const routes = [
  /*{
    path: '/',
    name: 'login',
    component: Login
  },*/
  {
    path: '/profil',
    name: 'profil',
    component: Profile
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
