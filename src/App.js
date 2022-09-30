import { useState } from "react";
import Header from "./components/Layout/Header";
import Rides from "./components/Rides/Rides";
import PostRide from "./components/PostRide/PostRide";

const App = () => {
  const [showRideForm, setShowRideForm] = useState(false);

  const showFormHandler = () => {
    setShowRideForm(true);
  };

  const hideFormHandler = () => {
    setShowRideForm(false);
  };

  return (
    <>
      {showRideForm && <PostRide></PostRide>}
      <Header></Header>
      <Rides></Rides>
    </>
  );
};

export default App;
