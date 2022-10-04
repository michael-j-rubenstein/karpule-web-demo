import Modal from "../UI/Modal";

import closeIcon from "../../images/close.svg";

import styles from "./PostRide.module.css";
import { useRef, useState } from "react";

import { firestore } from "../../firebase";
import { doc, setDoc } from "@firebase/firestore";

const isEmpty = (value) => value.trim() === "";
const isValidEmail = (value) => {
  const atIndex = value.indexOf("@");
  return value.includes("babson.edu", atIndex);
};

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

  const [emailIsValid, setEmailIsValid] = useState(true);

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
      if (
        destInputRef.current.value.trim() === "" ||
        dateInputRef.current.value.trim() === "" ||
        timeInputRef.current.value.trim() === "" ||
        seatsInputRef.current.value.trim() === ""
      )
        return;
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
      if (
        carTypeInputRef.current.value.trim() === "" ||
        carColorInputRef.current.value.trim() === "" ||
        licenseInputRef.current.value.trim() === ""
      )
        return;
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

    if (formPart === 3 && !isValidEmail(emailInputRef.current.value)) {
      setEmailIsValid(false);
    } else setEmailIsValid(true);

    if (formPart === 3) {
      setData((prevData) => {
        return {
          ...prevData,
          firstName: fNameInputRef.current.value,
          lastName: lNameInputRef.current.value,
          num: numberInputRef.current.value,
          email: emailInputRef.current.value,
          payment: paymentInputRef.current.value,
          confirm: confirmInputRef.current.value,
        };
      });
    }

    const formNotValid =
      isEmpty(fNameInputRef.current.value) ||
      isEmpty(lNameInputRef.current.value) ||
      isEmpty(numberInputRef.current.value) ||
      !isValidEmail(emailInputRef.current.value) ||
      isEmpty(data.dest) ||
      isEmpty(data.seats) ||
      isEmpty(data.date) ||
      isEmpty(data.time) ||
      isEmpty(data.carType) ||
      isEmpty(data.carColor) ||
      isEmpty(data.license) ||
      isEmpty(paymentInputRef.current.value) ||
      isEmpty(confirmInputRef.current.value);

    if (formNotValid) return;

    // await fetch(
    //   "https://karpule-pilot-test-2-default-rtdb.firebaseio.com/rides.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       ...data,
    //       firstName: fNameInputRef.current.value,
    //       lastName: lNameInputRef.current.value,
    //       num: numberInputRef.current.value,
    //       email: emailInputRef.current.value,
    //       payment: paymentInputRef.current.value,
    //       confirm: confirmInputRef.current.value,
    //     }),
    //   }
    // );

    // const ref = collection(firestore, "rides");
    let newData = {
      ...data,
      firstName: fNameInputRef.current.value,
      lastName: lNameInputRef.current.value,
      num: numberInputRef.current.value,
      email: emailInputRef.current.value,
      payment: paymentInputRef.current.value,
      confirm: confirmInputRef.current.value,
    };

    // try {
    //   addDoc(ref, newData);
    // } catch (e) {
    //   console.log(e);
    // }

    const rideID = `ride-${props.numRides + 1}`;

    const ref = doc(firestore, "rides", rideID);
    await setDoc(ref, newData);

    props.onChange();
    props.onClose();
  };

  const formPartOne = (
    <>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="dest">Destination</label>
        <input
          type="text"
          id="dest"
          maxLength={50}
          ref={destInputRef}
          required
        />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="date">Departure Date</label>
        <input type="date" id="date" ref={dateInputRef} required />
      </div>
      <div className={styles["inputs-group"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="time">Departure Time</label>
          <input type="time" id="time" ref={timeInputRef} required />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="seats">Available Seats</label>
          <input
            inputMode="numeric"
            id="seats"
            step={1}
            min={1}
            ref={seatsInputRef}
            pattern="[0-9]*"
            required
          />
        </div>
      </div>
      <div className={styles["next-btn-container"]}>
        <button className={styles.btn} type="button" onClick={nextFormHandler}>
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
        <input
          type="text"
          id="type"
          maxLength={50}
          ref={carTypeInputRef}
          required
        />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="color">Car Color</label>
        <input
          type="text"
          id="color"
          maxLength={50}
          ref={carColorInputRef}
          required
        />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="license">License Plate</label>
        <input
          type="text"
          id="license"
          maxLength={7}
          ref={licenseInputRef}
          required
        />
      </div>
      <div className={styles["next-btn-container"]}>
        <button className={styles.btn} type="button" onClick={prevFormHandler}>
          Back
        </button>
        <button className={styles.btn} type="button" onClick={nextFormHandler}>
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
          <input type="text" id="firstName" ref={fNameInputRef} required />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" ref={lNameInputRef} required />
        </div>
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="number">Number</label>
        <input
          inputMode="numeric"
          id="number"
          ref={numberInputRef}
          pattern="[0-9]*"
          required
        />
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="email">School Email</label>
        <input type="email" id="email" ref={emailInputRef} required />
        {!emailIsValid && (
          <p className={styles.error}>
            Please use your @babson.edu email address
          </p>
        )}
      </div>
      <div
        className={`${styles["input-group"]} ${styles["single-input-group"]}`}
      >
        <label htmlFor="payment">Payment (Account No.)</label>
        <input
          type="text"
          id="payment"
          ref={paymentInputRef}
          placeholder="Venmo Account #"
          required
        />
      </div>
      <div className={styles["input-group-checkbox"]}>
        <p className={styles["driver-notice"]}>
          Please Note: Karpule will take 20% commission fee from each
          transaction. The payment will be transferred to your account within 24
          hours after the ride is complete.
        </p>
        <div>
          <input
            type="checkbox"
            id="terms"
            ref={confirmInputRef}
            value="yes"
            required
          />
          <label htmlFor="terms">
            <a
              href="https://drive.google.com/file/d/1CHZS2bQXG3eSu5ohTxw5y6GaIpyTNzGG/view?usp=sharing"
              alt="Terms and Conditions"
              target="_blank"
              rel="noreferrer"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
        <div>
          <button
            className={styles.btn}
            type="button"
            onClick={prevFormHandler}
          >
            Back
          </button>
          <button className={styles.btn}>Submit</button>
        </div>
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
