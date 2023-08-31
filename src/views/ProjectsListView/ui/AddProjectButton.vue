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
  background-color: var(--bg-color-2);
  text-decoration: none;

  &:hover,
  &:focus {
    border: 1px solid var(--accent);
  }

  @include md {
    height: 170px;
  }
}

p {
  @include findcreek-medium(16px, (var(--heading-color-1)));
}
</style>
