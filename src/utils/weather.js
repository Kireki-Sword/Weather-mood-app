export function convertTemperature(
  celsius,
  temperatureUnit
) {
  if (!Number.isFinite(celsius)) {
    return null;
  }

  if (temperatureUnit === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }

  return celsius;
}

export function getTemperatureUnitLabel(
  temperatureUnit
) {
  return temperatureUnit === "fahrenheit"
    ? "°F"
    : "°C";
}

export function formatTemperature(
  celsius,
  temperatureUnit
) {
  const converted = convertTemperature(
    celsius,
    temperatureUnit
  );

  if (converted === null) {
    return "—";
  }

  return `${Math.round(
    converted
  )}${getTemperatureUnitLabel(
    temperatureUnit
  )}`;
}

export function getWeatherDescription(
  weatherCode,
  isDay = true
) {
  if (weatherCode === 0) {
    return isDay
      ? "Clear sky"
      : "Clear night";
  }

  if (weatherCode === 1) {
    return "Mainly clear";
  }

  if (weatherCode === 2) {
    return "Partly cloudy";
  }

  if (weatherCode === 3) {
    return "Overcast";
  }

  if (weatherCode === 45) {
    return "Fog";
  }

  if (weatherCode === 48) {
    return "Icy fog";
  }

  if (weatherCode === 51) {
    return "Light drizzle";
  }

  if (weatherCode === 53) {
    return "Moderate drizzle";
  }

  if (weatherCode === 55) {
    return "Dense drizzle";
  }

  if (weatherCode === 56) {
    return "Light freezing drizzle";
  }

  if (weatherCode === 57) {
    return "Dense freezing drizzle";
  }

  if (weatherCode === 61) {
    return "Light rain";
  }

  if (weatherCode === 63) {
    return "Moderate rain";
  }

  if (weatherCode === 65) {
    return "Heavy rain";
  }

  if (weatherCode === 66) {
    return "Light freezing rain";
  }

  if (weatherCode === 67) {
    return "Heavy freezing rain";
  }

  if (weatherCode === 71) {
    return "Light snowfall";
  }

  if (weatherCode === 73) {
    return "Moderate snowfall";
  }

  if (weatherCode === 75) {
    return "Heavy snowfall";
  }

  if (weatherCode === 77) {
    return "Snow grains";
  }

  if (weatherCode === 80) {
    return "Light rain showers";
  }

  if (weatherCode === 81) {
    return "Moderate rain showers";
  }

  if (weatherCode === 82) {
    return "Violent rain showers";
  }

  if (weatherCode === 85) {
    return "Light snow showers";
  }

  if (weatherCode === 86) {
    return "Heavy snow showers";
  }

  if (weatherCode === 95) {
    return "Thunderstorm";
  }

  if (weatherCode === 96) {
    return "Thunderstorm with light hail";
  }

  if (weatherCode === 99) {
    return "Thunderstorm with heavy hail";
  }

  return "Weather unavailable";
}

export function degreesToCompass(degrees) {
  if (!Number.isFinite(degrees)) {
    return "";
  }

  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  const normalizedDegrees =
    ((degrees % 360) + 360) % 360;

  const index =
    Math.round(normalizedDegrees / 45) % 8;

  return directions[index];
}

export function formatClockFromIso(isoTime) {
  if (!isoTime || !isoTime.includes("T")) {
    return "—";
  }

  return isoTime.split("T")[1].slice(0, 5);
}

export function formatForecastDay(
  date,
  index
) {
  if (index === 0) {
    return "Today";
  }

  const parsedDate = new Date(
    `${date}T12:00:00`
  );

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(parsedDate);
}

export function formatShortDate(date) {
  const parsedDate = new Date(
    `${date}T12:00:00`
  );

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}


export function formatLocalTime(time) {
  if (!time?.includes("T")) {
    return "—";
  }

  const timePart = time.split("T")[1];

  const [hourText, minuteText] =
    timePart.split(":");

  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (
    !Number.isFinite(hour) ||
    !Number.isFinite(minute)
  ) {
    return "—";
  }

  const period =
    hour >= 12 ? "PM" : "AM";

  const displayHour =
    hour % 12 || 12;

  return `${displayHour}:${String(
    minute
  ).padStart(2, "0")} ${period}`;
}