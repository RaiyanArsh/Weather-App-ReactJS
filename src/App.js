import React, { useState } from "react";
import "./App.css";
let clear = require("./assets/images/Clear.jpg");
let Cloudy = require("./assets/images/Cloudy.jpg");
let fog = require("./assets/images/fog.png");
let Rainy = require("./assets/images/Rainy.jpg");
let snow = require("./assets/images/snow.jpg");
let Stormy = require("./assets/images/Stormy.jpg");
let Sunny = require("./assets/images/Sunny.jpg");

function Apps() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "8eccafe33ccb89d6f0e49bec42c4a099";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  //   const API_KEY = "pr3TlBCqSAAqdn7vVISf8WaKcRUI10rQ";
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var day = now.getDate();
  var month = now.getMonth() + 1; // getMonth() returns 0-11, so add 1
  var year = now.getFullYear();
  var timeString =
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    day +
    "/" +
    month +
    "/" +
    year;

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const getWeatherImage = (weatherCode) => {
    switch (weatherCode) {
      case "Clear":
        return require("./assets/icons/sun.png");
      case "Clouds":
        return require("./assets/icons/cloud.png");
      case "Mist":
        return require("./assets/icons/fog.png");
      case "Rain":
        return require("./assets/icons/rain.png");
      case "Snow":
        return require("./assets/icons/snow.png");
      case "Haze":
        return require("./assets/icons/fog.png");
      default:
        return null;
    }
  };

  const handleFetchWeather = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      //   console.log(data)
      setWeatherData(data);
      const a = data.weather[0].main;
      // console.log(a)

      if (a == "Clear") {
        document.body.style.backgroundImage = `url(${clear})`;
      } else if (a == "Clouds") {
        document.body.style.backgroundImage = `url(${Cloudy})`;
      } else if (a == "Rain") {
        document.body.style.backgroundImage = `url(${Rainy})`;
      } else if (a == "Snow") {
        document.body.style.backgroundImage = `url(${snow})`;
      } else if (a == "Haze" || a == 'Mist') {
        document.body.style.backgroundImage = `url(${fog})`;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Weather App</h1>
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
              <div className="current-weather">
                <div className="icon-temp">
                  <img
                    src={getWeatherImage(weatherData.weather[0].main)}
                    alt="Weather Icon"
                  />
                  <h1>
                    {/* Temperature: */}
                    
                    {weatherData.main.temp}
                    &#8451;
                    {/* <p>{getWeatherCondition(weatherData.timelines.minutely[0].values.weatherCode)}</p> */}
                  </h1>
                </div>
                <h2>{weatherData.name}</h2>
                <p className="desc">{weatherData.weather[0].description}</p>
                <p className="Date">{timeString}</p>
                <div className="HumTemp">
                  <div className="Humidity">
                    <p>Humidity</p>
                    <p>{weatherData.main.humidity} %</p>
                  </div>

                  <div className="Wind">
                    <p>Wind</p>

                    <p>{weatherData.wind.speed} mph</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Apps;
