import { createContext, useState } from "react";
import languagePack from "./languagePack";
import Errors from "../UI/Errors";

const AppContext = createContext({
  languagePack: [],
  modalState: false,
  currentCity: [],
  favCities: [],
  coords: [],
  currentWeatherData: [],
  longWeatherData: [],
  showWeather: false,
  isLoading: false,
  onChangeLanguage: () => {},
  modalOn: () => {},
  modalOff: () => {},
  addCurrentCity: () => {},
  addFavCity: () => {},
  removeFavCity: () => {},
  clearAll: () => {},
  useCoords: () => {},
  loaderOn: () => {},
  loaderOff: () => {},
  getCityCoords: () => {},
  getCurrentCoords: () => {},
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

  const [isLoading, setIsLoading] = useState(false);

  const languageHandler = () => {
    setLang((state) => {
      if (state === languagePack[0]) return languagePack[1];
      if (state === languagePack[1]) return languagePack[0];
    });
    console.log(lang[1].fetchLang);
    if (currentCity) {
      coordsHandler(currentCity.coords[0], currentCity.coords[1]);
    }
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

  const getCityCoords = (cityName) => {
    setIsLoading(true);

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5cab39ed37da4bbaf0e0d69a5bee3310`
    )
      .then((response1) => response1.json())
      .then((data) => {
        let cityLocalName;
        if (lang[0] === "ukr") {
          cityLocalName = data[0].local_names.uk;
        } else {
          cityLocalName = data[0].local_names.en;
        }
        let nativeName;
        fetch(`https://restcountries.com/v3.1/alpha/${data[0].country}`)
          .then((response2) => response2.json())
          .then((data2) => {
            console.log(data2);
            if (lang[0] === "ukr") {
              nativeName = Object.entries(data2[0].name.nativeName)[0][1]
                .common;
            } else {
              nativeName = data2[0].name.common;
            }

            coordsHandler(data[0].lat, data[0].lon);

            getCurrentCity(
              data[0].lat,
              data[0].lon,
              `${nativeName}, ${cityLocalName}`
            );
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            getCurrentCity(
              null,
              null,
              <Errors message={lang[1].errorCountry}></Errors>
            );
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        getCurrentCity(
          null,
          null,
          <Errors message={lang[1].errorCity}></Errors>
        );
        setIsLoading(false);
      });
  };

  const getCurrentCoords = () => {
    setIsLoading(true);
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      let cityLocalName;
      if (lang[0] === "ukr") {
        cityLocalName = "default";
      } else {
        cityLocalName = "en";
      }

      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${cityLocalName}`
      )
        .then((res) => res.json())
        .then((data) => {
          coordsHandler(lat, lon);
          getCurrentCity(lat, lon, `${data.countryName}, ${data.city}`);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setCurrentCity(
            null,
            null,
            <Errors message={lang[1].errorCity}></Errors>
          );
          setIsLoading(false);
        });
    }

    function error() {
      getCurrentCity(null, null, <Errors message={lang[1].errorCity}></Errors>);
      setIsLoading(false);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const coordsHandler = (lat, lon) => {
    setIsLoading(true);
    setCoords({ latitude: lat, longitude: lon });
    console.log(lang[1].fetchLang);

    fetch(
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5cab39ed37da4bbaf0e0d69a5bee3310&units=metric&lang=${lang[1].fetchLang}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLongWeatherData(data.list);
        setShowWeather(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const LoadingOnHandler = () => {
    setIsLoading(true);
  };

  const LoadingOffHandler = () => {
    setIsLoading(false);
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
    isLoading: isLoading,
    onChangeLanguage: languageHandler,
    modalOn: modalOnHandler,
    modalOff: modalOffHandler,
    addCurrentCity: getCurrentCity,
    addFavCity: addFavCityHandler,
    removeFavCity: removeFavCityHandler,
    clearAll: removeFavCities,
    useCoords: coordsHandler,
    loaderOn: LoadingOnHandler,
    loaderOff: LoadingOffHandler,
    getCityCoords: getCityCoords,
    getCurrentCoords: getCurrentCoords,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
