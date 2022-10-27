import styles from "./LongWeatherItem.module.css";

const LongWeatherItem = (props) => {
  let options = { weekday: "long" };
  const dateObj = new Date(props.item.dt * 1000);
  const date = dateObj.getDate();
  const day = new Intl.DateTimeFormat("ua-UA", options).format(
    props.item.dt * 1000
  );
  const month = dateObj.getMonth() + 1;
  let hours = dateObj.getHours();
  if (hours <= 9) {
    hours = "0" + hours;
  }
  let minutes = dateObj.getMinutes();
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  const temp = Math.round(props.item.main.temp);
  const humidity = props.item.main.humidity;
  // const icon = `http://openweathermap.org/img/wn/${props.item.weather[0].icon}@2x.png`;
  const icon = `/icons/${props.item.weather[0].icon}.png`;
  const sky = props.item.weather[0].description;
  const wind = Math.round(props.item.wind.speed);

  return (
    <div className={styles.item}>
      <div>
        {date}/{month}
      </div>
      <div>{day}</div>
      <div>
        {hours}:{minutes}
      </div>
      <div>{temp} &deg;C</div>
      <div>Вологість: {humidity}%</div>
      <div>
        <img className={styles.img} src={icon} alt={sky} />
      </div>
      <div>Вітер: </div>
      <div>{wind} м/с</div>
    </div>
  );
};

export default LongWeatherItem;
