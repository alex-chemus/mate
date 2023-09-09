<script lang="ts" setup>
import { useAuthState, useDispatch, useCommit, useFetchState, useTheme, useApiState } from '@/shared/utils'
import { authActions, themeActions, fetchActions, userActions } from '@/store/constants'
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Alert, Settings, Header, MobileNavbar } from '@/features'
import { FullAccount } from './shared/types'

const router = useRouter()

const commit = useCommit()
const dispatch = useDispatch()

const apiState = useApiState()
const fetchState = useFetchState()
const authState = useAuthState()

watch(
  () => fetchState.value.errorCode,
  () => {
    if (fetchState.value.errorCode) router.push('/error')
  }
)

const { theme } = useTheme()
const changeTheme = () => {
  const root = document.querySelector(':root') as HTMLElement
  const app = document.getElementById('app') as HTMLElement

  if (theme.value === 'light') {
    root.dataset.theme = 'light'
    app.className = 'light'
  } else {
    root.dataset.theme = 'dark'
    app.className = 'dark'
  }
}
watch(theme, changeTheme)
onMounted(() => {
  dispatch(themeActions.GET_DEFAULT_THEME)
  changeTheme()
})

const wasRedirected = computed(() => {
  return window.location.pathname === 'redirect'
})
const getTokenFromUrl = computed(() => {
  const params = window.location.search.split('?')[1].split('&')

  const tokenParam = params.find(param => param.startsWith('token='))
  return tokenParam
    ? decodeURIComponent(tokenParam.split('=')[1])
    : null
})
const initAuth = () => {
  if (wasRedirected.value) {
    if (getTokenFromUrl.value) {
      commit(authActions.SET_TOKEN, getTokenFromUrl.value)
      router.push('/')
    } else
      alert('Ошибка авторизации')
  } else dispatch(authActions.GET_LOCAL_TOKEN)
}
onMounted(initAuth)

const fetchUserInfo = async () => {
  if (!authState.value.token) return

  const body = new FormData()
  body.append('token', authState.value.token as string)

  const res = await dispatch(fetchActions.FETCH, {
    url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
    info: { body, method: 'POST' },
    errorMessage: '[processes/useUserProcess] Failed to fetch account info'
  })

  commit(userActions.SET_INFO, res as FullAccount)
}
onMounted(fetchUserInfo)
watch(authState, fetchUserInfo)
</script>

<template>
  <template v-if="authState.token">
    <alert />
    <settings />
    <mobile-navbar />
    <section class="app-content">
      <Header />
      <router-view />
    </section>
  </template>
</template>

<style lang="scss" src="./App.scss" />
