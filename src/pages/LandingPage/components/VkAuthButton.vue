<script lang="ts" setup>
import { AuthButton } from '@/ui'
</script>


<template>
  <auth-button :with-icon="true">
    <img src="@/assets/imgs/vk-icon.png" alt="VK" />
    <span>Войти через VK</span>
  </auth-button>
</template>
