<script lang="ts" setup>
import { onMounted } from 'vue'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch } from '@/utils'

const dispatch = useDispatch()
const state = useAuthState()

onMounted(() => {
  // пока что токен можно получить только локально
  // через localStorage, иначе ошибка
  dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.fetchedToken" />
</template>
