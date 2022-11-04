import { Fragment, useContext } from "react";
import FavouriteList from "./components/FavouriteList";
import Header from "./layout/Header";
import Main from "./layout/Main";
import AppContext from "../src/store/app-context";
import LoadingSpinner from "./UI/LoadingSpinner";

const App = () => {
  const context = useContext(AppContext);

  return (
    <Fragment>
      <Header />
      <Main />
      {context.isLoading && <LoadingSpinner/>}      
      {context.modalState && <FavouriteList />}      
    </Fragment>
  );
};

export default App;
