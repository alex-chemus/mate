<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch, useCommit } from '@/utils'

const dispatch = useDispatch()
const state = useAuthState()
const route = useRoute()
const commit = useCommit()

const isRedirect = computed(() => {
  return window.location.pathname === '/redirect'
})

const getToken = computed(() => {
  const params = window.location.search.split('?')[1].split('&')

  return params.find(param => param.startsWith('token='))?.split('=')[1]
})

onMounted(() => {
  if (isRedirect.value) {
    console.log('getToken: ', getToken.value)

    if (getToken.value)
      commit(authActions.SET_TOKEN, getToken.value)
    else
      alert('Ошибка авторизации') // eslint-disable-line
  } else dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.token" />
</template>
