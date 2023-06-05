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
  (e: 'set-avatar', payload: FileList): void
  (e: 'set-cover', payload: FileList): void
}>()

const { theme } = useTheme()

const setAvatar = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  emit('set-avatar', e)
}

const setCover = (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  emit('set-cover', e)
}
</script>

<template>
  <div class="images-container">
    <droparea @set="setCover" :stretch="true">
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
      <droparea @set="setAvatar">
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
