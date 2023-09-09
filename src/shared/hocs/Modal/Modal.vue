<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { IconX } from '@tabler/icons-vue'
import PopupTransition from '../PopupTransition.vue'
import BackdropTransition from '../BackdropTransition.vue'

const props = defineProps<{
  visible: boolean,
  width?: number | string,
  zIndexFactor?: number,
  fixedHeight?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
}>()

const onEsc = (e: KeyboardEvent) => {
  if (props.visible && e.key === 'Escape')
    emit('update:visible', false)
}

const setBodyStyle = () => {
  const { scrollY } = window
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${scrollY}px`
}

const resetBodyStyle = () => {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
}

watch(() => props.visible, () => {
  if (props.visible) setBodyStyle()
  else resetBodyStyle()
})

onMounted(() => {
  document.addEventListener('keyup', onEsc)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onEsc)
})

const getModalStyle = computed(() => [
  props.width ? `width: ${props.width}px` : '',
  props.zIndexFactor ? `z-index: ${1000 + props.zIndexFactor * 2}` : '',
  props.fixedHeight ? 'height: 90vh; min-height: 0' : ''
].join(';'))
</script>

<template>
  <teleport to="body">
    <backdrop-transition>
      <div
        v-if="visible"
        class="modal__backdrop"
        @click="emit('update:visible', false)"
        :style="zIndexFactor ? `z-index: ${999 + zIndexFactor * 2}` : ''"
      />
    </backdrop-transition>

    <popup-transition>
      <div v-if="visible" class="modal" :style="getModalStyle">
        <button class="modal__close-button" @click="emit('update:visible', false)">
          <icon-x width="30" height="30" />
        </button>

        <slot />
      </div>
    </popup-transition>
  </teleport>
</template>

<style scoped lang="scss" src="./Modal.scss" />