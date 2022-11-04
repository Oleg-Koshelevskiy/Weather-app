import { useRef, useContext } from "react";
import Button from "../UI/Button";
import styles from "./InputCity.module.css";
import AppContext from "../store/app-context";
import Errors from "../UI/Errors";

const InputCity = (props) => {
  const context = useContext(AppContext);

  const inputCity = useRef();

  const ctx = context.languagePack[1];

  let forecastType;

  let city;

  if (context.currentCity) {
    city = context.currentCity.name;
  } else {
    city = ctx.unchosenCity;
  }

  if (props.currentType) {
    forecastType = `${ctx.btn5Days}`;
  } else {
    forecastType = `${ctx.btnCurrent}`;
  }

  const getCityCoords = async (event) => {
    event.preventDefault();
    context.loaderOn();

    const cityName = inputCity.current.value;

    await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5cab39ed37da4bbaf0e0d69a5bee3310`)
      .then((response1) => response1.json())
      .then((data) => {
        let cityLocalName;
        if (context.languagePack[0] === "ukr") {
          cityLocalName = data[0].local_names.uk;
        } else {
          cityLocalName = data[0].local_names.en;
        }
        let nativeName;
        fetch(`https://restcountries.com/v3.1/alpha/${data[0].country}`)
          .then((response2) => response2.json())
          .then((data2) => {
            nativeName = Object.entries(data2[0].name.nativeName)[0][1].common;

            context.useCoords(data[0].lat, data[0].lon);

            context.addCurrentCity(
              data[0].lat,
              data[0].lon,
              `${nativeName}, ${cityLocalName}`
            );
            context.loaderOff();
          })
          .catch((error) => {
            console.log(error);
            context.addCurrentCity(
              null,
              null,
              <Errors message={ctx.errorCountry}></Errors>
            );
            context.loaderOff();
          });
      })
      .catch((error) => {
        console.log(error);
        context.addCurrentCity(
          null,
          null,
          <Errors message={ctx.errorCity}></Errors>
        );
        context.loaderOff();
      });

    inputCity.current.value = "";    
  };

  const getCurrentCoords = () => {
    context.loaderOn();
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
          context.useCoords(lat, lon);
          context.addCurrentCity(lat, lon, `${data.countryName}, ${data.city}`);
          context.loaderOff();
        })
        .catch((error) => {
          console.log(error.message);
          context.addCurrentCity(
            null,
            null,
            <Errors message={ctx.errorCity}></Errors>
          );
          context.loaderOff();
        });
    }

    function error() {
      context.addCurrentCity(
        null,
        null,
        <Errors message={ctx.errorCity}></Errors>
      );
      context.loaderOff();
    }

    navigator.geolocation.getCurrentPosition(success, error);    
  };

  return (
    <div className={styles.component}>
      <form disabled={context.isLoading} onSubmit={getCityCoords} className={styles.form}>
        <button
          className={styles.gps}
          type="button"
          onClick={getCurrentCoords}
          disabled={context.isLoading}
        />
        <input
          className={styles.input}
          type="text"
          placeholder={ctx.placeholder}
          ref={inputCity}
          disabled={context.isLoading}
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
