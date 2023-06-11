<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'
import { FullAccountInfo } from '@/types'

defineProps<{
  fullAccountInfo: FullAccountInfo
}>()

const { theme } = useTheme()
</script>

<template>
  <section class="privacy-settings">
    <ul class="settings-list">
      <li class="setting-item" :class="theme">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-mail" />
        </svg>
        <div>
          <h6 class="setting-title" :class="theme">Электронная почта</h6>
          <p class="setting-text" :class="theme">{{ fullAccountInfo.email }}</p>
        </div>
      </li>

      <li class="setting-item" :class="theme">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-key" />
        </svg>
        <div>
          <h6 class="setting-title" :class="theme">Пароль</h6>
          <p class="setting-text" :class="theme">Последний раз пароль был изменен вчера</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.settings-list {
  margin: 0;
  padding: 0;
  list-style: none;
  @include flex(flex-start, flex-start, column);
  gap: 24px;
}

.setting-item {
  @include flex(flex-start, center);
  gap: 13px;

  svg {
    color: var(--accent);
  }
}

.setting-title {
  @include findcreek-medium(15px, var(--heading-color-1));
  letter-spacing: -0.03em;
  margin-bottom: 3px;
}

.setting-text {
  @include findcreek(13px, var(--text-color-1));
  letter-spacing: -0.03em;
}
</style>
