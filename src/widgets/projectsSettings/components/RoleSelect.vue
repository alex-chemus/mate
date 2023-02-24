<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Select, SelectOption } from 'ant-design-vue'
import { SelectValue } from 'ant-design-vue/lib/select'
import { useTheme } from '@/utils'
import { Member } from '../types'

const props = defineProps<{
  member: Member
}>()

const emit = defineEmits<{
  (e: 'select', payload: 'administrator' | 'editor'): void
}>()

const { theme } = useTheme()

const value = ref<'administrator' | 'editor' | null>(null)
const onSelect = (e: SelectValue) => {
  switch (e as number) {
    case 1:
      emit('select', 'administrator')
      value.value = 'administrator'
      break
    case 2:
      emit('select', 'editor')
      value.value = 'editor'
      break
    default: break
  }
}

const getValue = () => {
  switch (value.value) {
    case 'administrator': return 'Администратор'
    case 'editor': return 'Редактор'
    default:
      if (props.member.role === 'administrator') return 'Администратор'
      return 'Редактор'
  }
}

const getPopupContainer = () => {
  return document.querySelector('.role-modal .role-container') as HTMLElement
}
</script>

<template>
  <div class="role-container" :class="theme">
    <h6 class="title" :class="theme">Выберите должность</h6>
    <Select
      :value="getValue()"
      @update:value="onSelect" :show-arrow="false"
      :get-popup-container="getPopupContainer"
      :dropdown-class-name="['role-dropdown', theme].join(' ')"
      placeholder="Выберите должность"
    >
      <SelectOption
        :key="1"
        :class="['role-option', theme].join(' ')"
        title="Администратор"
      >Администратор</SelectOption>
      <SelectOption
        :key="2"
        :class="['role-option', theme].join(' ')"
        title="Редактор"
      >Редактор</SelectOption>
    </Select>
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
    background-color: var(--accent);
  }
}
</style>
