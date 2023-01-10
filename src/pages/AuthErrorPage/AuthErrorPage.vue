<script lang="ts" setup>
import { useAuthState } from '@/utils'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = useAuthState()

onMounted(() => {
  if (!state.value.isError) router.back()
})
</script>

<template>
  <div v-if="state.isError">
    <h1>Ошибка авторизации</h1>
    <h5>{{ state.errorMessage }}</h5>
  </div>
</template>
