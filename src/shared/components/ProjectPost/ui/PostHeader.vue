<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  avatar: string,
  author: string,
  authorId: number,
  textId: string,
  dateString: string
}>()
</script>

<template>
  <header>
    <div class="title-container">
      <img :src="avatar" alt="" class="avatar" />

      <div class="author-wrapper">
        <h6 class="author">
          <router-link :to="`/user/${authorId}`">{{ author }}</router-link>
        </h6>
        <p class="text-id">
          @{{ textId }}
        </p>
      </div>
    </div>

    <p class="date-tag">{{ dateString }}</p>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

header {
  @include flex(space-between, flex-start);
}

.title-container {
  @include flex(flex-start, center);
  gap: 10px;
}

.avatar {
  width: 40px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  object-fit: cover;
  background-color: var(--gray-1);
}

.author-wrapper {
  & > *:not(:last-child) {
    margin-bottom: 3px;
  }
}

.author {
  @include findcreek-medium(14px, var(--heading-color-1));
  margin: 0;
  margin-bottom: 4px;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.text-id {
  @include findcreek(12px, var(--text-color-2));
}

.date-tag {
  background-color: var(--bg-color-3);
  height: 20px;
  padding: 0 10px;
  @include flex(center, center);
  @include findcreek(11px, var(--text-color-2));
  border-radius: 100vmax;
}
</style>
