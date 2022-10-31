import { useContext } from "react";
import AppContext from "../store/app-context";
import CityNotChosen from "./CityNotChosen";
import styles from "./CurrentWeatherDashboard.module.css";

const CurrentWeatherDashboard = (props) => {
  const context = useContext(AppContext);
  const ctx = context.languagePack[1];

  if (!props.showWeather) {
    return <CityNotChosen />;
  }

  let options = { weekday: "long" };
  const clouds = props.current.clouds;
  const dateObj = new Date(props.current.date * 1000);
  const date = dateObj.getDate();
  const day = new Intl.DateTimeFormat(`${ctx.dateFormat}`, options).format(
    props.current.date * 1000
  );
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  if (hours <= 9) {
    hours = "0" + hours;
  }
  let minutes = dateObj.getMinutes();
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  const tempFact = Math.round(props.current.tempFact);
  const tempFeels = Math.round(props.current.tempFeels);
  const press = Math.round(props.current.press * 0.75006375541921);
  let sunriseHours = new Date(props.current.sunrise * 1000).getHours();
  if (sunriseHours <= 9) {
    sunriseHours = "0" + sunriseHours;
  }
  let sunriseMins = new Date(props.current.sunrise * 1000).getHours();
  if (sunriseMins <= 9) {
    sunriseMins = "0" + sunriseMins;
  }
  let sunsetHours = new Date(props.current.sunset * 1000).getHours();
  if (sunsetHours <= 9) {
    sunsetHours = "0" + sunsetHours;
  }
  let sunsetMins = new Date(props.current.sunset * 1000).getHours();
  if (sunsetMins <= 9) {
    sunsetMins = "0" + sunsetMins;
  }
  const sky = props.current.sky;
  const icon = `/icons/${props.current.icon}.png`;
  const windSpeed = Math.round(props.current.windSpeed);
  let windDeg = props.current.windDeg;
  if (windDeg >= 22.5 && windDeg < 67.5) windDeg = `${ctx.wind.ne}`;
  if (windDeg >= 67.5 && windDeg < 112.5) windDeg = `${ctx.wind.e}`;
  if (windDeg >= 112.5 && windDeg < 157.5) windDeg = `${ctx.wind.se}`;
  if (windDeg >= 157.5 && windDeg < 202.5) windDeg = `${ctx.wind.s}`;
  if (windDeg >= 202.5 && windDeg < 247.5) windDeg = `${ctx.wind.sw}`;
  if (windDeg >= 247.5 && windDeg < 292.5) windDeg = `${ctx.wind.w}`;
  if (windDeg >= 292.5 && windDeg < 337.5) {
    windDeg = `${ctx.wind.nw}`;
  } else windDeg = `${ctx.wind.n}`;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div>
          {ctx.date}: {date}-{month}-{year}
        </div>
        <div>{day}</div>
        <div>
          {ctx.time}: {hours}:{minutes}
        </div>
        <div>
          {ctx.sunrise}: {sunriseHours}:{sunriseMins}
        </div>
        <div>
          {ctx.sunset}: {sunsetHours}:{sunsetMins}
        </div>
        <div>
          {ctx.press}: {press} mmHg
        </div>
        <div>
          {ctx.windSpeed}: {windSpeed} {ctx.mSec}, {windDeg}
        </div>
      </div>
      <div className={styles.row}>
        <div>
          {ctx.clouds}: {clouds}%
        </div>
        <div>{sky}</div>
        <div>
          <img src={icon} alt={sky} className={styles.img} />
        </div>
        <div>
          {ctx.fact}: {tempFact} &deg;С{" "}
        </div>
        <div>
          {ctx.feels}: {tempFeels} &deg;C
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDashboard;
