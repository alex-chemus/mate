<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch } from '@/utils'

const dispatch = useDispatch()
const state = useAuthState()
const route = useRoute()

onMounted(() => {
  if (route.path === '/redirect') return
  dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.token" />
</template>
