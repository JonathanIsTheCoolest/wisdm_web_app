"use client";

// System Imports
import React from "react";

// API/Database Imports
import { useFormStatus } from "react-dom";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

type SubmissionButtonProps = {
  text?: string;
  onClick?: () => any;
  disabled?: boolean;
};

export function SubmitButton({
  text = "Submit",
  onClick,
  disabled = false,
}: SubmissionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className={styles.nextButton}
      onClick={onClick}
      type="submit"
      disabled={pending || disabled}
    >
      {text}
    </button>
  );
}
