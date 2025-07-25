# SkyCast - Find My Weather
## Date:
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Program
App.jsx
```
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Weather from "./Weather";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}

export default App;
```
Home.jsx
```
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!city.trim()) {
        setError("City name is required");
      } else {
        setError("");
        navigate("/weather", { state: { city } });
      }
    },
    [city, navigate]
  );

  return (
    <div className="container">
      <h1>SkyCast </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Home;
```
Weather.jsx
```
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
```
Main.jsx
```
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
App.css
```
body {
  font-family: Arial, sans-serif;
  margin: 0;
  color: #333;
  background-color: beige;
}

.container {
  text-align: center;
  margin-top: 100px;
}

input {
  padding: 10px;
  font-size: 1rem;
  margin: 10px;
  width: 250px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.9rem;
}

.weather-card {
  text-align: center;
  padding: 30px;
  margin: 100px auto;
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
```
## Output
<img width="1919" height="1043" alt="image" src="https://github.com/user-attachments/assets/8676072b-8ffb-4bb8-a1fe-7d7fe7a98f8e" />
<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/99528af0-f800-458c-aa6c-2b29090cf920" />
## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
