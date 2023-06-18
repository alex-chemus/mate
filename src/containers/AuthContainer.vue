<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authActions } from '@/store/constants'
import { useAuthState, useDispatch } from '@/utils'

const route = useRoute()
const dispatch = useDispatch()
const state = useAuthState()

onMounted(() => {
  dispatch(authActions.GET_LOCAL_TOKEN, route)
})
</script>

<template>
  <slot v-if="state.token" />
</template>
