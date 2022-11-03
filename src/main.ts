import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

type Theme = 'dark' | 'light'
const prefers = (theme: Theme) => {
  if (localStorage.getItem('theme'))
    return localStorage.getItem('theme') === theme
  return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
}

const root = document.querySelector(':root') as HTMLElement
if (prefers('light')) {
  store.commit('setTheme', 'light')
  root.dataset.theme = 'light'
} else if (prefers('dark')) {
  store.commit('setTheme', 'dark')
  root.dataset.theme = 'dark'
}

/* также при переключении темы через кнопку
надо не забыть сделать переключение в localStorage и store */

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
