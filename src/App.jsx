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

import {
  fetchWeather,
  searchLocation,
} from "./services/weatherApi";

export default function App() {
  const [location, setLocation] =
    useState(null);

  const [weather, setWeather] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");

  // Controls Celsius/Fahrenheit throughout the app.
  const [
    temperatureUnit,
    setTemperatureUnit,
  ] = useState("celsius");

  const resultRegionRef = useRef(null);

  const hasPositionedCurrentSearch =
    useRef(false);

  const hasVisibleResultState =
    isLoading ||
    Boolean(error) ||
    Boolean(location && weather);

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

        // This matches Header.jsx's 72px height.
        const stickyHeaderHeight = 72;
        const spaceBelowHeader = 16;

        const targetPosition =
          window.scrollY +
          resultPosition.top -
          stickyHeaderHeight -
          spaceBelowHeader;

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

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    hasVisibleResultState,
    isLoading,
  ]);

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

  function handleSearch(city) {
    return runWeatherSearch(() =>
      searchLocation(city)
    );
  }

  function handleLocationSelect(
    selectedLocation
  ) {
    return runWeatherSearch(
      () => selectedLocation
    );
  }

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

        <div
          ref={resultRegionRef}
          className={
            hasVisibleResultState
              ? "mt-2 min-h-[calc(100svh-5.5rem)] sm:mt-3"
              : ""
          }
        >
          {isLoading && (
            <LoadingWeatherCard />
          )}

          {!isLoading && error && (
            <WeatherError message={error} />
          )}

          {!isLoading &&
            location &&
            weather && (
              <>
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
              </>
            )}
        </div>
      </main>
    </div>
  );
}