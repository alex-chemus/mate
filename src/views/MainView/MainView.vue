<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserState } from '@/utils'

const userState = useUserState()
const router = useRouter()

onMounted(() => {
  if (userState.value.id) {
    router.push(`/user/${userState.value.id}`)
  }
})

watch(userState, () => {
  if (userState.value.id) {
    router.push(`/user/${userState.value.id}`)
  }
})
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
