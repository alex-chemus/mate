<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
// import DislikeSvg from './DislikeSvg.vue'
import { ThumbDown, ThumbDownFilled } from '@/shared/icons'

defineProps<{
  isDisliked: boolean,
  dislikesNumber: number
}>()

const emit = defineEmits<{
  (e: 'dislike'): void
}>()
</script>

<template>
  <button
    class="dislike-button" :class="{ 'active': isDisliked }"
    @click="emit('dislike')"
  >
    <thumb-down-filled v-if="isDisliked" />
    <thumb-down v-else />
    <span>{{ dislikesNumber }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.dislike-button {
  @include findcreek-medium(11px, var(--text-color-1));
  @include flex(flex-start, center);
  gap: 6px;
  transition: var(--fast);

  &:hover,
  &:focus,
  &.active {
    color: var(--accent);
  }

  span {
    background-color: var(--bg-color-3);
    color: var(--text-color-1);
    border-radius: 100vmax;
    padding: 1px 7px;
  }

  &:is(:hover, :focus) span {
    color: var(--accent);
  }
}
</style>
