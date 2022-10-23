import CityNotChosen from "./CityNotChosen";
import styles from "./CurrentWeatherDashboard.module.css";

const CurrentWeatherDashboard = (props) => {
  if (!props.showWeather) {
    return <CityNotChosen />;
  }

  const clouds = props.current.clouds;
  const dateObj = new Date(props.current.date * 1000);
  const date = dateObj.getDate();
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
  const press = props.current.press;
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
  if (windDeg >= 22.5 && windDeg < 67.5) windDeg = "ПН-СХ";
  if (windDeg >= 67.5 && windDeg < 112.5) windDeg = "СХ";
  if (windDeg >= 112.5 && windDeg < 157.5) windDeg = "ПД-СХ";
  if (windDeg >= 157.5 && windDeg < 202.5) windDeg = "ПД";
  if (windDeg >= 202.5 && windDeg < 247.5) windDeg = "ПД-ЗХ";
  if (windDeg >= 247.5 && windDeg < 292.5) windDeg = "ЗХ";
  if (windDeg >= 292.5 && windDeg < 337.5) {
    windDeg = "ПН-ЗХ";
  } else windDeg = "ПН";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div>
          Дата: {date}-{month}-{year}
        </div>
        <div>
          Час: {hours}:{minutes}
        </div>
        <div>
          Схід сонця: {sunriseHours}:{sunriseMins}
        </div>
        <div>
          Захід сонця: {sunsetHours}:{sunsetMins}
        </div>
        <div>Тиск: {press}</div>
        <div>Фактично: {tempFact} &deg;С </div>
        <div>Відчувається: {tempFeels} &deg;C</div>
      </div>
      <div className={styles.row}>
        <div>Хмарність: {clouds}%</div>

        <div>{sky}</div>
        <div>
          <img src={icon} alt={sky} className={styles.img} />
        </div>
        <div>
          Вітер: {windSpeed} м/с, {windDeg}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDashboard;
