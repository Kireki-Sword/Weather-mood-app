import {
  CloudSun,
} from "lucide-react";

export default function Header({
  temperatureUnit,
  onTemperatureUnitChange,
}) {
  return (
    <header className="sticky top-0 z-[60] border-b border-white/8 bg-base-100/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="Scandium Weather home"
        >
          <span className="grid size-11 place-items-center rounded-xl border border-primary/35 bg-primary/8 text-primary">
            <CloudSun
              size={24}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>

          <span>
            <span className="block text-sm font-extrabold tracking-[-0.02em] text-base-content sm:text-base">
              Scandium Weather
            </span>

            <span className="block text-xs font-semibold text-base-content/48">
              Weather + Mood Dashboard
            </span>
          </span>
        </a>

        <div
          className="flex items-center rounded-xl border border-white/10 bg-base-200/70 p-1"
          role="group"
          aria-label="Temperature unit"
        >
          <button
            type="button"
            aria-pressed={
              temperatureUnit ===
              "celsius"
            }
            onClick={() =>
              onTemperatureUnitChange(
                "celsius"
              )
            }
            className={`
              min-h-9 min-w-11 rounded-lg
              px-3 text-sm font-extrabold
              transition-colors
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-primary
              ${
                temperatureUnit ===
                "celsius"
                  ? "bg-primary text-primary-content"
                  : "text-base-content/58 hover:bg-white/5 hover:text-base-content"
              }
            `}
          >
            °C
          </button>

          <button
            type="button"
            aria-pressed={
              temperatureUnit ===
              "fahrenheit"
            }
            onClick={() =>
              onTemperatureUnitChange(
                "fahrenheit"
              )
            }
            className={`
              min-h-9 min-w-11 rounded-lg
              px-3 text-sm font-extrabold
              transition-colors
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-primary
              ${
                temperatureUnit ===
                "fahrenheit"
                  ? "bg-primary text-primary-content"
                  : "text-base-content/58 hover:bg-white/5 hover:text-base-content"
              }
            `}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
}