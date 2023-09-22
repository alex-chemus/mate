import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  LandingPage, ErrorPage, NewProjectView, MainView,
  ProjectView, VacanciesView, UserView, ProjectsListView, GlobalSearchView, PostsFeedView, SandboxView
} from '@/views'

const routes: Array<RouteRecordRaw> = [
  { path: '/landing', component: LandingPage },
  { path: '/error', component: ErrorPage },
  { path: '/project/:id', component: ProjectView },
  { path: '/project/:id/settings', component: ProjectView },
  { path: '/vacancies', component: VacanciesView },
  { path: '/user/:id', component: UserView },
  { path: '/projects-list', component: ProjectsListView },
  { path: '/new-project', component: NewProjectView },
  { path: '/global-search', component: GlobalSearchView },
  { path: '/feed', component: PostsFeedView },

  { path: '/sandbox', component: process.env.VUE_APP_SANDBOX ? SandboxView : MainView },

  { path: '/', component: MainView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
