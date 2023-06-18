<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserState } from '@/utils'
import { Loader } from '@/ui';

const userState = useUserState()
const router = useRouter()

onMounted(() => {
  console.log('use id')
  if (userState.value.id) {
    router.push(`/user/${userState.value.id}`)
  }
})

watch(userState, () => {
  console.log('use id')
  if (userState.value.id) {
    router.push(`/user/${userState.value.id}`)
  }
})
</script>

<template>
  <div class="loader-wrapper">
    <loader />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.loader-wrapper {
  flex-grow: 1;
  @include flex(center, center);
}
</style>
