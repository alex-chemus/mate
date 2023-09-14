<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAppStore from '@/store/useAppStore'
import { Loader } from '@/shared/ui';

const { userState } = useAppStore()
const router = useRouter()

const handleRedirect = () => {
  if (userState.value?.findcreekID) {
    router.push(`/user/${userState.value.findcreekID}`)
  }
}
onMounted(handleRedirect)
watch(userState, handleRedirect)
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
