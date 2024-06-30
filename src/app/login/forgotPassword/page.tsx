import styles from "@/styles/Onboarding.module.scss";
import Link from "next/link";

interface NavigationActions {
  [key: string]: () => void
}

const ForgotPasswordPage = ({ login }: NavigationActions) => (
  <div className={styles.forgotPasswordPage}>
    <Link href='/login/signIn' className={styles.backButton}>
      ←
    </Link>
    <h2>Forgot Password?</h2>
    <p>A verification code will be sent to your email</p>
    <label>
      Email
      <input type="email" placeholder="Email" className={styles.inputField} />
    </label>
    <p className={styles.termsText}>
      By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
      <a href="/privacy">Privacy Policy</a>.
    </p>
    <Link href='' className={styles.nextButton}>
      Next
    </Link>
  </div>
);

export default ForgotPasswordPage