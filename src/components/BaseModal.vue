<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

withDefaults(
  defineProps<{
    showConfirm?: boolean;
  }>(),
  { showConfirm: true }
);
const emit = defineEmits(['confirm', 'close']);

const close = () => emit('close');
const confirm = () => emit('confirm');

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close');
};

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="close">
      <div class="modal" @click.stop>
        <div class="modal-content">
          <slot />
        </div>

        <div class="modal-actions">
          <button class="btn cancel" @click="close">
            {{ $t('cancel') }}
          </button>

          <button v-if="showConfirm" class="btn confirm" @click="confirm">
            {{ $t('confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 360px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modalEnter 0.2s ease;
}

.modal-content {
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.15s;
}

.cancel {
  background: var(--secondary-bg);
}

.cancel:hover {
  background: var(--secondary-bg-dark);
}

.confirm {
  background: var(--error-bg);
  color: white;
}

.confirm:hover {
  background: var(--error-bg-dark);
}

@keyframes modalEnter {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
