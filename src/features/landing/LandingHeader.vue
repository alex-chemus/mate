<script lang="ts" setup>
import { ThemeSwitcher, Logo } from '@/UI'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()
</script>


<template>
  <header>
      <router-link to="/" class="logo-section" :class="state.theme">
        <logo />
        <span>FINDCREEK Mate</span>
      </router-link>

      <router-link to="/features" class="nav-link">
        Преимущества
      </router-link>

      <router-link to="/price" class="nav-link">
        Цены
      </router-link>

      <div class="theme-wrapper">
        <theme-switcher />
      </div>
    </header>
</template>


<style lang="scss" scoped>
@import '@/styles/style.scss';

header {
  //padding: 0 66px;
  @include container;
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 53px;
  }
}

.nav-link {
  font-family: var(--ff-ubuntu);
  font-size: 20px;
  font-weight: var(--fw-bold);
  color: rgb(145 152 165 / .8);
  text-decoration: none;
}

.buttons-section {
  margin-left: 132px;
}

.logo-section {
  @include flex(flex-start, center);
  text-decoration: none;

  span {
    font-size: 22px;
    font-family: var(--ff-montserrat);
    font-weight: var(--fw-bold);
    color: var(--text-color)
  }

  & > *:not(:last-child) {
    margin-right: 18px;
  }
}

.theme-wrapper {
  margin-left: auto;
}
</style>
