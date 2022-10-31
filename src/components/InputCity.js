import { useRef, useContext } from "react";
import Button from "../UI/Button";
import styles from "./InputCity.module.css";
import AppContext from "../store/app-context";

const InputCity = (props) => {
  const context = useContext(AppContext);

  const inputCity = useRef();

  const ctx = context.languagePack[1];

  let forecastType;

  let city;

  if (props.city) {
    city = props.city;
  } else {
    city = ctx.unchosenCity;
  }

  if (props.currentType) {
    forecastType = `${ctx.btn5Days}`;
  } else {
    forecastType = `${ctx.btnCurrent}`;
  }

  const getCityCoords = (event) => {
    event.preventDefault();

    const cityName = inputCity.current.value;

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5cab39ed37da4bbaf0e0d69a5bee3310`
    )
      .then((response) => response.json())
      .then((data) => {
        let cityLocalName;        
        if (context.languagePack[0] === "ukr") {
          cityLocalName = data[0].local_names.uk;
        } else {
          cityLocalName = data[0].local_names.en;
        }
        props.getCoords(data[0].lat, data[0].lon);
        props.getCity(`${data[0].country}, ${cityLocalName}`);
        console.log(data[0].lat, data[0].lon, cityLocalName);
        context.addCurrentCity(data[0].lat, data[0].lon, cityLocalName);
      });

    inputCity.current.value = "";
  };

  const getCurrentCoords = () => {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      let cityLocalName;
      if (context.languagePack[0] === "ukr") {
        cityLocalName = "default";
      } else {
        cityLocalName = "en";
      }

      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${cityLocalName}`
      )
        .then((res) => res.json())
        .then((data) => {
          props.getCity(`${data.countryName}, ${data.city}`);
          props.getCoords(lat, lon);
          console.log(lat, lon, data.city);
          context.addCurrentCity(lat, lon, data.city);
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
          placeholder={ctx.placeholder}
          ref={inputCity}
        />
        <Button type="submit">{ctx.btnShow}</Button>
      </form>
      <Button type="submit" onClick={props.changeForecastType}>
        {forecastType}
      </Button>
      <br />
      <h3 className={styles.city}>{city}</h3>
    </div>
  );
};

export default InputCity;
