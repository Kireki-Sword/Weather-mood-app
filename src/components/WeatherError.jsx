import { CircleAlert } from "lucide-react";

export default function WeatherError({ message }) {
  return (
    <section className="px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="weather-error-card flex items-start gap-4 rounded-2xl p-5 sm:p-6"
          role="alert"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-error/18 bg-error/12 text-error shadow-[inset_0_1px_0_rgb(255_255_255_/_0.03)]">
            <CircleAlert
              size={21}
              aria-hidden="true"
            />
          </span>

          <div className="min-w-0">
            <h2 className="font-extrabold tracking-[-0.01em] text-base-content">
              Weather search failed
            </h2>

            <p className="mt-1 text-sm font-medium leading-6 text-base-content/68">
              {message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}