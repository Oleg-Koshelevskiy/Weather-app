import { createContext, useState } from "react";
import languagePack from "./languagePack";
// import favCities from "../store/favCities";

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
  const [currentCity, setCurrentCity] = useState([]);
  const [favList, setFavlist] = useState([]);

  const languageHandler = () => {
    setLang((state) => {
      if (state === languagePack[0]) return languagePack[1];
      if (state === languagePack[1]) return languagePack[0];
    });
  };

  const getStoredCities = () => {
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (!storedCities) {
      setFavlist([]);
    }
    setFavlist(storedCities);
  };

  const getCurrentCity = (lat, lon, name) => {
    setCurrentCity({
      id: Math.random(),
      coords: [lat, lon],
      name: name,
    });
    console.log(currentCity);
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
    if (!currentCity) return;

    setFavlist((prevList) => {
      if (!prevList) return [currentCity];
      return [currentCity, ...prevList];
    });

    const storedCities = JSON.stringify(favList);
    localStorage.setItem("cities", storedCities);
  };

  const removeFavCityHandler = (id) => {
    const favCityIndex = favList.findIndex((item) => item.id);
    const favCityItem = favList[favCityIndex];
    const updatedFavCities = favList.filter(
      (item) => item.id !== favCityItem.id
    );
    setFavlist(updatedFavCities);
    const storedCities = JSON.stringify(favList);
    localStorage.removeItem("cities", storedCities);

    setFavlist((prevList) => {
      return [currentCity, ...prevList];
    });
  };

  const removeFavCities = () => {
    setFavlist([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
