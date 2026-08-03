import { CircleAlert } from "lucide-react";

export default function WeatherError({ message }) {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="flex items-start gap-4 rounded-2xl border border-error/25 bg-base-200/70 p-5 shadow-sm sm:p-6"
          role="alert"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-error/10 text-error">
            <CircleAlert
              size={20}
              aria-hidden="true"
            />
          </span>

          <div>
            <h2 className="font-bold text-base-content">
              Weather search failed
            </h2>

            <p className="mt-1 text-sm leading-6 text-base-content/60">
              {message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}