<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
import { Droparea } from '@/hocs'

const props = defineProps<{
  img?: string
}>()

const updatedImg = ref<string | null>(null)

const getImg = computed(() => {
  return updatedImg.value ?? props.img
})

const onUpload = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  updatedImg.value = URL.createObjectURL(e[0])
}
</script>

<template>
  <droparea @upload="onUpload">
    <div class="droparea" :style="`
      background: ${ getImg && `url('${getImg}');` };
      background-position: center;
      background-size: cover;
      box-shadow: inset 0 0 0 100vmax ${ getImg ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' };
    `">
      <svg width="36" height="36" viewBox="0 0 36 36">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
      </svg>
    </div>
  </droparea>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.droparea {
  border-radius: 100vmax;
  height: 90px;
  aspect-ratio: 1;
  @include flex(center, center);
  color: var(--light);
}
</style>
