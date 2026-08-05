import {
  CloudRain,
} from "lucide-react";

import WeatherIcon from "./WeatherIcon";

import {
  formatForecastDay,
  formatShortDate,
  formatTemperature,
  getWeatherDescription,
} from "../utils/weather";

export default function FiveDayForecast({
  days,
  temperatureUnit,
}) {
  if (!days?.length) {
    return null;
  }

  return (
    <section
      className="px-4 pb-10 pt-5 sm:px-6 lg:px-8"
      aria-labelledby="forecast-title"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Coming up
          </p>

          <h2
            id="forecast-title"
            className="mt-1 text-2xl font-extrabold tracking-[-0.03em] text-base-content"
          >
            Five-day forecast
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {days
            .slice(0, 5)
            .map((day, index) => (
              <article
                key={day.date}
                className="rounded-2xl border border-white/10 bg-base-200/70 p-4 transition-[transform,border-color,background-color] duration-150 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-base-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-base-content">
                      {formatForecastDay(
                        day.date,
                        index
                      )}
                    </h3>

                    <time
                      dateTime={day.date}
                      className="mt-0.5 block text-xs font-semibold text-base-content/45"
                    >
                      {formatShortDate(
                        day.date
                      )}
                    </time>
                  </div>

                  <WeatherIcon
                    weatherCode={
                      day.weatherCode
                    }
                    size={32}
                    className="text-primary"
                  />
                </div>

                <p className="mt-5 min-h-9 text-sm font-semibold leading-5 text-base-content/65">
                  {getWeatherDescription(
                    day.weatherCode,
                    true
                  )}
                </p>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xl font-extrabold tracking-[-0.03em] text-base-content">
                      {formatTemperature(
                        day.temperatureMax,
                        temperatureUnit
                      )}
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-base-content/42">
                      {formatTemperature(
                        day.temperatureMin,
                        temperatureUnit
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-base-content/50">
                    <CloudRain
                      size={15}
                      className="text-primary"
                      aria-hidden="true"
                    />

                    <span>
                      {Number.isFinite(
                        day.precipitationProbability
                      )
                        ? `${Math.round(
                            day.precipitationProbability
                          )}%`
                        : "—"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}