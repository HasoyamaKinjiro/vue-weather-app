<script setup lang="ts">
type ButtonVariant = 'primary' | 'tab';

withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    isActive?: boolean;
  }>(),
  {
    variant: 'primary',
    isActive: false
  }
);
</script>

<template>
  <button
    :class="['ui-button', `variant-${variant}`, { 'is-active': isActive }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  border-radius: 8px;
  border: 1px solid var(--primary-bg-light);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-size: inherit;
}

.variant-tab {
  flex: 1;
  padding: 8px 12px;
  background: white;
  color: var(--primary-text);
}

.variant-tab:hover {
  background: var(--primary-bg-light);
  color: white;
}

.variant-tab:active {
  background: var(--primary-bg-dark);
}

.variant-tab.is-active {
  background: var(--primary-bg-light);
  color: white;
}

.variant-primary {
  width: fit-content;
  padding: 12px 16px;
  background: var(--primary-bg-dark);
  color: white;
}

.variant-primary:hover {
  background: var(--primary-bg-light);
}
</style>
