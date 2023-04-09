<script lang="ts" setup>
</script>

<template>
  <router-link to="/new-project" class="new-project">
    <svg width="60" height="60" view-box="0 0 60 60">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
    </svg>
    <p>Создать новый проект</p>
  </router-link>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.new-project {
  height: 218px;
  border-radius: 6px;
  transition: var(--fast);
  border: var(--border-2);
  overflow: hidden;
  @include flex(center, center, column);
  gap: 14px;
  color: var(--accent);
  text-decoration: none;

  &:hover,
  &:focus {
    border: 1px solid var(--accent);
  }
}

p {
  font-family: var(--findcreek-medium);
  font-weight: var(--medium);
  font-size: 16px;
}
</style>
