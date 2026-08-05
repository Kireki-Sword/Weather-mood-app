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
  onInputChange = () => {},
  isLoading = false,
}) {
  // Stores the current city input value.
  const [city, setCity] = useState("");

  // Tracks whether the input is currently selected.
  const [isFocused, setIsFocused] = useState(false);

  // Stores an empty-input validation message.
  const [validationError, setValidationError] =
    useState("");

  // Controls whether the Search button aura is visible.
  const [isSearchReady, setIsSearchReady] =
    useState(false);

  // Show rotating examples only when the input is inactive.
  const showRotatingExample =
    city.length === 0 && !isFocused && !isLoading;

  function handleChange(event) {
    const nextCity = event.target.value;

    setCity(nextCity);

    // Show the aura after the user enters or edits a city.
    setIsSearchReady(nextCity.trim().length > 0);

    onInputChange();

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
    setIsSearchReady(false);
    onSearch(cleanedCity);
  }

  function clearSearch() {
    setCity("");
    setValidationError("");
    setIsSearchReady(false);
    onInputChange();
  }

  return (
    <section className="px-4 pb-6 pt-8 sm:px-6 sm:pb-7 sm:pt-10 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Main introduction */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/85 sm:text-sm">
            Weather + Mood Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-base-content sm:text-5xl lg:text-[3.4rem]">
            Find the weather.
            <span className="weather-heading-accent mt-1 block">
              Match your mood.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-base-content/68 sm:text-lg">
            Search any city to see its current conditions,
            five-day forecast, and a weather-inspired
            activity.
          </p>
        </div>

        {/* Search form */}
        <form
          className="weather-search-shell mx-auto mt-7 max-w-4xl rounded-2xl p-3 sm:p-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="city-search"
                className="mb-2 block text-left text-sm font-bold tracking-[-0.01em] text-base-content/86"
              >
                Search weather by city
              </label>

              {/* Search-input container */}
              <div
                className={`
                  relative flex h-14 items-center
                  rounded-xl border
                  bg-base-100/55
                  shadow-[inset_0_1px_0_rgb(255_255_255_/_0.025)]
                  transition-[border-color,background-color,box-shadow]
                  duration-150
                  focus-within:border-primary/65
                  focus-within:bg-base-100/80
                  focus-within:ring-2
                  focus-within:ring-primary/15
                  ${
                    validationError
                      ? "border-error/65"
                      : "border-white/12"
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
                    className="pointer-events-none absolute left-12 right-12 flex items-center gap-1 overflow-hidden whitespace-nowrap text-left text-base-content/42"
                    aria-hidden="true"
                  >
                    <span className="shrink-0">
                      Try searching
                    </span>

                    <span className="text-rotate font-bold text-primary/85">
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
                  className="relative z-10 h-full w-full min-w-0 bg-transparent pl-12 pr-12 text-base font-semibold tracking-[-0.01em] text-base-content outline-none placeholder:font-medium placeholder:text-base-content/38"
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
                    className="btn btn-circle btn-ghost btn-sm absolute right-3 z-20 text-base-content/48 hover:bg-white/6 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Clear city search"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Gold aura appears when a city is ready to search */}
            <div
              className={`
                w-full sm:w-40
                ${
                  isSearchReady && !isLoading
                    ? "aura aura-gold aura-sm"
                    : ""
                }
              `}
            >
              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="weather-primary-button btn h-14 w-full rounded-xl px-6 font-extrabold disabled:cursor-wait disabled:border-white/10 disabled:bg-none disabled:bg-base-300 disabled:text-base-content/70 disabled:opacity-100"
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
                    <Search size={18} aria-hidden="true" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reserved space prevents layout movement */}
          <div className="mt-2 min-h-5 text-left">
            {validationError && (
              <p
                id="city-search-error"
                className="text-sm font-semibold text-error"
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