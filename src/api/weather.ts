import axios from 'axios';
import type {
  City,
  WeatherResponse
} from '../types/weather.ts';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export async function getCityByIp(): Promise<string> {
  const { data } = await axios.get<{ city: string }>('https://ipapi.co/json/');

  return data.city;
}

export async function searchCities(
  query: string,
  lang: string = 'uk'
): Promise<City[]> {
  if (!query) return [];
  const { data } = await axios.get<City[]>(`${GEO_URL}/direct`, {
    params: {
      q: query,
      limit: 5,
      lang,
      appid: API_KEY
    }
  });

  return data.map((city) => ({
    ...city,
    name: lang === 'uk' ? city.local_names?.uk || city.name : city.name,
  }));
}

export async function getWeatherForecast(
  lat: number,
  lon: number,
  lang = 'uk'
): Promise<WeatherResponse> {
  const { data } = await axios.get<WeatherResponse>(`${BASE_URL}/forecast`, {
    params: { lat, lon, units: 'metric', lang, appid: API_KEY }
  });

  return data;
}
