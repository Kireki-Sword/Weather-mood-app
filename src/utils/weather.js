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
    return isDay ? "Clear sky" : "Clear night";
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

  if (
    weatherCode === 45 ||
    weatherCode === 48
  ) {
    return "Foggy";
  }

  if (
    weatherCode >= 51 &&
    weatherCode <= 57
  ) {
    return "Drizzle";
  }

  if (
    weatherCode >= 61 &&
    weatherCode <= 67
  ) {
    return "Rain";
  }

  if (
    weatherCode >= 71 &&
    weatherCode <= 77
  ) {
    return "Snow";
  }

  if (
    weatherCode >= 80 &&
    weatherCode <= 82
  ) {
    return "Rain showers";
  }

  if (
    weatherCode >= 85 &&
    weatherCode <= 86
  ) {
    return "Snow showers";
  }

  if (
    weatherCode >= 95 &&
    weatherCode <= 99
  ) {
    return "Thunderstorm";
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