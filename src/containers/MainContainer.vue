<script lang="ts" setup>
import AuthContainer from './AuthContainer.vue'
// import HeaderContainer from './HeaderContainer.vue'
import ProcessesContainer from './ProcessesContainer.vue'
import FeaturesContainer from './FeaturesContainer.vue'
</script>

<template>
  <processes-container>
    <auth-container>
      <features-container>
        <slot />
      </features-container>
    </auth-container>
  </processes-container>
</template>
