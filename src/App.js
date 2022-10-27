import Header from "./layout/Header";
import Main from "./layout/Main";
import { LanguageContextProvider } from "./store/language-context";

const App = () => {
  return (
    <LanguageContextProvider>
      <Header />
      <Main />
    </LanguageContextProvider>
  );
};

export default App;
