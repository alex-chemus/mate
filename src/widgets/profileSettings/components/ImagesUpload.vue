<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { useTheme } from '@/utils'
import { Droparea } from '@/hocs'

const props = defineProps<{
  avatar: string,
  cover: string
  fullName: string,
  textId: string
}>()

const emit = defineEmits<{
  (e: 'upload-avatar', payload: FileList): void
  (e: 'upload-cover', payload: FileList): void
}>()

const { theme } = useTheme()

const updatedAvatar = ref<string | null>(null)
const updatedCover = ref<string | null>(null)

const getAvatar = computed(() => {
  return updatedAvatar.value ?? props.avatar
})

const getCover = computed(() => {
  return updatedCover.value ?? props.cover
})

const onAvatarUpload = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  updatedAvatar.value = URL.createObjectURL(e[0])
  emit('upload-avatar', e)
}

const onCoverUpload = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  updatedCover.value = URL.createObjectURL(e[0])
  emit('upload-cover', e)
}
</script>

<template>
  <div class="images-container">
    <droparea @upload="onCoverUpload" :stretch="true">
      <div class="cover" :class="theme" :style="`
        background: ${ getCover && `url('${getCover}');` };
        background-position: center;
        background-size: cover;
        box-shadow: inset 0 0 0 100vmax ${ getCover ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' };
      `">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
        </svg>
        <span>Загрузить обложку</span>
      </div>
    </droparea>

    <div class="avatar-wrapper">
      <droparea @upload="onAvatarUpload">
        <div class="avatar" :class="theme" :style="`
          background: ${ getAvatar && `url('${getAvatar}');` };
          background-position: center;
          background-size: cover;
          box-shadow:
            inset 0 0 0 100vmax ${ getAvatar ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' },
            0 0 9px 0 rgb(0 0 0 / .25);
        `">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
          </svg>
        </div>
      </droparea>
      <h5 class="name" :class="theme">{{ fullName }}</h5>
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
  font-family: var(--findcreek-medium);
  font-size: 14px;
  letter-spacing: -0.03em;
  color: var(--light);
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
  font-size: 16px;
  font-family: var(--findcreek-medium);
  font-weight: var(--medium);
  margin: 0;
  margin-bottom: 20px;
  color: var(--heading-color-1);
}
</style>
