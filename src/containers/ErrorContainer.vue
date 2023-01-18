<script lang="ts" setup>
import { watch } from 'vue'
import { useFetchState } from '@/utils'
import { useRouter } from 'vue-router'

const fetchState = useFetchState()
const router = useRouter()

watch(
  () => fetchState.value.errorCode,
  () => {
    if (fetchState.value.errorCode)
      router.push('/error')
  }
)
</script>

<template>
  <slot />
</template>
