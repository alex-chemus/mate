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

onMounted(() => {
  if (isRedirect.value) {
    console.log('route.query.token: ', route.query.token)

    if (route.query.token)
      commit(authActions.SET_TOKEN, route.query.token)
    else
      alert('Ошибка авторизации') // eslint-disable-line
  } else dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.token" />
</template>
