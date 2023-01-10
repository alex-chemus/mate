import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  FeaturesPage, LandingPage, PricePage, MainPage,
  LoginPage, ProfilePage, AuthErrorPage
} from '@/pages'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainPage },
  { path: '/landing', component: LandingPage },
  { path: '/price', component: PricePage },
  { path: '/features', component: FeaturesPage },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
  { path: '/auth-error', component: AuthErrorPage }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
