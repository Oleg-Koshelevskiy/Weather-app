import { createContext, useState } from "react";
import languagePack from "./languagePack";

const AppContext = createContext({
  languagePack: [],
  modalState: false,
  currentCity: [],
  favCities: [],
  onChangeLanguage: () => {},
  modalOn: () => {},
  modalOff: () => {},
  addCurrentCity: () => {},
  addFavCity: () => {},
  removeFavCity: () => {},
  clearAll: () => {},
});

export const AppContextProvider = (props) => {
  const [lang, setLang] = useState(languagePack[0]);
  const [modal, setModal] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  const [favList, setFavlist] = useState();

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
      name: name,
    });
  };

  const modalOnHandler = () => {
    setModal(true);
    getStoredCities();
  };
  const modalOffHandler = () => {
    setModal(false);
  };

  const addFavCityHandler = (e) => {
    e.preventDefault();

    if (!currentCity) return alert("Оберіть місто!");

    if (!favList) {
      const storedCities = JSON.stringify([currentCity]);
      localStorage.setItem("cities", storedCities);
      getStoredCities();
    }
    console.log(favList);
    console.log(currentCity.id);
    const match = favList.find((item) => item.id === currentCity.id);
    if (match) {
      return;
    }
    const storedCities = JSON.stringify([currentCity, ...favList]);
    localStorage.setItem("cities", storedCities);
    console.log(storedCities);
    getStoredCities();
  };

  const removeFavCityHandler = (id) => {
    const favCityIndex = favList.findIndex((item) => item.id);
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

  const appContext = {
    languagePack: lang,
    modalState: modal,
    favCities: favList,
    onChangeLanguage: languageHandler,
    modalOn: modalOnHandler,
    modalOff: modalOffHandler,
    addCurrentCity: getCurrentCity,
    addFavCity: addFavCityHandler,
    removeFavCity: removeFavCityHandler,
    clearAll: removeFavCities,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
