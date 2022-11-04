import { Fragment, useContext } from "react";
import FavouriteList from "./components/FavouriteList";
import Header from "./layout/Header";
import Main from "./layout/Main";
import AppContext from "../src/store/app-context";
import LoadingSpinner from "./UI/LoadingSpinner";
import Footer from "./layout/Footer";

const App = () => {
  const context = useContext(AppContext);

  return (
    <Fragment>
      <Header />
      <Main />
      {context.isLoading && <LoadingSpinner/>}      
      {context.modalState && <FavouriteList />}
      <Footer/>      
    </Fragment>
  );
};

export default App;
