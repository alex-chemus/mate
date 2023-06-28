<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, onBeforeUnmount,
  watch, ref, computed, nextTick
} from 'vue'
import { PopupTransition } from '@/shared/hocs';
//import { InputButton, Loader } from '@/shared/ui'
import InputButton from './InputButton.vue'
import Loader from './Loader.vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  items: {
    groupName: string,
    groupItems: {
      id: number,
      value: string
    }[]
  }[] | null,
  loading?: boolean,
  visible?: boolean,
  selected?: number,
  labelText?: string,
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
  (e: 'select', id: number): void
}>()

const getAllItems = computed(() => {
  if (props.items === null) return null
  return props.items.map((i) => i.groupItems).flat()
})

const { theme } = useTheme()

const focusedItem = ref<number | null>(null)
watch(
  () => props.visible,
  () => {
    if (props.selected) focusedItem.value = props.selected
  }
)

const selectRef = ref<HTMLDivElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)

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

  if ((dropdownRef.value && !dropdownRef.value.contains(target))
    && (selectRef.value && !selectRef.value.contains(target))) {
    emit('update:visible', false)
    focusedItem.value = null
  }
}

const adjustScroll = async () => {
  await nextTick()
  const item = document.querySelector('.select-dropdown .item.focused') as HTMLDivElement | null
  if (item === null || dropdownRef.value === null) return

  const { scrollTop, clientHeight } = dropdownRef.value
  const { offsetTop } = item

  // scroll top
  if (scrollTop > offsetTop) {
    let i = 0
    const timer = setInterval(() => {
      if (i >= scrollTop - offsetTop) clearInterval(timer)
      if (dropdownRef.value) dropdownRef.value.scrollTop--
      i++
    }, 2)
  }

  // scroll bottom
  if (offsetTop > scrollTop + clientHeight - 32) {
    let i = 0
    const timer = setInterval(() => {
      if (i >= offsetTop + 32 - scrollTop - clientHeight) clearInterval(timer)
      if (dropdownRef.value) dropdownRef.value.scrollTop++
      i++
    }, 2)
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  if (props.visible && e.key === 'ArrowUp') e.preventDefault()
  if (props.visible && e.key === 'ArrowDown') e.preventDefault()
}

const onKeyUp = (e: KeyboardEvent) => {
  if (!props.visible) return

  if (focusedItem.value === null && getAllItems.value) {
    focusedItem.value = getAllItems.value[0].id
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (getAllItems.value && focusedItem.value === getAllItems.value[0].id && props.items) return
    focusedItem.value!--
    adjustScroll()
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!props.items) return
    if (getAllItems.value && focusedItem.value === getAllItems.value.length - 1) return
    focusedItem.value!++
    adjustScroll()
  }

  if (e.key === 'Enter') {
    if (focusedItem.value && getAllItems.value) {
      const item = getAllItems.value.find((i) => i.id === focusedItem.value)
      if (item) emit('select', item.id)
    }
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

const getValue = computed(() => {
  if (props.selected && getAllItems.value)
    return getAllItems.value[props.selected].value
  return undefined
})

const getPosition = () => {
  if (selectRef.value === null) return null

  const position = selectRef.value.getBoundingClientRect()
  const bottom = position.bottom + window.scrollY
  const left = position.left + window.scrollX

  return `
    top: ${bottom + 10}px;
    left: ${left}px;
  `
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="select-container" ref="selectRef">
    <input-button
      :value="getValue" :disabled="true"
      @update:focused="onFocusChange"
      :text="placeholder ?? ''" :label-text="labelText"
    />
    
    <teleport to="body">
      <div
        v-if="visible" ref="dropdownRef"
        class="select-dropdown" :class="theme"
        :style="getPosition() ?? ''"
        @click="onDropdownClick"
      >
        <popup-transition :group="true">
          <div v-if="loading" class="loader" :key="1">
            <loader />
          </div>

          <ul v-else-if="items && items.length" :key="2">
            <template v-for="(group, i) in items" :key="i">
              <li class="item title">{{ group.groupName }}</li>
              <li
                v-for="item in group.groupItems" :key="item.id"
                class="item" :class="[
                  focusedItem === item.id ? 'focused' : '',
                  theme,
                  selected === item.id ? 'selected' : ''
                ]"
                @mouseover="focusedItem = item.id"
              >
                <button
                  class="item-button"
                  @click="emit('select', item.id)"
                >{{ item.value }}</button>
              </li>
            </template>
          </ul>

          <div
            class="dropdown-text" :class="theme"
            v-else-if="items && items.length === 0"
            :key="3"
          >
            Уфф... Ничего не найдено
          </div>

          <div
            class="dropdown-text" :class="theme"
            v-else-if="items === null"
            :key="4"
          >
            Введите место проживания
          </div>
        </popup-transition>
      </div>
    </teleport>
  </div>
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.select-container {
  position: relative;
  z-index: 2;
}

.select-dropdown {
  position: absolute;
  // top: 100%;
  // left: 0;
  // transform: translateY(10px);
  cursor: pointer;

  border-radius: 8px;
  box-shadow: var(--popup-shadow);
  padding: 10px;
  width: max-content;
  max-height: 150px;
  overflow-y: scroll;
  background-color: var(--bg-color-1);
  overscroll-behavior: contain;

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

  &.title {
    margin-left: 10px;
    @include findcreek(13px, var(--text-color-1));
  }
}

.item-button {
  width: 100%;
  justify-content: flex-start;
  color: inherit;
  outline: none;
  border: none;
  @include findcreek(12px, var(--heading-color-1));
}

.dropdown-text {
  @include findcreek(15px, var(--heading-color-1));
  letter-spacing: -0.01em;
}

.loader {
  @include flex(center, center);
}
</style>
