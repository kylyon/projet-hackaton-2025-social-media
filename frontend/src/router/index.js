import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from "vue3-cookies"

// Admin
import adminHome from '@/pages/admin/Admin.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import adminSetting from '@/pages/admin/Setting.vue'
import AdminUsersView from '@/pages/admin/UsersView.vue'
import AdminHobbiesView from "@/pages/admin/HobbiesView.vue"

// Default Path
import DefaultLayout from '@/layouts/defaulLayout.vue'
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'


//Import des middelware
import {authMiddleware, loggedMiddleware} from '@/middleware/authMiddleware'


const routes = [
  {
    path: '/test',
    component: { template: '<div>Test OK</div>' }
  }, 
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiredAdmin: true,
      requiredAuth: true
    },
    children: [
      {
        path: '/admin',
        name: "dashboard",
        component: adminHome,
        meta: {
          requiredAdmin: true
        }
      },
      {
        path: 'setting',
        name: "admin-setting",
        component: adminSetting,
        meta: {
          requiredAdmin: true
        }
      },
      {
        path: 'users',
        name: "users",
        component: AdminUsersView,
        meta: {
          requiredAdmin: true
        }
      },
      {
        path: 'hobbies',
        name: "hobbies",
        component: AdminHobbiesView,
        meta: {
          requiredAdmin: true
        }
      }

    ]
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
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
        component: Login,
        meta: {
          requiredNonAuth: true
        }
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          requiredNonAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( async (to, from, next) => {
  const { cookies } = useCookies()

  if(to.meta.requiredAuth)
  {
    return authMiddleware(to, from, next, cookies)
  }

  if(to.meta.requiredNonAuth)
  {
    return loggedMiddleware(to, from, next, cookies)
  }

  next()
} )

export default router