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
import Home from '@/pages/Home.vue'


<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 27eeedd (evol frontend : admin / profile)

=======
>>>>>>> daed2bc (evol frontend : admin / profile)
// Import des middleware
import { authMiddleware } from '@/middleware/authMiddleware'
=======
//Import des middelware
import {authMiddleware, isLogged} from '@/middleware/authMiddleware'
<<<<<<< HEAD
>>>>>>> bbf7e7d (Register errors and logic done + User model updated)
=======
//Import des middelware
import {authMiddleware, isLogged} from '@/middleware/authMiddleware'
>>>>>>> 45eee38 (Auth update backend + Route secure by middleware)
=======
=======
// Import des middleware
import { authMiddleware } from '@/middleware/authMiddleware'
>>>>>>> fa99354 (evol frontend : admin / profile)
>>>>>>> 27eeedd (evol frontend : admin / profile)

const routes = [
<<<<<<< HEAD
=======
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
>>>>>>> be6e9e1 (evol (frontend) intégration Kpis User)
  {
<<<<<<< HEAD
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
=======
>>>>>>> daed2bc (evol frontend : admin / profile)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          requiredAuth: true
=======
          requiredAuth: false
>>>>>>> daed2bc (evol frontend : admin / profile)
=======
          requiredAuth: true
>>>>>>> 45eee38 (Auth update backend + Route secure by middleware)
=======
=======
>>>>>>> aa6a35d (Auth update backend + Route secure by middleware)
          requiredAuth: true
=======
          requiredAuth: false
>>>>>>> fa99354 (evol frontend : admin / profile)
<<<<<<< HEAD
>>>>>>> 27eeedd (evol frontend : admin / profile)
=======
=======
          requiredAuth: true
>>>>>>> d7ef038 (Auth update backend + Route secure by middleware)
>>>>>>> aa6a35d (Auth update backend + Route secure by middleware)
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

<<<<<<< HEAD
router.beforeEach( async (to, from, next) => {

  if(to.meta.requiredAuth)
  {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> bbf7e7d (Register errors and logic done + User model updated)
=======
>>>>>>> 45eee38 (Auth update backend + Route secure by middleware)
=======
=======
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
>>>>>>> fa99354 (evol frontend : admin / profile)
>>>>>>> 27eeedd (evol frontend : admin / profile)
    const { cookies } = useCookies()
    return authMiddleware(to, from, next, cookies)
  } else {
    next()
  }
<<<<<<< HEAD

  /*if((to.name === "register" || to.name === "login"))
  {
    return next({
      name: "profil"
    })
  }*/

  next()
} )
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> bbf7e7d (Register errors and logic done + User model updated)
=======
>>>>>>> 45eee38 (Auth update backend + Route secure by middleware)
=======
=======
})
>>>>>>> fa99354 (evol frontend : admin / profile)
>>>>>>> 27eeedd (evol frontend : admin / profile)

export default router