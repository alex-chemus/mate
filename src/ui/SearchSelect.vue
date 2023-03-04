<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, onBeforeUnmount, ref, watch
} from 'vue'
import { Input, Loader } from '@/ui'
import { useTheme } from '@/utils'
import { PopupTransition } from '@/hocs'

const props = defineProps<{
  items: {
    id: number,
    value: string
  }[] | null,
  loading?: boolean,
  visible?: boolean,
  selected?: number,
  inputValue: string
  labelText?: string,
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void,
  (e: 'update:inputValue', payload: string): void,
  (e: 'select', payload: number): void,
}>()

const { theme } = useTheme()

const focusedItem = ref<number | null>(null)
watch(
  () => props.visible,
  () => {
    if (props.selected) focusedItem.value = props.selected
  }
)

const closeTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const onDropdownClick = () => {
  if (closeTimeout.value) clearTimeout(closeTimeout.value)
}
const onFocusChange = (p: boolean) => {
  closeTimeout.value = setTimeout(() => {
    emit('update:visible', p)
    if (!p) focusedItem.value = null
  }, 100)
}

const handleDropdownClicks = (e: MouseEvent) => {
  if (!props.visible) return
  const target = e.target as HTMLElement
  const dropdown = document.querySelector('.select-container .dropdown')
  if (!dropdown?.contains(target)) {
    emit('update:visible', false)
    focusedItem.value = null
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  if (props.visible && e.key === 'ArrowUp') {
    e.preventDefault()
  }
  if (props.visible && e.key === 'ArrowDown') e.preventDefault()
}

const onKeyUp = (e: KeyboardEvent) => {
  if (!props.visible) return

  if (focusedItem.value === null) {
    focusedItem.value = 0
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (focusedItem.value === 0 && props.items) return
    focusedItem.value!--
    const dropdown = document.querySelector('.select-container .dropdown') as HTMLElement
    if (dropdown.scrollTop > focusedItem.value * 32) {
      let i = 0
      const timer = setInterval(() => {
        if (i === 32) clearInterval(timer)
        dropdown.scrollTop--
        i++
      }, 2)
    }
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!props.items) return
    if (focusedItem.value === props.items.length - 1) return
    focusedItem.value!++
    const dropdown = document.querySelector('.select-container .dropdown') as HTMLElement
    if (dropdown.scrollTop + dropdown.clientHeight < (focusedItem.value + 1) * 32) {
      let i = 0
      const timer = setInterval(() => {
        if (i === 32) clearInterval(timer)
        dropdown.scrollTop++
        i++
      }, 2)
    }
  }

  if (e.key === 'Enter') {
    if (focusedItem.value && props.items)
      emit('select', props.items[focusedItem.value].id)
  }
}

onMounted(() => {
  document.addEventListener('click', handleDropdownClicks)
  document.addEventListener('keyup', onKeyUp)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDropdownClicks)
  document.removeEventListener('keyup', onKeyUp)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <!-- eslint-disable -->
  <div class="select-container">
    <Input
      :value="inputValue"
      @update:value="p => emit('update:inputValue', p)"
      @update:focused="onFocusChange"
      :placeholder="placeholder" :label-text="labelText"
    />
 
    <popup-transition>
      <div v-if="visible" class="dropdown" :class="theme" @click="onDropdownClick">
        <div v-if="loading" class="loader">
          <loader />
        </div>
      
        <ul v-else-if="items && items.length">
          <li
            v-for="item in items" :key="item.id"
            class="item" :class="[
              focusedItem === item.id ? 'focused' : '',
              theme,
              selected === item.id ? 'selected' : ''
            ]"
            @mouseover="focusedItem = item.id"
          >
            <button class="item-button" @click="emit('select', item.id)">{{ item.value }}</button>
          </li>
        </ul>

        <div class="dropdown-text" :class="theme" v-else-if="items && items.length === 0">
          Уфф... Ничего не найдено
        </div>

        <div class="dropdown-text" :class="theme" v-else-if="items === null">
          Введите место проживания
        </div>
      </div>
    </popup-transition>
  </div>
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.select-container {
  position: relative;
  z-index: 2;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(10px);
  cursor: pointer;

  border-radius: 8px;
  box-shadow: var(--popup-shadow);
  padding: 10px;
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  background-color: var(--bg-color-1);

  &::-webkit-scrollbar {
    width: 0;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  height: 32px;
  border-radius: 5px;
  padding: 0 4px;
  @include flex(flex-start, center);
  transition: var(--fast);
  color: var(--heading-color-2);

  &.focused,
  &.selected {
    background-color: var(--bg-color-2);
  }

  &.selected {
    color: var(--accent);
  }
}

.item-button {
  width: 100%;
  justify-content: flex-start;
  color: inherit;
  outline: none;
  border: none;
}

.dropdown-text {
  font-family: var(--findcreek);
  font-size: 15px;
  letter-spacing: -0.01em;
  color: var(--heading-color-1);
}

.loader {
  @include flex(center, center);
}
</style>
