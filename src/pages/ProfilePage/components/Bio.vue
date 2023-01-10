<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  bio: string
}>()

const theme = useTheme()
</script>

<template>
  <section class="bio-section" :class="theme">
    <h5>О себе</h5>
    <p>{{ bio }}</p>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.bio-section {
  border-radius: 13px;
  border: 1px solid rgba(118 118 118 / .25);
  padding: 11px 19px;

  &.light {
    color: var(--dark-2);
    background-color: var(--light);
  }

  &.dark {
    color: var(--light);
    background-color: var(--dark-theme-color-2);
  }

  h5 {
    font-family: var(--ff-ubuntu);
    font-size: 14px;
    font-weight: var(--fw-medium);
    letter-spacing: 1%;
    margin: 0;
    margin-bottom: 12px;
  }

  p {
    font-family: var(--ff-ubuntu);
    font-size: 13px;
    line-height: 160%;
    letter-spacing: -2%;
  }
}
</style>
