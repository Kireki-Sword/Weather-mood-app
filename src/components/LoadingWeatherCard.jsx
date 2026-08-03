export default function LoadingWeatherCard() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <article
          className="card min-h-[320px] w-full border border-white/10 bg-base-200/70 shadow-[0_24px_70px_rgb(0_0_0_/_0.28)]"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="card-body gap-8 p-7 sm:p-9 lg:p-10">
            {/* Visible loading status */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span
                className="loading loading-spinner loading-sm text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="font-semibold text-base-content">
                  Loading current weather
                </p>

                <p className="text-sm text-base-content/50">
                  Finding the latest local conditions…
                </p>
              </div>
            </div>

            {/* Skeleton shaped like the final weather card */}
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="space-y-7">
                <div className="space-y-3">
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-10 w-64 max-w-full" />
                  <div className="skeleton h-4 w-44" />
                </div>

                <div className="flex items-center gap-5">
                  <div className="skeleton size-24 shrink-0 rounded-2xl" />

                  <div className="space-y-3">
                    <div className="skeleton h-14 w-36" />
                    <div className="skeleton h-5 w-32" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 lg:grid-cols-1">
                <div className="skeleton h-28 w-full rounded-2xl" />
                <div className="skeleton h-28 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}