import InputCity from "../components/InputCity";
import WeatherDashboard from "../components/WeatherDashboard";
import classes from "./Main.module.css";

const Main = () => {
  const coordsHandler = (lat, lon) => {
    console.log(lat, lon);
  };

  return (
    <section className={classes.main}>
      <InputCity getCoords={coordsHandler} />
      <WeatherDashboard />
    </section>
  );
};

export default Main;
