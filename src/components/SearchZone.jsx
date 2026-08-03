import { useState } from "react";
import { MapPin, Search, X } from "lucide-react";

const CITY_EXAMPLES = [
  "New York",
  "Vancouver",
  "Tokyo",
  "Cape Town",
  "London",
  "Nairobi",
];

export default function SearchZone({
  onSearch,
  isLoading = false,
}) {
  // Stores the current city input value.
  const [city, setCity] = useState("");

  // Tracks whether the input is currently selected.
  const [isFocused, setIsFocused] = useState(false);

  // Stores an empty-input validation message.
  const [validationError, setValidationError] =
    useState("");

  // Show rotating examples only when the input is inactive.
  const showRotatingExample =
    city.length === 0 && !isFocused && !isLoading;

  function handleChange(event) {
    setCity(event.target.value);

    // Remove the old error as soon as the user types.
    if (validationError) {
      setValidationError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedCity = city.trim();

    if (!cleanedCity) {
      setValidationError(
        "Enter a city name before searching."
      );
      return;
    }

    setValidationError("");
    onSearch(cleanedCity);
  }

  function clearSearch() {
    setCity("");
    setValidationError("");
  }

  return (
    <section className="px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Main introduction */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary/80">
            Weather + Mood Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
            Find the weather.
            <span className="mt-1 block text-primary">
              Match your mood.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-base-content/60 sm:text-lg">
            Search any city to see its current conditions,
            five-day forecast, and a weather-inspired
            activity.
          </p>
        </div>

        {/* Search form */}
        <form
          className="mx-auto mt-8 max-w-4xl"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="city-search"
                className="mb-2 block text-left text-sm font-semibold text-base-content/80"
              >
                Search weather by city
              </label>

              {/* Search-input container */}
              <div
                className={`
                  relative flex h-14 items-center
                  rounded-xl border
                  bg-base-200/70
                  shadow-sm
                  transition-colors duration-150
                  focus-within:border-primary/60
                  focus-within:bg-base-200
                  focus-within:ring-2
                  focus-within:ring-primary/10
                  ${
                    validationError
                      ? "border-error/60"
                      : "border-white/10"
                  }
                `}
              >
                <MapPin
                  className="pointer-events-none absolute left-4 z-20 text-primary"
                  size={20}
                  aria-hidden="true"
                />

                {/* daisyUI rotating city examples */}
                {showRotatingExample && (
                  <div
                    className="pointer-events-none absolute left-12 right-12 flex items-center gap-1 overflow-hidden whitespace-nowrap text-left text-base-content/35"
                    aria-hidden="true"
                  >
                    <span className="shrink-0">
                      Try searching
                    </span>

                    <span className="text-rotate font-semibold text-primary/70">
                      <span>
                        {CITY_EXAMPLES.map(
                          (exampleCity) => (
                            <span key={exampleCity}>
                              {exampleCity}
                            </span>
                          )
                        )}
                      </span>
                    </span>
                  </div>
                )}

                {/* Controlled input */}
                <input
                  id="city-search"
                  type="text"
                  value={city}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={
                    isFocused
                      ? "Enter a city name"
                      : ""
                  }
                  className="relative z-10 h-full w-full min-w-0 bg-transparent pl-12 pr-12 text-base text-base-content outline-none placeholder:text-base-content/35"
                  autoComplete="off"
                  disabled={isLoading}
                  aria-invalid={
                    validationError ? "true" : "false"
                  }
                  aria-describedby={
                    validationError
                      ? "city-search-error"
                      : undefined
                  }
                />

                {/* Clear-input button */}
                {city && !isLoading && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="btn btn-circle btn-ghost btn-sm absolute right-3 z-20 text-base-content/45 hover:bg-white/5 hover:text-base-content"
                    aria-label="Clear city search"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Stable primary button: no Aura or moving glow */}
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="
                btn h-14 w-full rounded-xl
                border border-primary/40
                bg-primary px-6
                font-bold text-primary-content
                shadow-sm
                transition-colors duration-150
                hover:border-primary
                hover:bg-primary/90
                disabled:cursor-wait
                disabled:border-white/10
                disabled:bg-base-300
                disabled:text-base-content/70
                disabled:opacity-100
                sm:w-40
              "
            >
              {isLoading ? (
                <>
                  <span
                    className="loading loading-spinner loading-sm"
                    aria-hidden="true"
                  />

                  <span>Searching</span>
                </>
              ) : (
                <>
                  <Search
                    size={18}
                    aria-hidden="true"
                  />

                  <span>Search</span>
                </>
              )}
            </button>
          </div>

          {/* Reserved space prevents layout movement */}
          <div className="mt-2 min-h-5 text-left">
            {validationError && (
              <p
                id="city-search-error"
                className="text-sm font-medium text-error"
                role="alert"
              >
                {validationError}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}