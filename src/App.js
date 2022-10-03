import { useState } from "react";
import Header from "./components/Layout/Header";
import Rides from "./components/Rides/Rides";
import PostRide from "./components/PostRide/PostRide";
import JoinRide from "./components/JoinRide/JoinRide";

const App = () => {
  const [showRideForm, setShowRideForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [rideId, setRideId] = useState("");
  const [riders, setRiders] = useState({});
  const [onChange, setOnChange] = useState(false);

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

  return (
    <>
      {showRideForm && (
        <PostRide
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
        onChange={onChange}
      ></Rides>
    </>
  );
};

export default App;
