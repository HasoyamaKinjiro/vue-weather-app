import type { DailyWeather, WeatherItem } from '../types/weather.ts';

// Formatting average temperature for 5 days
export function processFiveDay(list: WeatherItem[]): DailyWeather[] {
  const daily: Record<string, { temps: number[]; icon: string }> = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0] || '';
    if (!date) return;

    if (!daily[date]) {
      daily[date] = { temps: [], icon: item.weather[0]?.icon || '' };
    }

    daily[date].temps.push(item.main.temp);
  });

  return Object.keys(daily)
    .slice(0, 5)
    .map((dateKey) => {
      const dateObj = new Date(dateKey);
      const dayNumber = dateObj.getDate();

      const { temps, icon } = daily[dateKey] || { temps: [], icon: '' };

      const avgTemp =
        temps.length > 0
          ? Math.round(temps.reduce((a, b) => a + b, 0) / temps.length)
          : 0;

      return {
        date: dayNumber.toString(),
        temp: avgTemp,
        icon: icon
      };
    });
}

// Function to check if it is the same city (within 3 km)
export function isSameLocation(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const threshold = 0.03;
  return Math.abs(lat1 - lat2) < threshold && Math.abs(lon1 - lon2) < threshold;
}
