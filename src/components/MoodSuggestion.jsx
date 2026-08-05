import {
  Activity,
  Music2,
  Quote,
  Sparkles,
} from "lucide-react";

import {
  getMoodSuggestion,
} from "../utils/mood";

// Reusable small card for the song, quote, and activity.
function RecommendationCard({
  icon: Icon,
  label,
  children,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-base-100/25 p-4">
      <div className="flex items-center gap-2 text-primary">
        <Icon
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <h3 className="text-xs font-extrabold uppercase tracking-[0.14em]">
          {label}
        </h3>
      </div>

      <div className="mt-3 text-sm font-semibold leading-6 text-base-content/70">
        {children}
      </div>
    </div>
  );
}

export default function MoodSuggestion({
  current,
}) {
  // Do not display the component without current weather data.
  if (!current) {
    return null;
  }

  // Turn the current weather information into a mood recommendation.
  const suggestion =
    getMoodSuggestion({
      weatherCode: current.weatherCode,
      isDay: current.isDay === 1,
      temperature: current.temperature,
      windSpeed: current.windSpeed,
    });

  return (
    <section
      className="px-4 pb-12 sm:px-6 lg:px-8"
      aria-labelledby="mood-title"
    >
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-base-200/80 p-6 shadow-[0_24px_80px_rgb(0_0_0_/_0.2)] sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              <Sparkles
                size={16}
                aria-hidden="true"
              />

              Weather mood
            </p>

            <h2
              id="mood-title"
              className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-base-content sm:text-3xl"
            >
              {suggestion.mood}
            </h2>
          </div>

          <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
            {suggestion.weatherType}
          </span>
        </div>

        <div className="my-6 border-t border-white/10" />

        <div className="grid gap-3 md:grid-cols-3">
          <RecommendationCard
            icon={Music2}
            label="Song"
          >
            <p className="font-extrabold text-base-content">
              {suggestion.song.title}
            </p>

            <p className="mt-1 text-base-content/50">
              {suggestion.song.artist}
            </p>
          </RecommendationCard>

          <RecommendationCard
            icon={Quote}
            label="Thought"
          >
            <p>
              “{suggestion.quote}”
            </p>
          </RecommendationCard>

          <RecommendationCard
            icon={Activity}
            label="Activity"
          >
            <p>{suggestion.activity}</p>
          </RecommendationCard>
        </div>
      </div>
    </section>
  );
}