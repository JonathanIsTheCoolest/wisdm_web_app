"use client";

import React from "react";
import styles from "./OnboardingError.module.scss";

export type ErrorType = "field" | "alert" | "standard";

interface OnboardingErrorProps {
  message: string | null;
  type?: ErrorType;
  className?: string;
}

const OnboardingError: React.FC<OnboardingErrorProps> = ({
  message,
  type = "standard",
  className,
}) => {
  if (!message) return null;
  return (
    <div className={`${styles.errorContainer} ${className || ""}`}>
      <p className={`${styles.errorMessage} ${type ? styles[type] : ""}`}>
        {message}
      </p>
    </div>
  );
};

export default OnboardingError;
