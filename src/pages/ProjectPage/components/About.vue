<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

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
  border-radius: 13px;
  border: 1px solid rgba(118 118 118 / .25);
  padding: 11px 19px;
  color: var(--heading-color-2);
  background-color: var(--bg-color-1);

  h5 {
    font-family: var(--findcreek-medium);
    font-size: 14px;
    letter-spacing: 1%;
    margin: 0;
    margin-bottom: 12px;
    color: currentColor;
  }

  p {
    font-family: var(--findcreek-medium);
    font-size: 13px;
    line-height: 160%;
    letter-spacing: -2%;
  }
}
</style>
