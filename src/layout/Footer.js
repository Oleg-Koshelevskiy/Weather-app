import Card from "../UI/Card";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Card>
      <div className={styles.footer}>
        <div className={styles.copyright}>Copyright Webmaster &copy;</div>
        <button className={styles.btnInfo}></button>
        <a
          className={styles.ref}
          href="https://www.linkedin.com/in/oleg-koshelevskyi-74031443/"
        >
          <img
            className={styles.img}
            src={`/icons/Linkedin.png`}
            alt="Linkedin"
          />
        </a>
      </div>
    </Card>
  );
};

export default Footer;
