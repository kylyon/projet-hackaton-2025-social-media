import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from "vue3-cookies"

import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'

//Import des middelware
import {authMiddleware, isLogged} from '@/middleware/authMiddleware'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Home
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profile,
    meta: {
      requiredAuth : true
    }
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

router.beforeEach( async (to, from, next) => {

  if(to.meta.requiredAuth)
  {
    const { cookies } = useCookies()

    return authMiddleware(to, from, next, cookies);
  }

  /*if((to.name === "register" || to.name === "login"))
  {
    return next({
      name: "profil"
    })
  }*/

  next()
} )

export default router
