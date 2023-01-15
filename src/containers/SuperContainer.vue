<script lang="ts" setup>
import ThemeContainer from './ThemeContainer.vue'
import AuthContainer from './AuthContainer.vue'
import ErrorContainer from './ErrorContainer.vue'
</script>

<template>
  <theme-container>
    <error-container>
      <auth-container>
        <slot />
      </auth-container>
    </error-container>
  </theme-container>
</template>
