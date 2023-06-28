<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { Popover } from '@/hocs'
import { useTheme } from '@/utils'

defineProps<{
  img: string,
  fullName: string,
  email: string,
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:is-open', state: boolean): void
}>()

const emitIsOpen = (state: boolean) => {
  emit('update:is-open', state)
}

const { theme } = useTheme()
</script>

<template>
  <popover :visible="isOpen" @update:visible="emitIsOpen" placement="bottom-left">
    <template #button>
      <button class="popup-button" :class="theme" @click="emitIsOpen(!isOpen)">
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
    </template>

    <template #content>
      <!-- <profile-popup
        :img="img"
        :full-name="fullName"
        :email="email"
        :settings-open="settingsOpen"
      /> -->
      <slot />
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
  @include findcreek-medium(16px, var(--heading-color-2));
  background-color: var(--bg-color-1);

  & > *:not(:last-child) {
    margin-right: 10px;
  }
}

.placeholder,
.avatar {
  width: 24px;
  height: 24px;
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
  color: var(--text-color-2);

  &.open {
    transform: rotate(180deg);
  }
}
</style>
