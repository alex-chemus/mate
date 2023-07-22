<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/shared/ui'

defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <section v-if="loading" class="loader">
    <loader :size="100" />
  </section>

  <main v-else class="main-section">
    <aside>
      <div>
        <slot name="profile-card" />
      </div>

      <div>
        <slot name="contacts" />
      </div>

      <div>
        <slot name="skills" />
      </div>
    </aside>

    <section class="center-container">
      <div class="bio-wrapper">
        <slot name="bio" />
      </div>
      <!-- <slot name="partners" /> -->
      <div class="new-post-wrapper">
        <slot name="new-post" />
      </div>
      <div class="posts-wrapper">
        <slot name="posts" />
        <slot name="posts-observer" />
      </div>
    </section>

    <aside class="project-aside">
      <div>
        <slot name="projects" />
      </div>

      <div>
        <slot name="subscriptions" />
      </div>
    </aside>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.loader {
  @include flex(center, center);
  height: 100vh;
}

// .main-section {
//   @include container;
//   padding-top: 50px;

//   &.--loading {
//     @include flex(center, center);
//     height: 100vh;
//   }
// }

.main-section {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr) 340px;
  grid-gap: 30px;
}

aside {
  & > *:not(:last-child) {
    margin-bottom: 23px;
  }
}

.center-container {
  @include flex(flex-start, stretch, column);
  gap: 25px;
}

.projects-aside {
  & > *:not(:last-child) {
    margin-bottom: 23px;
  }
}

.posts-wrapper {
  @include flex(flex-start, stretch, column);
  gap: 20px;
}
</style>
