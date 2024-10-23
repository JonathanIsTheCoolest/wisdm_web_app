'use client'

// System Imports
import React from 'react';

// API/Database Imports
import { useFormStatus } from 'react-dom';

// Stylesheet Imports
import styles from '@/app/(pages)/login/signup/SignUpPage.module.scss';

type SubmissionButtonProps = {
  text?: string;
  onClick?: () => any;
};

export function SubmitButton({ text = 'Submit', onClick }: SubmissionButtonProps) {
  const { pending } = useFormStatus()

  return (
    <div className={styles.nextWrapper}>
      <button
        className={styles.nextButton}
        onClick={onClick}
        type="submit"
        disabled={pending}
      >
        {text}
      </button>
    </div>
  )
}