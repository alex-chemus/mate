<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, onBeforeUnmount, computed, ref
} from 'vue'
import { Input } from '@/ui'
import { useTheme } from '@/utils'

const props = defineProps<{
  // ungrouped | grouped
  data: string[] | null,
  loading?: boolean,
  placement?: 'topLeft' | 'top' | 'topRight' | 'right' | 'bottomRight' |
  'bottom' | 'bottomLeft' | 'left'
  visible?: boolean,
  placeholder?: string,
  labelText?: string,
  selected?: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
  (e: 'select', payload: number): void
}>()

const { theme } = useTheme()

const focusedItem = ref<number | null>(null)

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
    console.log('prevent default')
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
    if (focusedItem.value === 0 && props.data) return
    focusedItem.value!--
    const dropdown = document.querySelector('.select-container .dropdown') as HTMLElement
    if (dropdown.scrollTop > focusedItem.value * 32) {
      //console.log('up')
      dropdown.scrollTop -= 32
    }
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!props.data) return
    if (focusedItem.value === props.data.length - 1) return
    focusedItem.value!++
    const dropdown = document.querySelector('.select-container .dropdown') as HTMLElement
    //console.log(dropdown.scrollTop + dropdown.clientHeight < (focusedItem.value + 2) * 32)
    if (dropdown.scrollTop + dropdown.clientHeight < (focusedItem.value + 1) * 32) {
      //console.log('down')
      dropdown.scrollTop += 32
    }
  }

  if (e.key === 'Enter') {
    if (focusedItem.value) emit('select', focusedItem.value)
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

const inputValue = ref<string | undefined>()

const getSearchedItems = computed(() => {
  if (props.data && props.data.length) {
    const arr = (props.data as string[]).map((item, i) => {
      return { name: item, i }
    })

    if (!inputValue.value) return arr
    return arr.filter((i) => i.name.trim().toLocaleLowerCase().includes(inputValue.value!.trim().toLocaleLowerCase()))
  }

  return null
})

const isEmpty = computed(() => {
  return props.data && (props.data.length === 0 || !getSearchedItems.value || getSearchedItems.value.length === 0)
})
</script>

<template>
  <!-- eslint-disable -->
  <div class="select-container">
    <Input
      v-model:value="inputValue"
      @update:focused="onFocusChange"
      :placeholder="placeholder" :label-text="labelText"
    />
    <div v-if="visible" class="dropdown" :class="theme" @click="onDropdownClick">
      <ul v-if="data && data.length">
        <li
          v-for="item in getSearchedItems" :key="item.i"
          class="item" :class="[
            focusedItem === item.i ? 'focused' : '',
            theme,
            selected === item.i ? 'selected' : ''
          ]"
          @mouseover="focusedItem = item.i"
        >
          <button class="item-button" @click="emit('select', item.i)">{{ item.name }}</button>
        </li>
      </ul>

      <slot v-if="isEmpty" name="empty" />

      <slot v-else-if="loading" name="loading" />
    </div>
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

  &.light {
    background-color: white;
  }

  &.dark {
    background-color: var(--dark-theme-color-2);
  }

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

  &.light.focused,
  &.light.selected {
    background-color: #f6f6f6;
  }

  &.dark.focused,
  &.dark.selected {
    background-color: #333640;
  }

  &.light.selected {
    color: var(--accent-1);
  }

  &.dark.selected {
    color: var(--accent-2);
  }
}

.item-button {
  width: 100%;
  justify-content: flex-start;
  color: inherit;
  outline: none;
  border: none;
}
</style>
