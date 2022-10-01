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

  return (
    <>
      {showRideForm && <PostRide onClose={hideRideFormHandler}></PostRide>}
      {showJoinForm && (
        <JoinRide
          rideId={rideId}
          riders={riders}
          onClose={hideJoinFormHandler}
        ></JoinRide>
      )}
      <Header></Header>
      <Rides
        postRide={showRideFormHandler}
        joinRide={showJoinFormHandler}
      ></Rides>
    </>
  );
};

export default App;
