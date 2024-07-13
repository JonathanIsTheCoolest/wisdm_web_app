import Link from "next/link";
import Image from "next/image";
import wisdm_logo_white from "@/assets/logos/wisdm_logo_white.svg";
import styles from "@/styles/login/startScreen.module.scss";

const OnboardingPage = () => (
  <div className={styles.startScreenWrapper}>
    <Image src={wisdm_logo_white} alt="Wisdm Logo" />
    <h2>WISDM</h2>
    <Link href="/login/signUp" className={styles.signupButton}>
      Sign Up
    </Link>
    <Link href="/login/signIn" className={styles.loginButton}>
      Log In
    </Link>
  </div>
);

export default OnboardingPage;
