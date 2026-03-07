<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BaseModal, UiButton, WeatherBlock } from '../components';
import { getCityByIp } from '../api/weather';

interface Block {
  id: number;
  name: string;
}

const blocks = ref<Block[]>([]);
const showDeleteModal = ref<boolean>(false);
const blockToDelete = ref<number | null>(null);

onMounted(async () => {
  const defaultCityName = await getCityByIp();

  blocks.value.push({
    id: Date.now(),
    name: defaultCityName || ''
  });
});

const addBlock = () => {
  if (blocks.value.length < 5) {
    blocks.value.push({ id: Date.now(), name: '' });
  }
};

const confirmDelete = (id: number) => {
  blockToDelete.value = id;
  showDeleteModal.value = true;
};

const deleteBlock = () => {
  if (blockToDelete.value !== null) {
    blocks.value = blocks.value.filter((b) => b.id !== blockToDelete.value);
  }
  showDeleteModal.value = false;
  blockToDelete.value = null;
};
</script>

<template>
  <div class="weather-wrapper">
    <WeatherBlock
      v-for="block in blocks"
      :key="block.id"
      :initial-city="block.name"
      :blocks-length="blocks.length"
      @remove="confirmDelete(block.id)"
    />

    <UiButton v-if="blocks.length < 5" variant="primary" @click="addBlock">
      + {{ $t('addBlock') }}
    </UiButton>

    <BaseModal
      v-if="showDeleteModal"
      @confirm="deleteBlock"
      @close="showDeleteModal = false"
    >
      <p>{{ $t('deleteConfirm') }}</p>
    </BaseModal>
  </div>
</template>

<style scoped>
.weather-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.add-btn {
  width: fit-content;
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--primary-bg-light);
  background: var(--primary-bg-dark);
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.add-btn:hover {
  background: var(--primary-bg-light);
}
</style>
