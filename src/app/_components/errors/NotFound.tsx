"use client";

import React from "react";
import Link from "next/link";
import styles from "./ErrorBoundary.module.scss";

interface NotFoundProps {
  message?: string;
  backPath?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  message = "The page you're looking for doesn't exist or has been moved.",
  backPath = "/",
}) => {
  return (
    <div className={styles.errorBoundaryWrapper}>
      <div className={styles.errorBoundaryContainer}>
        <h1>404 - Page Not Found</h1>
        <p>{message}</p>
        <Link href={backPath}>
          <button className={styles.retryButton}>Return to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
