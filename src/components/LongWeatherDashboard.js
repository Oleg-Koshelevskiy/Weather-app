import LongWeatherItem from "./LongWeatherItem";
import styles from "./LongWeatherDashboard.module.css";

const LongWeatherDashboard = (props) => {
  if (!props.showWeather) {
    return <h2 className={styles.default}>Введіть назву міста</h2>;
  }

  const item = props.long.map((item) => (
    <LongWeatherItem item={item} key={Math.random()} />
  ));

  return <div className={styles.dashboard}>{item}</div>;
};

export default LongWeatherDashboard;
