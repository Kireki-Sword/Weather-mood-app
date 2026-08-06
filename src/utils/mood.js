const QUOTES = {
  truth:
    `To obtain bread, one offers coin. To obtain rights, one offers taxes. To obtain wages, one offers labor. So then, what must one offer up to obtain the truth of our world?`,

  water:
    `A precipitous slope, a narrow river width, a fast and violent flow. Due to the terrain and the external influence, the state of the water is perfectly decided. And yet, water obeys only itself. Water is only water. Thoroughly water. Absolutely free.`,

  perspective:
    `Preoccupied with a single leaf, you won’t see the tree. Preoccupied with a single tree, you’ll miss the entire forest. Don’t be preoccupied with a single spot. See everything in its entirety... effortlessly. That is what it means to truly “see.”`,

  depth:
    `Words are like the sea. You must descend deep into the waters to see what lies at the bottom. For those content to gaze, there is only beauty and tedium. The truth lies here. How it is accepted is only that: the truth for each man.`,

  strength:
    `What is the meaning of “strength”? It’s to have a mind that does not sway, while continuing to move forward and charge.`,

  attachment:
    `Everybody I met was all the same. Drinking, women, worshiping God, even family... The king, dreams, children, power... Everyone had to be drunk on somethin’ to keep pushing on. Everyone was a slave to somethin’.`,

  beauty:
    `Why is it that the beautiful things are entwined more deeply with death than with life?`,

  wrongAnswer:
    `A wrong answer isn’t a meaningless one.`,

  sacrifice:
    `A lesson without pain is meaningless. For you cannot gain anything without sacrificing something else in return.`,
};

export const MOOD_SUGGESTIONS = {
  clear: {
    weatherType: "Clear",
    mood: "Open-Sky Curiosity",
    description:
      "A bright and thoughtful mood inspired by open skies and clear visibility.",

    quote: QUOTES.truth,

    songs: {
      day: {
        title: "Lilac",
        artist: "Mrs. GREEN APPLE",
        url: "https://www.youtube.com/watch?v=QjrkrVmC-8M",
      },

      night: {
        title: "Lemon",
        artist: "Kenshi Yonezu",
        url: "https://www.youtube.com/watch?v=SX_ViT4Ra7k",
      },
    },

    activities: {
      morning: [
        "Eat breakfast near a sunny window",
        "Take a brisk neighborhood walk",
        "Write three priorities for today",
        "Photograph one bright outdoor detail",
      ],

      afternoon: [
        "Cycle on a familiar safe route",
        "Explore a nearby public garden",
        "Try an outdoor sketching challenge",
        "Invite a friend for a casual walk",
      ],

      evening: [
        "Share dinner with family or friends",
        "Take sunset photos from a safe spot",
        "Make a colorful fruit drink",
        "Create a small evening playlist",
      ],

      night: [
        "Stargaze from a safe familiar place",
        "Journal one highlight from today",
        "Prepare clothes and supplies for tomorrow",
        "Read a calm chapter before bed",
      ],
    },
  },

  cloudy: {
    weatherType: "Cloudy",
    mood: "Wide-Angle Reflection",
    description:
      "A balanced and reflective mood inspired by soft light and layered skies.",

    quote: QUOTES.perspective,

    songs: {
      day: {
        title: "Avid",
        artist: "SawanoHiroyuki[nZk]:mizuki",
        url: "https://www.youtube.com/watch?v=hSzyI3u5DFo",
      },

      night: {
        title: "Inferno",
        artist: "Mrs. GREEN APPLE",
        url: "https://www.youtube.com/watch?v=wfCcs0vLysk",
      },
    },

    activities: {
      morning: [
        "Make a colorful breakfast bowl",
        "Stretch beside an open window",
        "Choose one simple morning goal",
        "Play music while getting ready",
      ],

      afternoon: [
        "Draft a one-page story concept",
        "Finish a focused study session",
        "Design a charcoal-and-gold collage",
        "Meet a friend at the library",
      ],

      evening: [
        "Cook a simple meal with someone",
        "Discuss a favorite film scene",
        "Create a moody photo edit",
        "Play a relaxed card game",
      ],

      night: [
        "Write a private end-of-day note",
        "Organize tomorrow's top three tasks",
        "Read poetry or short fiction",
        "Practice five minutes of slow breathing",
      ],
    },
  },

  foggy: {
    weatherType: "Foggy",
    mood: "Hidden-Depth Focus",
    description:
      "A quiet and observant mood inspired by limited visibility and subtle details.",

    quote: QUOTES.depth,

    songs: {
      day: {
        title: "Akari",
        artist: "Soushi Sakiyama",
        url: "https://www.youtube.com/watch?v=4jWzGkRsHw8",
      },

      night: {
        title: "JANE DOE",
        artist: "Kenshi Yonezu × Hikaru Utada",
        url: "https://www.youtube.com/watch?v=zuO2fClon98",
      },
    },

    activities: {
      morning: [
        "Sketch objects beside the window",
        "Make tea and plan slowly",
        "Photograph indoor light and shadow",
        "Tidy one small surface",
      ],

      afternoon: [
        "Build a mysterious mood board",
        "Solve a challenging logic puzzle",
        "Write a scene set in mist",
        "Work through a focused study block",
      ],

      evening: [
        "Watch a gentle mystery film",
        "Draw silhouettes under lamp light",
        "Make soup with adult supervision",
        "Share a quiet voice call",
      ],

      night: [
        "Listen with the room lights low",
        "Write tomorrow's first small step",
        "Fold paper into simple shapes",
        "Read until your breathing feels slower",
      ],
    },
  },

  drizzly: {
    weatherType: "Drizzly",
    mood: "Gentle Creative Rhythm",
    description:
      "A light and creative mood inspired by soft rain and a slower pace.",

    quote: QUOTES.wrongAnswer,

    songs: {
      day: {
        title: "As You Like It",
        artist: "Eve",
        url: "https://www.youtube.com/watch?v=nROvY9uiYYk",
      },

      night: {
        title: "Uchiage Hanabi",
        artist: "DAOKO × Kenshi Yonezu",
        url: "https://www.youtube.com/watch?v=-tKVN2mAKRI",
      },
    },

    activities: {
      morning: [
        "Make breakfast with adult supervision",
        "Listen to drizzle by the window",
        "Plan the day over a warm drink",
        "Do a short indoor mobility routine",
      ],

      afternoon: [
        "Edit a short urban photo series",
        "Complete a focused homework block",
        "Design a fictional city map",
        "Message a friend for a study check-in",
      ],

      evening: [
        "Invent a funny comic strip",
        "Try a lighthearted dance routine indoors",
        "Play a quick party game",
        "Decorate snacks with playful shapes",
      ],

      night: [
        "Write one sentence about today",
        "Prepare a warm caffeine-free drink",
        "Dim screens before bed",
        "Listen to rain from indoors",
      ],
    },
  },

  icy: {
    weatherType: "Icy",
    mood: "Protected Resolve",
    description:
      "A careful and reassuring mood inspired by cold conditions and safe choices.",

    quote: QUOTES.attachment,

    songs: {
      day: {
        title: "Fight Song",
        artist: "Eve",
        url: "https://www.youtube.com/watch?v=2eOg5DoYuwU",
      },

      night: {
        title: "Sparkle",
        artist: "RADWIMPS",
        url: "https://www.youtube.com/watch?v=a2GujJZfXpg",
      },
    },

    activities: {
      morning: [
        "Check school or transit updates indoors",
        "Prepare a warm breakfast",
        "Text someone to confirm they are safe",
        "Pack tomorrow's essentials early",
      ],

      afternoon: [
        "Complete a thirty-minute project sprint",
        "Try an indoor dance workout",
        "Build a digital inspiration board",
        "Call a friend for a study session",
      ],

      evening: [
        "Cook a warm meal with family",
        "Build a cozy reading corner",
        "Play a calm board game",
        "Make a small gratitude list",
      ],

      night: [
        "Look through a small photo album",
        "Set out breakfast items for tomorrow",
        "Read under a warm blanket",
        "Practice slow breathing before sleep",
      ],
    },
  },

  rainy: {
    weatherType: "Rainy",
    mood: "Free-Flowing Determination",
    description:
      "A focused and independent mood inspired by steady rain and constant movement.",

    quote: QUOTES.water,

    songs: {
      day: {
        title: "Crying for Rain",
        artist: "Minami",
        url: "https://www.youtube.com/watch?v=0YF8vecQWYs",
      },

      night: {
        title: "Dramaturgy",
        artist: "Eve",
        url: "https://www.youtube.com/watch?v=jJzw1h5CR-I",
      },
    },

    activities: {
      morning: [
        "Make a cheerful breakfast playlist",
        "Write one realistic goal",
        "Stretch for ten gentle minutes",
        "Pack an umbrella before leaving",
      ],

      afternoon: [
        "Finish a demanding study task",
        "Paint with bold contrasting shapes",
        "Practice a challenging music section",
        "Organize notes into a clear summary",
      ],

      evening: [
        "Write a reflective journal page",
        "Make soup with adult supervision",
        "Create a quiet watercolor study",
        "Talk with someone you trust",
      ],

      night: [
        "Read a comforting short story",
        "Write a kind message for tomorrow",
        "Prepare a caffeine-free bedtime drink",
        "Put devices away before sleep",
      ],
    },
  },

  "heavy-rain": {
    weatherType: "Heavy rain",
    mood: "Sheltered Momentum",
    description:
      "A determined mood inspired by intense rain while prioritizing safety indoors.",

    quote: QUOTES.strength,

    songs: {
      day: {
        title: "Kaiju",
        artist: "Sakanaction",
        url: "https://www.youtube.com/watch?v=a8dgNdJVluc",
      },

      night: {
        title: "Akuma no Ko",
        artist: "Ai Higuchi",
        url: "https://www.youtube.com/watch?v=WPl10ZrhCtk",
      },
    },

    activities: {
      morning: [
        "Check official weather updates indoors",
        "Make a filling warm breakfast",
        "Create a simple stay-home schedule",
        "Contact family before starting work",
      ],

      afternoon: [
        "Complete a major project milestone",
        "Do a safe indoor cardio session",
        "Develop a bold character design",
        "Host an online group study session",
      ],

      evening: [
        "Watch an exciting film indoors",
        "Cook a shared comfort meal",
        "Create a dramatic digital illustration",
        "Play a cooperative video game briefly",
      ],

      night: [
        "Write tomorrow's first priority",
        "Rest away from windows",
        "Prepare a simple morning checklist",
        "Do a brief body-scan meditation",
      ],
    },
  },

  snowy: {
    weatherType: "Snowy",
    mood: "Quiet Winter Wonder",
    description:
      "A delicate and imaginative mood inspired by fresh snow and softened sound.",

    quote: QUOTES.beauty,

    songs: {
      day: {
        title: "The Peak",
        artist: "SEKAI NO OWARI",
        url: "https://www.youtube.com/watch?v=BNguaY5exIk",
      },

      night: {
        title: "Homura",
        artist: "LiSA",
        url: "https://www.youtube.com/watch?v=Mi0etd4xF-A",
      },
    },

    activities: {
      morning: [
        "Photograph snow safely from indoors",
        "Make a warm breakfast bowl",
        "Write a winter postcard",
        "Take a brief cleared-path walk if safe",
      ],

      afternoon: [
        "Build a small snow figure if safe",
        "Create a winter-themed comic",
        "Play an active indoor scavenger hunt",
        "Share hot chocolate with a friend",
      ],

      evening: [
        "Share a warm family meal",
        "Create paper snowflake decorations",
        "Read beside a soft lamp",
        "Call a friend for a calm chat",
      ],

      night: [
        "Read a short winter story",
        "Prepare warm clothes for tomorrow",
        "Write three peaceful observations",
        "Listen quietly while resting",
      ],
    },
  },

  "heavy-snow": {
    weatherType: "Heavy snow",
    mood: "Enduring Shelter",
    description:
      "A steady and resilient mood inspired by staying safe during heavy snowfall.",

    quote: QUOTES.sacrifice,

    songs: {
      day: {
        title: "spiral",
        artist: "LONGMAN",
        url: "https://www.youtube.com/watch?v=dJth8oW7CAQ",
      },

      night: {
        title: "Night Dancer",
        artist: "imase",
        url: "https://www.youtube.com/watch?v=kagoEGKHZvU",
      },
    },

    activities: {
      morning: [
        "Check closures and official updates",
        "Make a warm breakfast together",
        "Set a flexible indoor schedule",
        "Clear a safe indoor work area",
      ],

      afternoon: [
        "Finish one challenging assignment",
        "Try a structured indoor workout",
        "Create an energetic animation sketch",
        "Organize a shared online game",
      ],

      evening: [
        "Create contrasting light-and-dark artwork",
        "Cook a comforting meal indoors",
        "Build a detailed model or puzzle",
        "Share music recommendations with friends",
      ],

      night: [
        "Prepare emergency items for tomorrow",
        "Read beneath a warm blanket",
        "Set a gentle morning alarm",
        "Practice slow breathing before sleep",
      ],
    },
  },

  stormy: {
    weatherType: "Stormy",
    mood: "Electric Resilience",
    description:
      "A powerful mood inspired by dramatic weather while remaining safely indoors.",

    // Intentionally duplicated from rainy, as requested.
    quote: QUOTES.water,

    songs: {
      day: {
        title: "Hakujitsu",
        artist: "King Gnu",
        url: "https://www.youtube.com/watch?v=ony539T074w",
      },

      night: {
        title: "Monster",
        artist: "YOASOBI",
        url: "https://www.youtube.com/watch?v=dy90tA3TT1c",
      },
    },

    activities: {
      morning: [
        "Check official storm alerts indoors",
        "Eat breakfast away from windows",
        "Message family to confirm plans",
        "Choose three calm indoor priorities",
      ],

      afternoon: [
        "Create a high-energy digital painting",
        "Complete a fast project sprint",
        "Do an indoor strength routine",
        "Write an action scene",
      ],

      evening: [
        "Draw abstract storm patterns",
        "Play a challenging rhythm game briefly",
        "Write a dramatic monologue",
        "Share a warm dinner indoors",
      ],

      night: [
        "Lower the lights and rest",
        "Write one grounding sentence",
        "Prepare tomorrow's essentials indoors",
        "Listen at a comfortable volume",
      ],
    },
  },
};

function getWeatherCategory(weatherCode) {
  if ([0, 1].includes(weatherCode)) {
    return "clear";
  }

  if ([2, 3].includes(weatherCode)) {
    return "cloudy";
  }

  if ([45, 48].includes(weatherCode)) {
    return "foggy";
  }

  if ([51, 53, 55].includes(weatherCode)) {
    return "drizzly";
  }

  if ([56, 57, 66, 67].includes(weatherCode)) {
    return "icy";
  }

  if ([61, 63, 80, 81].includes(weatherCode)) {
    return "rainy";
  }

  if ([65, 82].includes(weatherCode)) {
    return "heavy-rain";
  }

  if ([71, 73, 77, 85].includes(weatherCode)) {
    return "snowy";
  }

  if ([75, 86].includes(weatherCode)) {
    return "heavy-snow";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "stormy";
  }

  return "unknown";
}

function getTimePeriod(time, isDay) {
  const hour = Number(time?.slice(11, 13));

  if (!Number.isFinite(hour)) {
    return isDay ? "afternoon" : "night";
  }

  if (hour >= 6 && hour < 12) {
    return "morning";
  }

  if (hour >= 12 && hour < 18) {
    return "afternoon";
  }

  if (hour >= 18 && hour < 22) {
    return "evening";
  }

  return "night";
}

function getSongPeriod(timePeriod) {
  return timePeriod === "morning" ||
    timePeriod === "afternoon"
    ? "day"
    : "night";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getYouTubeId(url = "") {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1).split("/")[0];
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com"
    ) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") ?? "";
      }

      if (
        parsedUrl.pathname.startsWith("/embed/") ||
        parsedUrl.pathname.startsWith("/shorts/")
      ) {
        return parsedUrl.pathname.split("/")[2] ?? "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function getMoodSuggestion({
  weatherCode,
  time,
  isDay = true,
}) {
  const weatherCategory =
    getWeatherCategory(weatherCode);

  const timePeriod =
    getTimePeriod(time, isDay);

  const songPeriod =
    getSongPeriod(timePeriod);

  const isUnknown =
    weatherCategory === "unknown";

  const weatherSuggestion =
    isUnknown
      ? MOOD_SUGGESTIONS.cloudy
      : MOOD_SUGGESTIONS[weatherCategory];

  const selectedSong =
    weatherSuggestion.songs[songPeriod];

  return {
    weatherType: isUnknown
      ? "Unknown"
      : weatherSuggestion.weatherType,

    mood: isUnknown
      ? "Open Curiosity"
      : weatherSuggestion.mood,

    description: isUnknown
      ? "A flexible, neutral mood for weather that does not match a known category."
      : weatherSuggestion.description,

    // Unknown intentionally reuses the clear truth quote.
    quote: isUnknown
      ? QUOTES.truth
      : weatherSuggestion.quote,

    song: {
      ...selectedSong,
      youtubeId:
        getYouTubeId(selectedSong.url),
    },

    activities:
      weatherSuggestion.activities[
        timePeriod
      ] ?? [],

    timePeriod:
      capitalize(timePeriod),
  };
}