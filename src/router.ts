import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  LandingPage, ErrorPage, NewProjectView,
  ProjectView, VacanciesView, UserView, ProjectsListView,
  RedirectView
} from '@/pages'

const routes: Array<RouteRecordRaw> = [
  { path: '/landing', component: LandingPage },
  { path: '/error', component: ErrorPage },
  { path: '/project/:id', component: ProjectView },
  { path: '/project/:id/settings', component: ProjectView },
  { path: '/vacancies', component: VacanciesView },
  { path: '/user/:id', component: UserView },
  { path: '/projects-list', component: ProjectsListView },
  { path: '/new-project', component: NewProjectView },
  { path: '/redirect', component: RedirectView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
