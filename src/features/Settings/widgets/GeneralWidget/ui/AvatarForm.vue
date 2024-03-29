<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { useTheme } from '@/shared/utils'
import { Droparea } from '@/shared/hocs'

const props = defineProps<{
  img?: string,
  fullName: string,
  textId: string
}>()

const emit = defineEmits<{
  (e: 'set-avatar', files: FileList): void
}>()

const { theme } = useTheme()

const updatedImg = ref<string | null>(null)

const getImg = computed(() => {
  return updatedImg.value ?? props.img
})

const setAvatar = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  updatedImg.value = URL.createObjectURL(e[0])
  emit('set-avatar', e)
}
</script>

<template>
  <div class="droparea-container">
    <droparea @set="setAvatar" :is-images="true">
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
    <div class="name-wrapper">
      <h5 class="name" :class="theme">{{ fullName }}</h5>
      <p class="text-id" :class="theme">@{{ textId }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.droparea {
  border-radius: 100vmax;
  height: 90px;
  aspect-ratio: 1;
  @include flex(center, center);
  color: var(--light);
  cursor: pointer;
}

.droparea-container {
  @include flex(flex-start, center);
  gap: 12px;
}

.name {
  @include findcreek-medium(20px, var(--heading-color-2));
  margin: 0;
  margin-bottom: 5px;
}

.text-id {
  @include noto-sans(14px, var(--text-color-1));
}
</style>
