<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/shared/utils'

defineProps<{
  text: string
}>()

const { theme } = useTheme()
</script>

<template>
  <section class="about-section" :class="theme">
    <h5>О проекте</h5>
    <p>{{ text.length === 0 ? 'Нет описания' : text }}</p>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.about-section {
  border-radius: 14px;
  // border: 1px solid rgba(118 118 118 / .25);
  border: var(--border-2);
  padding: 15px;
  background-color: var(--bg-color-2);
  @include flex(flex-start, stretch, column);
  gap: 10px;

  h5 {
    @include findcreek-medium(14px, var(--heading-color-1));
    /* margin-bottom: 21px; */
  }

  p {
    @include findcreek(14px, var(--text-color-1));
    line-height: 160%;
  }
}
</style>
