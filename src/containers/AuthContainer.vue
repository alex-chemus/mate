<script lang="ts" setup>
import { onMounted } from 'vue'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch } from '@/utils'

const dispatch = useDispatch()
const state = useAuthState()

onMounted(() => {
  dispatch(authActions.GET_LOCAL_TOKEN)
})
</script>

<template>
  <slot v-if="state.token" />
</template>
