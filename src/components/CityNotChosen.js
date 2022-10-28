import { useContext } from "react";
import LanguageContext from "../store/language-context";
import styles from "./CityNotChosen.module.css";
import arrow from "../images/arrow.png";

const CityNotChosen = () => {

  const context = useContext(LanguageContext);
  const ctx = context.languagePack[1]; 

  return (
    <div className={styles.default}>
      <img className={styles.arrow} src={arrow} alt="arrow-up" />
      <h2 className={styles.text}>{ctx.locationPlaceholder}</h2>
    </div>
  );
};

export default CityNotChosen;
