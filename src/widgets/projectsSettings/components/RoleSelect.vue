<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, computed
} from 'vue'
import { useTheme } from '@/utils'
import { Select } from '@/ui'
import { Member } from '../types'

const props = defineProps<{
  member: Member
}>()

const emit = defineEmits<{
  (e: 'select', payload: 'administrator' | 'editor' | 'user'): void
}>()

const { theme } = useTheme()

const value = ref<'administrator' | 'editor' | 'user' | null>(null)
const isOpen = ref(false)

const values = ref([
  { id: 1, key: 'administrator', value: 'Администратор' },
  { id: 2, key: 'editor', value: 'Редактор' },
  { id: 3, key: 'user', value: 'Пользователь' }
])

const onSelect = (n: number) => {
  switch (n) {
    case 1:
      emit('select', 'administrator')
      value.value = 'administrator'
      break
    case 2:
      emit('select', 'editor')
      value.value = 'editor'
      break
    case 3:
      emit('select', 'user')
      value.value = 'user'
      break
    default: break
  }
}

const getText = computed(() => {
  if (value.value)
    return values.value.find((i) => i.key === value.value)?.value
  return values.value.find((i) => i.key === props.member.role)?.value
})
</script>

<template>
  <div class="role-container" :class="theme">
    <h6 class="title" :class="theme">Выберите должность</h6>
    <Select
      :items="values.map((i) => ({ id: i.id, value: i.value }))"
      v-model:visible="isOpen"
      :selected="values.find((i) => i.key === value)?.id"
      :placeholder="getText"
      :z-index-factor="3"
      width="button"
      @select="onSelect"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.title {
  margin-left: 3px;
  margin-right: 13px;
  font-family: var(--findcreek-medium);
  font-size: 13px;
  color: var(--heading-color-1);
}
</style>

<style lang="scss">
@use 'sass:color';
@import '@/assets/styles/style.scss';

.role-dropdown {
  border-radius: 6px !important;
  box-shadow: 0 0 30px -4px rgb(0 0 0 / .25) !important;
  z-index: 2;
  background-color: var(--bg-color-1) !important;

  &.light {
    border: 1px solid #e6e6e6;
  }

  &.dark {
    border: 1px solid #615478;
  }
}

.role-container .ant-select {
  width: 100%;
}

.role-container .ant-select-selector {
  border-radius: 8px !important;
  height: 40px !important;
  padding: 0 14px !important;
  @include flex(space-between, center);
  transition: var(--fast) !important;
}

.role-container .ant-select-focused .ant-select-selector {
  box-shadow: none !important;
  border-color: var(--accent) !important;
}

.role-container .ant-select-selector {
  color: var(--heading-color-2) !important;
  background-color: var(--bg-color-2) !important;
  border: var(--border-1) !important;
}

.role-dropdown {
  .ant-select-item-group {
    font-family: var(--noto-sans);
    font-size: 13px;
    color: var(--text-color-1);
  }
}

.role-option {
  font-family: var(--findcreek);
  font-size: 13px;
  line-height: 1.4em;
  letter-spacing: -0.033em;
  transition: var(--fast);
  color: var(--heading-color-1) !important;

  &.ant-select-item-option-active,
  &.ant-select-item-option-selected {
    color: var(--light) !important;
    background-color: var(--accent) !important;
  }
}
</style>
