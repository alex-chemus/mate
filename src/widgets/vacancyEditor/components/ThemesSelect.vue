<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { Select } from '@/ui'

const props = defineProps<{
  themes: {
    id: number,
    title: string
  }[] | null
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void
}>()

const getThemes = computed(() => {
  return props.themes
    ? props.themes.map((t) => ({ id: t.id, value: t.title }))
    : null
})

const isOpen = ref(false)

const selected = ref<number | undefined>(undefined)
const onSelect = (id: number) => {
  selected.value = id
  emit('select', id)
}
</script>

<template>
  <Select
    :items="getThemes"
    :selected="selected"
    v-model:visible="isOpen"
    label-text="Тема вакансии"
    placeholder="Выберите тему"
    @select="onSelect"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
