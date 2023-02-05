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
  <div class="role-container">
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

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }
}
</style>

<style lang="scss">
@use 'sass:color';
@import '@/assets/styles/style.scss';

.role-dropdown {
  border-radius: 6px !important;
  box-shadow: 0 0 30px -4px rgb(0 0 0 / .25) !important;
  z-index: 2;

  &.light {
    background-color: var(--light) !important;
    border: 1px solid #e6e6e6;
  }

  &.dark {
    background-color: var(--dark-theme-color-2) !important;
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
}

.role-container.light .ant-select-focused .ant-select-selector,
.role-container.light .ant-select:hover .ant-select-selector {
  border-color: var(--accent-1) !important;
}

.role-container.dark .ant-select-focused .ant-select-selector,
.role-container.dark .ant-select:hover .ant-select-selector {
  border-color: var(--accent-2) !important;
}

.role-container.light .ant-select-selector {
  border: 1px solid color.change($gray-1, $alpha: .4) !important;
  background-color: var(--light) !important;
  color: var(--dark-2) !important;
}

.role-dropdown {
  .ant-select-item-group {
    font-family: var(--noto-sans);
    font-size: 13px;
  }

  &.light .ant-select-item-group {
    color: #5c5c5c;
  }

  &.dark .ant-select-item-group {
    color: #bbb;
  }
}

.role-option {
  font-family: var(--findcreek);
  font-size: 13px;
  line-height: 1.4em;
  letter-spacing: -0.033em;
  transition: var(--fast);

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }

  &.ant-select-item-option-active,
  &.ant-select-item-option-selected {
    color: var(--light) !important;

    &.light {
      background-color: var(--accent-1);
    }

    &.dark {
      background-color: var(--accent-2);
    }
  }
}
</style>
