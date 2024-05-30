import styles from "../styles/page.module.scss";
import Image from "next/image";
import wisdm_logo_white from "../assets/icons/wisdm_logo_white.svg";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.testScreen}>
        <div className={styles.splashScreen}>
          <Image src={wisdm_logo_white} />
        </div>

        {/*<div className={styles.signupWrapper}>
          <Image src={wisdm_logo_white} />
          <h2>WISDM</h2>
          <button className={styles.signupButton}>Sign Up</button>
          <div className={styles.loginButton}>Log In</div>
        </div>*/}
        
      </div>
    </main>
  );
}