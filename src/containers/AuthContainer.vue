<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch } from '@/utils'
import { useRouter } from 'vue-router'

const dispatch = useDispatch()
const state = useAuthState()

const router = useRouter()

onMounted(() => {
  // пока что токен можно получить только локально
  // через localStorage, иначе ошибка
  dispatch(authActions.GET_LOCAL_TOKEN)
})

watch(
  () => state.value.isError,
  () => {
    // eslint-disable-next-line
    if (state.value.isError) router.push('auth-error')
  }
)
</script>

<template>
  <slot v-if="state.fetchedToken" />
</template>
