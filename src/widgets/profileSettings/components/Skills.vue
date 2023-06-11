<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'
import { Input, Tag } from '@/ui'

defineProps<{
  skills: string[]
}>()

const emit = defineEmits<{
  (e: 'add', payload: string): void,
  (e: 'remove', payload: string): void
}>()

const { theme } = useTheme()
const inputValue = ref('')
</script>

<template>
  <div class="skills-container">
    <Input label-text="Навыки" placeholder="Введите навык" v-model:value="inputValue">
      <template #after>
        <button class="add-button" :class="theme" @click="emit('add', inputValue)">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
          </svg>
        </button>
      </template>
    </Input>

    <ul class="skills-list">
      <li v-for="(skill, i) in skills" :key="i">
        <tag @close="emit('remove', skill)">
          <template #content>
            <p class="tag-text" :class="theme">{{ skill }}</p>
          </template>
        </tag>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.add-button {
  transition: var(--fast);
  color: var(--text-color-1);

  &:hover,
  &:focus {
    color: var(--accent);
  }
}

.skills-container {
  @include flex(flex-start, stretch, column);
  gap: 7px;
}

.skills-list {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex(flex-start, center);
  flex-wrap: wrap;
  gap: 5px;
}

.tag-text {
  @include noto-sans-medium(13px, var(--heading-color-1));
  letter-spacing: -0.02em;
  margin-right: 7px;
}
</style>
