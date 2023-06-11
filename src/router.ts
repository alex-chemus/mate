import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  LandingPage, LoginPage, ErrorPage, NewProjectView,
  ProjectView, VacanciesPage, UserPage, ProjectsListPage,
  RedirectView
} from '@/pages'

const routes: Array<RouteRecordRaw> = [
  { path: '/landing', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/error', component: ErrorPage },
  { path: '/project/:id', component: ProjectView },
  { path: '/project/:id/settings', component: ProjectView },
  { path: '/vacancies', component: VacanciesPage },
  { path: '/user/:id', component: UserPage },
  { path: '/projects-list', component: ProjectsListPage },
  { path: '/new-project', component: NewProjectView },
  { path: '/redirect', component: RedirectView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
