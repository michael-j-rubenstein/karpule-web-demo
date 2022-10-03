import { useState, useEffect } from "react";

import Card from "../UI/Card";
import RideItem from "./RideItem/RideItem";

import styles from "./AvailableRides.module.css";

import plus from "../../images/plus-sign.svg";

const AvailableRides = (props) => {
  const [rides, setRides] = useState([]);

  const onChange = props.onChange;

  useEffect(() => {
    const fetchRides = async () => {
      const response = await fetch(
        "https://karpule-pilot-test-2-default-rtdb.firebaseio.com/rides.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedRides = [];

      for (let key in responseData) {
        const dateData = await responseData[key].date.split("-");
        const timeData = await responseData[key].time.split(":");

        let riders = false;

        if (Object.keys(responseData[key]).includes("riders")) riders = true;

        loadedRides.push({
          key: key,
          date: new Date(
            dateData[0],
            dateData[1] - 1,
            dateData[2],
            timeData[0],
            timeData[1]
          ),
          destination: responseData[key].dest,
          seats: responseData[key].seats,
          price: responseData[key].price,
          riders: riders ? responseData[key].riders : {},
        });
        setRides(loadedRides);
      }
    };

    fetchRides().catch((error) => {
      console.log(error.message);
    });
  }, [onChange]);

  const rideData = rides
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .filter((obj) => obj.date > new Date())
    .map((data) => {
      return (
        <RideItem
          className={styles["rides-item"]}
          id={data.key}
          key={data.key}
          date={data.date}
          destination={data.destination}
          seats={data.seats}
          price={20}
          riders={data.riders}
          joinRide={props.joinRide}
        ></RideItem>
      );
    });

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["rides-title"]}>
        <h2>Current Rides</h2>
        <button onClick={props.postRide}>
          <img src={plus} alt="" className={styles.plus}></img> Post a Ride
        </button>
      </div>
      <Card>
        <ul className={styles["rides-list"]}>{rideData}</ul>
      </Card>
    </div>
  );
};

export default AvailableRides;
