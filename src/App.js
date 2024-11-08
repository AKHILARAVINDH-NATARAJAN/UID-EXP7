import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState(""); // User input for city
  const [weather, setWeather] = useState(null); // Weather data
  const [error, setError] = useState(""); // Error handling

  const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data); // Store the fetched weather data
      setError(""); // Reset error
    } catch (err) {
      setWeather(null);
      setError("City not found or invalid request.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather Forecast</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Get Weather
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.weatherContainer}>
          <h2 style={styles.cityName}>{weather.name}</h2>
          <p style={styles.weatherItem}>Temperature: {weather.main.temp} °C</p>
          <p style={styles.weatherItem}>Weather: {weather.weather[0].description}</p>
          <p style={styles.weatherItem}>Humidity: {weather.main.humidity}%</p>
          <p style={styles.weatherItem}>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: "linear-gradient(to right, #89f7fe, #66a6ff)", // Soft blue gradient
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Roboto', sans-serif", // Clean font
    padding: "20px",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "3rem",
    color: "#fff",
    marginBottom: "30px",
    fontWeight: "900",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)", // Slightly bigger text shadow for contrast
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
  },
  input: {
    padding: "12px 20px",
    fontSize: "1.1rem",
    width: "300px",
    borderRadius: "50px",
    border: "2px solid #66a6ff", // Soft border
    outline: "none",
    marginRight: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transition: "all 0.3s ease", // Smooth hover transition
  },
  inputFocus: {
    borderColor: "#66a6ff",
  },
  button: {
    padding: "12px 30px",
    fontSize: "1.1rem",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#6c5ce7", // Vivid purple
    color: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
    transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth hover effect
  },
  buttonHover: {
    backgroundColor: "#341f97", // Darker purple on hover
    transform: "scale(1.05)", // Slight scale on hover
  },
  weatherContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Subtle transparency for background
    borderRadius: "15px",
    padding: "25px 50px",
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)", // Stronger shadow
    textAlign: "center",
    color: "#333",
    maxWidth: "400px", // Limiting the width
  },
  cityName: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#66a6ff", // Matching the input color
  },
  weatherItem: {
    fontSize: "1.4rem",
    margin: "10px 0",
    fontWeight: "500",
  },
  error: {
    color: "#e74c3c", // Softer error color
    marginTop: "20px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};


export default App;
