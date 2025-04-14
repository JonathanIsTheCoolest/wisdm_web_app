import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import LoadingSpinner from "./LoadingSpinner";
import wisdmLogo from "@/assets/logos/wisdm_logo_brand.svg";
import styles from "./LoadingOverlay.module.scss";

interface LoadingOverlayProps {
  isVisible: boolean;
  timeout?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  timeout = 8000, // Default timeout of 8 seconds
}) => {
  const [forceHide, setForceHide] = useState(false);

  useEffect(() => {
    // Reset force hide when visibility changes
    if (isVisible) {
      setForceHide(false);

      // Set a timeout to force hide the overlay if it stays visible too long
      const timer = setTimeout(() => {
        setForceHide(true);
        console.warn("LoadingOverlay timed out after", timeout, "ms");
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isVisible, timeout]);

  if (!isVisible || forceHide) return null;

  return (
    <motion.div
      className={styles.overlayContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.logoContainer}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Image
            src={wisdmLogo}
            alt="Wisdm Logo"
            width={120}
            height={120}
            priority
          />
        </motion.div>
        <LoadingSpinner />
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
