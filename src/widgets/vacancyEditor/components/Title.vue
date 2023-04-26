<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullProjectInfo } from '@/types'

defineProps<{
  fullProjectInfo: FullProjectInfo
}>()
</script>

<template>
  <div class="title-container">
    <img
      class="avatar"
      :src="fullProjectInfo.avatar.avatarCompressed ?? fullProjectInfo.avatar.avatar"
      alt=""
    />
    <div class="title-wrapper">
      <h6 class="heading">{{ fullProjectInfo.name }}</h6>
      <p class="nametag">@{{ fullProjectInfo.textID }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.title-container {
  @include flex(flex-start, center);
  gap: 11px;
}

.avatar {
  width: 40px;
  aspect-ratio: 1;
  border-radius: 6px;
}

.heading {
  @include findcreek-medium(14px, var(--heading-color-2));
  margin-bottom: 4px;
}

.nametag {
  @include findcreek(12px, var(--heading-color-2));
}
</style>
