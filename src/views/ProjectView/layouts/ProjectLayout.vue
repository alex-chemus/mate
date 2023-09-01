<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/shared/ui'

defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <section v-if="loading" class="main-section --loading">
    <loader :size="100" />
  </section>

  <section v-else class="main-section">
    <main class="main-container">
      <aside>
        <div>
          <slot name="profile-card" />
        </div>
      </aside>

      <section class="center-container | flex flex-col lg:gap-[25px] gap-[20px]">
        <slot name="about" />
        <slot name="partners" />
        <div class="new-post-wrapper">
          <slot name="new-post" />
        </div>
        <div class="posts-wrapper">
          <slot name="posts" />
          <slot name="posts-observer" />
        </div>
      </section>

      <aside class="projects-aside">
        <div>
          <slot name="employees" />
        </div>
      </aside>
    </main>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.main-section {
  &.--loading {
    @include flex(center, center);
  }
}

.main-container {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr) 340px;
  grid-gap: 30px;

  @include xl {
    grid-template-columns: minmax(0, 1fr) 340px;
    grid-template-rows: min-content 1fr;
  }

  @include lg {
    @include flex(flex-start, stretch, column);
    gap: 20px;
  }
}

.center-container {
  @include xl {
    width: max(80%, 550px);
    margin: 0 auto;
  }

  @include md {
    width: 100%;
  }
}

aside {
  & > *:not(:last-child) {
    margin-bottom: 23px;
  }
}

.projects-aside {
  & > *:not(:last-child) {
    margin-bottom: 23px;
  }

  @include xl {
    grid-row: 1 / span 2;
    grid-column: 2 / 3;
  }

  @include lg {
    display: none;
  }
}
</style>
