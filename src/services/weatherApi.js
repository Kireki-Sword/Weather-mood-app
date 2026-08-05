const GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const FORECAST_URL =
  "https://api.open-meteo.com/v1/forecast";

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  let data = null;

  try {
    data = await response.json();
  } catch {
    // The error below handles invalid JSON responses.
  }

  if (!response.ok || data?.error) {
    throw new Error(
      data?.reason ||
        "The weather service could not complete the request."
    );
  }

  return data;
}

function normalizeLocation(result) {
  return {
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone ?? "",
    country: result.country ?? "",
    countryCode: result.country_code ?? "",
    admin1: result.admin1 ?? "",
    admin2: result.admin2 ?? "",
  };
}

/**
 * Returns up to five possible locations for the autocomplete menu.
 */
export async function searchLocationSuggestions(
  query,
  options = {}
) {
  const cleanedQuery = query.trim();

  if (cleanedQuery.length < 2) {
    return [];
  }

  const parameters = new URLSearchParams({
    name: cleanedQuery,
    count: "5",
    language: "en",
    format: "json",
  });

  const data = await requestJson(
    `${GEOCODING_URL}?${parameters.toString()}`,
    {
      signal: options.signal,
    }
  );

  return (data.results ?? []).map(normalizeLocation);
}

/**
 * Used when the user presses Search without selecting
 * an autocomplete suggestion.
 */
export async function searchLocation(city) {
  const matches = await searchLocationSuggestions(city);

  if (matches.length === 0) {
    throw new Error(
      `No matching location was found for "${city}".`
    );
  }

  return matches[0];
}

/**
 * Returns current weather, today's information,
 * and a five-day forecast.
 *
 * Temperatures stay in Celsius in the API response.
 * The interface converts them to Fahrenheit locally.
 */
export async function fetchWeather(
  latitude,
  longitude,
  options = {}
) {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    throw new Error(
      "The selected location has invalid coordinates."
    );
  }

  const currentVariables = [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation",
    "weather_code",
    "is_day",
    "wind_speed_10m",
    "wind_direction_10m",
  ].join(",");

  const dailyVariables = [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_probability_max",
    "sunrise",
    "sunset",
  ].join(",");

  const parameters = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: currentVariables,
    daily: dailyVariables,
    timezone: "auto",
    forecast_days: "5",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  });

  const data = await requestJson(
    `${FORECAST_URL}?${parameters.toString()}`,
    {
      signal: options.signal,
    }
  );

  if (!data.current || !data.daily?.time) {
    throw new Error(
      "The weather service returned incomplete information."
    );
  }

  const forecast = data.daily.time.map(
    (date, index) => ({
      date,
      weatherCode:
        data.daily.weather_code?.[index] ?? null,
      temperatureMax:
        data.daily.temperature_2m_max?.[index] ??
        null,
      temperatureMin:
        data.daily.temperature_2m_min?.[index] ??
        null,
      precipitationProbability:
        data.daily
          .precipitation_probability_max?.[
          index
        ] ?? null,
      sunrise:
        data.daily.sunrise?.[index] ?? null,
      sunset:
        data.daily.sunset?.[index] ?? null,
    })
  );

  return {
    timezone: data.timezone ?? "",
    timezoneAbbreviation:
      data.timezone_abbreviation ??
      data.timezone ??
      "",
    utcOffsetSeconds:
      data.utc_offset_seconds ?? 0,

    current: {
      time: data.current.time,
      temperature:
        data.current.temperature_2m,
      apparentTemperature:
        data.current.apparent_temperature,
      humidity:
        data.current.relative_humidity_2m,
      precipitation:
        data.current.precipitation,
      weatherCode:
        data.current.weather_code,
      isDay: data.current.is_day,
      windSpeed:
        data.current.wind_speed_10m,
      windDirection:
        data.current.wind_direction_10m,
    },

    today: forecast[0] ?? null,
    forecast,
  };
}