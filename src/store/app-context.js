import { createContext, useState } from "react";
import languagePack from "./languagePack";
import favCities from "../store/favCities";

const AppContext = createContext({
  languagePack: [],
  modalState: false,
  onChangeLanguage: () => {},
  modalOn: () => {},
  modalOff: () => {},
  favCities: [],
  addFavCity: () => {},
  removeFavCity: () => {},
});

export const AppContextProvider = (props) => {
  const [lang, setLang] = useState(languagePack[0]);
  const [modal, setModal] = useState(false);
  const [favList, setFavlist] = useState(favCities);

  const languageHandler = () => {
    setLang((state) => {
      if (state === languagePack[0]) return languagePack[1];
      if (state === languagePack[1]) return languagePack[0];
    });
  };

  const modalOnHandler = () => {
    setModal(true);
  };
  const modalOffHandler = () => {
    setModal(false);
  };

  const addFavCityHandler = () => {};

  const removeFavCityHandler = () => {};

  return (
    <AppContext.Provider
      value={{
        languagePack: lang,
        modalState: modal,
        favCities: favList,
        onChangeLanguage: languageHandler,
        modalOn: modalOnHandler,
        modalOff: modalOffHandler,
        addFavCity: addFavCityHandler,
        removeFavCity: removeFavCityHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
