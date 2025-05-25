"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleGoBack = () => {
    window.history.back();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorBoundaryWrapper}>
          <div className={styles.errorBoundaryContainer}>
            <h1>Something went wrong</h1>
            <p>We're sorry, but an error occurred while rendering this page.</p>
            <div className={styles.errorDetails}>
              <p>{this.state.error?.message || "Unknown error"}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.backButton} onClick={this.handleGoBack}>
                Go Back
              </button>
              <button
                className={styles.retryButton}
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
