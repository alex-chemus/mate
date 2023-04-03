<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'
import { Droparea } from '@/hocs'

defineProps<{
  avatar: string,
  cover: string
  fullName: string
}>()

const emit = defineEmits<{
  (e: 'update-avatar', payload: FileList): void
  (e: 'update-cover', payload: FileList): void
}>()

const { theme } = useTheme()

const onAvatarUpdate = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  emit('update-avatar', e)
}

const onCoverUpdate = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  emit('update-cover', e)
}
</script>

<template>
  <div class="images-container">
    <droparea @upload="onCoverUpdate" :stretch="true">
      <div class="cover" :class="theme" :style="`
        background: ${ cover && `url('${cover}');` };
        background-position: center;
        background-size: cover;
        box-shadow: inset 0 0 0 100vmax ${ cover ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' };
      `">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
        </svg>
        <span>Загрузить обложку</span>
      </div>
    </droparea>

    <div class="avatar-wrapper">
      <droparea @upload="onAvatarUpdate">
        <div class="avatar" :class="theme" :style="`
          background: ${ avatar && `url('${avatar}');` };
          background-position: center;
          background-size: cover;
          box-shadow:
            inset 0 0 0 100vmax ${ avatar ? 'rgb(0 0 0 / .4)' : 'var(--gray-1)' },
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
