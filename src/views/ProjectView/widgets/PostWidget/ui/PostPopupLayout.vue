<script lang="ts" setup>
import { useTheme } from '@/utils'
const { theme } = useTheme()
</script>

<template>
  <ul class="popup" :class="theme">
    <li>
      <button :class="theme">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
        </svg>
        <span>Сохранить в закладках</span>
      </button>
    </li>

    <li>
      <button :class="theme">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-exclamation-mark" />
        </svg>
        <span>Пожаловаться</span>
      </button>
    </li>

    <li>
      <button :class="theme">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
        </svg>
        <span>Редактировать</span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.popup {
  /*position: absolute;
  bottom: 105%;
  right: 0%;
  z-index: 10;*/

  border-radius: 6px;
  padding: 12px;
  list-style: none;
  margin: 0;
  color: var(--heading-color-1);
  background-color: var(--bg-color-1);

  &.light {
    border: 1px solid #e6e6e6;
    box-shadow: 0 0 30px -4px rgba(0 0 0 / .25);
  }

  &.dark {
    border: 1px solid rgba(118 118 118 / .25);
    box-shadow: 0 0 30px 10px rgba(0 0 0 / .25);
  }
}

li {
  @include flex(flex-start, center);

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

button {
  @include findcreek(13px, inherit);
  line-height: 140%;
  letter-spacing: -3.3%;

  svg {
    transition: var(--fast);
  }

  &:hover svg {
    color: var(--accent);
  }
}

span {
  margin-left: 9px;
}

.backdrop {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background-color: rgba(0 0 0 / .5);
}
</style>
