<script lang="ts" setup>
import { ref } from 'vue'
import { Popover } from '@/shared/hocs'

const isOpen = ref(false)
</script>

<template>
  <popover v-model:visible="isOpen" placement="bottom-left">
    <template #button>
      <button class="bell-button" @click="isOpen = !isOpen">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-bell" />
        </svg>
      </button>
    </template>

    <template #content>
      <slot />
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
