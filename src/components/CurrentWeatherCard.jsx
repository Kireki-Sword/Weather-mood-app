import {
  Clock3,
  MapPin,
  Thermometer,
  Wind,
} from "lucide-react";

import { getWeatherDetails } from "../utils/weatherCodes";

export default function CurrentWeatherCard({
  location,
  weather,
}) {
  const current = weather.current;
  const units = weather.current_units;

  const weatherDetails = getWeatherDetails(
    current.weather_code,
    current.is_day
  );

  const locationDescription = [
    location.admin1,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <article className="card w-full overflow-hidden border border-white/10 bg-base-200/70 shadow-[0_24px_70px_rgb(0_0_0_/_0.28)]">
          <div className="card-body gap-8 p-7 sm:p-9 lg:p-10">
            {/* Card heading */}
            <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
                  Current weather
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-base-content sm:text-4xl">
                  {location.name}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-base-content/55">
                  <MapPin
                    size={17}
                    aria-hidden="true"
                  />

                  {locationDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-base-content/45">
                <Clock3
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  {weather.timezone_abbreviation}
                </span>
              </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
              {/* Main weather information */}
              <div className="flex flex-col gap-6 min-[430px]:flex-row min-[430px]:items-center">
                <div
                  className="grid size-24 shrink-0 place-items-center rounded-2xl border border-white/10 bg-base-300/60 text-6xl"
                  aria-hidden="true"
                >
                  {weatherDetails.emoji}
                </div>

                <div>
                  <p className="text-6xl font-extrabold tracking-tight text-base-content sm:text-7xl">
                    {Math.round(
                      current.temperature_2m
                    )}

                    <span className="ml-1 text-3xl font-bold text-primary">
                      {units.temperature_2m}
                    </span>
                  </p>

                  <p className="mt-2 text-lg font-semibold text-base-content/65">
                    {weatherDetails.label}
                  </p>
                </div>
              </div>

              {/* Secondary measurements */}
              <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-base-300/45 p-5">
                  <Thermometer
                    className="text-primary/80"
                    size={21}
                    aria-hidden="true"
                  />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-base-content/45">
                    Feels like
                  </p>

                  <p className="mt-1 text-2xl font-bold text-base-content">
                    {Math.round(
                      current.apparent_temperature
                    )}

                    {units.apparent_temperature}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-base-300/45 p-5">
                  <Wind
                    className="text-primary/80"
                    size={21}
                    aria-hidden="true"
                  />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-base-content/45">
                    Wind speed
                  </p>

                  <p className="mt-1 text-2xl font-bold text-base-content">
                    {Math.round(
                      current.wind_speed_10m
                    )}{" "}
                    {units.wind_speed_10m}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}