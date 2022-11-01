import { useState, useContext } from "react";
import InputCity from "../components/InputCity";
import CurrentWeatherDashboard from "../components/CurrentWeatherDashboard";
import LongWeatherDashboard from "../components/LongWeatherDashboard";
import classes from "./Main.module.css";
import LeafletMap from "../components/LeafletMap";
import AppContext from "../store/app-context";

const Main = () => {
  const context = useContext(AppContext);

  // const [currentWeatherData, setCurrentWeatherData] = useState({});
  // const [longWeatherData, setLongWeatherData] = useState([]);
  // const [showWeather, setShowWeather] = useState(false);
  const [currentType, setCurrentType] = useState(true);
  // const [coords, setCoords] = useState({});
  const [city, setCity] = useState("");

  // const ctx = context.languagePack[1];

  const forecastTypeHandler = () => {
    setCurrentType((prevState) => (prevState = !prevState));
  };

  const cityHandler = (name) => {
    setCity(name);
  };

  // const coordsHandler = async (lat, lon) => {
  //   setCoords({ latitude: lat, longitude: lon });    

  //   await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5cab39ed37da4bbaf0e0d69a5bee3310&units=metric&lang=${ctx.fetchLang}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCurrentWeatherData({
  //         clouds: data.clouds.all,
  //         date: data.dt,
  //         tempFact: data.main.temp,
  //         tempFeels: data.main.feels_like,
  //         press: data.main.pressure,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         sky: data.weather[0].description,
  //         icon: data.weather[0].icon,
  //         windSpeed: data.wind.speed,
  //         windDeg: data.wind.deg,
  //       });
  //     });

  //   await fetch(
  //     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5cab39ed37da4bbaf0e0d69a5bee3310&units=metric&lang=${ctx.fetchLang}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLongWeatherData(data.list);
  //       setShowWeather(true);
  //     });
  // };

  return (
    <section className={classes.main}>
      <InputCity
        // getCoords={coordsHandler}
        changeForecastType={forecastTypeHandler}
        currentType={currentType}
        getCity={cityHandler}
        city={city}
      />
      {context.showWeather && (
        <LeafletMap
          city={city}
          // coords={coords}
          // getCoords={coordsHandler}
          getCity={cityHandler}
        />
      )}
      {currentType && (
        <CurrentWeatherDashboard
          // showWeather={showWeather}
          // current={currentWeatherData}
        />
      )}
      {!currentType && (
        <LongWeatherDashboard
          // showWeather={showWeather}
          // long={longWeatherData}
        />
      )}
    </section>
  );
};

export default Main;
