<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'
import ThemeSwitcher from './ThemeSwitcher.vue'

defineProps<{
  img: string,
  fullName: string,
  email: string,
}>()

const emit = defineEmits<{
  (e: 'open-settings'): void
}>()

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div class="profile-popup" :class="theme">
    <div class="name-wrapper" :class="theme">
      <img :src="img" alt="" class="avatar" />
      <div>
        <h6 :class="theme">{{ fullName }}</h6>
        <small :class="theme">{{ email }}</small>
      </div>
    </div>

    <button class="button" :class="theme" @click="emit('open-settings')">
      <svg width="24" height="25" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-settings" />
      </svg>
      <span>Настройки</span>
    </button>

    <button class="button --blue" :class="theme">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-basket" />
      </svg>
      <span>Подписка</span>
    </button>

    <div class="separator" :class="theme" />

    <button class="button --theme-button" :class="theme" @click="toggleTheme()">
      {{ theme === 'light' ? 'Светлая' : 'Темная' }} тема
      <theme-switcher />
    </button>

    <button class="logout-button" :class="theme">
      Выйти из аккаунта
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.profile-popup {
  border-radius: 13px;
  box-shadow: 0 9px 40px 0 rgba(0 0 0 / .25);
  padding: 15px 10px 10px 10px;

  display: grid;
  grid-auto-flow: row;
  justify-content: start;
  align-items: stretch;
  grid-gap: 13px;
  background-color: var(--bg-color-1);

  &.light {
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.dark {
    border: 1px solid #615478;
  }
}

.name-wrapper {
  @include flex(flex-start, center);
}

.avatar {
  width: 35px;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: var(--gray-1);
  margin-right: 11px;
  border-radius: 100vmax;
}

h6 {
  font-family: var(--findcreek-medium);
  font-size: 16px;
  margin: 0;
  color: var(--heading-color-2);
}

small {
  font-family: var(--findcreek);
  font-weight: normal;
  font-size: 12px;

  &.light {
    color: #747279;
  }

  &.dark {
    color: #BBBBBB;
  }
}

.button {
  border-radius: 5px;
  padding: 4px 6px;
  transition: var(--fast);
  display: grid;
  grid-template-columns: min-content minmax(0, 1fr) min-content;
  align-items: center;
  place-items: start;
  grid-gap: 12px;
  color: var(--heading-color-2);

  &:hover {
    background-color: var(--bg-color-2);
  }

  &.--blue {
    color: #3EA6FF;
  }

  &.--theme-button {
    @include flex(space-between, center);
  }

  &.--theme-button:hover {
    background-color: transparent;
  }
}

.separator {
  height: 1px;

  &.light {
    background-color: #F0F0F0;
  }

  &.dark {
    background-color: #615478;
  }
}

.logout-button {
  width: 280px;
  height: 30px;
  border-radius: 8px;
  @include flex(center, center);
  border: 1px solid currentColor;
  font-family: var(--findcreek-medium);
  font-size: 12px;
  transition: var(--fast);
  color: var(--accent);

  &:hover {
    color: var(--light);
    background-color: var(--accent);
    border: none;
  }
}
</style>
