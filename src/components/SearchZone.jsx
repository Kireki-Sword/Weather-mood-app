import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  MapPin,
  Search,
  X,
} from "lucide-react";

import {
  searchLocationSuggestions,
} from "../services/weatherApi";

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
  onLocationSelect = () => {},
  onInputChange = () => {},
  isLoading = false,
}) {
  const [city, setCity] = useState("");

  const [isFocused, setIsFocused] =
    useState(false);

  const [
    validationError,
    setValidationError,
  ] = useState("");

  const [
    isSearchReady,
    setIsSearchReady,
  ] = useState(false);

  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  const [
    isLoadingSuggestions,
    setIsLoadingSuggestions,
  ] = useState(false);

  const [
    isSuggestionOpen,
    setIsSuggestionOpen,
  ] = useState(false);

  const [
    activeSuggestionIndex,
    setActiveSuggestionIndex,
  ] = useState(-1);

  const [
    hasSuggestionResponse,
    setHasSuggestionResponse,
  ] = useState(false);

  const [
    suggestionError,
    setSuggestionError,
  ] = useState("");

  const inputRef = useRef(null);

  const closeTimerRef = useRef(null);

  const suggestionRequestIdRef =
    useRef(0);

  const listboxId = useId();

  const showRotatingExample =
    city.length === 0 &&
    !isFocused &&
    !isLoading;

  useEffect(() => {
    const requestId =
      suggestionRequestIdRef.current + 1;

    suggestionRequestIdRef.current =
      requestId;

    const query = city.trim();

    if (
      !isFocused ||
      !isSearchReady ||
      isLoading ||
      query.length < 2
    ) {
      setSuggestions([]);
      setIsSuggestionOpen(false);
      setIsLoadingSuggestions(false);
      setHasSuggestionResponse(false);
      setSuggestionError("");
      setActiveSuggestionIndex(-1);

      return;
    }

    const controller =
      new AbortController();

    const delayTimer =
      window.setTimeout(async () => {
        setIsLoadingSuggestions(true);
        setSuggestionError("");
        setHasSuggestionResponse(false);
        setIsSuggestionOpen(true);

        try {
          const matches =
            await searchLocationSuggestions(
              query,
              {
                signal: controller.signal,
              }
            );

          if (
            suggestionRequestIdRef.current !==
            requestId
          ) {
            return;
          }

          setSuggestions(matches);
          setHasSuggestionResponse(true);
          setActiveSuggestionIndex(-1);
        } catch (requestError) {
          if (
            requestError?.name ===
            "AbortError"
          ) {
            return;
          }

          if (
            suggestionRequestIdRef.current !==
            requestId
          ) {
            return;
          }

          setSuggestions([]);
          setHasSuggestionResponse(true);
          setSuggestionError(
            "Could not load location suggestions."
          );
        } finally {
          if (
            suggestionRequestIdRef.current ===
            requestId
          ) {
            setIsLoadingSuggestions(false);
          }
        }
      }, 350);

    return () => {
      window.clearTimeout(delayTimer);
      controller.abort();
    };
  }, [
    city,
    isFocused,
    isLoading,
    isSearchReady,
  ]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(
          closeTimerRef.current
        );
      }
    };
  }, []);

  function closeSuggestions() {
    setIsSuggestionOpen(false);
    setActiveSuggestionIndex(-1);
  }

  function handleChange(event) {
    const nextCity = event.target.value;

    setCity(nextCity);

    setIsSearchReady(
      nextCity.trim().length > 0
    );

    onInputChange();

    if (validationError) {
      setValidationError("");
    }
  }

  function handleFocus() {
    if (closeTimerRef.current) {
      window.clearTimeout(
        closeTimerRef.current
      );
    }

    setIsFocused(true);

    if (
      isSearchReady &&
      (suggestions.length > 0 ||
        hasSuggestionResponse)
    ) {
      setIsSuggestionOpen(true);
    }
  }

  function handleBlur() {
    closeTimerRef.current =
      window.setTimeout(() => {
        setIsFocused(false);
        closeSuggestions();
      }, 120);
  }

  function handleSuggestionSelect(
    suggestion
  ) {
    setCity(suggestion.name);
    setIsSearchReady(false);
    setValidationError("");
    setSuggestions([]);
    setHasSuggestionResponse(false);
    closeSuggestions();

    inputRef.current?.blur();

    onLocationSelect(suggestion);
  }

  function handleInputKeyDown(event) {
    if (
      event.key === "ArrowDown" &&
      suggestions.length > 0
    ) {
      event.preventDefault();

      setIsSuggestionOpen(true);

      setActiveSuggestionIndex(
        (currentIndex) =>
          currentIndex >=
          suggestions.length - 1
            ? 0
            : currentIndex + 1
      );

      return;
    }

    if (
      event.key === "ArrowUp" &&
      suggestions.length > 0
    ) {
      event.preventDefault();

      setIsSuggestionOpen(true);

      setActiveSuggestionIndex(
        (currentIndex) =>
          currentIndex <= 0
            ? suggestions.length - 1
            : currentIndex - 1
      );

      return;
    }

    if (
      event.key === "Enter" &&
      isSuggestionOpen &&
      activeSuggestionIndex >= 0
    ) {
      event.preventDefault();

      handleSuggestionSelect(
        suggestions[
          activeSuggestionIndex
        ]
      );

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeSuggestions();
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
    setSuggestions([]);
    setHasSuggestionResponse(false);
    closeSuggestions();

    inputRef.current?.blur();

    onSearch(cleanedCity);
  }

  function clearSearch() {
    setCity("");
    setValidationError("");
    setIsSearchReady(false);
    setSuggestions([]);
    setHasSuggestionResponse(false);
    setSuggestionError("");
    closeSuggestions();

    onInputChange();

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  const showSuggestionPanel =
    isFocused &&
    isSearchReady &&
    isSuggestionOpen &&
    (isLoadingSuggestions ||
      hasSuggestionResponse ||
      suggestions.length > 0);

  return (
    <section className="px-4 pb-6 pt-8 sm:px-6 sm:pb-7 sm:pt-10 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
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
            Search any city to see its
            current conditions, five-day
            forecast, and a weather-inspired
            activity.
          </p>
        </div>

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
                            <span
                              key={
                                exampleCity
                              }
                            >
                              {exampleCity}
                            </span>
                          )
                        )}
                      </span>
                    </span>
                  </div>
                )}

                <input
                  ref={inputRef}
                  id="city-search"
                  type="text"
                  role="combobox"
                  value={city}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={
                    handleInputKeyDown
                  }
                  placeholder={
                    isFocused
                      ? "Enter a city name"
                      : ""
                  }
                  className="relative z-10 h-full w-full min-w-0 bg-transparent pl-12 pr-12 text-base font-semibold tracking-[-0.01em] text-base-content outline-none placeholder:font-medium placeholder:text-base-content/38"
                  autoComplete="off"
                  autoCapitalize="words"
                  spellCheck={false}
                  disabled={isLoading}
                  aria-autocomplete="list"
                  aria-haspopup="listbox"
                  aria-expanded={
                    showSuggestionPanel
                  }
                  aria-controls={listboxId}
                  aria-activedescendant={
                    activeSuggestionIndex >= 0
                      ? `${listboxId}-option-${activeSuggestionIndex}`
                      : undefined
                  }
                  aria-invalid={
                    validationError
                      ? "true"
                      : "false"
                  }
                  aria-describedby={
                    validationError
                      ? "city-search-error"
                      : undefined
                  }
                />

                {city && !isLoading && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="btn btn-circle btn-ghost btn-sm absolute right-3 z-20 text-base-content/48 hover:bg-white/6 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Clear city search"
                  >
                    <X
                      size={17}
                      aria-hidden="true"
                    />
                  </button>
                )}

                {showSuggestionPanel && (
                  <div
                    id={listboxId}
                    role="listbox"
                    aria-label="Location suggestions"
                    className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-white/12 bg-base-200 shadow-[0_20px_55px_rgb(0_0_0_/_0.48)]"
                  >
                    {isLoadingSuggestions && (
                      <div className="flex min-h-14 items-center gap-3 px-4 text-sm text-base-content/65">
                        <span
                          className="loading loading-spinner loading-sm text-primary"
                          aria-hidden="true"
                        />

                        <span>
                          Finding locations…
                        </span>
                      </div>
                    )}

                    {!isLoadingSuggestions &&
                      suggestionError && (
                        <p className="px-4 py-4 text-sm font-semibold text-error">
                          {suggestionError}
                        </p>
                      )}

                    {!isLoadingSuggestions &&
                      !suggestionError &&
                      suggestions.map(
                        (
                          suggestion,
                          index
                        ) => {
                          const locationDetails =
                            [
                              suggestion.admin1,
                              suggestion.country,
                            ]
                              .filter(
                                (
                                  value,
                                  valueIndex,
                                  values
                                ) =>
                                  value &&
                                  value !==
                                    suggestion.name &&
                                  values.indexOf(
                                    value
                                  ) ===
                                    valueIndex
                              )
                              .join(", ");

                          return (
                            <button
                              key={
                                suggestion.id ??
                                `${suggestion.latitude}-${suggestion.longitude}`
                              }
                              id={`${listboxId}-option-${index}`}
                              type="button"
                              role="option"
                              aria-selected={
                                activeSuggestionIndex ===
                                index
                              }
                              onMouseDown={(
                                mouseEvent
                              ) =>
                                mouseEvent.preventDefault()
                              }
                              onMouseEnter={() =>
                                setActiveSuggestionIndex(
                                  index
                                )
                              }
                              onClick={() =>
                                handleSuggestionSelect(
                                  suggestion
                                )
                              }
                              className={`
                                flex w-full items-start gap-3
                                border-b border-white/7
                                px-4 py-3 text-left
                                last:border-b-0
                                ${
                                  activeSuggestionIndex ===
                                  index
                                    ? "bg-primary/10"
                                    : "hover:bg-white/5"
                                }
                              `}
                            >
                              <MapPin
                                className="mt-0.5 shrink-0 text-primary"
                                size={18}
                                aria-hidden="true"
                              />

                              <span className="min-w-0">
                                <span className="block truncate text-sm font-extrabold text-base-content">
                                  {
                                    suggestion.name
                                  }
                                </span>

                                {locationDetails && (
                                  <span className="mt-0.5 block truncate text-xs font-medium text-base-content/55">
                                    {
                                      locationDetails
                                    }
                                  </span>
                                )}
                              </span>
                            </button>
                          );
                        }
                      )}

                    {!isLoadingSuggestions &&
                      !suggestionError &&
                      hasSuggestionResponse &&
                      suggestions.length ===
                        0 && (
                        <p className="px-4 py-4 text-sm font-medium text-base-content/58">
                          No matching locations
                          found.
                        </p>
                      )}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`
                w-full sm:w-40
                ${
                  isSearchReady &&
                  !isLoading
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
                    <Search
                      size={18}
                      aria-hidden="true"
                    />

                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

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