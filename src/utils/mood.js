export function getMoodSuggestion({
  weatherCode,
  isDay = true,
}) {
  // Clear or mainly clear
  if (
    weatherCode === 0 ||
    weatherCode === 1
  ) {
    return {
      weatherType: isDay
        ? "Clear"
        : "Clear night",

      mood: isDay
        ? "Bright and energized"
        : "Calm and peaceful",

      song: {
        title: isDay
          ? "Good Life"
          : "A Sky Full of Stars",
        artist: isDay
          ? "OneRepublic"
          : "Coldplay",
      },

      quote: isDay
        ? "Make some room for something good today."
        : "Let the quiet evening help you reset.",

      activity: isDay
        ? "Take a walk or spend some time outside."
        : "Listen to music, journal, or look at the night sky.",
    };
  }

  // Partly cloudy or overcast
  if (
    weatherCode === 2 ||
    weatherCode === 3
  ) {
    return {
      weatherType: "Cloudy",
      mood: "Calm and focused",

      song: {
        title: "Sunday Best",
        artist: "Surfaces",
      },

      quote:
        "A good day does not require a perfectly clear sky.",

      activity:
        "Study somewhere comfortable, read, or work on a creative project.",
    };
  }

  // Fog or icy fog
  if (
    weatherCode === 45 ||
    weatherCode === 48
  ) {
    return {
      weatherType: "Foggy",
      mood: "Quiet and thoughtful",

      song: {
        title: "Holocene",
        artist: "Bon Iver",
      },

      quote:
        "Some days are meant for moving slowly and noticing details.",

      activity:
        "Read, journal, draw, or enjoy a careful short walk.",
    };
  }

  // Normal drizzle
  if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55
  ) {
    return {
      weatherType: "Drizzly",
      mood: "Soft and cozy",

      song: {
        title: "Banana Pancakes",
        artist: "Jack Johnson",
      },

      quote:
        "A gentle sky can make space for a quieter day.",

      activity:
        "Make a warm drink, read, sketch, or listen to a relaxed playlist.",
    };
  }

  // Freezing drizzle or freezing rain
  if (
    weatherCode === 56 ||
    weatherCode === 57 ||
    weatherCode === 66 ||
    weatherCode === 67
  ) {
    return {
      weatherType: "Icy",
      mood: "Warm and careful",

      song: {
        title: "Bloom",
        artist: "The Paper Kites",
      },

      quote:
        "A careful day can still be a comfortable one.",

      activity:
        "Stay comfortable indoors and choose a calm creative activity.",
    };
  }

  // Light or moderate rain
  if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 80 ||
    weatherCode === 81
  ) {
    return {
      weatherType: "Rainy",
      mood: "Cozy and reflective",

      song: {
        title: "Banana Pancakes",
        artist: "Jack Johnson",
      },

      quote:
        "A slower sky can make room for a calmer mind.",

      activity:
        "Read, watch a film, draw, cook, or have a focused study session.",
    };
  }

  // Heavy rain or violent showers
  if (
    weatherCode === 65 ||
    weatherCode === 82
  ) {
    return {
      weatherType: "Heavy rain",
      mood: "Stay in and reset",

      song: {
        title: "Weightless",
        artist: "Marconi Union",
      },

      quote:
        "Let the weather be loud while your space stays calm.",

      activity:
        "Choose a comfortable indoor project, game, film, or study session.",
    };
  }

  // Light or moderate snow
  if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 77 ||
    weatherCode === 85
  ) {
    return {
      weatherType: "Snowy",
      mood: "Peaceful and playful",

      song: {
        title: "Sweater Weather",
        artist: "The Neighbourhood",
      },

      quote:
        "Cold days can still hold warm moments.",

      activity:
        "Take winter photos when suitable or enjoy a warm indoor activity.",
    };
  }

  // Heavy snow
  if (
    weatherCode === 75 ||
    weatherCode === 86
  ) {
    return {
      weatherType: "Heavy snow",
      mood: "Warm and restful",

      song: {
        title: "Snowman",
        artist: "Sia",
      },

      quote:
        "Some weather gives you permission to slow down.",

      activity:
        "Stay comfortable indoors with a film, book, game, or creative project.",
    };
  }

  // Thunderstorms
  if (
    weatherCode === 95 ||
    weatherCode === 96 ||
    weatherCode === 99
  ) {
    return {
      weatherType: "Stormy",
      mood: "Dramatic but grounded",

      song: {
        title: "Thunder",
        artist: "Imagine Dragons",
      },

      quote:
        "Even loud weather eventually becomes quiet.",

      activity:
        "Stay indoors and work on art, music, reading, or another safe activity.",
    };
  }

  // Fallback for an unknown weather code
  return {
    weatherType: "Unknown weather",
    mood: "Take the day as it comes",

    song: {
      title: "Good Days",
      artist: "SZA",
    },

    quote:
      "Whatever the sky is doing, you can still shape your day.",

    activity:
      "Choose one small activity that helps you feel refreshed.",
  };
}