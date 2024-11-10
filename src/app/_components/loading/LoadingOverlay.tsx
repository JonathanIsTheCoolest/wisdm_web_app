import styles from "./LoadingOverlay.module.scss";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingOverlayProps {
  isVisible?: boolean;
}

const LoadingOverlay = ({ isVisible = true }: LoadingOverlayProps) =>
  isVisible ? (
    <div className={styles.overlayContainer}>
      <LoadingSpinner />
      <p className={styles.overlayText}>Loading...</p>
      <div className={styles.overlayTitle}>
        <h2>WISDM</h2>
      </div>
    </div>
  ) : null;

export default LoadingOverlay;
