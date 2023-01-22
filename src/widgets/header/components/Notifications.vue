<script lang="ts" setup>
import { useTheme } from '@/utils'
import { ref, defineProps } from 'vue'
import { Popover } from 'ant-design-vue'
import type { Notice } from '../types'
import NotificationsPopup from './NotificationsPopup.vue'

defineProps<{
  notices: Notice[]
}>()

const { theme } = useTheme()
const isOpen = ref(false)
</script>

<template>
  <popover v-model:visible="isOpen" trigger="click" placement="bottomRight">
    <button class="bell-button">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-bell" />
      </svg>
    </button>

    <template #content>
      <notifications-popup :notices="notices" />
    </template>
  </popover>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

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
</style>
