<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'

const props = defineProps<{
  currentPage: 1 | 2 | 3
}>()

const transitionType = ref<'tonext' | 'toprev'>('tonext')
const currentSlide = ref<1 | 2 | 3>(props.currentPage)

watch(() => props.currentPage, (newValue, oldValue) => {
  if (newValue > oldValue) transitionType.value = 'tonext'
  if (oldValue > newValue) transitionType.value = 'toprev'

  currentSlide.value = props.currentPage
})
</script>

<template>
  <transition :name="transitionType" mode="out-in">
    <slot :current-slide="currentSlide" />
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.tonext-enter-from,
.toprev-leave-to {
  transform: translateX(120%);
}

.tonext-enter-active,
.tonext-leave-active,
.toprev-enter-active,
.toprev-leave-active {
  transition: transform .5s ease-out;
}

.tonext-enter-to,
.tonext-leave-from,
.toprev-leave-from,
.toprev-enter-to {
  transform: none;
}

.tonext-leave-to,
.toprev-enter-from {
  transform: translateX(-120%);
}
</style>
