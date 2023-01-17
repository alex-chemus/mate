<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  selected: boolean,
  unread?: number
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { theme } = useTheme()
</script>

<template>
  <button
    class="notifications-button" :class="[theme, { 'selected': selected }]"
    @click="emit('click')"
  >
    <span class="text"><slot /></span>
    <div v-if="unread" class="badge" :class="[theme, { 'selected': selected }]">
      {{ unread }}
    </div>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.notifications-button {
  padding: 5px;
  height: 40px;
  @include flex(center, center);
  gap: 4px;
  transition: var(--fast);

  &.light {
    color: var(--gray-1);
  }

  &.dark {
    color: #bbb;
  }
}

.notifications-button.selected {
  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }
}

.notifications-button.selected,
.notifications-button:hover {
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
  }
}

.text {
  font-family: var(--findcreek);
  font-size: 14px;
  letter-spacing: -1.5%;
}

.badge {
  border-radius: 100vmax;
  height: 20px;
  aspect-ratio: 1;
  @include flex(center, center);
  font-family: var(--findcreek-medium);
  font-size: 12px;
  line-height: 1em;
  font-weight: var(--medium);
  letter-spacing: .04em;

  &.light {
    background-color: #EFF1F2;
  }

  &.dark {
    background-color: #333640;
  }
}

.badge.selected {
  &.light {
    background-color: var(--dark-1);
    color: var(--light);
  }

  &.dark {
    background-color: var(--light);
    color: var(--dark-1);
  }
}
</style>
