<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BaseModal, UiButton, UiLoader, WeatherBlock } from '../components';
import { getCityByIp } from '../api/weather';
import { useI18n } from 'vue-i18n';

interface Block {
  id: number;
  name: string;
}

const { t } = useI18n();

const blocks = ref<Block[]>([]);
const showDeleteModal = ref<boolean>(false);
const blockToDelete = ref<number | null>(null);
const isLoading = ref<boolean>(false);

onMounted(getDefaultCityName);

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

async function getDefaultCityName() {
  let defaultCityName = '';

  try {
    isLoading.value = true;
    defaultCityName = await getCityByIp();
  } catch (error) {
    console.error(t('defaultCityNameError'), error);
    defaultCityName = 'Kyiv';
  } finally {
    isLoading.value = false;
    blocks.value.push({
      id: Date.now(),
      name: defaultCityName
    });
  }
}
</script>

<template>
  <div class="weather-wrapper">
    <UiLoader :is-loading="isLoading" />
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
