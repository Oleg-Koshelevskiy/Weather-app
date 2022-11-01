import { useContext } from "react";
import AppContext from "../store/app-context";
import LongWeatherItem from "./LongWeatherItem";
import styles from "./LongWeatherDashboard.module.css";
import CityNotChosen from "./CityNotChosen";

const LongWeatherDashboard = (props) => {
  const context = useContext(AppContext);
  if (!context.showWeather) {
    return <CityNotChosen />;
  }

  const item = context.longWeatherData.map((item) => (
    <LongWeatherItem item={item} key={Math.random()} />
  ));

  return <div className={styles.dashboard}>{item}</div>;
};

export default LongWeatherDashboard;
