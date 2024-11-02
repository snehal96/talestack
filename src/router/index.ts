import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LandingView from '@/views/LandingView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth'
import OnboardingView from '@/views/OnboardingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('@/views/OnboardingView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search/:term',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tale/user',
      name: 'userTale',
      component: () => import('@/views/UserTalesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tale/saved',
      name: 'savedTale',
      component: () => import('@/views/SavedTalesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tale/:id',
      name: 'taleView',
      props: true,
      component: () => import('@/views/TaleView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tale/:id/story/:storyId',
      name: 'storyView',
      component: () => import('@/views/StoryView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tale/:id/create/:order',
      name: 'story',
      props: true,
      component: () => import('@/views/EditStoryView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/reading',
      name: 'userReading',
      component: () => import('@/views/ActiveReadView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/CategoryView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/category/:categoryId/tales',
      name: 'categoryTales',
      component: () => import('@/views/TaleListView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('@/views/TrendingAuthorView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/author/:id',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user: any = await getCurrentUser()
    if (user) {
      localStorage.setItem('token', user['accessToken'])
      if (to.name !== 'onboarding') {
        useAuthStore().authenticate(true)
      }
      useAuthStore().setFirebaseUser(user)
      next()
    } else {
      alert('You do not have access!')
      next('/')
    }
  } else {
    next()
  }
})

export default router
