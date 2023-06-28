<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useAlert, useTheme } from '@/shared/utils'

const { type, message, update } = useAlert()
const { theme } = useTheme()

const isOpen = ref(false)
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

watch(update, () => {
  isOpen.value = true

  timer.value = setTimeout(() => {
    isOpen.value = false
  }, 4000)
})

const close = () => {
  if (timer.value) clearTimeout(timer.value)
  isOpen.value = false
}
</script>

<template>
  <!-- eslint-disable -->
  <transition name="alert">
    <div v-if="isOpen" class="alert" :class="[type, theme]" @click="close">
      <svg
        v-if="type === null" class="icon"
        width="24" height="24" viewBox="0 0 24 24"
      >
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-info-circle" />
      </svg>
      <svg
        v-if="type === 'success'" class="icon" :class="type"
        width="24" height="24" viewBox="0 0 24 24"
      >
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-check" />
      </svg>
      <svg
        v-if="type === 'danger'" class="icon" :class="type"
        width="24" height="24" viewBox="0 0 24 24"
      >
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-alert-circle" />
      </svg>
      <p>{{ message }}</p>

      <!-- <div class="underline" :class="type" /> -->
    </div>
  </transition>
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.alert {
  z-index: 10000;
  border-radius: 13px;
  background-color: var(--bg-color-1);
  height: 50px;
  width: 340px;
  padding: 0 15px;
  @include flex(flex-start, center);
  gap: 15px;
  @include findcreek(15px, var(--heading-color-2));
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: var(--popup-shadow);
  overflow-y: hidden;
  cursor: pointer;

  &.dark {
    border: 1px solid #615478;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--accent);
    animation-name: underline;
    animation-duration: 4000ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  &.danger::before {
    background-color: var(--red);
  }

  &.success::before {
    background-color: var(--green);
  }
}

.alert-enter-from,
.alert-leave-to {
  top: -50px;
}

.alert-enter-to,
.alert-leave-from {
  top: 20px;
}

.alert-enter-active,
.alert-leave-active {
  transition: var(--fast);
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent);
  animation-name: underline;
  animation-duration: 4000ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &.danger {
    background-color: var(--red);
  }

  &.success {
    background-color: var(--green);
  }
}

.icon {
  color: var(--accent);

  &.danger {
    color: var(--red);
  }

  &.success {
    color: var(--green);
  }
}

@keyframes underline {
  from {
    max-width: 100%;
  }

  to {
    max-width: 0%;
  }
}
</style>
