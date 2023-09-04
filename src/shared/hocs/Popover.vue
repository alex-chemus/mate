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

const handlePageClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!props.visible || popoverWrapper.value === null) return

  if (!popoverWrapper.value?.contains(target) && !popover.value?.contains(target)) {
    emit('update:visible', false)
  }
}

const handlePageScroll = () => {
  calcPopoverPosition()
}

onMounted(() => {
  calcPopoverPosition()
  document.addEventListener('click', handlePageClick)
  document.addEventListener('scroll', handlePageScroll)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handlePageClick)
  document.removeEventListener('scroll', handlePageScroll)
})

const position = ref<string | null>(null)

const calcPopoverPosition = () => {
  if (!popoverWrapper.value) return null

  const wrapperPosition = popoverWrapper.value.getBoundingClientRect()
  const top = wrapperPosition.top + window.scrollY
  const bottom = wrapperPosition.bottom + window.scrollY
  const left = wrapperPosition.left + window.scrollX
  const right = wrapperPosition.right + window.scrollX

  switch (props.placement) {
    case 'top': position.value = `
      top: ${top - 10}px;
      left: ${left + (right - left) / 2}px;
      transform: translate(-50%, -100%);
    `
    break

    case 'top-right': position.value = `
      top: ${top - 10}px;
      left: ${left}px;
      transform: translateY(-100%);
    `
    break

    case 'right': position.value = `
      top: ${top}px;
      left: ${right + 10}px;
    `
    break

    case 'bottom-right': position.value = `
      top: ${bottom + 10}px;
      left: ${left}px;
    `
    break

    case 'bottom': position.value = `
      top: ${bottom + 10}px;
      left: ${left + (right - left) / 2}px;
      transform: translateX(-50%);
    `
    break

    case 'bottom-left': position.value = `
      top: ${bottom + 10}px;
      left: ${right}px;
      transform: translateX(-100%);
    `
    break

    case 'left': position.value = `
      top: ${top}px;
      left: ${left - 10}px;
      transform: translateX(-100%);
    `
    break

    case 'top-left': position.value = `
      top: ${top - 10}px;
      left: ${right}px;
      transform: translate(-100%, -100%);
    `
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
        :style="position ?? ''"
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
