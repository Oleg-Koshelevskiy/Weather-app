import { useRef } from "react";
import Button from "../UI/Button";
import styles from "./InputCity.module.css";

const InputCity = (props) => {
  const inputCity = useRef();

  let forecastType;

  if (props.currentType) {
    forecastType = "Поточний";
  } else {
    forecastType = "На 5 днів";
  }

  const getCityCoords = (event) => {
    event.preventDefault();

    const cityName = inputCity.current.value;

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5cab39ed37da4bbaf0e0d69a5bee3310`
    )
      .then((response) => response.json())
      .then((data) => {
        props.getCoords(data[0].lat, data[0].lon);
        props.getCity(`${data[0].country}, ${data[0].local_names.uk}`);
      });

    inputCity.current.value = "";
  };

  const getCurrentCoords = () => {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=default`
      )
        .then((res) => res.json())
        .then((data) => {
          props.getCity(`${data.countryName}, ${data.city}`);
          props.getCoords(lat, lon);
        });
    }

    function error() {
      alert("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div className={styles.component}>
      <form onSubmit={getCityCoords} className={styles.form}>
        <button
          className={styles.gps}
          type="button"
          onClick={getCurrentCoords}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Введіть місто"
          ref={inputCity}
        />
        <Button type="submit">Показати</Button>
      </form>
      <Button type="submit" onClick={props.changeForecastType}>
        {forecastType}
      </Button>
      <br />
      <h3 className={styles.city}>{props.city}</h3>
    </div>
  );
};

export default InputCity;
