import { useState, useRef } from "react";

import Modal from "../UI/Modal";

import styles from "./JoinRide.module.css";

import closeIcon from "../../images/close.svg";

const isEmpty = (value) => value.trim() === "";
const isValidEmail = (value) => {
  const atIndex = value.indexOf("@");
  return value.includes("babson.edu", atIndex);
};

const JoinRide = (props) => {
  const [file, setFile] = useState("Choose a file");
  const [emailIsValid, setEmailIsValid] = useState(true);

  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const numberInputRef = useRef();
  const emailInputRef = useRef();
  const fileInputRef = useRef();
  const confirmInputRef = useRef();

  const fileChangeHandler = (event) => {
    const path = event.target.value.split("\\");
    const lastIndex = path.length - 1;
    setFile("File Uploaded: " + path[lastIndex]);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isValidEmail(emailInputRef.current.value)) {
      setEmailIsValid(false);
    } else setEmailIsValid(true);

    const formNotValid =
      isEmpty(fNameInputRef.current.value) ||
      isEmpty(lNameInputRef.current.value) ||
      isEmpty(numberInputRef.current.value) ||
      !isValidEmail(emailInputRef.current.value) ||
      isEmpty(fileInputRef.current.value) ||
      isEmpty(confirmInputRef.current.value);

    if (formNotValid) return;

    console.log(props.riders);

    await fetch(
      "https://karpule-web-demo-default-rtdb.firebaseio.com/rides/" +
        props.rideId +
        "/riders.json",
      {
        method: "POST",
        body: JSON.stringify({
          firstName: fNameInputRef.current.value,
          lastName: lNameInputRef.current.value,
          num: numberInputRef.current.value,
          email: emailInputRef.current.value,
          paymentFile: fileInputRef.current.value,
          confirm: confirmInputRef.current.value,
        }),
      }
    );

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose} className={styles.modal}>
      <img
        srcSet={closeIcon}
        onClick={props.onClose}
        className={styles["close-icon"]}
        alt=""
      ></img>
      <h2 className={styles.title}>Join a Ride</h2>

      <form onSubmit={formSubmitHandler}>
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
        <h3 className={styles.info}>
          Please transfer $20 to xxxxx and upload a screenshot of the
          transaction below:
        </h3>
        <div
          className={`${styles["input-group"]} ${styles["single-input-group"]}`}
        >
          <label htmlFor="file" className={styles["file-label"]}>
            {file}
          </label>
          <input
            type="file"
            id="file"
            onChange={fileChangeHandler}
            ref={fileInputRef}
            accept="image/*, .pdf"
            required
          />
        </div>
        <div className={styles["input-group-checkbox"]}>
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
        </div>
        <div className={styles["btn-container"]}>
          <button className={styles.btn}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinRide;
