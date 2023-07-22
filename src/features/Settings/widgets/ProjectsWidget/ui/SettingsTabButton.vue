<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useTheme } from '@/shared/utils'
import { SettingsTab } from '../types'

const props = defineProps<{
  tab: SettingsTab,
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { theme } = useTheme()

const name = computed(() => {
  switch (props.tab) {
    case 'settings': return 'Настройки'
    case 'members': return 'Участники'
    default: return ''
  }
})
</script>

<template>
  <button @click="emit('click')" class="tab-button" :class="[theme, { selected }]" >
    <svg v-if="tab === 'settings'" height="18" width="18" viewBox="0 0 18 18">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-settings" />
    </svg>

    <svg v-if="tab === 'members'" height="18" width="18" viewBox="0 0 18 18">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-users" />
    </svg>

    <span>{{ name }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.tab-button {
  width: 100%;
  cursor: pointer;
  height: 30px;
  padding: 5px;
  @include flex(flex-start, center);
  gap: 8px;
  transition: var(--fast);
  border-radius: 6px;

  svg {
    color: var(--accent);
  }

  span {
    @include findcreek(13px, var(--heading-color-1));
    line-height: 1.40em;
    letter-spacing: -0.033em;
  }

  &.selected {
    background-color: var(--bg-color-3);
    border: var(--border-1);
  }

  // &.selected,
  // &:hover {
  //   box-shadow: 0 0 2px 0 rgb(0 0 0 / .25);
  // }

  // &.dark.selected,
  // &.dark:hover {
  //   background-color: var(--dark-theme-color-2);
  // }
}
</style>
