import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import DashboardVue from '../views/DashboardVue.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountVue from '../views/AccountVue.vue'
import RegisterCatView from '../views/RegisterCatView.vue'
import CatProfileView from '../views/CatProfileView.vue'
import PageNotFound from '../views/PageNotFound.vue'
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loadingSession = true
  const user = await userStore.currentUser()

  if (user) {
    next()
  } else {
    next('/login')
  }
  userStore.loadingSession = false
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardVue,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'Sign in',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Sign up',
      component: RegisterView
    },
    {
      path: '/account',
      name: 'Account',
      component: AccountVue,
      beforeEnter: requireAuth
    },
    {
      path: '/create-cat',
      name: 'Create cat',
      component: RegisterCatView,
      beforeEnter: requireAuth
    },
    {
      path: '/cat/:slug',
      name: 'Cat profile',
      component: CatProfileView,
      props: true,
      beforeEnter: requireAuth
    },
    { path: '/:pathMatch(.*)*', name: 'page404', component: PageNotFound }
  ]
})

export default router
