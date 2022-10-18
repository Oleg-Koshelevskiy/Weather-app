import LongWeatherItem from "./LongWeatherItem";
import styles from "./LongWeatherDashboard.module.css";
import CityNotChosen from "./CityNotChosen";

const LongWeatherDashboard = (props) => {
  if (!props.showWeather) {
    return <CityNotChosen />;
  }

  const item = props.long.map((item) => (
    <LongWeatherItem item={item} key={Math.random()} />
  ));

  return <div className={styles.dashboard}>{item}</div>;
};

export default LongWeatherDashboard;
