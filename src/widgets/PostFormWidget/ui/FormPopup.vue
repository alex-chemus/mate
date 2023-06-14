<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { useDebounce } from '@/utils'

const props = defineProps<{
  visible: boolean
}>()

const isOpen = ref(false)
const { debounced } = useDebounce(() => {
  isOpen.value = props.visible
}, 50)
watch(() => props.visible, debounced)
</script>

<template>
  <div class="popup" v-show="isOpen">
    <div class="icon">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-download" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.popup {
  width: 80%;
  height: 90%;
  // width: 100%;
  // height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //z-index: 1;
  @include flex(center, center);
  background-color: rgb(82 85 91 / .8);
  border-radius: 13px;
}

.icon {
  width: 70px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  border: 1px dashed var(--light);
  color: var(--light);
  @include flex(center, center);
}
</style>
