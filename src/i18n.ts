import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    search: 'Search city...',
    addBlock: 'Add city',
    favorites: 'Favorites',
    home: 'Home',
    day: 'Day',
    week: '5 Days',
    deleteConfirm: 'Are you sure you want to delete this block?',
    maxFavorites: 'To add, please remove a city. Max 5 favorites allowed.',
    now: 'Now',
    hourlyTemp: 'Hourly Temp',
    dailyAvgTemp: 'Daily Avg',
    cancel: 'Cancel',
    confirm: 'Confirm',
    removeSection: 'Remove city',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    errorLoadingWeather: 'Error loading weather:',
    weatherIcon: 'Weather icon',
    cityNotFound: 'City not found',
    defaultCityNameError: 'Error getting city by IP:',
    searchFailed: 'Search failed:'
  },
  uk: {
    search: 'Пошук міста...',
    addBlock: 'Додати місто',
    favorites: 'Обране',
    home: 'Головна',
    day: 'День',
    week: '5 Днів',
    deleteConfirm: 'Ви впевнені, що хочете видалити цей блок?',
    maxFavorites: 'Для додавання видаліть місто. Максимум 5 обраних.',
    now: 'Зараз',
    hourlyTemp: 'Погодинна температура',
    dailyAvgTemp: 'Щоденна середня температура',
    cancel: 'Скасувати',
    confirm: 'Підтвердити',
    removeSection: 'Видалити місто',
    addToFavorites: 'Додати до обраного',
    removeFromFavorites: 'Видалити з вибраного',
    errorLoadingWeather: 'Помилка завантаження погоди:',
    weatherIcon: 'Значок погоди',
    cityNotFound: 'Місто не знайдено',
    defaultCityNameError: 'Помилка отримання міста за IP:',
    searchFailed: 'Помилка пошуку:'
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'en',
  messages
});
