'use client'

import { useFormStatus } from 'react-dom'
import styles from '@/styles/login/signUp/signUp.module.scss'
import React from 'react'

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