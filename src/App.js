import React, { useState } from "react";
import axios from "axios";
import './App.css';

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  let Api = {
    key: "deab28b03bc9ee11fddaa272dc29d87a",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const search = (evt) => {
    if (evt.key === "Enter") {
      axios.get(`${Api.base}weather`, {
        params: {
          q: query,
          units: 'metric',
          appid: Api.key
        }
      })
        .then((response) => {
          setWeather(response.data);
          setQuery("");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main !== "undefined") && "container"}>
      <div className="App">
        <div className={weather.main && (weather.main.temp > 16 ? "container" : "containernight")}>
          <input
            className="search-bar"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
            placeholder="Search Weather"
          />

          {(typeof weather.main !== "undefined") ? (
            <>
              <div className="location-box">
                <div className="city-name">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temp-display">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </>
          ) : ("")}
        </div>
      </div>
    </div>
  );
}
