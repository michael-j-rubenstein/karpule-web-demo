import styles from "./RideDetails.module.css";

const RideDetails = (props) => {
  const joinRideHandler = () => {
    props.joinRide(props.id, props.riders);
  };

  const button =
    props.seats !== 0 ? (
      <button className={styles["btn"]} onClick={joinRideHandler}>
        Join Ride
      </button>
    ) : (
      <button
        className={`${styles["btn"]} ${styles["btn-disabled"]}`}
        onClick={joinRideHandler}
        disabled
      >
        Ride Full
      </button>
    );

  return (
    <div className={styles["ride-details"]}>
      <div className={styles["ride-info"]}>
        <h3>{props.destination}</h3>
        <p className={styles.seats}>Available Seats: {props.seats}</p>
      </div>
      <div className={styles["details-price"]}>
        <div className={styles.price}>{props.price}</div>
        {button}
      </div>
    </div>
  );
};

export default RideDetails;
