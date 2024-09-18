import useAuthStore from '@/store/AuthStore'
import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'
import HomeView from '@/views/HomeView.vue'
import JobDetailView from '@/views/JobDetailView.vue'
import JobListingView from '@/views/JobListingView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
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
      component: JobDetailView
    },
    {
      path: '/jobs/edit/:id',
      name: 'editJob',
      component: EditJobView,
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
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
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
