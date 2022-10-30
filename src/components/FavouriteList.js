import { useContext } from "react";
import Modal from "../UI/Modal";
import AppContext from "../store/app-context";
import styles from "./FavouriteList.module.css";

const FavouriteList = () => {
  const context = useContext(AppContext);
  console.log(context.favCities);

  const citiesArray = context.favCities;

  const cities = citiesArray.map((city) => {
    return (
      <div className={styles.item} key={city.id}>
        <div>{city.name}</div>
        <button>Видалити</button>
      </div>
    );
  });

  return (
    <Modal>
      <div className={styles.main}>
        <h2 className={styles.header}>Обрані</h2>
        <div className={styles.btnClose}>
          <button onClick={context.modalOff}>x</button>
        </div>
      </div>
      <button className={styles.addNew}>Додати поточні координати</button>
      <div>{cities}</div>
    </Modal>
  );
};

export default FavouriteList;
