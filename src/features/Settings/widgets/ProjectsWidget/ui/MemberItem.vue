<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useTheme } from '@/shared/utils'
import { Member } from '../types'

const props = defineProps<{
  member: Member
}>()

const emit = defineEmits<{
  (e: 'change-role'): void
}>()

const { theme } = useTheme()

const getRole = computed(() => {
  switch (props.member.role) {
    case 'administrator': return 'Администратор'
    case 'editor': return 'Редактор'
    case 'founder': return 'Владелец'
    default: return 'Подписчик'
  }
})
</script>

<template>
  <div class="member-item">
    <router-link :to="`/user/${member.findcreekID}`" class="member-link">
      <img v-if="member.avatar" class="avatar" :src="member.avatar.avatarCompressed ?? member.avatar.avatar" alt="" />
      <div v-else class="avatar" />

      <div class="name-wrapper">
        <h6 class="full-name" :class="theme">{{ member.firstName }} {{ member.lastName }}</h6>
        <p class="text-id" :class="theme">@{{ member.textID }}</p>
        <p class="role" :class="theme">{{ getRole }}</p>
      </div>
    </router-link>

    <button
      v-if="member.role !== 'founder'"
      class="change-button" :class="theme"
      @click="emit('change-role')"
    >Изменить должность</button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.member-item {
  @include flex(flex-start, center);
  gap: 14px;
}

.member-link {
  @include flex(flex-start, center);
  gap: 14px;
  text-decoration: none;
}

.avatar {
  height: 60px;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #bbb;
  border-radius: 100vmax;
}

.name-wrapper {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content max-content;
  grid-gap: 5px 11px;
  align-items: baseline;
}

.full-name {
  @include findcreek-medium(13px);
  margin: 0;

  &.light {
    color: #242424;
  }

  &.dark {
    color: var(--light);
  }
}

.text-id {
  @include findcreek(12px);

  &.light {
    color: rgb(50 50 50 / .5);
  }

  &.dark {
    color: rgb(153 153 153 / .8);
  }
}

.role {
  @include findcreek(13px, var(--text-color-1));
}

.change-button {
  margin-left: auto;
  height: 30px;
  padding: 0 12px;
  @include flex(center, center);
  border-radius: 100vmax;
  @include findcreek(12px, var(--accent));
  border: 1px solid currentColor;
  background-color: transparent;
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--light);
    background-color: var(--accent-1);
    border-color: transparent;
  }
}
</style>
