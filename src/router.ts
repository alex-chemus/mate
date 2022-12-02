import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  FeaturesView, LandingView, PriceView, MainView,
  LoginView, ProfileView
} from '@/views'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainView },
  { path: '/landing', component: LandingView },
  { path: '/price', component: PriceView },
  { path: '/features', component: FeaturesView },
  { path: '/login', component: LoginView },
  { path: '/profile', component: ProfileView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
