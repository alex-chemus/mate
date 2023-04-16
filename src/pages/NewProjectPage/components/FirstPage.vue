<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { Input, Select } from '@/ui'

const props = defineProps<{
  themes: {
    id: number,
    title: string
  }[],
  name: string | null,
  nametag: string | null
}>()

const emit = defineEmits<{
  (e: 'update:name', payload: string | null): void,
  (e: 'update:nametag', payload: string | null): void,
  (e: 'select-theme', id: number): void
}>()

const getThemes = computed(() => {
  return props.themes.map((t) => ({ id: t.id, value: t.title }))
})
</script>

<template>
  <div class="first-page">
    <h1 class="heading">Укажите название для проекта</h1>
    <p class="text">Введите название для вашего проекта, оно будет на виду у всего мира.
    Позже его можно будет изменить</p>

    <Input
      :value="name ?? ''"
      label-text="Название проекта"
      placeholder="Название проекта"
      @update:value="p => emit('update:name', p)"
    />

    <div class="input-container">
      <div class="select-wrapper">
        <Select
          :items="getThemes"
          label-text="Тема проекта"
          placeholder="Выберите тему Вашего проекта..."
          @select="p => emit('select-theme', p)"
        />
      </div>

      <div class="input-wrapper">
        <Input
          :value="nametag ?? ''"
          label-text="неймтег проекта"
          placeholder="Неймтег проекта"
          @update:value="p => emit('update:nametag', p)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.heading {
  @include findcreek-bold(30px, var(--heading-color-2));
  margin-bottom: 28px;
}

.text {
  @include findcreek-bold(14px, var(--text-color-1));
  margin-bottom: 48px;
}

.input-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 13px;
  grid-gap: 16px;
}
</style>
