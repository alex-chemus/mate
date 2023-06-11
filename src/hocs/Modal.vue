<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, onBeforeUnmount
} from 'vue'
import PopupTransition from './PopupTransition.vue'
import BackdropTransition from './BackdropTransition.vue'

const props = defineProps<{
  visible: boolean,
  width?: number | string,
  zIndexFactor?: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
}>()

const onEsc = (e: KeyboardEvent) => {
  if (props.visible && e.key === 'Escape')
    emit('update:visible', false)
}

onMounted(() => {
  document.addEventListener('keyup', onEsc)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onEsc)
})
</script>

<template>
  <teleport to="body">
    <backdrop-transition>
      <!-- eslint-disable-next-line -->
      <div
        v-if="visible"
        class="backdrop"
        @click="emit('update:visible', false)"
        :style="zIndexFactor ? `z-index: ${999 + zIndexFactor * 2}` : ''"
      />
    </backdrop-transition>

    <popup-transition>
      <div v-if="visible" class="modal" :style="[
        width ? `width: ${width}px` : '',
        zIndexFactor ? `z-index: ${1000 + zIndexFactor * 2}` : ''
      ].join(';')">
        <slot />
      </div>
    </popup-transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.modal {
  position: fixed;
  //z-index: 1000;
  width: max-content;
  max-width: 90vw;
  max-height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overscroll-behavior: contain;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  //z-index: 999;
  width: 100vw;
  height: 100vw;
  background-color: rgb(41 43 56 / .7);
  overscroll-behavior: contain;
}
</style>
