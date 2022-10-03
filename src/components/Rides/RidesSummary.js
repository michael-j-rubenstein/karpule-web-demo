import Card from "../UI/Card";

import styles from "./RidesSummary.module.css";

const RidesSummary = () => {
  return (
    <Card className={styles.summary}>
      <h2>2022 Fall Break Airport Program</h2>
      <p>Karpule is back!</p>
      <p>
        As a Driver, you can earn $20 per empty seat - and you can take multiple
        people at a time! Click “Post a ride” to get started!
      </p>
      <p>
        As a Rider, you can save money, ride safely, and meet new people. Click
        "Join" to get started!
      </p>
    </Card>
  );
};

export default RidesSummary;
