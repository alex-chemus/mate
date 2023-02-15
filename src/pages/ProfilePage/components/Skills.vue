<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  skills: string[]
}>()

const { theme } = useTheme()
</script>

<template>
  <section class="skills-section" :class="theme">
    <h4 class="title" :class="theme">Навыки</h4>
    <ul  v-if="skills.length" class="skills-list">
      <li
        v-for="(skill, i) in skills" :key="i"
        class="skill-item" :class="theme"
      >{{ skill }}</li>
    </ul>
    <h6 v-else :class="theme">Что вы умеете?</h6>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.skills-section {
  padding: 23px;
  border-radius: 13px;
  border: 1px solid color.change($gray-1, $alpha: .25);
  background-color: var(--bg-color-1);
}

.title {
  font-family: var(--findcreek-medium);
  font-size: 14px;
  font-weight: var(--medium);
  margin-bottom: 26px;
  color: var(--heading-color-2);
}

.skills-list {
  padding: 0;
  margin: 0;
  list-style: none;
  @include flex(flex-start, flex-start);
  flex-wrap: wrap;
  gap: 10px;
}

.skill-item {
  @include flex(center, center);
  height: 30px;
  padding: 0 9px;
  border: 1px solid color.change($gray-1, $alpha: .4);
  background-color: transparent;
  font-family: var(--noto-sans);
  font-weight: var(--medium);
  font-size: 12px;
  border-radius: 8px;
  color: var(--heading-color-1);
}

h6 {
  margin: 0;
  font-family: var(--noto-sans);
  font-weight: var(--medium);
  font-size: 12px;
  color: var(--heading-color-1);
}
</style>
