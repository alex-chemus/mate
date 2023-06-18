<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authActions } from '@/store/constants'
import { useCommit, useUserState } from '@/utils'

const route = useRoute()
const router = useRouter()
const commit = useCommit()
const userState = useUserState()

onMounted(() => {
  console.log('route: ', route)
  if (route.query.token) {
    commit(authActions.SET_TOKEN, route.query.token)
  } else {
    alert('Ошибка авторизации') // eslint-disable-line
  }
})

watch(userState, () => {
  if (userState.value.id)
    router.push(`/user/${userState.value.id}`)
})
</script>

<template>
  <div></div>
</template>
