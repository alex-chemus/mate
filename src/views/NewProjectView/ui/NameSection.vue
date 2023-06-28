<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { Input, Dropdown } from '@/shared/ui'

const props = defineProps<{
  themes: {
    id: number,
    title: string
  }[],
  name: string | null,
  nametag: string | null
}>()

const emit = defineEmits<{
  (e: 'update:name', name: string | null): void,
  (e: 'update:nametag', nametag: string | null): void,
  (e: 'select-theme', themeID: number): void
}>()

const getThemes = computed(() => {
  return props.themes.map(theme => ({ id: theme.id, value: theme.title }))
})
</script>

<template>
  <div class="name-widget">
    <h1 class="heading">Укажите название для проекта</h1>
    <p class="text">Введите название для вашего проекта, оно будет на виду у всего мира.
    Позже его можно будет изменить</p>

    <div class="input-wrapper">
      <Input
        :value="name ?? ''"
        label-text="Название проекта"
        placeholder="Название проекта"
        @update:value="p => emit('update:name', p)"
      />
    </div>

    <Input
      :value="nametag ?? ''"
      label-text="неймтег проекта"
      placeholder="Неймтег проекта"
      @update:value="nametag => emit('update:nametag', nametag)"
    />

    <!-- <div class="input-container">
      <div class="select-wrapper">
        <dropdown
          :items="getThemes"
          label-text="Тема проекта"
          placeholder="Выберите тему Вашего проекта..."
          @select="themeID => emit('select-theme', themeID)"
        />
      </div>

      <div class="input-wrapper">
        <Input
          :value="nametag ?? ''"
          label-text="неймтег проекта"
          placeholder="Неймтег проекта"
          @update:value="nametag => emit('update:nametag', nametag)"
        />
      </div>
    </div> -->
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

.input-wrapper {
  margin-bottom: 13px;
}
</style>
