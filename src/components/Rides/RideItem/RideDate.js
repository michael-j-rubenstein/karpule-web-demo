import styles from "./RideDate.module.css";

const RideDate = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const hour = props.date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={styles.date}>
      <div className={styles.month}>{month}</div>
      <div className={styles.day}>{day}</div>
      <div className={styles.hour}>{hour}</div>
    </div>
  );
};

export default RideDate;
