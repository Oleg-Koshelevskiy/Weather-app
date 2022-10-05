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
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5cab39ed37da4bbaf0e0d69a5bee3310`
    )
      .then((response) => response.json())
      .then((data) => props.getCoords(data[0].lat, data[0].lon));
  };

  return (
    <div className={classes.input}>
      <form onSubmit={getCityCoords}>
        <input type="text" placeholder="Введіть місто" ref={inputCity} />
        <Button type="submit">Дізнатись прогноз</Button>
      </form>
      <h3>{city}</h3>
    </div>
  );
};

export default InputCity;
