import { createContext, useState } from "react";
import languagePack from "./languagePack";

const LanguageContext = createContext({
  languagePack: [],
  onChangeLanguage: () => {},
});

export const LanguageContextProvider = (props) => {
  const [lang, setLang] = useState(languagePack[0]);

  const languageHandler = () => {
    setLang((state) => {
      if (state === languagePack[0]) return languagePack[1];
      if (state === languagePack[1]) return languagePack[0];
    });
  };

  return (
    <LanguageContext.Provider
      value={{ languagePack: lang, onChangeLanguage: languageHandler }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
