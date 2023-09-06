<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserState } from '@/shared/utils'
import { Loader } from '@/shared/ui';

const userState = useUserState()
const router = useRouter()

alert("alert from MainView.vue")

const handleRedirect = () => {
  alert("alert from MainView.vue / handleRedirect")
  console.log("userState.value.id", userState.value.id)
  if (userState.value.id) {
    router.push(`/user/${userState.value.id}`)
  }
}
onMounted(handleRedirect)
watch(() => userState.value.id, handleRedirect)
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
