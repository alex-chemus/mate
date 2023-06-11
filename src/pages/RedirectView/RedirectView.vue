<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authActions } from '@/store/constants'
import { useCommit } from '@/utils'

const route = useRoute()
const commit = useCommit()

onMounted(() => {
  if (route.query.token) {
    commit(authActions.SET_TOKEN, route.query.token)
  } else {
    alert('Ошибка авторизации') // eslint-disable-line
  }
})
</script>

<template>
  <div></div>
</template>
