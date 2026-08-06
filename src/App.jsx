import {
  useEffect,
  useRef,
  useState,
} from "react";

import Header from "./components/Header";
import SearchZone from "./components/SearchZone";
import LoadingWeatherCard from "./components/LoadingWeatherCard";
import WeatherError from "./components/WeatherError";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import FiveDayForecast from "./components/FiveDayForecast";
import MoodSuggestion from "./components/MoodSuggestion";

import {
  fetchWeather,
  searchLocation,
} from "./services/weatherApi";

export default function App() {
  // Main application state
  const [location, setLocation] =
    useState(null);
  const [weather, setWeather] =
    useState(null);
  const [isLoading, setIsLoading] =
    useState(false);
  const [error, setError] = useState("");

  // Controls Celsius or Fahrenheit
  const [ temperatureUnit, setTemperatureUnit] = useState("celsius");

  // Used to scroll to the results section
  const resultRegionRef = useRef(null);

  // Prevents repeated scrolling for the same search
  const hasPositionedCurrentSearch = useRef(false);

  // Checks whether loading, an error, or weather results are visible
  const hasVisibleResultState =
    isLoading ||
    Boolean(error) ||
    Boolean(location && weather);

  // Scroll to the results section when a search begins
  useEffect(() => {
    if (
      !hasVisibleResultState ||
      hasPositionedCurrentSearch.current ||
      !resultRegionRef.current
    ) {
      return;
    }

    const animationFrame =
      window.requestAnimationFrame(() => {
        const resultRegion =
          resultRegionRef.current;

        if (!resultRegion) {
          return;
        }

        const resultPosition =
          resultRegion.getBoundingClientRect();

        // Account for the sticky header
        const stickyHeaderHeight = 72;
        const spaceBelowHeader = 16;

        const targetPosition =
          window.scrollY +
          resultPosition.top -
          stickyHeaderHeight -
          spaceBelowHeader;

        // Respect the user's reduced-motion setting
        const prefersReducedMotion =
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: prefersReducedMotion
            ? "auto"
            : "smooth",
        });

        hasPositionedCurrentSearch.current =
          true;
      });

    // Cancel the animation frame when the effect reruns
    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    hasVisibleResultState,
    isLoading,
  ]);

  // Handles loading, errors, location lookup, and weather requests
  async function runWeatherSearch(
    resolveLocation
  ) {
    hasPositionedCurrentSearch.current =
      false;

    setIsLoading(true);
    setError("");
    setLocation(null);
    setWeather(null);

    try {
      const nextLocation =
        await resolveLocation();

      const nextWeather =
        await fetchWeather(
          nextLocation.latitude,
          nextLocation.longitude
        );

      setLocation(nextLocation);
      setWeather(nextWeather);

    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while loading weather.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  // Search using the city entered by the user
  function handleSearch(city) {
    return runWeatherSearch(() =>
      searchLocation(city)
    );
  }

  // Search using an autocomplete location
  function handleLocationSelect(
    selectedLocation
  ) {
    return runWeatherSearch(
      () => selectedLocation
    );
  }

  // Clear the previous error when the input changes
  function handleSearchInputChange() {
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
      <Header
        temperatureUnit={temperatureUnit}
        onTemperatureUnitChange={
          setTemperatureUnit
        }
      />

      <main>
        <SearchZone
          onSearch={handleSearch}
          onLocationSelect={
            handleLocationSelect
          }
          onInputChange={
            handleSearchInputChange
          }
          isLoading={isLoading}
        />

        {/* Displays loading, error, or weather results */}
        <div
          ref={resultRegionRef}
          className={
            hasVisibleResultState
              ? "mt-8 sm:mt-10"
              : ""
          }
        >
          {isLoading && (
              <div className="min-h-[calc(100svh-5.5rem)]">
                <LoadingWeatherCard />
              </div>
          )}

          {!isLoading && error && (
              <div className="min-h-[calc(100svh-5.5rem)]">
                <WeatherError message={error} />
              </div>
          )}

          {!isLoading &&
            location &&
            weather && (
              <>
              <div className="min-h-[calc(100svh-4rem)]">
                <CurrentWeatherCard
                  location={location}
                  weather={weather}
                  temperatureUnit={
                    temperatureUnit
                  }
                />

                <FiveDayForecast
                  days={weather.forecast}
                  temperatureUnit={
                    temperatureUnit
                  }
                />
              </div>
                <MoodSuggestion
                  current={weather.current}
                />
              </>
            )}
        </div>
      </main>
    </div>
  );
}