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
    <section className="px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <article className="weather-result-card card w-full overflow-hidden">
          <div className="card-body gap-6 p-6 sm:p-7 lg:p-8">
            {/* Card heading */}
            <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/88 sm:text-sm">
                  Current weather
                </p>

                <h2 className="mt-1.5 break-words text-3xl font-extrabold tracking-[-0.025em] text-base-content sm:text-[2.2rem]">
                  {location.name}
                </h2>

                <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-base-content/62 sm:text-base">
                  <MapPin
                    className="shrink-0 text-base-content/48"
                    size={17}
                    aria-hidden="true"
                  />

                  <span>
                    {locationDescription ||
                      "Location details unavailable"}
                  </span>
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/8 bg-base-300/35 px-3 py-1.5 text-sm font-medium text-base-content/52">
                <Clock3
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  {weather.timezone_abbreviation ||
                    location.timezone}
                </span>
              </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.62fr)] lg:items-center">
              {/* Main weather information */}
              <div className="flex flex-col gap-5 min-[430px]:flex-row min-[430px]:items-center">
                <div
                  className="grid size-20 shrink-0 place-items-center rounded-2xl border border-primary/18 bg-gradient-to-br from-primary/12 to-base-300/65 text-5xl shadow-[inset_0_1px_0_rgb(255_255_255_/_0.05)] sm:size-24 sm:text-6xl"
                  aria-hidden="true"
                >
                  {weatherDetails.emoji}
                </div>

                <div>
                  <p className="text-6xl font-extrabold leading-none tracking-[-0.055em] text-base-content sm:text-7xl">
                    {Math.round(
                      current.temperature_2m
                    )}

                    <span className="ml-1.5 text-2xl font-extrabold tracking-normal text-primary sm:text-3xl">
                      {units.temperature_2m}
                    </span>
                  </p>

                  <p className="mt-2 text-lg font-bold text-base-content/72">
                    {weatherDetails.label}
                  </p>
                </div>
              </div>

              {/* Secondary measurements */}
              <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-1">
                <div className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-base-300/48 p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.025)]">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Thermometer
                      size={21}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-base-content/50">
                      Feels like
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-base-content">
                      {Math.round(
                        current.apparent_temperature
                      )}

                      {units.apparent_temperature}
                    </p>
                  </div>
                </div>

                <div className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-base-300/48 p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.025)]">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Wind
                      size={21}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-base-content/50">
                      Wind speed
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-base-content">
                      {Math.round(
                        current.wind_speed_10m
                      )}{" "}
                      {units.wind_speed_10m}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}