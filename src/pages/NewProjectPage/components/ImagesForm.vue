<script lang="ts" setup>
import {
  defineEmits, ref
} from 'vue'
import { useTheme } from '@/utils'
import { Droparea } from '@/hocs'

const emit = defineEmits<{
  (e: 'upload-avatar', payload: FileList): void
  (e: 'upload-cover', payload: FileList): void
}>()

const { theme } = useTheme()

const updatedAvatar = ref<string | null>(null)
const updatedCover = ref<string | null>(null)

// const getAvatar = computed(() => {
//   return updatedAvatar.value
// })

// const getCover = computed(() => {
//   return updatedCover.value ?? props.cover
// })

const emitUploadAvatar = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  updatedAvatar.value = URL.createObjectURL(e[0])
  emit('upload-avatar', e)
}

const emitUploadCover = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  updatedCover.value = URL.createObjectURL(e[0])
  emit('upload-cover', e)
}
</script>

<template>
  <div class="images-container">
    <droparea @upload="emitUploadCover" :stretch="true">
      <div class="cover" :class="theme" :style="`
        background: ${ updatedCover ? updatedCover : 'var(--gray-1)' };
        background-position: center;
        background-size: cover;
        box-shadow: inset 0 0 0 100vmax ${ updatedCover ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' };
      `">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
        </svg>
        <span>Загрузить обложку</span>
      </div>
    </droparea>

    <div class="avatar-wrapper">
      <droparea @upload="emitUploadAvatar">
        <div class="avatar" :class="theme" :style="`
          background: ${ updatedAvatar ? updatedAvatar : 'var(--gray-1)' };
          background-position: center;
          background-size: cover;
          box-shadow:
            inset 0 0 0 100vmax ${ updatedAvatar ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' },
            0 0 9px 0 rgb(0 0 0 / .25);
        `">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
          </svg>
        </div>
      </droparea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.cover,
.avatar {
  width: 100px;
  height: 100px;
}

.cover {
  height: 100px;
  width: 100%;
  border-radius: 13px;
  @include findcreek-medium(14px, var(--light));
  letter-spacing: -0.03em;
  @include flex(center, center);
  gap: 9px;
  border: 1px dashed var(--bg-color-1);
}

.avatar {
  width: 100px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  @include flex(center, center);
  color: var(--light);
  // box-shadow: ;

  &.light {
    border: 2px solid var(--light);
  }

  &.dark {
    border: 2px solid #262837;
  }
}

.avatar-wrapper {
  @include flex(flex-start, flex-end);
  gap: 16px;
  margin-top: -46px;
  margin-left: 51px;
}

.name {
  @include findcreek-medium(16px, var(--heading-color-1));
  margin: 0;
  margin-bottom: 20px;
}
</style>
