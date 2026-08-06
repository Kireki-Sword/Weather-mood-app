import {
  Clock3,
  ExternalLink,
  Headphones,
  Lightbulb,
  Quote,
  Sparkles,
} from "lucide-react";

import {
  getMoodSuggestion,
} from "../utils/mood";

import {
  formatLocalTime,
} from "../utils/weather";

export default function MoodSuggestion({
  current,
}) {
  if (!current) {
    return null;
  }

  const suggestion =
    getMoodSuggestion({
      weatherCode:
        current.weatherCode,

      isDay:
        current.isDay === 1,

      temperature:
        current.temperature,

      windSpeed:
        current.windSpeed,

      // mood.js uses this to choose
      // morning, afternoon, evening, or night.
      time:
        current.time,
    });

  if (!suggestion) {
    return null;
  }

  // Displays the exact city time,
  // for example: 6:00 PM.
  const localTime =
    formatLocalTime(current.time);

  const activities =
    Array.isArray(
      suggestion.activities
    )
      ? suggestion.activities
      : [];

  return (
    <section
      className="px-4 pb-20 pt-6 sm:px-6 sm:pt-8 lg:px-8"
      aria-labelledby="mood-title"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Mood heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              <Sparkles
                size={16}
                aria-hidden="true"
              />

              Your weather mood
            </p>

            <h2
              id="mood-title"
              className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-base-content sm:text-4xl"
            >
              {suggestion.mood}
            </h2>

            {suggestion.description && (
              <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-base-content/55">
                {suggestion.description}
              </p>
            )}
          </div>

          {/* Weather, period, and exact time */}
          <div className="flex flex-wrap gap-2">
            <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
              {suggestion.weatherType}
            </span>

            {suggestion.timePeriod && (
              <span className="w-fit rounded-full border border-white/10 bg-base-200 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-base-content/60">
                {suggestion.timePeriod}
              </span>
            )}

            <time
              dateTime={current.time}
              className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-base-200 px-4 py-2 text-xs font-extrabold text-base-content/60"
            >
              <Clock3
                size={14}
                aria-hidden="true"
              />

              {localTime}
            </time>
          </div>
        </div>

        {/* Main mood card */}
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-base-200/80 shadow-[0_30px_100px_rgb(0_0_0_/_0.28)]">
          {/* Song section */}
          <div className="grid lg:grid-cols-[18rem_1fr]">
            {/* YouTube video or headphones symbol */}
            <div className="relative min-h-64 overflow-hidden bg-base-300 lg:min-h-80">
              {suggestion.song.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${suggestion.song.youtubeId}`}
                  title={`${suggestion.song.title} by ${suggestion.song.artist}`}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_top,rgb(250_190_40_/_0.2),transparent_65%)] text-primary">
                  <Headphones
                    size={72}
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            {/* Song information */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2 text-primary">
                <Headphones
                  size={19}
                  aria-hidden="true"
                />

                <p className="text-xs font-extrabold uppercase tracking-[0.16em]">
                  Song recommendation
                </p>
              </div>

              <h3 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-base-content sm:text-4xl">
                {suggestion.song.title}
              </h3>

              <p className="mt-2 text-lg font-semibold text-base-content/55">
                {suggestion.song.artist}
              </p>

              {suggestion.song.url && (
                <a
                  href={
                    suggestion.song.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mt-7 w-fit gap-2"
                >
                  Listen to song

                  <ExternalLink
                    size={17}
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Quote */}
          <div className="border-t border-white/10 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-primary">
              <Quote
                size={19}
                aria-hidden="true"
              />

              <p className="text-xs font-extrabold uppercase tracking-[0.16em]">
                A thought for this moment
              </p>
            </div>

            <blockquote className="mt-6 max-w-4xl border-l-2 border-primary pl-5 text-2xl font-extrabold leading-relaxed tracking-[-0.025em] text-base-content sm:pl-7 sm:text-3xl lg:text-4xl">
              “{suggestion.quote}”
            </blockquote>
          </div>

          {/* Activities */}
          <div className="border-t border-white/10 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-primary">
              <Lightbulb
                size={19}
                aria-hidden="true"
              />

              <p className="text-xs font-extrabold uppercase tracking-[0.16em]">
                Ideas for right now
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {activities.map(
                (activity, index) => (
                  <article
                    key={`${activity}-${index}`}
                    className="rounded-2xl border border-white/10 bg-base-100/25 p-5"
                  >
                    <span className="text-xs font-extrabold tracking-[0.15em] text-primary">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <p className="mt-3 font-semibold leading-6 text-base-content/70">
                      {activity}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}