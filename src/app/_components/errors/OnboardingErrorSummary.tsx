"use client";

import React from "react";
import styles from "./OnboardingError.module.scss";
import { FieldErrors } from "@/hooks/useOnboardingErrors";

interface OnboardingErrorSummaryProps {
  formError?: string | null;
  fieldErrors?: FieldErrors;
  className?: string;
}

const OnboardingErrorSummary: React.FC<OnboardingErrorSummaryProps> = ({
  formError,
  fieldErrors = {},
  className,
}) => {
  const fieldErrorMessages = Object.entries(fieldErrors)
    .filter(([_, error]) => !!error)
    .map(([field, error]) => ({ field, error }));
  const hasErrors = formError || fieldErrorMessages.length > 0;
  if (!hasErrors) return null;
  return (
    <div className={`${styles.errorSummary} ${className || ""}`}>
      {formError && <p className={styles.errorSummaryTitle}>{formError}</p>}
      {fieldErrorMessages.length > 0 && (
        <>
          {!formError && (
            <p className={styles.errorSummaryTitle}>
              Please fix the following errors:
            </p>
          )}
          <ul className={styles.errorList}>
            {fieldErrorMessages.map(({ field, error }) => (
              <li key={field} className={styles.errorItem}>
                <span className={styles.errorField}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </span>{" "}
                {error}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OnboardingErrorSummary;
