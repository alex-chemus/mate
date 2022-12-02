<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { IState } from './store/types'

const router = useRouter()
const { state, commit } = useStore<IState>()

// изменить data-theme при переключении темы
watch(() => state.theme, () => {
  const app = document.getElementById('app') as HTMLElement
  app.classList.toggle('light')
  app.classList.toggle('dark')
})

onMounted(() => {
  const app = document.getElementById('app') as HTMLElement

  if (state.theme === 'dark') app.classList.add('dark')
  if (state.theme === 'light') app.classList.add('light')
})

// todo: доделать проверку токена позже
/*onMounted(async () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token') as string
    console.log('set token')
    commit('setToken', token)
  } else {
    console.log('push to landing')
    router.push({ path: '/landing' })
  }
})*/
</script>


<template>
  <router-view />
</template>


<style lang="scss">
@import '@/styles/style.scss';

#app {
  min-height: 100vh;
  --text-color: var(--dark-2);

  &.dark {
    --text-color: var(--light);
    background-image: linear-gradient(105.91deg, #282A37 49.48%, #353840 100%);
  }

  &.light {
    --text-color: var(--dark-2);
    background-color: #F5F5F5;
  }
}
</style>
