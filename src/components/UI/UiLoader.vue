<script setup lang="ts">
defineProps<{ isLoading: boolean }>();
</script>

<template>
  <div v-if="isLoading" class="loader-wrapper">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loader-wrapper {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--secondary-bg-light);
  border-bottom-color: var(--primary-bg);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
