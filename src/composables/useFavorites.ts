import { useLocalStorage } from '@vueuse/core';
import type { City } from '../types/weather.ts';
import { isSameLocation } from '../utils';

const MAX_FAVORITES = 5;

const favorites = useLocalStorage<City[]>('favorites', []);

export function useFavorites() {
  const isFavorite = (lat: number, lon: number) => {
    return favorites.value.some((city) =>
      isSameLocation(city.lat, city.lon, lat, lon)
    );
  };

  const toggleFavorite = (city: City) => {
    const index = favorites.value.findIndex(
      (c) => c.lat === city.lat && c.lon === city.lon
    );

    if (index !== -1) {
      favorites.value.splice(index, 1);
      return { ok: true };
    }

    if (favorites.value.length >= MAX_FAVORITES) {
      return { ok: false };
    }

    favorites.value.push(city);

    return { ok: true };
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    MAX_FAVORITES
  };
}
