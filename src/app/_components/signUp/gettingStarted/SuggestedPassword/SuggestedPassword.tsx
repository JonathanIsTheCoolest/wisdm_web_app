import { useState, useEffect, useCallback } from "react";

import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

import { copyToClipboard } from "@/app/_lib/helper/clipboard/clipboard";
import { generatePassword } from "@/app/_lib/user/password/generatePassword";

interface SuggestedPasswordProps {
  password: string;
  suggestedPassword: string;
  duplicatePassword: string;
  setField: (field: string, value: string) => void;
}

const SuggestedPassword = ({
  password,
  suggestedPassword,
  duplicatePassword,
  setField,
}: SuggestedPasswordProps) => {
  const isUsingSuggestedPassword =
    password === suggestedPassword && duplicatePassword === suggestedPassword;
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const isIncluded = new RegExp(escapeRegex(password)).test(suggestedPassword);

  const [clipboardIsTransitioning, setClipboardIsTransitioning] =
    useState(false);

  useEffect(() => {
    if (clipboardIsTransitioning) {
      const timer = setTimeout(() => {
        setClipboardIsTransitioning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [clipboardIsTransitioning]);

  const handleCopyClick = useCallback(() => {
    if (isUsingSuggestedPassword) {
      copyToClipboard({ text: suggestedPassword, name: "Password" });
      setClipboardIsTransitioning(true);
    }
  }, [isUsingSuggestedPassword, suggestedPassword]);

  const handleUsePasswordClick = useCallback(() => {
    setField("password", suggestedPassword);
    setField("duplicatePassword", suggestedPassword);
    setField("duplicatePasswordError", "");
  }, [setField, suggestedPassword]);

  const handleGenerateNewPasswordClick = useCallback(() => {
    setField("suggestedPassword", generatePassword());
    setField("password", "");
    setField("duplicatePassword", "");
    setField("duplicatePasswordError", "");
  }, [setField]);

  if (password.length && !isIncluded) return null;

  return (
    <div className={styles.suggestedPassword}>
      <div className={styles.buttonContainer}>
        {!isUsingSuggestedPassword && (
          <button
            className={styles.standardButton}
            onClick={handleGenerateNewPasswordClick}
          >
            Generate new password
          </button>
        )}
        <button
          className={styles.standardButton}
          onClick={
            isUsingSuggestedPassword ? handleCopyClick : handleUsePasswordClick
          }
          aria-label={
            isUsingSuggestedPassword
              ? "Copy suggested password"
              : "Use suggested password"
          }
        >
          {!clipboardIsTransitioning ? (
            <>
              <span>
                {isUsingSuggestedPassword
                  ? "Copy to Clipboard"
                  : "Use Suggested Password"}
              </span>
            </>
          ) : (
            <span className={styles.standardButton}>Copied!</span>
          )}
        </button>
      </div>
      <div className={styles.passwordContainer}>
        <p>Suggested Password:</p>
        <p className={styles.passwordText}>{suggestedPassword}</p>
      </div>
    </div>
  );
};

export default SuggestedPassword;
