import styles from "./CityNotChosen.module.css";
import arrow from "../images/arrow.png";

const CityNotChosen = () => {
  return (
    <div className={styles.default}>
      <img className={styles.arrow} src={arrow} alt="arrow-up" />
      <h2>Оберіть місто</h2>
    </div>
  );
};

export default CityNotChosen;
