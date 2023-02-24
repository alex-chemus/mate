<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'
import { Input, Badge } from '@/ui'

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
        <Badge @close="emit('remove', skill)">
          <template #content>
            <p class="badge-text" :class="theme">{{ skill }}</p>
          </template>
        </Badge>
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

.badge-text {
  font-family: var(--noto-sans-medium);
  font-size: 13px;
  letter-spacing: -0.02em;
  margin-right: 7px;
  color: var(--heading-color-1);
}
</style>
