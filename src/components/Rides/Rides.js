import RidesSummary from "./RidesSummary";
import AvailableRides from "./AvailableRides";

const Rides = (props) => {
  return (
    <>
      <RidesSummary></RidesSummary>
      <AvailableRides
        postRide={props.postRide}
        joinRide={props.joinRide}
        findRides={props.findRides}
        onChange={props.onChange}
      ></AvailableRides>
    </>
  );
};

export default Rides;
