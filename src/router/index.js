import useAuthStore from '@/store/AuthStore'
import AddJobView from '@/views/AddJobView.vue'
import CompanyView from '@/views/CompanyView.vue'
import EditJobView from '@/views/EditJobView.vue'
import HomeView from '@/views/HomeView.vue'
import JobDetailView from '@/views/JobDetailView.vue'
import JobListingView from '@/views/JobListingView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignUpView from '@/views/SignUpView.vue'
import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobListingView
    },
    {
      path: '/jobs/:id',
      name: 'jobDetails',
      component: JobDetailView,
      beforeEnter: async (to, from, next) => {
        try {
          const data = await axios.get(`http://localhost:5000/jobs/${to.params.id}`)

          if (data.data === null) return next({ name: 'notFound' })

          return next()

        } catch (error) {
          console.log(error)
          if (error.status === 404) return next({ name: 'notFound' })

          return next({ name: 'home' })
        }
      }
    },
    {
      path: '/jobs/edit/:id',
      name: 'editJob',
      component: EditJobView,
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()

        try {
          const data = await axios.get(`http://localhost:5000/jobs/${to.params.id}`)

          if (data.data === null) return next({ name: 'notFound' })

          if (authStore.data.id != data.data.companyId) return next({ name: 'home' })

          return next()

        } catch (error) {
          console.log(error)
          if (error.status === 404) return next({ name: 'notFound' })

          return next({ name: 'home' })
        }
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs/add',
      name: 'addJob',
      component: AddJobView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/companies/:id',
      name: 'company',
      component: CompanyView,
      beforeEnter: async (to, from, next) => {
        try {
          const data = await axios.get(`http://localhost:5000/companies/${to.params.id}`)

          if (data.data === null) return next({ name: 'notFound' })

          return next()

        } catch (error) {
          console.log(error)
          if (error.status === 404) return next({ name: 'notFound' })

          return next({ name: 'home' })
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/404-not-found',
      name: 'notFound',
      component: NotFoundView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'signup') && authStore.isAuthenticated) {
    return next({ name: 'home' })
  } else {
    return next()
  }
})

export default router
