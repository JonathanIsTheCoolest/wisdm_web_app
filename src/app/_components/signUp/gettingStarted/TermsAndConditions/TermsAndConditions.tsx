import React from "react";
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

const TermsAndConditions = ({ passwordError }: {passwordError: string}) => (
  <div className={styles.nextWrapper}>
    <p className={styles.infoText}>
      By continuing you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
    </p>
    {passwordError && <p>{passwordError}</p>}
  </div>
);

export default TermsAndConditions;
