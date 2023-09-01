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
      <slot name="bio" />
      <!-- <slot name="partners" /> -->
      <div class="new-post-wrapper">
        <slot name="new-post" />
      </div>
      <div class="posts-wrapper">
        <slot name="posts" />
        <slot name="posts-observer" />
      </div>
    </section>

    <aside class="projects-aside">
      <slot name="projects" />

      <slot name="subscriptions" />
    </aside>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.loader {
  @include flex(center, center);
  height: 100vh;
}

.main-section {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr) 340px;
  grid-gap: 15px;

  @include xl {
    grid-template-columns: minmax(0, 1fr) 340px;
    grid-template-rows: min-content 1fr;
  }

  @include lg {
    @include flex(flex-start, stretch, column);
    gap: 5px;
  }
}

aside {
  @include flex(flex-start, stretch, column);
  gap: 15px;
}

.center-container {
  @include flex(flex-start, stretch, column);
  gap: 15px;
}

.projects-aside {
  @include xl {
    grid-row: 1 / span 2;
    grid-column: 2 / 3;
  }

  @include lg {
    display: none;
  }
}

.posts-wrapper {
  @include flex(flex-start, stretch, column);
  gap: 15px;
}

.new-post-wrapper,
.posts-wrapper {
  @include xl {
    width: max(80%, 550px);
    margin: 0 auto;
  }

  @include md {
    width: 100%;
  }
}
</style>
