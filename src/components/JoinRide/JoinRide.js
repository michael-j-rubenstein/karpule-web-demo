import { useState, useRef } from "react";

import Modal from "../UI/Modal";

import styles from "./JoinRide.module.css";

import closeIcon from "../../images/close.svg";

import { firestore } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const isEmpty = (value) => value.trim() === "";
const isValidEmail = (value) => {
  const atIndex = value.indexOf("@");
  return value.includes("babson.edu", atIndex);
};

const JoinRide = (props) => {
  const [filePath, setFilePath] = useState("Choose a file");
  const [file, setFile] = useState();
  const [emailIsValid, setEmailIsValid] = useState(true);

  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const numberInputRef = useRef();
  const emailInputRef = useRef();
  const fileInputRef = useRef();
  const confirmInputRef = useRef();

  const fileChangeHandler = (event) => {
    if (event.target.files[0]) {
      const path = event.target.value.split("\\");
      const lastIndex = path.length - 1;
      setFilePath("File Uploaded: " + path[lastIndex]);
      setFile(event.target.files[0]);
    }
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

    console.log(props.rideId);

    // await fetch(
    //   "https://karpule-pilot-test-2-default-rtdb.firebaseio.com/rides/" +
    //     props.rideId +
    //     "/riders.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       firstName: fNameInputRef.current.value,
    //       lastName: lNameInputRef.current.value,
    //       num: numberInputRef.current.value,
    //       email: emailInputRef.current.value,
    //       paymentFile: fileInputRef.current.value,
    //       confirm: confirmInputRef.current.value,
    //     }),
    //   }
    // );

    const riderNum = Object.keys(props.riders).length;
    const riderKey = `rider-${riderNum + 1}`;

    const storage = getStorage();
    const storageRef = ref(storage, `${props.rideId}-${riderKey}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("uploaded blob or file!");
    });

    const rideRef = doc(firestore, "rides/" + props.rideId);
    let newData = {
      firstName: fNameInputRef.current.value,
      lastName: lNameInputRef.current.value,
      num: numberInputRef.current.value,
      email: emailInputRef.current.value,
      paymentFile: fileInputRef.current.value,
      confirm: confirmInputRef.current.value,
    };

    try {
      updateDoc(rideRef, { riders: { ...props.riders, [riderKey]: newData } });
    } catch (e) {
      console.log(e);
    }

    props.onChange();
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
          <label htmlFor="number">Phone Number</label>
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
          Please transfer $20 to{" "}
          <span className={styles.highlighted}>@karpulego</span> on Venmo and
          upload a screenshot of the transaction below:
        </h3>
        <div
          className={`${styles["input-group"]} ${styles["single-input-group"]}`}
        >
          <label htmlFor="file" className={styles["file-label"]}>
            {filePath}
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
          <p className={styles["rider-notice"]}>
            Cancellation: If you want to cancel the ride after you requested,
            please contact us through email at{" "}
            <a href="mailto:babsonkarpule@gmail.com">babsonkarpule@gmail.com</a>
            . You will be charged 5 dollars as a compensation, and the rest of
            the money will be returned to your account within 24 hours.{" "}
            <br></br> <br></br>
            No Show: If you did not show up for the ride, you will be charged 10
            dollars as a no show fee, and the rest of money will be returned to
            your account within 24 hours.
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
        </div>
        <div className={styles["btn-container"]}>
          <button className={styles.btn}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinRide;
