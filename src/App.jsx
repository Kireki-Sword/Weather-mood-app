import { useEffect, useRef, useState } from "react";

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

  // Points to the loading, error, or successful-result region.
  const resultRegionRef = useRef(null);

  // Prevents repeated automatic scrolling during one search.
  const hasPositionedCurrentSearch = useRef(false);

  // True when loading, an error, or weather results are visible.
  const hasVisibleResultState =
    isLoading ||
    Boolean(error) ||
    Boolean(location && weather);


  useEffect(() => {

    // Stop when there is nothing to show,
    // when this search already scrolled,
    // or when the result HTML element is unavailable.
    if (
      !hasVisibleResultState ||
      hasPositionedCurrentSearch.current ||
      !resultRegionRef.current
    ) {
      return;
    }

    // Wait until React has displayed the loading card.
    const animationFrame = window.requestAnimationFrame(
      () => {
        const resultRegion = resultRegionRef.current;

        if (!resultRegion) {
          return;
        }

        // Find the result area's current position.
        const resultPosition =
          resultRegion.getBoundingClientRect();

        // Reserve room for the sticky header
        // and leave a small gap beneath it.
        const stickyHeaderHeight = 72;
        const spaceBelowHeader = 16;

        // Calculate the exact page position where
        // the result section should begin.
        const targetPosition =
          window.scrollY +
          resultPosition.top -
          stickyHeaderHeight -
          spaceBelowHeader;

        // Check whether the user has requested less motion.
        const prefersReducedMotion =
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

        // Move the loading card directly below the header.
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: prefersReducedMotion
            ? "auto"
            : "smooth",
        });

        // Do not scroll again when the real weather card
        // replaces the loading card.
        hasPositionedCurrentSearch.current = true;
      }
    );

    // Cancel the scheduled frame if React updates first.
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [hasVisibleResultState, error, isLoading, location, weather]);


  async function handleSearch(city) {
    // Start a new search.
    hasPositionedCurrentSearch.current = false;
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


  function handleSearchInputChange() {
    // Remove an API error when the user begins a new entry.
    if (error) {
      setError("");
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
          onInputChange={handleSearchInputChange}
          isLoading={isLoading}
        />

        {/* Show exactly one result state at a time. */}
        <div
          ref={resultRegionRef}
          className={
            hasVisibleResultState
              ? "min-h-[calc(100svh-5.5rem)]"
              : ""
          }
        >
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
        </div>
      </main>
    </div>
  );
}