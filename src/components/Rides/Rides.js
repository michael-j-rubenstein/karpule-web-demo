import RidesSummary from "./RidesSummary";
import AvailableRides from "./AvailableRides";

const Rides = (props) => {
  const postRideHandler = () => {
    props.postRide();
  };

  return (
    <>
      <RidesSummary></RidesSummary>
      <AvailableRides postRide={postRideHandler}></AvailableRides>
    </>
  );
};

export default Rides;
