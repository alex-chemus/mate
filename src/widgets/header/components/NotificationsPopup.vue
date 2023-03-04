<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { useTheme } from '@/utils'
import type { Notice } from '../types'
import NotificationsButton from './NotificationsButton.vue'
import Notification from './Notification.vue'

const props = defineProps<{
  notices: Notice[]
}>()

const { theme } = useTheme()

const sort = ref<'all' | 'subs'>('all')
const allUnread = computed(() => props.notices.length)
const subsUnread = computed(() => props.notices.filter((n) => n.type === 'subscribed').length)
const sortedNotifications = computed(() => {
  switch (sort.value) {
    case 'subs':
      return props.notices.filter((n) => n.type === 'subscribed')

    default:
      return props.notices
  }
})
</script>

<template>
  <section class="notifications-popup" :class="theme">
    <div class="header-container" :class="theme">
      <div class="header-wrapper" :class="theme">
        <h5>Уведомления</h5>
        <router-link tabindex to="/notifications">Прочитать все</router-link>
      </div>

      <div class="nav-wrapper" :class="theme">
        <nav class="nav">
          <notifications-button
            :unread="allUnread"
            :selected="sort === 'all'"
            @click="sort = 'all'"
          >Все</notifications-button>
          <notifications-button
            :unread="subsUnread"
            :selected="sort === 'subs'"
            @click="sort = 'subs'"
          >Подписки</notifications-button>
        </nav>
      </div>
    </div>

    <notification
      v-for="(notice, i) in sortedNotifications" :key="i"
      :notice="notice"
    />
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.notifications-popup {
  border-radius: 13px;
  box-shadow: var(--popup-shadow);
  width: 440px;
  overflow: hidden;
  background-color: var(--bg-color-1);

  &.dark {
    border: 1px solid #615478;
  }
}

.header-container {
  padding: 25px 25px 0 25px;

  &.light {
    border-bottom: 1px solid #EBE6E3;
  }

  &.dark {
    border-bottom: 1px solid #615478;
  }
}

.header-wrapper {
  @include flex(space-between, center);
  margin-bottom: 25px;

  h5 {
    font-family: var(--findcreek);
    font-size: 22px;
    letter-spacing: -3.5%;
    margin: 0;
    color: var(--heading-color-1);
  }

  a {
    display: block;
    height: 25px;
    width: 120px;
    border-radius: 100vmax;
    background-color: var(--accent-1);
    @include flex(center, center);
    color: var(--light);
    transition: var(--fast);
    text-decoration: none;
    font-family: var(--findcreek-medium);
    font-size: 13px;
  }

  a:focus, a:hover {
    box-shadow: 0 0 10px 0 color.change($accent-1, $alpha: .4);
  }
}

.nav-wrapper {
  &.light {
    border-bottom: #EBE6E3;
  }

  &.dark {
    border-bottom: #615478;
  }
}

.nav {
  @include flex(flex-start, flex-end);
  gap: 12px;
}
</style>
