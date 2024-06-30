'use client'

import { useFormStatus } from 'react-dom'
import styles from '@/styles/Onboarding.module.scss'
import React from 'react'

type SubmissionButtonProps = {
  text?: string;
  onClick?: () => any;
};

export function SubmitButton({ text = 'Submit', onClick }: SubmissionButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      className={styles.nextButton}
      onClick={onClick}
      type="submit"
      disabled={pending}
    >
      {text}
    </button>
  )
}