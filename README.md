# Weather App

A sleek and responsive weather application built with **Vue 3** and **TypeScript**. It allows users to track current weather and forecasts for multiple cities simultaneously with interactive data visualization.

## Key Features

* **Real-time Forecasts**: Current conditions and 5-day weather data via OpenWeatherMap API.
* **Interactive Charts**: Temperature trends visualized with **Chart.js**.
* **Favorites Management**: Save up to 5 favorite cities with persistent storage (**LocalStorage**).
* **Smart Search**: Location search with **Debounce** to optimize API requests.
* **Auto-Location**: Automatically detects the user's city via IP on the first visit.

## How to Run

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Set up Environment Variables**:
    Create a `.env` file in the root folder and add your API key:
    ```env
    VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
    ```
3. **Start development server**:
    ```bash
    npm run dev
    ```
4. **Build for production**:
    ```bash
    npm run build
    ```
