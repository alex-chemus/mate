<script lang="ts" setup>
import { IconBriefcase, IconUserCircle, IconSearch } from '@tabler/icons-vue'
import { useUserState } from '@/shared/utils'
import { useRouting } from './hooks'

const userState = useUserState()
const { currentTab } = useRouting()
</script>

<template>
  <section class="mobile-nav" :class="[{ active: currentTab === 'vacancies' }]">

    <router-link to="/projects-list" class="nav-button" :class="[{ active: currentTab === 'projects' }]">
      <icon-briefcase />
    </router-link>

    <router-link to="/global-search" class="nav-button" :class="[{ active: currentTab === 'search' }]">
      <icon-search />
    </router-link>

    <router-link :to="`/user/${userState.id}`" class="nav-button" :class="[{ active: currentTab === 'profile' }]">
      <icon-user-circle />
    </router-link>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/style.scss';

.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: var(--bg-color-2);
  border-top: var(--border-2);
  box-shadow: var(--hover-block-shadow);
  z-index: 2;

  & > * {
    flex-grow: 1;
  }

  @include lg {
    @include flex(space-between, stretch);
  }
}

.nav-button {
  transition: var(--fast);
  color: var(--heading-color-1);
  @include flex(center, center);

  &:is(:hover, :active, .active) {
    color: var(--accent);
  }
}
</style>
