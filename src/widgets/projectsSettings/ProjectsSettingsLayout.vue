<script lang="ts" setup>
import { defineProps } from 'vue'
import { SettingsTab } from './types';

defineProps<{
  currentTab: SettingsTab
}>()
</script>

<template>
  <section class="projects-settings-layout">
    <div class="projects-container">
      <slot name="projects" />
    </div>

    <div class="tabs-container">
      <slot name="tabs" />
    </div>

    <div v-if="currentTab === 'settings'" class="project-section">
      <slot name="images-upload" />
      <slot name="foundation-date" />
    </div>

    <div v-if="currentTab === 'members'" class="members-section">
      <slot name="members-search" />

      <div class="members-container">
        <slot name="members" />
      </div>
    </div>

    <slot name="modal" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.projects-settings-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 170px;
  grid-template-rows: 30px minmax(0, 1fr);
  grid-gap: 30px 45px;
}

.tabs-container {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}

.projects-container {
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
}

.project-section,
.members-section {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
}

.project-section {
  @include flex(flex-start, stretch, column);
  gap: 13px;
}

.members-section {
  @include flex(flex-start, stretch, column);
  gap: 36px;
}

.members-container {
  @include flex(flex-start, stretch, column);
  gap: 25px;
}
</style>
