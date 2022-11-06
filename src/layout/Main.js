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

  let season = "seasonWinter";
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) season = "seasonSpring";
  if (month >= 6 && month <= 8) season = "seasonSummer";
  if (month >= 9 && month <= 11) season = "seasonAutumn";

  return (
    <section className={classes.main}>
      <InputCity
        changeForecastType={forecastTypeHandler}
        currentType={currentType}
      />
      {context.showWeather && <LeafletMap />}
      {currentType && <CurrentWeatherDashboard season={season} />}
      {!currentType && <LongWeatherDashboard season={season} />}
    </section>
  );
};

export default Main;
