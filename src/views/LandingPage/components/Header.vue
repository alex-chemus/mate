<script lang="ts" setup>
import { useTheme } from '@/shared/utils'
import { Logo } from '@/shared/ui'
import ThemeSwitcher from './ThemeSwitcher.vue'

const { theme } = useTheme()
</script>


<template>
  <header>
      <router-link to="#" class="logo-section" :class="theme">
        <logo />
        <span>FINDCREEK Mate</span>
      </router-link>

      <router-link to="#" class="nav-link">
        Преимущества
      </router-link>

      <router-link to="#" class="nav-link">
        Цены
      </router-link>

      <div class="theme-wrapper">
        <theme-switcher />
      </div>
    </header>
</template>


<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

header {
  //padding: 0 66px;
  @include container;
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 53px;
  }
}

.nav-link {
  @include findcreek-bold(20px, rgb(145 152 165 / .8));
  text-decoration: none;
}

.buttons-section {
  margin-left: 132px;
}

.logo-section {
  @include flex(flex-start, center);
  text-decoration: none;

  span {
    @include montserrat-bold(22px, var(--heading-color-2));
  }

  & > *:not(:last-child) {
    margin-right: 18px;
  }
}

.theme-wrapper {
  margin-left: auto;
}
</style>
