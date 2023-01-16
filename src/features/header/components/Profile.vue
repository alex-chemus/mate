<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { Popover } from 'ant-design-vue'
import { useTheme } from '@/utils'
import ProfilePopup from './ProfilePopup.vue'

defineProps<{
  img: string,
  fullName: string,
  email: string
}>()

const { theme } = useTheme()

const isOpen = ref(false)
</script>

<template>
  <popover v-model:visible="isOpen" trigger="click" placement="bottomRight">
    <button class="popup-button" :class="theme">
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

    <template #content>
      <profile-popup
        :img="img"
        :full-name="fullName"
        :email="email"
      />
    </template>
  </popover>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

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
