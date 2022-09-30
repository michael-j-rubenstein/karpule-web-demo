import Modal from "../UI/Modal";

import closeIcon from "../../images/close.svg";

import styles from "./PostRide.module.css";
import { useRef } from "react";

const PostRide = (props) => {
  const nameInputRef = useRef();
  const numberInputRef = useRef();
  const emailInputRef = useRef();
  const destInputRef = useRef();
  const seatsInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();
  const confirmInputRef = useRef();

  const sumbitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredNum = numberInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredDest = destInputRef.current.value;
    const enteredSeats = seatsInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;
    // const enteredConfirm = confirmInputRef.current.value;

    console.log(
      nameInputRef.current.value,
      numberInputRef.current.value,
      emailInputRef.current.value,
      destInputRef.current.value,
      seatsInputRef.current.value,
      dateInputRef.current.value,
      timeInputRef.current.value,
      confirmInputRef.current.value
    );

    const userData = {
      name: enteredName,
      number: enteredNum,
      email: enteredEmail,
      dest: enteredDest,
      seats: enteredSeats,
      date: enteredDate,
      time: enteredTime,
      riders: {},
    };

    await fetch(
      "https://karpule-web-demo-default-rtdb.firebaseio.com/rides.json",
      {
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <img
        srcSet={closeIcon}
        onClick={props.onClose}
        className={styles["close-icon"]}
        alt=""
      ></img>
      <h2 className={styles.title}>Post a Ride</h2>
      <form onSubmit={sumbitHandler}>
        <div className={styles["inputs-group"]}>
          <div className={styles["input-group"]}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="number">Number</label>
            <input type="number" id="number" ref={numberInputRef} />
          </div>
        </div>
        <div
          className={`${styles["input-group"]} ${styles["email-input-group"]}`}
        >
          <label htmlFor="email">School Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={styles["inputs-group"]}>
          <div className={styles["input-group"]}>
            <label htmlFor="dest">Destination</label>
            <input type="text" id="dest" maxLength={50} ref={destInputRef} />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="seats">Available Seats</label>
            <input
              type="number"
              id="seats"
              step={1}
              min={1}
              ref={seatsInputRef}
            />
          </div>
        </div>
        <div className={styles["inputs-group"]}>
          <div className={styles["input-group"]}>
            <label htmlFor="date">Departure Date</label>
            <input
              type="text"
              onFocus={(this.type = "date")}
              id="date"
              ref={dateInputRef}
            />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="time">Departure Time</label>
            <input type="time" id="time" ref={timeInputRef} />
          </div>
        </div>
        <div className={styles["input-group-checkbox"]}>
          <div>
            <input type="checkbox" id="terms" ref={confirmInputRef} />
            <label htmlFor="terms">Confirm Ride</label>
          </div>
          <button className={styles.btn}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default PostRide;
