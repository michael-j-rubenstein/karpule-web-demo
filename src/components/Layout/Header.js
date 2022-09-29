import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles["header-wrapper"]}>
      <header className={styles.header}>
        <h1>Karpule</h1>
        <button href="#">Contact</button>
      </header>
      <div className={styles["back-drop-wrapper"]}>
        <div className={styles["back-drop"]}></div>
      </div>
    </div>
  );
};

export default Header;
