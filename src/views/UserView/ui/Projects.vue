<script lang="tsx" setup>
import { ref, defineProps, computed } from 'vue'
import { useTheme } from '@/shared/utils'
import { MoreButton } from '@/shared/ui'
import { FullProject } from '@/shared/types'

const props = defineProps<{
  projects: FullProject[],
  isMe?: boolean
}>()

const { theme } = useTheme()

const shouldTrimProjects = ref(true)
const computedProjects = computed(() => {
  // if (shouldTrimProjects.value) return props.projects
  // else return props.projects.slice(0, 3)
  return shouldTrimProjects.value
    ? props.projects.slice(0, 3)
    : props.projects
})

const Title = () => (
  <h4 class={"text-findcreek text-[14px] text-heading-color-1 font-semibold"}>
    Последние проекты
  </h4>
)
</script>

<template>
  <section v-if="projects.length" class="projects-section" :class="theme">
    <Title />

    <div v-if="!projects.length">У вас нет проектов</div>

    <template v-else>
      <ul class="projects-list" :class="theme">
        <li
          v-for="project in computedProjects" :key="project.id"
          class="project-container" :class="theme"
        >
          <router-link :to="`/project/${project.id}`" :class="theme">
            <img
              v-if="project.avatar.avatarCompressed ?? project.avatar.avatar"
              :src="project.avatar.avatarCompressed ?? project.avatar.avatar"
              alt="" class="icon"
            />
            <div v-else class="icon placeholder" />

            <div class="project-wrapper" :class="theme">
              <h5 class="text-findcreek text-[14px] font-medium m-0">{{ project.name }}</h5>
              <small>
                Начало работ:&#32;
                <span v-if="project.foundationDate">{{ project.foundationDate }}</span>
                <span v-else>???</span>
              </small>
            </div>
          </router-link>
        </li>
      </ul>
      <div v-if="shouldTrimProjects && projects.length > 3" class="more-button-wrapper">
        <more-button @click="shouldTrimProjects = false">
          Ещё
        </more-button>
      </div>
    </template>
  </section>

  <section v-else-if="isMe" class="projects-section" :class="theme">
    <Title />
    <router-link to="/new-project" class="project-form-link">
      Создайте свой первый проект
    </router-link>
  </section>

  <section v-else class="projects-section" :class="theme">
    <h4 class="projects-title" :class="theme">
      Последние проекты
    </h4>

    <p class="message-text">Тут пока ничего нет</p>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.projects-section {
  padding: 15px;
  border: var(--border-2);
  border-radius: 14px;
  background-color: var(--bg-color-2);
  @include flex(flex-start, stretch, column);
  gap: 20px;
}

.projects-title {
  @include findcreek-medium(14px, var(--heading-color-1));

  span {
    @include noto-sans-bold(inherit, var(--text-color-1));
  }
}

.projects-list {
  padding: 0;
  margin: 0;
  list-style: none;
  @include flex(flex-start, stretch, column);
  gap: 12px;
}

.project-container a {
  padding: 20px 23px;
  border-radius: 15px;
  @include flex(flex-start, center);
  transition: var(--fast);
  text-decoration: none;
  background-color: var(--bg-color-3);

  &.light {
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  &.dark:hover,
  &.dark:focus {
    box-shadow: 0 0 20px 0 rgba(0 0 0 / .25);
  }
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 100vmax;
  object-fit: cover;
  margin-right: 12px;

  &.placeholder {
    background-color: color.change($gray-1, $alpha: .25);
  }
}

.project-wrapper {
  color: var(--heading-color-1);

  small {
    @include findcreek(13px, var(--text-color-1));
    letter-spacing: -3%;
  }

  small span {
    font-family: var(--noto-sans);
  }
}

.project-form-link {
  @include findcreek(13px, var(--heading-color-1));
  text-decoration: none;
  transition: var(--fast);

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.message-text {
  @include findcreek(13px, var(--heading-color-1));
}
</style>
