import { createContext, useState } from "react";
import languagePack from "./languagePack";

const AppContext = createContext({
  languagePack: [],
  modalState: false,
  currentCity: [],
  favCities: [],
  coords: [],
  currentWeatherData: [],
  longWeatherData: [],
  showWeather: false,
  onChangeLanguage: () => {},
  modalOn: () => {},
  modalOff: () => {},
  addCurrentCity: () => {},
  addFavCity: () => {},
  removeFavCity: () => {},
  clearAll: () => {},
  useCoords: () => {},
});

export const AppContextProvider = (props) => {
  const [lang, setLang] = useState(languagePack[0]);
  const [modal, setModal] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  const [favList, setFavlist] = useState();

  const [coords, setCoords] = useState([]);
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [longWeatherData, setLongWeatherData] = useState([]);
  const [showWeather, setShowWeather] = useState(false);

  const languageHandler = () => {
    setLang((state) => {
      if (state === languagePack[0]) return languagePack[1];
      if (state === languagePack[1]) return languagePack[0];
    });
  };

  const getStoredCities = () => {
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (!storedCities) {
      setFavlist();
    }
    setFavlist(storedCities);
  };

  const getCurrentCity = (lat, lon, name) => {
    setCurrentCity({
      id: `${lat}${lon}`,
      coords: [lat, lon],
      name: name ? name : "невідомо",
    });
  };

  const modalOnHandler = () => {
    setModal(true);
    getStoredCities();
  };
  const modalOffHandler = () => {
    setModal(false);
  };

  const addFavCityHandler = () => {
    if (!currentCity) return alert("Оберіть місто!");

    if (!favList) {
      const storedCities = JSON.stringify([currentCity]);
      localStorage.setItem("cities", storedCities);
      getStoredCities();
    }

    const match = favList.find((item) => item.id === currentCity.id);
    if (match) {
      return;
    }
    const storedCities = JSON.stringify([currentCity, ...favList]);
    localStorage.setItem("cities", storedCities);

    getStoredCities();
  };

  const removeFavCityHandler = (id) => {
    const favCityIndex = favList.findIndex((item) => item.id === id);
    const favCityItem = favList[favCityIndex];
    const updatedFavCities = favList.filter(
      (item) => item.id !== favCityItem.id
    );
    const storedCities = JSON.stringify(updatedFavCities);
    localStorage.setItem("cities", storedCities);
    getStoredCities();
  };

  const removeFavCities = () => {
    localStorage.clear();
    setFavlist([]);
  };

  const coordsHandler = async (lat, lon) => {
    setCoords({ latitude: lat, longitude: lon });

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5cab39ed37da4bbaf0e0d69a5bee3310&units=metric&lang=${lang[1].fetchLang}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeatherData({
          clouds: data.clouds.all,
          date: data.dt,
          tempFact: data.main.temp,
          tempFeels: data.main.feels_like,
          press: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          sky: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          windDeg: data.wind.deg,
        });
      });

    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5cab39ed37da4bbaf0e0d69a5bee3310&units=metric&lang=${lang[1].fetchLang}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLongWeatherData(data.list);
        setShowWeather(true);
      });
  };

  const appContext = {
    languagePack: lang,
    modalState: modal,
    currentCity: currentCity,
    favCities: favList,
    coords: coords,
    currentWeatherData: currentWeatherData,
    longWeatherData: longWeatherData,
    showWeather: showWeather,
    onChangeLanguage: languageHandler,
    modalOn: modalOnHandler,
    modalOff: modalOffHandler,
    addCurrentCity: getCurrentCity,
    addFavCity: addFavCityHandler,
    removeFavCity: removeFavCityHandler,
    clearAll: removeFavCities,
    useCoords: coordsHandler,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
