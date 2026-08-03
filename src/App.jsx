import { useState } from "react";

import Header from "./components/Header";
import SearchZone from "./components/SearchZone";
import LoadingWeatherCard from "./components/LoadingWeatherCard";
import WeatherError from "./components/WeatherError";
import CurrentWeatherCard from "./components/CurrentWeatherCard";

import {
  fetchCurrentWeather,
  searchLocation,
} from "./services/weatherApi";

export default function App() {
  // Stores the city returned by the geocoding API.
  const [location, setLocation] = useState(null);

  // Stores the current conditions returned by the weather API.
  const [weather, setWeather] = useState(null);

  // Controls the search button and loading card.
  const [isLoading, setIsLoading] = useState(false);

  // Stores errors from either API request.
  const [error, setError] = useState("");

  async function handleSearch(city) {
    // Start a new search.
    setIsLoading(true);
    setError("");

    // Remove the old result while the new city loads.
    setLocation(null);
    setWeather(null);

    try {
      // Request 1: city name → coordinates.
      const locationResult =
        await searchLocation(city);

      // Request 2: coordinates → current weather.
      const weatherResult =
        await fetchCurrentWeather(
          locationResult.latitude,
          locationResult.longitude
        );

      // Save both successful results.
      setLocation(locationResult);
      setWeather(weatherResult);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while loading weather.";

      setError(message);
    } finally {
      // This runs after success or failure.
      setIsLoading(false);
    }
  }

  return (
    <div
      id="top"
      data-theme="scandium"
      className="min-h-screen text-base-content"
    >
      <Header />

      <main>
        <SearchZone
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Show exactly one result state at a time. */}
        {isLoading && <LoadingWeatherCard />}

        {!isLoading && error && (
          <WeatherError message={error} />
        )}

        {!isLoading && location && weather && (
          <CurrentWeatherCard
            location={location}
            weather={weather}
          />
        )}
      </main>
    </div>
  );
}