import React from "react";
import { motion } from "motion/react";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  sideLength?: number | string;
}

const LoadingSpinner = ({ sideLength = 60 }: LoadingSpinnerProps) => (
  <div
    style={{height: sideLength, width: sideLength}}
    className={styles.spinnerContainer}>
    <motion.div
      className={styles.spinnerCircle}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  </div>
);

export default LoadingSpinner;
