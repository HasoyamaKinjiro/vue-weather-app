export interface City {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
}

export interface WeatherItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface WeatherResponse {
  list: WeatherItem[];
  city: {
    name: string;
    coord: { lat: number; lon: number };
    country: string;
  };
}

export interface DailyWeather {
  date: string;
  temp: number;
  icon: string;
}
