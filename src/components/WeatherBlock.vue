<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { searchCities, getWeatherForecast } from '../api/weather';
import { processFiveDay } from '../utils';
import {
  WeatherChart,
  WeatherBlockSearch,
  BaseModal,
  UiButton,
  UiLoader
} from '../components';
import type { City, DailyWeather, WeatherResponse } from '../types/weather.ts';
import { useFavorites } from '../composables/useFavorites.ts';
import heartIcon from '../assets/heart.svg';
import heartFilledIcon from '../assets/heart-filled.svg';
import closeIcon from '../assets/close.svg';

const props = withDefaults(
  defineProps<{
    initialCity: string;
    isFavoriteTab?: boolean;
    blocksLength?: number;
  }>(),
  {
    blocksLength: 0
  }
);

const emit = defineEmits<{
  (e: 'remove'): void;
}>();

const { locale, t } = useI18n();
const { isFavorite, toggleFavorite } = useFavorites();

const isLoading = ref<boolean>(false);
const searchQuery = ref<string>('');
const searchResults = ref<City[]>([]);
const currentCity = ref<City | null>(null);
const rawWeatherData = ref<WeatherResponse | null>(null);
const viewMode = ref<'day' | 'week'>('day');
const showMaxModal = ref(false);

let timeout: ReturnType<typeof setTimeout>;

onMounted(() => {
  if (props.initialCity) fetchCityWeather();
});

watch(locale, fetchCityWeather);

const currentWeather = computed(() => rawWeatherData.value?.list[0]);
const fiveDayData = computed<DailyWeather[]>(() =>
  rawWeatherData.value ? processFiveDay(rawWeatherData.value.list) : []
);

const hourlyForecast = computed(() => {
  if (!rawWeatherData.value) return [];
  return rawWeatherData.value.list.slice(0, 8).map((item) => {
    const dateObj = new Date(item.dt * 1000);
    const hour = dateObj.getHours();

    return {
      hour: `${hour}:00`,
      temp: Math.round(item.main.temp),
      icon: item.weather[0]?.icon
    };
  });
});

const chartData = computed<{ labels: string[]; data: number[] }>(() => {
  if (!rawWeatherData.value) return { labels: [], data: [] };

  if (viewMode.value === 'day') {
    const dayData = rawWeatherData.value.list.slice(0, 8);
    return {
      labels: dayData.map((d) =>
        (d.dt_txt?.split(' ')[1] || '00:00').slice(0, 5)
      ),
      data: dayData.map((d) => d.main.temp)
    };
  } else {
    return {
      labels: fiveDayData.value.map((d) => d.date),
      data: fiveDayData.value.map((d) => d.temp)
    };
  }
});

const onSearch = () => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    searchResults.value = await searchCities(searchQuery.value, locale.value);
  }, 400);
};

const selectCity = async (city: City) => {
  currentCity.value = city;
  searchResults.value = [];
  searchQuery.value = '';
  await fetchCityWeather();
};

const handleFavorite = () => {
  let { lat, lon, name } = currentCity.value as City;

  const result = toggleFavorite({
    name,
    lat,
    lon
  });

  if (!result.ok) {
    showMaxModal.value = true;
  }
};

async function fetchCityWeather() {
  if (!props.initialCity && !currentCity.value) return;
  isLoading.value = true;

  try {
    const results = await searchCities(
      currentCity.value?.name || props.initialCity,
      locale.value
    );

    if (!results || results.length === 0) {
      new Error(t('cityNotFound'));
    }

    const defaultCity = results[0] as City;
    const { local_names, ...city } = defaultCity;
    currentCity.value = city;

    rawWeatherData.value = await getWeatherForecast(
      city.lat,
      city.lon,
      locale.value as string
    );
  } catch (error) {
    console.error(t('errorLoadingWeather'), error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="widget-card">
    <div v-if="!isFavoriteTab" class="widget-search-wrapper">
      <WeatherBlockSearch
        v-model="searchQuery"
        :search-results="searchResults"
        :on-search="onSearch"
        @select-city="selectCity"
      />

      <button
        v-if="!isFavoriteTab && blocksLength > 1"
        @click="emit('remove')"
        :title="$t('removeSection')"
        class="close-button"
      >
        <img :src="closeIcon" :alt="$t('removeSection')" />
      </button>
    </div>

    <UiLoader :is-loading="isLoading" />

    <div
      v-if="currentWeather && currentCity && !isLoading"
      class="widget-card__main"
    >
      <div class="header">
        <h3>{{ currentCity?.name }}</h3>
        <button
          class="favorite-button"
          @click="handleFavorite"
          :title="
            isFavorite(currentCity.lat, currentCity.lon)
              ? $t('removeFromFavorites')
              : $t('addToFavorites')
          "
        >
          <img
            :src="
              isFavorite(currentCity.lat, currentCity.lon)
                ? heartFilledIcon
                : heartIcon
            "
            :alt="
              isFavorite(currentCity.lat, currentCity.lon)
                ? $t('removeFromFavorites')
                : $t('addToFavorites')
            "
            class="heart-icon"
          />
        </button>
      </div>

      <div class="tabs">
        <UiButton
          variant="tab"
          :is-active="viewMode === 'day'"
          @click="viewMode = 'day'"
        >
          {{ $t('day') }}
        </UiButton>

        <UiButton
          variant="tab"
          :is-active="viewMode === 'week'"
          @click="viewMode = 'week'"
        >
          {{ $t('week') }}
        </UiButton>
      </div>

      <div class="weather-info">
        <div v-if="viewMode === 'day'" class="hourly-scroll-container">
          <div
            v-for="(item, index) in hourlyForecast"
            :key="index"
            class="hourly-item"
          >
            <span class="hour">{{ index === 0 ? t('now') : item.hour }}</span>
            <img
              :src="`https://openweathermap.org/img/wn/${item.icon}@2x.png`"
              :alt="$t('weatherIcon')"
              class="weather-icon"
            />
            <span class="temp">{{ item.temp }}°</span>
          </div>
        </div>
        <div v-if="viewMode === 'week'" class="hourly-scroll-container">
          <div
            v-for="(day, index) in fiveDayData"
            :key="day.date"
            class="hourly-item"
          >
            <span class="hour">{{ index === 0 ? $t('now') : day.date }}</span>
            <img
              :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
              :alt="$t('weatherIcon')"
              class="weather-icon"
            />
            <span class="temp">{{ day.temp }}°</span>
          </div>
        </div>
      </div>

      <WeatherChart
        v-if="chartData.labels.length"
        :labels="chartData.labels"
        :data="chartData.data"
        :label="viewMode === 'day' ? $t('hourlyTemp') : $t('dailyAvgTemp')"
      />
    </div>

    <BaseModal
      v-if="showMaxModal"
      :show-confirm="false"
      @close="showMaxModal = false"
    >
      <p>{{ $t('maxFavorites') }}</p>
    </BaseModal>
  </div>
</template>

<style scoped>
.widget-card {
  width: 100%;
  padding: 20px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.widget-card__main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.widget-search-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.close-button {
  height: 32px;
  width: 32px;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  border: 1px solid var(--secondary-bg);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button:hover {
  background: var(--secondary-bg-light);
  transform: scale(1.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-text);
  margin: 0;
}

.favorite-button {
  width: 32px;
  height: 32px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.favorite-button:hover {
  transform: scale(1.2);
}

.heart-icon {
  width: 28px;
  height: 28px;
  display: block;
}

.tabs {
  max-width: 240px;
  display: flex;
  gap: 10px;
}

.weather-info {
  padding: 12px;
  border-radius: 10px;
  background: var(--secondary-bg);
  font-size: 16px;
}

.hourly-scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 6px 0;
  scrollbar-width: thin;
}

.hourly-scroll-container::-webkit-scrollbar {
  height: 6px;
}
.hourly-scroll-container::-webkit-scrollbar-thumb {
  background-color: var(--secondary-bg-dark);
  border-radius: 4px;
}

.weather-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin: -4px 0;
}

.hourly-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 50px;
  flex-shrink: 0;
}

.hourly-item .hour {
  font-size: 14px;
  color: var(--primary-text);
  margin-bottom: 8px;
}

.hourly-item .temp {
  font-weight: bold;
  font-size: 1.1em;
}

@media (max-width: 600px) {
  .widget-card {
    max-width: 100%;
    padding: 16px;
  }

  .close-button {
    position: relative;
  }

  .header h3 {
    font-size: 18px;
  }
}
</style>
