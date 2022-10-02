import styles from "./Header.module.css";

import messageIcon from "../../images/message.svg";
import logo from "../../images/logo.svg";

const Header = () => {
  return (
    <>
      <div className={styles["header-wrapper"]}>
        <header className={styles.header}>
          <img srcSet={logo} alt=""></img>
          <a href="mailto:babsonkarpule@gmail.com">
            <img className={styles.svg} srcSet={messageIcon} alt=""></img>
          </a>
        </header>
      </div>
      <div className={styles["back-drop-wrapper"]}>
        <div className={styles["back-drop"]}></div>
      </div>
    </>
  );
};

export default Header;
