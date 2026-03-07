<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';

const { locale } = useI18n();

const savedLocale = useLocalStorage('locale', 'uk');

locale.value = savedLocale.value;

watch(locale, (newLocale) => {
  savedLocale.value = newLocale;
});
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="container wrapper">
        <nav class="nav">
          <router-link class="nav-link" active-class="nav-link__active" to="/">
            {{ $t('home') }}
          </router-link>
          <router-link
            class="nav-link"
            active-class="nav-link__active"
            to="/favorites"
          >
            {{ $t('favorites') }}
          </router-link>
        </nav>

        <div class="logo-wrapper">
          <router-link to="/">
            <img src="/weather.svg" alt="Weather logo" class="logo" />
          </router-link>
        </div>

        <div class="lang">
          <select v-model="locale">
            <option value="en">ENG</option>
            <option value="uk">UKR</option>
          </select>
        </div>
      </div>
    </header>

    <main class="container" style="padding-top: 32px">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.header {
  padding: 20px 0;
  background-color: var(--primary-bg-light);
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.logo-wrapper {
  justify-self: center;
  height: 30px;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: var(--primary-text);
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link__active {
  text-decoration: underline;
  color: white;
}

.lang {
  position: relative;
  display: inline-block;
  justify-self: end;
}

.lang select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 34px 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--primary-bg-light);
  background: white;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang select:hover {
  border-color: var(--primary-bg);
}

.lang select:focus {
  outline: none;
  border-color: var(--primary-bg);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
}

.lang::after {
  content: '▾';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: var(--primary-text);
}
</style>
