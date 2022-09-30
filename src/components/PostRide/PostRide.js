import Modal from "../UI/Modal";

import styles from "./PostRide.module.css";

const PostRide = () => {
  return (
    <Modal>
      <h2 className={styles.title}>Post a Ride</h2>
      <form>
        <div className={styles["input-group"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="number">Number</label>
          <input type="number" id="number" />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="email">School Email</label>
          <input type="email" id="email" />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="dest">Destination</label>
          <input type="text" id="dest" maxLength={50} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="seats">Available Seats</label>
          <input type="number" id="seats" step={1} min={1} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="date">Departure Date</label>
          <input type="date" id="date" />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="time">Departure Time</label>
          <input type="time" id="time" />
        </div>
        <div className={styles["input-group-checkbox"]}>
          <div>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Confirm Ride</label>
          </div>
          <button className={styles.btn}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default PostRide;
