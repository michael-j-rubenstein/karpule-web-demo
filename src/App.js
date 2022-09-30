import { useState } from "react";
import Header from "./components/Layout/Header";
import Rides from "./components/Rides/Rides";
import PostRide from "./components/PostRide/PostRide";

const App = () => {
  const [showRideForm, setShowRideForm] = useState(false);

  const showRideFormHandler = () => {
    setShowRideForm(true);
  };

  const hideRideFormHandler = () => {
    setShowRideForm(false);
  };

  return (
    <>
      {showRideForm && <PostRide onClose={hideRideFormHandler}></PostRide>}
      <Header></Header>
      <Rides postRide={showRideFormHandler}></Rides>
    </>
  );
};

export default App;
