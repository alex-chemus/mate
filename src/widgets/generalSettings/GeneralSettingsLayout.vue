<script lang="ts" setup>
</script>

<template>
  <form
    action="" @submit="e => e.preventDefault()"
    class="general-settings-section"
  >
    <div class="avatar-container">
      <slot name="avatar-upload" />
      <slot name="info" />
    </div>

    <div class="inputs-container">
      <slot name="first-name" />

      <slot name="last-name" />

      <slot name="patronymic" />

      <slot name="text-id" />

      <div class="input-wrapper">
        <slot name="sex" />
      </div>

      <div class="input-wrapper">
        <slot name="date-of-birth" />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.general-settings-section {
  @include flex(flex-start, stretch, column);
  gap: 30px;
}

.avatar-container {
  @include flex(space-between, center);
}

.inputs-container {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 15px;
}

.input-wrapper {
  grid-column: 1 / span 2;
}
</style>
