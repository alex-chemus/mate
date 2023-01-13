<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  img: string,
  fullName: string,
  email: string
}>()

const theme = useTheme()

const hasNews = ref(true)
//const img = ref<string | null>(null)
const isOpen = ref(false)
</script>

<template>
  <div class="profile-wrapper">
    <button
      class="bell-button" :class="[theme, { 'with-news': hasNews }]"
      @click="hasNews = !hasNews"
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-bell" />
      </svg>
    </button>

    <button class="popup-button" :class="theme" @click="isOpen = !isOpen">
      <img v-if="img" :src="img" alt="" class="avatar" />
      <div v-else class="placeholder" />

      <span>{{ fullName }}</span>

      <svg
        :class="[theme, { 'open': isOpen }]"
        width="20" height="20" viewBox="0 0 20 20"
      >
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-down" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.profile-wrapper {
  @include flex(flex-end, center);

  & > *:not(:last-child) {
    margin-right: 20px;
  }
}

.bell-button {
  color: var(--gray-1);

  &.with-news {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #FB1F1E;
      border-radius: 100vmax;
      top: 2px;
      right: 2px;
    }
  }
}

.popup-button {
  padding: 5px;
  border-radius: 10px;
  border: 1px solid color.change($gray-1, $alpha: .25);

  font-family: var(--ff-ubuntu);
  font-size: 16px;
  font-weight: var(--fw-medium);

  &.light {
    color: var(--dark-2);
    background-color: var(--light);
  }

  &.dark {
    color: var(--light);
    background-color: var(--dark-theme-color-2);
  }

  & > *:not(:last-child) {
    margin-right: 10px;
  }
}

.placeholder,
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 100vmax;
}

.avatar {
  object-fit: cover;
}

.placeholder {
  background-color: var(--gray-1);
}

svg {
  transition: transform .15s linear;

  &.light {
    color: var(--gray-1);
  }

  &.dark {
    color: var(--gray-3);
  }

  &.open {
    transform: rotate(180deg);
  }
}
</style>
