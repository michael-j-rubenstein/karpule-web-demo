import Modal from "../UI/Modal";

import closeIcon from "../../images/close.svg";

import styles from "./PostRide.module.css";
import { useRef, useState } from "react";

const PostRide = (props) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    num: undefined,
    email: "",
    dest: "",
    seats: undefined,
    date: "",
    time: "",
    carType: "",
    carColor: "",
    license: "",
    payment: "",
    confirm: "",
  });

  const destInputRef = useRef();
  const seatsInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  const carTypeInputRef = useRef();
  const carColorInputRef = useRef();
  const licenseInputRef = useRef();

  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const numberInputRef = useRef();
  const emailInputRef = useRef();
  const confirmInputRef = useRef();
  const paymentInputRef = useRef();

  const [formPart, setFormPart] = useState(1);

  const nextFormHandler = () => {
    if (formPart === 1) {
      setData((prevData) => {
        return {
          ...prevData,
          dest: destInputRef.current.value,
          date: dateInputRef.current.value,
          time: timeInputRef.current.value,
          seats: seatsInputRef.current.value,
        };
      });
    }

    if (formPart === 2) {
      setData((prevData) => {
        return {
          ...prevData,
          carType: carTypeInputRef.current.value,
          carColor: carColorInputRef.current.value,
          license: licenseInputRef.current.value,
        };
      });
    }

    setFormPart((prevState) => {
      return prevState + 1;
    });
  };

  const prevFormHandler = () => {
    setFormPart((prevState) => {
      return prevState - 1;
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredFirstName = fNameInputRef.current.value;
    const enteredLastName = lNameInputRef.current.value;
    const enteredNum = numberInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredDest = destInputRef.current.value;
    const enteredSeats = seatsInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;
    // const enteredConfirm = confirmInputRef.current.value;

    console.log(
      fNameInputRef.current.value,
      numberInputRef.current.value,
      emailInputRef.current.value,
      destInputRef.current.value,
      seatsInputRef.current.value,
      dateInputRef.current.value,
      timeInputRef.current.value,
      confirmInputRef.current.value
    );

    const userData = {
      name: enteredFirstName,
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

  const formPartOne = (
    <>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="dest">Destination</label>
        <input type="text" id="dest" maxLength={50} ref={destInputRef} />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="date">Departure Date</label>
        <input type="date" id="date" ref={dateInputRef} />
      </div>
      <div className={styles["inputs-group"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="time">Departure Time</label>
          <input type="time" id="time" ref={timeInputRef} />
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
      <div className={styles["next-btn-container"]}>
        <button className={styles.btn} onClick={nextFormHandler}>
          Next
        </button>
      </div>
    </>
  );

  const formPartTwo = (
    <>
      <h3 className={styles.info}>
        For riders to better find you, please provide:
      </h3>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="type">Car Type</label>
        <input type="text" id="type" maxLength={50} ref={carTypeInputRef} />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="color">Car Color</label>
        <input type="text" id="color" maxLength={50} ref={carColorInputRef} />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="license">License Plate</label>
        <input type="text" id="license" maxLength={7} ref={licenseInputRef} />
      </div>
      <div className={styles["next-btn-container"]}>
        <button className={styles.btn} onClick={prevFormHandler}>
          Back
        </button>
        <button className={styles.btn} onClick={nextFormHandler}>
          Next
        </button>
      </div>
    </>
  );

  const formPartThree = (
    <>
      <div className={styles["inputs-group"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" ref={fNameInputRef} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" ref={lNameInputRef} />
        </div>
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="number">Number</label>
        <input type="number" id="number" ref={numberInputRef} />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="email">School Email</label>
        <input type="email" id="email" ref={emailInputRef} />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="email">Payment</label>
        <input type="email" id="email" ref={paymentInputRef} />
      </div>
      <div className={styles["input-group-checkbox"]}>
        <button className={styles.btn} onClick={prevFormHandler}>
          Back
        </button>
        <div>
          <input type="checkbox" id="terms" ref={confirmInputRef} />
          <label htmlFor="terms">Confirm Ride</label>
        </div>
        <button className={styles.btn}>Submit</button>
      </div>
    </>
  );

  const tempStorage = (
    <>
      <div className={styles["inputs-group"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={fNameInputRef} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="number">Number</label>
          <input type="number" id="number" ref={numberInputRef} />
        </div>
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
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
          <input type="date" id="date" ref={dateInputRef} />
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
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      <img
        srcSet={closeIcon}
        onClick={props.onClose}
        className={styles["close-icon"]}
        alt=""
      ></img>
      <h2 className={styles.title}>Post a Ride</h2>
      <form onSubmit={submitHandler}>
        {formPart === 1 && formPartOne}
        {formPart === 2 && formPartTwo}
        {formPart === 3 && formPartThree}
      </form>
    </Modal>
  );
};

export default PostRide;
