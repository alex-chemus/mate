<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { FullProject, FullUser } from '@/shared/types'

const props = defineProps<{
  project: FullProject,
  author: FullUser
}>()

const getSubsTitle = computed(() => {
  if (props.project.subscribersNumber === 1) return 'подписчик'
  if (props.project.subscribersNumber > 1 && props.project.subscribersNumber < 5) return 'подписчика'
  return 'подписчиков'
})
</script>

<template>
  <router-link :to="`/project/${project.id}`" class="link">
    <article class="project-card">
      <img
        v-if="project.avatar.avatar"
        class="banner"
        :src="project.avatar.avatar"
        alt=""
      />
      <div v-else class="banner" />

      <div class="title-container">
        <img
          class="avatar"
          :src="author.avatar.avatarCompressed ?? author.avatar.avatar"
          alt=""
        />
        <div class="title-wrapper">
          <h6>{{ project.name }}</h6>
          <p>{{ project.subscribersNumber }} {{ getSubsTitle }}</p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.link {
  text-decoration: none;
}

.project-card {
  height: 218px;
  border-radius: 6px;
  transition: var(--fast);
  border: var(--border-2);
  background-color: var(--bg-color-2);
  overflow: hidden;
  @include flex(flex-start, stretch, column);
  transition: var(--fast);

  &:is(:hover, :focus) {
    box-shadow: var(--hover-block-shadow);
  }

  &:hover {
    border: 1px solid var(--accent);
  }
}

.banner {
  //height: 165px;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  background-color: var(--gray-1);
}

.title-container {
  padding: 11px 20px;
  @include flex(flex-start, center);
  gap: 10px;
}

.avatar {
  width: 32px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  object-fit: cover;
}

.title-wrapper {
  h6 {
    margin: 0;
    margin-bottom: 2px;
    @include findcreek-medium(14px, var(--heading-color-1));
  }

  p {
    @include findcreek(12px, var(--text-color-2));
  }
}

.button-wrapper {
  margin-left: auto;
  width: min-content;
}
</style>
