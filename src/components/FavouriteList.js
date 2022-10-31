import { useContext } from "react";
import Modal from "../UI/Modal";
import AppContext from "../store/app-context";
import styles from "./FavouriteList.module.css";

const FavouriteList = () => {
  const context = useContext(AppContext);
  console.log(context.favCities);

  let cities;

  const citiesArray = context.favCities;
  if (!citiesArray) {
    cities = "Збережених міст не знайдено";
  } else {
    cities = citiesArray.map((city) => {
      return (
        <div className={styles.item} key={city.id}>
          <button>{city.name}</button>
          <button onClick={context.removeFavCity}>Видалити</button>
        </div>
      );
    });
  }

  return (
    <Modal>
      <div className={styles.main}>
        <h2 className={styles.header}>Обрані</h2>
        <div className={styles.btnClose}>
          <button onClick={context.modalOff}>x</button>
        </div>
      </div>
      <div className={styles.group}>
        <button onClick={context.addFavCity} className={styles.popupBtn}>
          Додати поточні координати
        </button>
        <button onClick={context.clearAll} className={styles.popupBtn}>
          Очистити все
        </button>
      </div>
      <div>{cities}</div>
    </Modal>
  );
};

export default FavouriteList;
