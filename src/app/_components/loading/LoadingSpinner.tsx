import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinnerCircle} />
  </div>
);

export default LoadingSpinner;
