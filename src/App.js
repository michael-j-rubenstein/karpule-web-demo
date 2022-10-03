import { useState } from "react";
import Header from "./components/Layout/Header";
import Rides from "./components/Rides/Rides";
import PostRide from "./components/PostRide/PostRide";
import JoinRide from "./components/JoinRide/JoinRide";

const App = () => {
  const [showRideForm, setShowRideForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [numRides, setNumRides] = useState(0);
  const [rideId, setRideId] = useState("");
  const [riders, setRiders] = useState({});
  const [onChange, setOnChange] = useState(false);

  console.log(numRides);

  const showRideFormHandler = () => {
    setShowRideForm(true);
  };

  const hideRideFormHandler = () => {
    setShowRideForm(false);
  };

  const showJoinFormHandler = (rideId, riders) => {
    setShowJoinForm(true);
    setRideId(rideId);
    setRiders(riders);
  };

  const hideJoinFormHandler = () => {
    setShowJoinForm(false);
  };

  const onChangeHandler = () => {
    setOnChange((prevState) => {
      return !prevState;
    });
  };

  const findRidesHandler = (rides) => {
    setNumRides(rides);
  };

  return (
    <>
      {showRideForm && (
        <PostRide
          numRides={numRides}
          onClose={hideRideFormHandler}
          onChange={onChangeHandler}
        ></PostRide>
      )}
      {showJoinForm && (
        <JoinRide
          rideId={rideId}
          riders={riders}
          onClose={hideJoinFormHandler}
          onChange={onChangeHandler}
        ></JoinRide>
      )}
      <Header></Header>
      <Rides
        postRide={showRideFormHandler}
        joinRide={showJoinFormHandler}
        findRides={findRidesHandler}
        onChange={onChange}
      ></Rides>
    </>
  );
};

export default App;
