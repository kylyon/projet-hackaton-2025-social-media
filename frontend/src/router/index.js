import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from "vue3-cookies"

// Admin
import adminHome from '@/pages/admin/Admin.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import adminSetting from '@/pages/admin/Setting.vue'

// Default Path
import DefaultLayout from '@/layouts/defaulLayout.vue'
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'

//Import des middelware
import {authMiddleware, isLogged} from '@/middleware/authMiddleware'

const routes = [
  {
    path: '/test',
    component: { template: '<div>Test OK</div>' }
  }, 
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: '',
        name: "dashboard",
        component: adminHome,
        meta: {
          requiredAuth: false
        }
      },
      {
        path: 'setting',
        name: "admin-setting",
        component: adminSetting,
        meta: {
          requiredAuth: false
        }
      }
    ]
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Profile
      },
      {
        path: 'profil',
        name: 'profile',
        component: Profile,
        meta: {
          requiredAuth: true
        }
      },
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      }
    ]
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
    return authMiddleware(to, from, next, cookies)
  } else {
    next()
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