const FORECAST_SKELETONS = Array.from(
  { length: 5 },
  (_, index) => index
);

export default function LoadingWeatherCard() {
  return (
    <div
      role="status"
      aria-label="Loading weather information"
    >
      <section className="px-4 pb-1 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-base-200/80 p-6 shadow-[0_24px_80px_rgb(0_0_0_/_0.26)] sm:p-7 lg:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="skeleton h-3 w-32" />
              <div className="skeleton mt-4 h-8 w-44" />
              <div className="skeleton mt-3 h-4 w-56 max-w-full" />
            </div>

            <div className="skeleton h-9 w-24 rounded-full" />
          </div>

          <div className="my-6 border-t border-white/10" />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="flex items-center gap-5">
              <div className="skeleton size-24 rounded-2xl" />

              <div>
                <div className="skeleton h-16 w-36" />
                <div className="skeleton mt-3 h-5 w-32" />
                <div className="skeleton mt-3 h-4 w-44" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="flex min-h-24 items-center gap-3 rounded-2xl border border-white/8 p-4"
                >
                  <div className="skeleton size-11 shrink-0 rounded-xl" />

                  <div className="min-w-0 flex-1">
                    <div className="skeleton h-3 w-16" />
                    <div className="skeleton mt-3 h-5 w-24 max-w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="skeleton size-5 rounded-full" />
                <div className="skeleton h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton mt-3 h-7 w-52" />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {FORECAST_SKELETONS.map(
              (index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/8 bg-base-200/60 p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="skeleton h-4 w-16" />
                      <div className="skeleton mt-2 h-3 w-12" />
                    </div>

                    <div className="skeleton size-8 rounded-full" />
                  </div>

                  <div className="skeleton mt-6 h-4 w-24 max-w-full" />

                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <div className="skeleton h-6 w-14" />
                      <div className="skeleton mt-2 h-4 w-12" />
                    </div>

                    <div className="skeleton h-4 w-10" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <span className="sr-only">
        Loading current weather and forecast.
      </span>
    </div>
  );
}