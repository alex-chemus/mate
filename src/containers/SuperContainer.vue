<script lang="ts" setup>
import ThemeContainer from './ThemeContainer.vue'
import AuthContainer from './AuthContainer.vue'
import ErrorContainer from './ErrorContainer.vue'
import UserContainer from './UserContainer.vue'
</script>

<template>
  <theme-container>
    <error-container>
      <auth-container>
        <user-container>
          <slot />
        </user-container>
      </auth-container>
    </error-container>
  </theme-container>
</template>
