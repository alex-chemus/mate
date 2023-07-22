<script lang="ts" setup>
import { FullProject, FullVacancy } from '@/shared/types'
import { defineProps, computed } from 'vue'
import { Files, Gallery } from '../ui'

const props = defineProps<{
  vacancy: FullVacancy,
  project: FullProject
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
      <div class="like-wrapper">
        <slot name="like-button" />
      </div>
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
  background-color: var(--bg-color-3);
}

.top-container {
  @include flex(space-between, flex-start);
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
    @include findcreek-medium(14px, var(--heading-color-1));
    margin: 0;
  }

  p {
    margin: 0;
    @include findcreek(12px, var(--text-color-1));
  }
}

.date {
  margin-left: 18px;
  margin-right: auto;
  @include findcreek(12px, var(--text-color-1));
  // letter-spacing: -0.03em;
}

.like-wrapper {
  align-self: center;
}

// .like-button {
//   border-radius: 100vmax;
//   @include flex(center, center);
//   width: 33px;
//   aspect-ratio: 1;
//   color: var(--text-color-1);
//   transition: var(--fast);

//   &.liked {
//     color: var(--light);
//     background-color: var(--red);
//   }
// }

.content-container {
  padding: 20px;
  padding-top: 30px;
}

.title {
  @include findcreek-medium(20px, var(--heading-color-2));
  margin: 0;
  margin-bottom: 25px;
}

.skills-wrapper {
  @include flex(flex-start, baseline);
  gap: 12px;
  margin-bottom: 20px;

  p {
    @include findcreek-medium(14px, var(--heading-color-1));
    // letter-spacing: -0.03em;
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
  // margin: 26px 0 18px;
}

.text {
  @include findcreek-medium(14px, var(--text-color-1));
  // letter-spacing: -0.02em;
  line-height: 1.4em;
  margin-bottom: 20px;
}

.files-wrapper {
  margin-top: 20px;
}
</style>
