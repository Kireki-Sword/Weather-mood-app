const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast";

/**
 * Reads an API response and creates a useful error message.
 */
async function readResponse(
  apiResponse,
  fallbackMessage
) {
  const data = await apiResponse.json();

  if (!apiResponse.ok || data.error) {
    throw new Error(
      data.reason || fallbackMessage
    );
  }

  return data;
}

/**
 * Converts a city name into latitude and longitude.
 */
export async function searchLocation(city) {
  const locationParameters = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
  });

  const locationResponse = await fetch(
    `${GEOCODING_API}?${locationParameters}`
  );

  const data = await readResponse(
    locationResponse,
    "Could not search for that city."
  );

  const location = data.results?.[0];

  if (!location) {
    throw new Error(
      `We could not find a city called "${city}".`
    );
  }

  return {
    name: location.name,
    admin1: location.admin1,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone,
  };
}

/**
 * Fetches current weather using a location's coordinates.
 */
export async function fetchCurrentWeather(
  latitude,
  longitude
) {
  const weatherParameters = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    current: [
      "temperature_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ].join(","),

    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
  });

  const weatherResponse = await fetch(
    `${WEATHER_API}?${weatherParameters}`
  );

  return readResponse(
    weatherResponse,
    "Could not load the current weather."
  );
}