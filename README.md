## 🌤️ Weather Web App – React + Open Meteo API

##📌 Overview

The Weather Web App is a responsive React-based application that allows users to search for any city and get real-time weather data, including current conditions and short-term forecasts. It integrates with the Open-Meteo API and Open-Meteo Geocoding API to fetch accurate, location-specific weather information.

##🚀 Features

🔍 City-based Weather Search: Users can enter a city name to retrieve weather data via the Open-Meteo Geocoding API.

📍 Geolocation Conversion: Converts city names into latitude and longitude coordinates for precise weather lookup.

🌡️ Current Weather Display:

Temperature (°C)

Wind speed and direction

Altitude

Time and date

Day/Night indicator

Weather icons based on conditions (e.g., sun, rain, clouds)

📅 Forecast Cards: Shows a 4-day forecast with min/max temperature and day name.

🎨 Clean and Visual UI: Uses meaningful weather icons and layout for improved user experience.

##🛠️ Tech Stack

Frontend: React.js, JSX, CSS

Data Handling: Axios for HTTP requests

APIs Used:

Open-Meteo Weather API

Open-Meteo Geocoding API

##⚙️ How It Works

User enters a city name.

App sends request to the Open-Meteo Geocoding API to get latitude and longitude.

Then it fetches weather data for those coordinates using the Weather Forecast API.

Parsed data includes temperature, wind, date/time, and forecast.

Based on the weathercode, relevant icons are dynamically loaded.

Forecast cards are rendered using a separate Card component.
