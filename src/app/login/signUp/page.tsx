import styles from "@/styles/Onboarding.module.scss";
import Link from "next/link";

const SignUpPage = () => (
  <div className={styles.signupPage}>
    <Link href='/login' className={styles.backButton}>←</Link>
    <h2>Let's Get Started</h2>
    <label>
      Full Name
      <input
        type="text"
        placeholder="Insert Name"
        className={styles.inputField}
      />
    </label>
    <label>
      Email
      <input type="email" placeholder="Email" className={styles.inputField} />
    </label>
    <label>
      Password
      <input
        type="password"
        placeholder="Password"
        className={styles.inputField}
      />
    </label>
    <div className={styles.orDivider}>
      <span>OR</span>
    </div>
    <button className={styles.authButton}>Continue with Google</button>
    <button className={styles.authButton}>Continue with Apple</button>
    <button className={styles.authButton}>Continue with Facebook</button>
    <p className={styles.termsText}>
      By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
      <a href="/privacy">Privacy Policy</a>.
    </p>
    <Link href='/login/signUp/personalInfo' className={styles.nextButton}>
      Next
    </Link>
  </div>
);

export default SignUpPage