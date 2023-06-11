<script lang="ts" setup>
import { FullProjectInfo, FullVacancyInfo } from '@/types'
import { defineProps, defineEmits, computed } from 'vue'
import Gallery from './Gallery.vue'
import Files from './Files.vue'

const props = defineProps<{
  vacancy: FullVacancyInfo,
  project: FullProjectInfo
}>()

const emit = defineEmits<{
  (e: 'toggle-like', payload: boolean): void
}>()

const getDate = computed(() => {
  const arr = props.vacancy.date.date.split(' ')
  return [
    arr[0], arr[1].slice(0, 5)
  ].join(' ')
})
</script>

<template>
  <section class="vacancy-section">
    <div class="top-container">
      <div class="project">
        <img
          :src="project.avatar.avatarCompressed ?? project.avatar.avatar" alt=""
          class="project-logo"
        />
        <div class="project-wrapper">
          <h6>{{ project.name }}</h6>
          <p>@{{ project.textID }}</p>
        </div>
      </div>
      <p class="date">{{ getDate }}</p>
      <button
        class="like-button" :class="{ 'liked': vacancy.isLiked }"
        @click="emit('toggle-like', !vacancy.isLiked)"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-heart" />
        </svg>
      </button>
    </div>

    <div class="content-container">
      <h5 class="title">{{ vacancy.title }}</h5>
      <div class="skills-wrapper">
        <p>Навыки:</p>
        <ul class="skills-list">
          <li
            v-for="(skill, i) in vacancy.skills.split(',')" :key="i"
            class="skill"
          >{{ skill }}</li>
        </ul>
      </div>
      <p class="text">{{ vacancy.description }}</p>

      <gallery
        :images="vacancy.media.filter((m) => m.additionalData.fileType === 'image')"
      />
      <div
        class="files-wrapper"
        v-if="vacancy.media.filter((m) => m.additionalData.fileType !== 'image').length"
      >
        <files
          :files="vacancy.media.filter((m) => m.additionalData.fileType !== 'image')"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.vacancy-section {
  padding: 22px;
  border: 1px solid var(--accent);
  border-radius: 8px;
  align-self: start;
}

.top-container {
  @include flex(space-between, center);
}

.project {
  @include flex(flex-start, center);
  gap: 11px;
}

.project-logo {
  height: 40px;
  aspect-ratio: 1;
  border-radius: 7px;
}

.project-wrapper {
  @include flex(flex-start, flex-start, column);
  gap: 4px;

  h6 {
    @include findcreek-medium(14px, var(--heading-color-2));
    margin: 0;
  }

  p {
    margin: 0;
    @include findcreek-medium(12.5px, var(--heading-color-2));
  }
}

.date {
  margin-left: 25px;
  margin-right: auto;
  @include findcreek(13px, var(--text-color-1));
  letter-spacing: -0.03em;
}

.like-button {
  border-radius: 100vmax;
  @include flex(center, center);
  width: 33px;
  aspect-ratio: 1;
  color: var(--text-color-1);
  transition: var(--fast);

  &.liked {
    color: var(--light);
    background-color: var(--red);
  }
}

.content-container {
  padding: 20px;
}

.title {
  @include findcreek-medium(20px, var(--heading-color-2));
  margin: 0;
}

.skills-wrapper {
  @include flex(flex-start, baseline);
  gap: 12px;

  p {
    @include findcreek-medium(14px, var(--heading-color-1));
    letter-spacing: -0.03em;
  }
}

.skills-list {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex(flex-start, center);
  gap: 6px;
}

.skill {
  height: 20px;
  padding: 0 8px;
  @include flex(center, center);
  background-color: var(--accent);
  @include findcreek-medium(11px, var(--light));
  border-radius: 100vmax;
  margin: 26px 0 18px;
}

.text {
  @include findcreek-medium(14px, var(--text-color-1));
  letter-spacing: -0.02em;
  line-height: 1.4em;
  margin-bottom: 30px;
}

.files-wrapper {
  margin-top: 20px;
}
</style>
