// System Imports
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle1 from "@/assets/icons/progress_circle_1.svg";
import googleIcon from "@/assets/icons/google.svg";
import appleIcon from "@/assets/icons/apple.svg";
import facebookIcon from "@/assets/icons/facebook.svg";

const SignUpPage = () => (
  <div className={styles.signupPage}>
    <div className={styles.onboardingHeader}>
      <Link href="/login" className={styles.backButton}>
        <Image src={arrowLeftBrand} />
      </Link>
      <Image src={progressCircle1} className={styles.progressCircles} />
    </div>

    <div className={styles.onboardingTextBlock}>
      <h1>Let's Get Started</h1>
    </div>

    <div className={styles.labelWrapper}>
      <div className={styles.labelContainer}>
        <label>Full Name</label>
        <input type="text" placeholder="Insert Name" />
      </div>
      <div className={styles.labelContainer}>
        <label>Email</label>
        <input type="email" placeholder="Email" className={styles.inputField} />
      </div>
      <div className={styles.labelContainer}>
        <label>Password</label>
        <input type="password" placeholder="Password" />
      </div>
    </div>

    <div className={styles.orDivider}>
      <span>OR</span>
    </div>

    <div className={styles.authWrapper}>
      <button className={styles.authButton}>
        <Image src={googleIcon} />
        Continue with Google
      </button>
      <button className={styles.authButton}>
        <Image src={appleIcon} />
        Continue with Apple
      </button>
      <button className={styles.authButton}>
        <Image src={facebookIcon} />
        Continue with Facebook
      </button>
    </div>

    <div className={styles.nextWrapper}>
      <p className={styles.infoText}>
        By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <Link href="/login/signup/personal" className={styles.nextButton}>
        Next
      </Link>
    </div>
  </div>
);

export default SignUpPage;
