<script setup lang="ts">
import type { City } from '../../types/weather.ts';

defineProps<{
  searchResults: City[];
  onSearch: () => void;
}>();
const model = defineModel();
const emit = defineEmits(['select-city']);

const selectCity = (city: City) => {
  emit('select-city', city);
};
</script>

<template>
  <div class="search-box">
    <input v-model="model" @input="onSearch" :placeholder="$t('search')" />
    <ul v-if="searchResults.length" class="autocomplete">
      <li
        v-for="(res, index) in searchResults"
        :key="index"
        @click="selectCity(res)"
      >
        {{ res.name }}, {{ res.country }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-box {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.search-box input {
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 2px solid var(--primary-bg-light);
  border-radius: 10px;
  outline: none;
  color: var(--primary-text);
  background: white;
  transition: all 0.2s ease;
}

.search-box input::placeholder {
  color: var(--primary-text-light);
}

.search-box input:focus {
  border-color: var(--primary-bg);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.autocomplete {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  border: 1px solid var(--secondary-bg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  list-style: none;
  padding: 6px 0;
  margin: 0;
  max-height: 260px;
  overflow-y: auto;
  z-index: 100;
}

.autocomplete li {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.15s ease;
}

.autocomplete li:hover {
  background: var(--primary-bg-light);
  color: white;
}

.autocomplete li:active {
  background: var(--primary-bg-dark);
  color: white;
}

.autocomplete::-webkit-scrollbar {
  width: 6px;
}

.autocomplete::-webkit-scrollbar-thumb {
  background: var(--secondary-bg);
  border-radius: 4px;
}

.autocomplete::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-bg-dark);
}
</style>
