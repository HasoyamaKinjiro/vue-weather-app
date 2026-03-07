import { createRouter, createWebHistory } from 'vue-router';

import WeatherPage from '../pages/WeatherPage.vue';
import FavoritesPage from '../pages/FavoritesPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: WeatherPage
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
