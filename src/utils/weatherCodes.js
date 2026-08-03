/**
 * Converts an Open-Meteo WMO weather code into
 * text and an emoji for the interface.
 */
export function getWeatherDetails(code, isDay = 1) {
  if (code === 0) {
    return {
      label: "Clear sky",
      emoji: isDay ? "☀️" : "🌙",
    };
  }

  if (code === 1) {
    return {
      label: "Mainly clear",
      emoji: isDay ? "🌤️" : "🌙",
    };
  }

  if (code === 2) {
    return {
      label: "Partly cloudy",
      emoji: "⛅",
    };
  }

  if (code === 3) {
    return {
      label: "Overcast",
      emoji: "☁️",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Foggy",
      emoji: "🌫️",
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: "Drizzle",
      emoji: "🌦️",
    };
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return {
      label: "Rain",
      emoji: "🌧️",
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "Snow",
      emoji: "🌨️",
    };
  }

  if ([80, 81, 82].includes(code)) {
    return {
      label: "Rain showers",
      emoji: "🌦️",
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: "Thunderstorm",
      emoji: "⛈️",
    };
  }

  return {
    label: "Unknown conditions",
    emoji: "🌡️",
  };
}