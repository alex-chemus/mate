<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  fullName: string,
  img: string,
  email: string
}>()

const { theme } = useTheme()
</script>

<template>
  <div class="user-card" :class="theme">
    <img :src="img" alt="" class="icon" />
    <div class="text-wrapper">
      <h6 class="name" :class="theme">{{ fullName }}</h6>
      <small class="email" :class="theme">{{ email }}</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.user-card {
  padding: 12px;
  border-radius: 19px;
  @include flex(flex-start, center);
  gap: 15px;

  &.light {
    background-color: #F9FBFC;
  }

  &.dark {
    background-color: #262837;
  }
}

.icon {
  border-radius: 100vmax;
  height: 50px;
  width: 50px;
  aspect-ratio: 1;
  object-fit: cover;
}

.text-wrapper {
  // flex-shrink: 1;
  max-width: calc(100% - 65px);
}

.name,
.email {
  //max-width: calc(100% - 65px);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name {
  font-family: var(--findcreek-medium);
  font-weight: var(--medium);
  font-size: 16px;
  margin-bottom: 2px;

  &.light {
    color: #212121;
  }

  &.dark {
    color: var(--light);
  }
}

.email {
  display: block;
  font-family: var(--noto-sans);
  font-weight: var(--medium);
  font-size: 12px;
  letter-spacing: -0.03em;

  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }
}
</style>
