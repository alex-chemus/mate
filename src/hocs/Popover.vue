<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, onBeforeUnmount, ref
} from 'vue'
import PopupTransition from './PopupTransition.vue'

const props = defineProps<{
  visible: boolean,
  placement: 'top-left' | 'top' | 'top-right'
  | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
}>()

const popover = ref<HTMLDivElement | null>(null)
const popoverWrapper = ref<HTMLDivElement | null>(null)

const clickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!props.visible || popoverWrapper.value === null) return
  if (!popoverWrapper.value?.contains(target) && !popover.value?.contains(target))
    emit('update:visible', false)
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickHandler)
})

const getPosition = () => {
  if (!popoverWrapper.value) return null

  const position = popoverWrapper.value.getBoundingClientRect()
  const top = position.top + window.scrollY
  const bottom = position.bottom + window.scrollY
  const left = position.left + window.scrollX
  const right = position.right + window.scrollX

  switch (props.placement) {
    case 'top': return `
      top: ${top - 10}px;
      left: ${left + (right - left) / 2}px;
      transform: translate(-50%, -100%);
    `

    case 'top-right': return `
      top: ${top - 10}px;
      left: ${left}px;
      transform: translateY(-100%);
    `

    case 'right': return `
      top: ${top}px;
      left: ${right + 10}px;
    `

    case 'bottom-right': return `
      top: ${bottom + 10}px;
      left: ${left}px;
    `

    case 'bottom': return `
      top: ${bottom + 10}px;
      left: ${left + (right - left) / 2}px;
      transform: translateX(-50%);
    `

    case 'bottom-left': return `
      top: ${bottom + 10}px;
      left: ${right}px;
      transform: translateX(-100%);
    `

    case 'left': return `
      top: ${top}px;
      left: ${left - 10}px;
      transform: translateX(-100%);
    `

    case 'top-left': return `
      top: ${top - 10}px;
      left: ${right}px;
      transform: translate(-100%, -100%);
    `

    default: return null
  }
}
</script>

<template>
  <div class="popover-wrapper" ref="popoverWrapper">
    <slot name="button" />
    <teleport to="body">
      <div
        ref="popover"
        class="popover" :class="placement"
        :style="getPosition() ?? ''"
      >
        <popup-transition>
          <slot v-if="visible" name="content" />
        </popup-transition>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.popover {
  position: absolute;
  width: max-content;
  z-index: 100;
}
</style>
