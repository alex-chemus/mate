<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useTheme } from '@/shared/utils';
import { Notice } from '../types'

const props = defineProps<{
  notice: Notice
}>()

const { theme } = useTheme()

const text = computed(() => {
  switch (props.notice.type) {
    case 'joined':
      return 'присоединился к'

    case 'request':
      return 'отправил запрос к'

    default:
      return 'подписался на'
  }
})

const title = computed(() => {
  return `${props.notice.person} ${text.value} ${props.notice.subject}`
})
</script>

<template>
  <div class="notification" :class="theme">
    <div class="notification-container">
      <img v-if="notice.personAvatar" :src="notice.personAvatar" alt="" class="avatar" />
      <div v-else class="avatar" />

      <div class="message-wrapper" :title="title">
        <p class="message" :class="theme">
          <strong>{{ notice.person }}</strong> {{ text }}
          <router-link to="#">{{ notice.subject }}</router-link>
        </p>
        <small :class="theme">{{ notice.date }}</small>
      </div>
    </div>

    <div v-if="notice.type === 'request'" class="buttons">
      <button class="accept">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-check" />
        </svg>
      </button>
      <button class="decline">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.notification {
  padding: 12px 25px;
  transition: var(--fast);
  max-width: 100%;
}

.notification-container {
  @include flex(flex-start, center);
  gap: 11px;
}

.notification:hover {
  &.light {
    background-color: rgba(59 202 10 / .1);
  }

  &.dark {
    background-color: rgba(190 255 180 / .2);
  }
}

.avatar {
  width: 35px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 100vmax;
  background-color: var(--gray-1);
  flex-shrink: 0;
}

.message-wrapper {
  flex-shrink: 2;
  max-width: calc(100% - 35px - 11px);
  @include flex(flex-start, flex-start, column);
}

.message {
  font-family: var(--findcreek);
  font-size: 15px;
  letter-spacing: .01em;
  text-align: left;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  strong {
    font-family: var(--findcreek-medium);
  }

  a {
    font-family: var(--findcreek-medium);
  }

  &.light a {
    color: var(--accent-1);
  }

  &.dark a {
    color: var(--light);
  }

  a:focus, a:hover {
    text-decoration: underline;
  }
}

.message {
  color: var(--heading-color-1);
}

.message.light a {
  color: var(--accent-1);
}

.message.dark {
  color: var(--light);
}

small {
  @include findcreek(12px, var(--text-color-3));
  text-align: left;
}

.buttons {
  @include flex(flex-end, center);
  gap: 20px;

  button {
    width: 30px;
    aspect-ratio: 1;
    border-radius: 100vmax;
    border: 1px solid currentColor;
    transition: var(--fast);
  }

  button:hover {
    box-shadow: 0 0 4px 0 currentColor;
  }
}

.accept {
  color: var(--green);
}

.decline {
  color: var(--red);
}
</style>
