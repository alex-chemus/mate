<script lang="ts" setup>
import { useTheme } from '@/utils';

const theme = useTheme()
</script>


<template>
  <footer :class="theme">
    <div class="links-wrapper">
      <router-link to="/">О Себе</router-link>
      <router-link to="/">Политика конфиденциальности</router-link>
      <router-link to="/">Условия пользования</router-link>
      <router-link to="/">Политика в отношении файлов cookie</router-link>
      <router-link to="/">Информация о рекламе</router-link>
      <router-link to="/">Справочный центр</router-link>
      <router-link to="/">Реклама</router-link>
      <router-link to="/">Настройки</router-link>
      <router-link to="/">Продукты компании</router-link>
    </div>

    <p class="copyright">© FINDCREEK, Inc., 2022.</p>
  </footer>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

footer {
  @include container;
  padding: 0 34px;

  &.light {
    color: color.change($gray-1, $alpha: .8);
  }

  &.dark {
    color: var(--gray-1);
  }
}

.links-wrapper {
  @include flex(space-between, baseline);
}

.links-wrapper a,
.copyright {
  font-size: 12px;
  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-medium);
  text-decoration: none;
  color: inherit;

  &.light {
    color: color.change($gray-1, $alpha: .8);
  }

  &.dark {
    color: var(--gray-1);
  }
}

.copyright {
  text-align: center;
  margin-top: 10px;
}
</style>
