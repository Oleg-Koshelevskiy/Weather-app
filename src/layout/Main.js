import { useState, useContext } from "react";
import InputCity from "../components/InputCity";
import CurrentWeatherDashboard from "../components/CurrentWeatherDashboard";
import LongWeatherDashboard from "../components/LongWeatherDashboard";
import classes from "./Main.module.css";
import LeafletMap from "../components/LeafletMap";
import AppContext from "../store/app-context";

const Main = () => {
  const context = useContext(AppContext);

  const [currentType, setCurrentType] = useState(true);  

  const forecastTypeHandler = () => {
    setCurrentType((prevState) => (prevState = !prevState));
  };

  return (
    <section className={classes.main}>
      <InputCity       
        changeForecastType={forecastTypeHandler}
        currentType={currentType}      
      />
      {context.showWeather && (
        <LeafletMap />
      )}
      {currentType && (
        <CurrentWeatherDashboard />
      )}
      {!currentType && (
        <LongWeatherDashboard />
      )}
    </section>
  );
};

export default Main;
