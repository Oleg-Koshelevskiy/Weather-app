import { useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./InputCity.module.css";

const InputCity = (props) => {
  const [city, setCity] = useState("Місто не визначено");
  const inputCity = useRef();

  const getCityCoords = (event) => {
    event.preventDefault();

    const cityName = inputCity.current.value;

    setCity(inputCity.current.value);

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5cab39ed37da4bbaf0e0d69a5bee3310`
    )
      .then((response) => response.json())
      .then((data) => props.getCoords(data[0].lat, data[0].lon));
  };

  const getCurrentCoords = () => {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      props.getCoords(lat, lon);
      console.log(lat, lon);
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=default`
      )
        .then((res) => res.json())
        .then((data) => {
          setCity(`${data.countryName}, ${data.city}`);
          console.log(data.city);
        });
    }

    function error() {
      alert("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div className={classes.input}>
      <form onSubmit={getCityCoords} className={classes.form}>
        <input type="text" placeholder="Введіть місто" ref={inputCity} />
        <Button type="submit">Дізнатись прогноз</Button>
      </form>
      <Button type="submit" onClick={getCurrentCoords}>
        Згідно координат
      </Button>
      <h3>{city}</h3>
    </div>
  );
};

export default InputCity;
