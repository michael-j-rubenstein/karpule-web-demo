import RideDate from "./RideDate";
import RideDetails from "./RideDetails";

import styles from "./RideItem.module.css";

const RideItem = (props) => {
  return (
    <li key={props.id} className={`${styles["ride-item"]} ${props.className}`}>
      <RideDate date={props.date}></RideDate>
      <RideDetails
        seats={props.seats}
        destination={props.destination}
        price={props.price}
      ></RideDetails>
    </li>
  );
};

export default RideItem;
