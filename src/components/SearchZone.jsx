import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Search, X } from "lucide-react";

const CITY_EXAMPLES = [
  "New York",
  "Vancouver",
  "Tokyo",
  "Cape Town",
  "London",
  "Nairobi",
];

function useRotatingPlaceholder(paused) {
  const [cityIndex, setCityIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const city = CITY_EXAMPLES[cityIndex];

    let delay = deleting ? 45 : 90;

    if (!deleting && text === city) {
      delay = 1100;
    }

    if (deleting && text === "") {
      delay = 250;
    }

    const timeout = window.setTimeout(() => {
      if (!deleting && text === city) {
        setDeleting(true);
        return;
      }

      if (deleting && text === "") {
        setDeleting(false);
        setCityIndex((current) => {
          return (current + 1) % CITY_EXAMPLES.length;
        });
        return;
      }

      const nextLength = text.length + (deleting ? -1 : 1);
      setText(city.slice(0, nextLength));
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [cityIndex, deleting, paused, text]);

  return text;
}

export default function SearchZone({ onSearch }) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const example = useRotatingPlaceholder(
    isFocused || city.length > 0
  );

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedCity = city.trim();

    if (!cleanedCity) {
      setError("Enter a city name before searching.");
      return;
    }

    setError("");
    onSearch(cleanedCity);
  }

  function handleChange(event) {
    setCity(event.target.value);

    if (error) {
      setError("");
    }
  }

  function clearSearch() {
    setCity("");
    setError("");
  }

  return (
    <section className="px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="badge badge-outline mb-5 border-primary/30 bg-primary/5 px-4 py-3 text-primary">
          Live weather and daily inspiration
        </div>

        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl lg:text-6xl">
          Find the weather.
          <span className="mt-2 block bg-gradient-to-r from-primary via-yellow-200 to-primary bg-clip-text text-transparent">
            Match your mood.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-base-content/65 sm:text-lg">
          Search any city to see its current conditions, five-day
          forecast and a weather-inspired activity.
        </p>

        <form
          className="mx-auto mt-9 max-w-3xl"
          onSubmit={handleSubmit}
          noValidate
        >
          <label
            htmlFor="city-search"
            className="mb-2 block text-left text-sm font-semibold text-base-content/80"
          >
            Search weather by city
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="input input-lg flex h-16 flex-1 items-center gap-3 border-white/10 bg-base-200/80 shadow-xl shadow-black/15 transition duration-300 focus-within:border-primary/70 focus-within:bg-base-200 focus-within:ring-4 focus-within:ring-primary/10">
              <MapPin
                className="shrink-0 text-primary"
                size={21}
                aria-hidden="true"
              />

              <input
                id="city-search"
                type="text"
                value={city}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={`Try searching ${example || "New York"}`}
                className="min-w-0 flex-1 bg-transparent text-base text-base-content outline-none placeholder:text-base-content/35"
                autoComplete="off"
              />

              {city && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="btn btn-circle btn-ghost btn-sm text-base-content/50 transition hover:rotate-90 hover:bg-white/5 hover:text-base-content"
                  aria-label="Clear city search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary h-16 min-w-40 gap-2 border-0 px-7 text-base font-bold shadow-lg shadow-primary/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0 active:scale-[0.98]"
            >
              <Search size={19} aria-hidden="true" />
              Search
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-3 min-h-6 text-left">
            {error && (
              <p
                className="text-sm font-medium text-error"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}