// System Imports
import Link from "next/link";
import Image from "next/image";

// Stylesheet Imports
import styles from "@/app/(pages)/login/forgotpassword/ForgotPasswordPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";

interface NavigationActions {
  [key: string]: () => void
}

const ForgotPasswordPage = ({ login }: NavigationActions) => (
  <div className={styles.forgotPasswordPage}>
    <div className={styles.onboardingHeader}>
      <Link href="/login/signin" className={styles.backButton}>
        <Image src={arrowLeftBrand} />
      </Link>
    </div>
    <div className={styles.onboardingTextBlock}>
      <h1>Forgot Password?</h1>
      <p>A verification code will be sent to your email</p>
    </div>
    <div className={styles.labelWrapper}>
      <label>Email</label>
      <input type="email" placeholder="Email"/>
    </div>

    <div className={styles.nextWrapper}>
      <p className={styles.infoText}>
        By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <Link href='' className={styles.nextButton}>
        Next
      </Link>
    </div>
  </div>
);

export default ForgotPasswordPage