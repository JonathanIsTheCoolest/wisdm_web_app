"use client";

import React from "react";
import styles from "./ErrorBoundary.module.scss";

interface ResourceErrorProps {
  message?: string;
  error?: Error | null;
  retry?: () => void;
}

const ResourceError: React.FC<ResourceErrorProps> = ({
  message = "Failed to load resource",
  error = null,
  retry,
}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.errorBoundaryWrapper}>
      <div className={styles.errorBoundaryContainer}>
        <h1>Something went wrong</h1>
        <p>{message}</p>
        {error && (
          <div className={styles.errorDetails}>
            <p>{error.message || "Unknown error"}</p>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <button className={styles.backButton} onClick={handleGoBack}>
            Go Back
          </button>
          {retry && (
            <button className={styles.retryButton} onClick={retry}>
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceError;
