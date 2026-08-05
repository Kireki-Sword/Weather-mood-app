export default function LoadingWeatherCard() {
  return (
    <section className="px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <article
          className="weather-result-card card min-h-[300px] w-full overflow-hidden"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="card-body gap-6 p-6 sm:p-7 lg:p-8">
            {/* Visible loading status */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span
                className="loading loading-spinner loading-sm text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="font-bold text-base-content">
                  Loading current weather
                </p>

                <p className="text-sm text-base-content/58">
                  Finding the latest local conditions…
                </p>
              </div>
            </div>

            {/* Skeleton shaped like the final weather card */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.62fr)] lg:items-center">
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-9 w-64 max-w-full" />
                  <div className="skeleton h-4 w-44" />
                </div>

                <div className="flex items-center gap-5">
                  <div className="skeleton size-20 shrink-0 rounded-2xl sm:size-24" />

                  <div className="space-y-3">
                    <div className="skeleton h-14 w-36" />
                    <div className="skeleton h-5 w-32" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-1">
                <div className="skeleton h-24 w-full rounded-2xl" />
                <div className="skeleton h-24 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}