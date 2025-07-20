import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const API_KEY = "c3f60f6bfb226b8d95bc3d481762aad9";

function Weather() {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        setWeatherData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setWeatherData(null);
        setLoading(false);
      });
  }, [city, navigate]);

  const celsius = useMemo(() => {
    return weatherData ? (weatherData.main.temp - 273.15).toFixed(2) : null;
  }, [weatherData]);

  const fahrenheit = useMemo(() => {
    return weatherData
      ? (((weatherData.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)
      : null;
  }, [weatherData]);

  if (loading) return <p>Loading...</p>;

  if (!weatherData) return <p>Weather data not found.</p>;

  return (
    <div className="weather-card">
      <h2>Weather in {weatherData.name}</h2>
      <p>
        <strong>Condition:</strong> {weatherData.weather[0].description}
      </p>
      <p>
        <strong>Temp:</strong> {celsius}°C / {fahrenheit}°F
      </p>
      <p>
        <strong>Humidity:</strong> {weatherData.main.humidity}%
      </p>
      <p>
        <strong>Wind:</strong> {weatherData.wind.speed} m/s
      </p>
      <button onClick={() => navigate("/")}>Search another city</button>
    </div>
  );
}

export default Weather;
