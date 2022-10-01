import { useState, useEffect } from "react";

import RideDate from "./RideDate";
import RideDetails from "./RideDetails";

import styles from "./RideItem.module.css";

const RideItem = (props) => {
  const [seats, setSeats] = useState(0);

  useEffect(() => {
    setSeats(props.seats);
    if (Object.keys(props.riders).length !== 0) {
      setSeats(props.seats - Object.keys(props.riders).length);
    }
  }, [props.seats, props.riders]);

  const rideItem =
    seats !== 0 ? (
      <li
        key={props.id}
        className={`${styles["ride-item"]} ${props.className}`}
      >
        <RideDate date={props.date}></RideDate>
        <RideDetails
          id={props.id}
          seats={seats}
          destination={props.destination}
          price={props.price}
          joinRide={props.joinRide}
          riders={props.riders}
        ></RideDetails>
      </li>
    ) : (
      <></>
    );

  return rideItem;
};

export default RideItem;
