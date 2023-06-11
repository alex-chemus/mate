<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  avatar: string,
  author: string,
  authorId: number,
  authorTextId: string,
  dateString: string
}>()
</script>

<template>
  <header>
    <div class="author-container">
      <img :src="avatar" alt="" class="avatar" />

      <div class="author-wrapper">
        <h6 class="author">
          <router-link :to="`/user/${authorId}`">{{ author }}</router-link>
        </h6>
        <p class="text-id">
          @{{ authorTextId }}
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

.author-container {
  @include flex(flex-start, center);
  gap: 11px;
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
  @include findcreek-medium(13px, var(--heading-color-2));
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.text-id {
  @include findcreek(11px, var(--heading-color-2));
  letter-spacing: -0.025em;
}

// .author {
//   font-family: var(--findcreek);
//   font-size: 11px;
//   color: var(--text-color-1);
//   letter-spacing: -0.025em;

//   a {
//     text-decoration: none;
//     color: inherit;
//   }

//   strong {
//     font-family: var(--findcreek-medium);
//     font-weight: 500;
//     color: var(--heading-color-2)
//   }
// }

.date-tag {
  background-color: var(--bg-color-3);
  height: 20px;
  padding: 0 10px;
  @include flex(center, center);
  font-family: var(--findcreek);
  font-size: 11px;
  letter-spacing: -0.03em;
  color: var(--text-color-1);
  border-radius: 100vmax;
}
</style>
