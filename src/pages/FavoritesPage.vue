<script setup lang="ts">
import WeatherBlock from '../components/WeatherBlock.vue';
import { useFavorites } from '../composables/useFavorites';

const { favorites } = useFavorites();
</script>

<template>
  <div class="favorites-page">
    <h2>{{ $t('favorites') }} ({{ favorites.length }}/5)</h2>

    <div class="favorites-page__wrapper">
      <WeatherBlock
        v-for="(cityObj, index) in favorites"
        :key="index"
        :initial-city="cityObj.name"
        :is-favorite-tab="true"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites-page__wrapper {
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
