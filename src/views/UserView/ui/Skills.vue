<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/shared/utils'

defineProps<{
  skills: string[],
  isMe?: boolean
}>()

const { theme } = useTheme()
</script>

<template>
  <section v-if="isMe || skills.length" class="skills-section" :class="theme">
    <h4 class="title" :class="theme">Навыки</h4>
    <ul  v-if="skills.length" class="skills-list">
      <li
        v-for="(skill, i) in skills" :key="i"
        class="skill-item" :class="theme"
      >{{ skill }}</li>
    </ul>
    <p v-else :class="theme">Что вы умеете?</p>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.skills-section {
  padding: 23px;
  border-radius: 13px;
  border: 1px solid color.change($gray-1, $alpha: .25);
  background-color: var(--bg-color-2);
}

.title {
  @include findcreek-medium(16px, var(--heading-color-1));
  margin-bottom: 21px;
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
  border: var(--border-2);
  background-color: transparent;
  border-radius: 8px;
  @include noto-sans-medium(12px, var(--heading-color-1));
  background-color: var(--bg-color-3);
}

h6 {
  margin: 0;
  @include noto-sans-medium(12px, var(--heading-color-1));
}
</style>
