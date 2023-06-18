<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch } from '@/utils'

const dispatch = useDispatch()
const state = useAuthState()

const isRedirect = computed(() => window.location.pathname === '/redirect')

onMounted(() => {
  alert(window.location.pathname)
  if (isRedirect.value) return
  dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.token || isRedirect" />
</template>
