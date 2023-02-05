<script lang="ts" setup>
</script>

<template>
  <form
    action="" @submit="e => e.preventDefault()"
    class="profile-settings-layout"
  >
    <div class="fields-container">
        <div class="images-wrapper">
        <slot name="images-upload" />
      </div>

      <div class="bio-wrapper">
        <slot name="bio" />
      </div>

      <div class="media-wrapper">
        <slot name="media" />
      </div>

      <slot name="specialties" />
      <slot name="skills" />
    </div>

    <div class="save-button-wrapper">
      <slot name="save-button" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.profile-settings-layout {
  @include flex(flex-start, stretch, column);
}

.fields-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: 16px 13px;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
}

.images-wrapper,
.bio-wrapper,
.media-wrapper {
  grid-column: 1 / span 2;
}

.save-button-wrapper {
  margin-top: auto;
}
</style>
