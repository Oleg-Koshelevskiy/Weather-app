import { useState } from "react";
import InputCity from "../components/InputCity";
import WeatherDashboard from "../components/WeatherDashboard";
import classes from "./Main.module.css";

const Main = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const lang = "ua";

  const coordsHandler = (lat, lon) => {
    console.log(lat, lon);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5cab39ed37da4bbaf0e0d69a5bee3310&units=metric&lang=${lang}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeatherData({
          clouds: data.clouds.all,
          date: data.dt,
          tempFact: data.main.temp,
          tempFeels: data.main.feels_like,
          press: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          sky: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          windDeg: data.wind.deg,
        });
      });
  };

  console.log(currentWeatherData);

  return (
    <section className={classes.main}>
      <InputCity getCoords={coordsHandler} />
      <WeatherDashboard current={currentWeatherData} />
    </section>
  );
};

export default Main;
