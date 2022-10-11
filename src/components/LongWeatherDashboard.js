import LongWeatherItem from "./LongWeatherItem";
import classes from "./LongWeatherDashboard.module.css";

const LongWeatherDashboard = (props) => {
  if (!props.showWeather) {
    return <h2>Введіть назву міста</h2>;
  }

  const item = props.long.map((item) => (
    <LongWeatherItem item={item} key={Math.random()} />
  ));

  return <div className={classes.dashboard}>{item}</div>;
};

export default LongWeatherDashboard;
