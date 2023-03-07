<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullProjectInfo, FullVacancyInfo } from '@/types'

defineProps<{
  vacancy: FullVacancyInfo,
  projectInfo: FullProjectInfo
}>()
</script>

<template>
  <article class="card-vacancy">
    <div class="logo">
      <img
        :src="projectInfo.avatar.avatarCompressed ?? projectInfo.avatar.avatar" alt=""
        class="project-logo"
      />
      {{ vacancy.title }}
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.card-vacancy {
  border-radius: 8px;
  border: var(--border-2);
  padding: 19px;
}

.project-logo {
  height: 40px;
  aspect-ratio: 1;
  border-radius: 7px;
}
</style>
