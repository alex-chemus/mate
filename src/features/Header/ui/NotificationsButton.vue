<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/shared/utils'

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
    <div v-if="unread" class="tag" :class="[theme, { 'selected': selected }]">
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
  color: var(--text-color-3);
}

.notifications-button.selected {
  color: var(--heading-color-1);
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
  @include findcreek(14px);
  letter-spacing: -1.5%;
}

.tag {
  border-radius: 100vmax;
  height: 20px;
  aspect-ratio: 1;
  @include flex(center, center);
  @include findcreek-medium(12px);
  line-height: 1em;
  letter-spacing: .04em;

  &.light {
    background-color: #EFF1F2;
  }

  &.dark {
    background-color: #333640;
  }
}

.tag.selected {
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
