import Link from "next/link";
import Image from "next/image";
import wisdmLogoWhite from "@/assets/logos/wisdm_logo_white.svg";
import wisdmLogoBrand from "@/assets/logos/wisdm_logo_brand.svg";
import styles from "@/styles/login/startScreen.module.scss";

const OnboardingPage = () => (
  <div className={styles.startScreenWrapper}>
    <Image src={wisdmLogoBrand} alt="Wisdm Logo" />
    <h1>WISDM</h1>
    <Link href="/login/signUp" className={styles.signupButton}>
      Sign Up
    </Link>
    <Link href="/login/signIn" className={styles.loginButton}>
      Log In
    </Link>
  </div>
);

export default OnboardingPage;
