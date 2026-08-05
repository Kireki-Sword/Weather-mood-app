import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react";

export default function WeatherIcon({
  weatherCode,
  isDay = true,
  size = 48,
  className = "",
}) {
  const iconProperties = {
    size,
    strokeWidth: 1.7,
    className,
    "aria-hidden": true,
  };

  if (weatherCode === 0) {
    return isDay ? (
      <Sun {...iconProperties} />
    ) : (
      <Moon {...iconProperties} />
    );
  }

  if (
    weatherCode === 1 ||
    weatherCode === 2
  ) {
    return isDay ? (
      <CloudSun {...iconProperties} />
    ) : (
      <CloudMoon {...iconProperties} />
    );
  }

  if (weatherCode === 3) {
    return <Cloud {...iconProperties} />;
  }

  if (
    weatherCode === 45 ||
    weatherCode === 48
  ) {
    return <CloudFog {...iconProperties} />;
  }

  if (
    weatherCode >= 71 &&
    weatherCode <= 77
  ) {
    return <CloudSnow {...iconProperties} />;
  }

  if (
    weatherCode >= 85 &&
    weatherCode <= 86
  ) {
    return <CloudSnow {...iconProperties} />;
  }

  if (
    weatherCode >= 95 &&
    weatherCode <= 99
  ) {
    return (
      <CloudLightning {...iconProperties} />
    );
  }

  if (
    (weatherCode >= 51 &&
      weatherCode <= 67) ||
    (weatherCode >= 80 &&
      weatherCode <= 82)
  ) {
    return <CloudRain {...iconProperties} />;
  }

  return <Cloud {...iconProperties} />;
}