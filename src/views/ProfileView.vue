<script lang="ts" setup>
import { CommonHeader } from '@/features/CommonHeader'
import {
  ProfileCard, Subscriptions, Partners, NewPost,
} from '@/features/profile'
import { Post } from '@/features/post'
</script>

<template>
  <section class="main-section">
    <common-header />

    <main class="main-container">
      <aside>
        <profile-card />
        <subscriptions />
      </aside>

      <section class="center-container">
        <partners />
        <div class="new-post-wrapper">
          <new-post />
        </div>
        <post />
      </section>
    </main>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/style.scss';

.main-section {
  @include container;
  padding-top: 50px;
}

.main-container {
  display: grid;
  grid-template-columns: 325px minmax(0, 1fr) 325px;
  grid-gap: 24px;
  margin-top: 40px;
}

aside {
  & > *:not(:last-child) {
    margin-bottom: 23px;
  }
}

.new-post-wrapper {
  margin: 18px 0 28px;
}
</style>
