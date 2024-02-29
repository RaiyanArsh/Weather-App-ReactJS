import React, { useState } from "react";
import "./App.css";
let clear = require('./assets/images/Clear.jpg');
let Cloudy = require('./assets/images/Cloudy.jpg');
let fog = require('./assets/images/fog.png');
let Rainy = require('./assets/images/Rainy.jpg');
let snow = require('./assets/images/snow.jpg');
let Stormy = require('./assets/images/Stormy.jpg');
let Sunny = require('./assets/images/Sunny.jpg');

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  
  const API_KEY = "pr3TlBCqSAAqdn7vVISf8WaKcRUI10rQ";

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const getWeatherCondition = (weatherCode) => {
    switch (weatherCode) {
      case 1000:
        return "Clear"; // Sunny
      case 1100:
        return "Partly Cloudy"; // Partly cloudy
      case 1102:
      case 1103:
        return "Cloudy"; // Cloudy
      case 2000:
        return "Fog"; // Foggy
      case 3000:
        return "Light Rain"; // Light rain
      case 3001:
        return "Rain"; // Rain
      case 3002:
        return "Heavy Rain"; // Heavy rain
      case 4000:
        return "Light Snow"; // Light snow
      case 4001:
        return "Snow"; // Snow
      case 4002:
        return "Heavy Snow"; // Heavy snow
      case 5000:
        return "Thunderstorm"; // Thunderstorm
      default:
        return "Unknown";
    }
  };

  const getWeatherImage = (weatherCode) => {
    switch (weatherCode) {
      case 1000:
        return require("./assets/icons/sun.png");
      case 1100:
        return require("./assets/icons/cloud.png");
      case 1101:
      case 1102:
      case 1103:
        return require("./assets/icons/cloud.png");
      case 2000:
        return require("./assets/icons/fog.png");
      case 3000:
      case 3001:
      case 3002:
        return require("./assets/icons/rain.png");
      case 4000:
      case 4001:
      case 4002:
        return require("./assets/icons/snow.png");
      case 5000:
        return require("./assets/icons/storm.png");
      default:
        return null;
    }
  };

  const convertUtcToIst = (utcTimeString) => {
    const utcDate = new Date(utcTimeString);
    const istOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return utcDate.toLocaleString("en-US", istOptions);
  };


  const handleFetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      const a = getWeatherCondition(data.timelines.minutely[0].values.weatherCode)
      // console.log(a)

      if (a == 'Clear' || a == 'Sunny')
      {
        document.body.style.backgroundImage = `url(${clear})`;

      }
      else if (a == 'Cloudy' || a == 'Partly Cloudy')
      {
        document.body.style.backgroundImage = `url(${Cloudy})`;

      }
      else if (a == 'Light Rain' || a == 'Heavy Rain' || a == 'Rain')
      {
        document.body.style.backgroundImage = `url(${Rainy})`;

      }
      else if (a == 'Light Rain' || a == 'Heavy Rain' || a == 'Rain')
      {
        document.body.style.backgroundImage = `url(${Rainy})`;

      }
      else if (a == 'Light snow' || a == 'heavy snow' || a == 'snoq')
      {
        document.body.style.backgroundImage = `url(${snow})`;

      }
      
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <div className="App">
      <div className="card">
        {/* <h1>Weather App</h1> */}
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleFetchWeather}>Search</button>

        {weatherData && (
          <div>

            <div className="minutely-forecast">
              {weatherData && weatherData.timelines.minutely.length > 0 && (
                <div className="current-weather">
                  <div className="icon-temp">
                    <img
                      src={getWeatherImage(
                        weatherData.timelines.minutely[0].values.weatherCode
                      )}
                      alt="Weather Icon"
                    />
                    <h1>
                      {/* Temperature: */}
                      {weatherData.timelines.minutely[0].values.temperature}
                      &#8451;
                      <p>{getWeatherCondition(weatherData.timelines.minutely[0].values.weatherCode)}</p>
                    </h1>
                  </div>
                  <h2>{city}</h2>
                  <p className="Date">
                    {convertUtcToIst(weatherData.timelines.minutely[0].time)}
                  </p>
                  <div className="HumTemp">
                  <div className="Humidity">
                    <p>Humidity</p>
                    <p>
                      {weatherData.timelines.minutely[0].values.humidity} gm/m
                    </p>
                  </div>

                  <div className="Wind">
                    <p>Wind</p>

                    <p>
                      {weatherData.timelines.minutely[0].values.windSpeed} Km/h
                    </p>
                  </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
