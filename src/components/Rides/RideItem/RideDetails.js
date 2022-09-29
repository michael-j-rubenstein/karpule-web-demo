import styles from "./RideDetails.module.css";

const RideDetails = (props) => {
  return (
    <div className={styles["ride-details"]}>
      <div>
        <h3>{props.destination}</h3>
        <p>Avalilable Seats: {props.seats}</p>
      </div>
      <div className={styles["details-price"]}>
        <div className={styles.price}>19</div>
        <button>Join Ride</button>
      </div>
    </div>
  );
};

export default RideDetails;
