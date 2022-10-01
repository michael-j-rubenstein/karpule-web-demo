import RidesSummary from "./RidesSummary";
import AvailableRides from "./AvailableRides";

const Rides = (props) => {
  return (
    <>
      <RidesSummary></RidesSummary>
      <AvailableRides
        postRide={props.postRide}
        joinRide={props.joinRide}
      ></AvailableRides>
    </>
  );
};

export default Rides;
