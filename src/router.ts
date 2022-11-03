import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { FeaturesView, MainView, PriceView } from '@/views'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainView },
  { path: '/price', component: PriceView },
  { path: '/features', component: FeaturesView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
