import styles from "./RideDetails.module.css";

const RideDetails = (props) => {
  const joinRideHandler = () => {};

  return (
    <div className={styles["ride-details"]}>
      <div className={styles["ride-info"]}>
        <h3>{props.destination}</h3>
        <p>Avalilable Seats: {props.seats}</p>
      </div>
      <div className={styles["details-price"]}>
        <div className={styles.price}>{props.price}</div>
        <button className={styles["btn"]} onClick={joinRideHandler}>
          Join Ride
        </button>
      </div>
    </div>
  );
};

export default RideDetails;
