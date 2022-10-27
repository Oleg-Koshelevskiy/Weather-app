import { useContext } from "react";
import styles from "./Header.module.css";
import LanguageContext from "../store/language-context";

const Header = () => {
  const context = useContext(LanguageContext);

  const ctx = context.languagePack[1];

  const background = context.languagePack[1].background;

  return (
    <div className={styles.header}>
      <h1 className={styles.text}>{ctx.header}</h1>
      <button
        onClick={context.onChangeLanguage}
        className={`${styles.button} ${styles[background]}`}
      >
        {ctx.name}
      </button>
    </div>
  );
};

export default Header;
