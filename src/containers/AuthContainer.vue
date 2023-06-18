<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch, useCommit } from '@/utils'

const dispatch = useDispatch()
const state = useAuthState()
const commit = useCommit()
const router = useRouter()

const isRedirect = computed(() => {
  return window.location.pathname === '/redirect'
})

const getToken = computed(() => {
  const params = window.location.search.split('?')[1].split('&')

  const tokenParam = params.find(param => param.startsWith('token='))
  return tokenParam
    ? decodeURIComponent(tokenParam.split('=')[1])
    : null
})

onMounted(() => {
  if (isRedirect.value) {
    if (getToken.value) {
      commit(authActions.SET_TOKEN, getToken.value)
      router.push('/')
    } else
      alert('Ошибка авторизации') // eslint-disable-line
  } else dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.token" />
</template>
