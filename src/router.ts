import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  LandingPage, LoginPage, ErrorPage, NewProjectPage,
  ProjectPage, VacanciesPage, UserPage, ProjectsListPage
} from '@/pages'

const routes: Array<RouteRecordRaw> = [
  { path: '/landing', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/error', component: ErrorPage },
  { path: '/project/:id', component: ProjectPage },
  { path: '/project/:id/settings', component: ProjectPage },
  { path: '/vacancies', component: VacanciesPage },
  { path: '/user/:id', component: UserPage },
  { path: '/projects-list', component: ProjectsListPage },
  { path: '/new-project', component: NewProjectPage }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
