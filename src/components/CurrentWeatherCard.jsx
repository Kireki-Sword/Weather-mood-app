import {
  Clock3,
  CloudRain,
  Droplets,
  MapPin,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";

import WeatherIcon from "./WeatherIcon";

import {
  convertTemperature,
  degreesToCompass,
  formatClockFromIso,
  formatTemperature,
  getTemperatureUnitLabel,
  getWeatherDescription,
} from "../utils/weather";

function MetricCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-h-24 items-center gap-3 rounded-2xl border border-white/10 bg-base-100/28 p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon
          size={20}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>

      <span className="min-w-0">
        <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-base-content/48">
          {label}
        </span>

        <span className="mt-1 block truncate text-lg font-extrabold tracking-[-0.02em] text-base-content">
          {value}
        </span>
      </span>
    </div>
  );
}

export default function CurrentWeatherCard({
  location,
  weather,
  temperatureUnit,
}) {
  const current = weather.current;
  const today = weather.today;

  const currentTemperature =
    convertTemperature(
      current.temperature,
      temperatureUnit
    );

  const unitLabel =
    getTemperatureUnitLabel(
      temperatureUnit
    );

  const condition =
    getWeatherDescription(
      current.weatherCode,
      current.isDay === 1
    );

  const locationDetails = [
    location.admin1,
    location.country,
  ]
    .filter(
      (value, index, values) =>
        value &&
        value !== location.name &&
        values.indexOf(value) === index
    )
    .join(", ");

  const windDirection =
    degreesToCompass(
      current.windDirection
    );

  const windValue = Number.isFinite(
    current.windSpeed
  )
    ? `${Math.round(
        current.windSpeed
      )} km/h${
        windDirection
          ? ` ${windDirection}`
          : ""
      }`
    : "—";

  const rainChance =
    Number.isFinite(
      today?.precipitationProbability
    )
      ? `${Math.round(
          today.precipitationProbability
        )}%`
      : "—";

  return (
    <section
      className="px-4 pb-1 sm:px-6 lg:px-8"
      aria-labelledby="current-weather-title"
    >
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-base-200/80 p-6 shadow-[0_24px_80px_rgb(0_0_0_/_0.26)] sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary sm:text-sm">
              Current weather
            </p>

            <h2
              id="current-weather-title"
              className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-base-content"
            >
              {location.name}
            </h2>

            {locationDetails && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-base-content/60 sm:text-base">
                <MapPin
                  size={17}
                  aria-hidden="true"
                />

                <span>
                  {locationDetails}
                </span>
              </p>
            )}
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-base-100/25 px-3 py-2 text-xs font-bold text-base-content/55">
            <Clock3
              size={15}
              aria-hidden="true"
            />

            <span>
              {weather.timezoneAbbreviation}
            </span>
          </div>
        </div>

        <div className="my-6 border-t border-white/10" />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="grid size-24 shrink-0 place-items-center rounded-2xl border border-primary/25 bg-[radial-gradient(circle_at_center,rgb(250_190_40_/_0.14),transparent_72%)] text-primary">
              <WeatherIcon
                weatherCode={
                  current.weatherCode
                }
                isDay={
                  current.isDay === 1
                }
                size={52}
              />
            </div>

            <div>
              <div className="flex items-start">
                <span className="text-6xl font-extrabold leading-none tracking-[-0.065em] text-base-content sm:text-7xl">
                  {currentTemperature ===
                  null
                    ? "—"
                    : Math.round(
                        currentTemperature
                      )}
                </span>

                {currentTemperature !==
                  null && (
                  <span className="ml-2 mt-2 text-2xl font-extrabold text-primary">
                    {unitLabel}
                  </span>
                )}
              </div>

              <p className="mt-2 text-base font-bold text-base-content/78 sm:text-lg">
                {condition}
              </p>

              {today && (
                <p className="mt-2 text-sm font-semibold text-base-content/50">
                  High{" "}
                  {formatTemperature(
                    today.temperatureMax,
                    temperatureUnit
                  )}
                  <span className="mx-2 text-base-content/25">
                    •
                  </span>
                  Low{" "}
                  {formatTemperature(
                    today.temperatureMin,
                    temperatureUnit
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              icon={Thermometer}
              label="Feels like"
              value={formatTemperature(
                current.apparentTemperature,
                temperatureUnit
              )}
            />

            <MetricCard
              icon={Droplets}
              label="Humidity"
              value={
                Number.isFinite(
                  current.humidity
                )
                  ? `${Math.round(
                      current.humidity
                    )}%`
                  : "—"
              }
            />

            <MetricCard
              icon={Wind}
              label="Wind"
              value={windValue}
            />

            <MetricCard
              icon={CloudRain}
              label="Rain chance"
              value={rainChance}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm">
            <Sunrise
              className="text-primary"
              size={18}
              aria-hidden="true"
            />

            <span className="text-base-content/48">
              Sunrise
            </span>

            <strong className="ml-auto text-base-content">
              {formatClockFromIso(
                today?.sunrise
              )}
            </strong>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Sunset
              className="text-primary"
              size={18}
              aria-hidden="true"
            />

            <span className="text-base-content/48">
              Sunset
            </span>

            <strong className="ml-auto text-base-content">
              {formatClockFromIso(
                today?.sunset
              )}
            </strong>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock3
              className="text-primary"
              size={18}
              aria-hidden="true"
            />

            <span className="text-base-content/48">
              Updated
            </span>

            <strong className="ml-auto text-base-content">
              {formatClockFromIso(
                current.time
              )}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}