import React from "react";
import { motion } from "motion/react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
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
