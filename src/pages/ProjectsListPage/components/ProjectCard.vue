<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { FullProjectInfo, FullUserInfo } from '@/types'

const props = defineProps<{
  projectInfo: FullProjectInfo,
  authorInfo: FullUserInfo
}>()

const getSubsTitle = computed(() => {
  // return props.projectInfo.subscribersNumber % 10 >= 1 && props.projectInfo.subscribersNumber <= 4
  //   ? 'подписчик'
  //   : 'подписчиков'
  if (props.projectInfo.subscribersNumber === 1) return 'подписчик'
  if (props.projectInfo.subscribersNumber > 1 && props.projectInfo.subscribersNumber < 5) return 'подписчика'
  return 'подписчиков'
})
</script>

<template>
  <router-link :to="`/project/${projectInfo.id}`" class="link">
    <article class="project-card">
      <img
        v-if="projectInfo.avatar.avatar"
        class="banner"
        :src="projectInfo.avatar.avatar"
        alt=""
      />
      <div v-else class="banner" />

      <div class="title-container">
        <img
          class="avatar"
          :src="authorInfo.avatar.avatarCompressed ?? authorInfo.avatar.avatar"
          alt=""
        />
        <div class="title-wrapper">
          <h6>{{ projectInfo.name }}</h6>
          <p>{{ projectInfo.subscribersNumber }} {{ getSubsTitle }}</p>
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
  overflow: hidden;
  @include flex(flex-start, stretch, column);

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
  padding: 10px 20px;
  @include flex(flex-start, center);
  gap: 8px;
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
    margin-bottom: 1px;
    @include findcreek-medium(13px, var(--heading-color-2));
  }

  p {
    @include noto-sans(11px, var(--text-color-1));
  }
}

.button-wrapper {
  margin-left: auto;
  width: min-content;
}
</style>
