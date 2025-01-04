import { useState, useEffect, useCallback } from "react";

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
  setField
}: SuggestedPasswordProps) => {
  const isUsingSuggestedPassword = password === suggestedPassword && duplicatePassword === suggestedPassword;
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const isIncluded = new RegExp(escapeRegex(password)).test(suggestedPassword);

  const [clipboardIsTransitioning, setClipboardIsTransitioning] = useState(false);

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
      copyToClipboard({ text: suggestedPassword, name: 'Password' });
      setClipboardIsTransitioning(true);
    }
  }, [isUsingSuggestedPassword, suggestedPassword]);

  const handleUsePasswordClick = useCallback(() => {
    setField('password', suggestedPassword);
    setField('duplicatePassword', suggestedPassword);
    setField('duplicatePasswordError', '');
  }, [setField, suggestedPassword]);

  const handleGenerateNewPasswordClick = useCallback(() => {
    setField('suggestedPassword', generatePassword());
    setField('password', '');
    setField('duplicatePassword', '');
    setField('duplicatePasswordError', '');
  }, [setField]);

  if (password.length && !isIncluded) return null;

  return (
    <div style={{ cursor: 'pointer', position: 'relative' }}>
      <button
        onClick={isUsingSuggestedPassword ? handleCopyClick : handleUsePasswordClick}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        aria-label={isUsingSuggestedPassword ? 'Copy suggested password' : 'Use suggested password'}
      >
        {!clipboardIsTransitioning ? (
          <>
            <span>{isUsingSuggestedPassword ? 'Copy to Clipboard' : 'Use Suggested Password'}: </span>
            <span>{suggestedPassword}</span>
          </>
        ) : (
          <span
            style={{
              backgroundColor: 'green',
              color: 'white',
              border: '1px solid black',
              borderRadius: '5px',
              padding: '2px'
            }}
          >
            Copied!
          </span>
        )}
      </button>
      {!isUsingSuggestedPassword && (
        <button onClick={handleGenerateNewPasswordClick} style={{ marginTop: '8px' }}>
          Generate new password
        </button>
      )}
    </div>
  );
};

export default SuggestedPassword;