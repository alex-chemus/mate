<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullProject } from '@/shared/types'

defineProps<{
  fullProject: FullProject
}>()
</script>

<template>
  <div class="title-container">
    <img
      class="avatar"
      :src="fullProject.avatar.avatarCompressed ?? fullProject.avatar.avatar"
      alt=""
    />
    <div class="title-wrapper">
      <h6 class="heading">{{ fullProject.name }}</h6>
      <p class="nametag">@{{ fullProject.textID }}</p>
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
