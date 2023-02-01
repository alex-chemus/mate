<script lang="ts" setup>
</script>

<template>
  <section class="projects-settings-layout">
    <div class="projects-container">
      <slot name="projects" />
    </div>

    <div class="tabs-container">
      <slot name="tabs" />
    </div>
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
</style>
