import styles from "@/styles/login/signUp/personalInfo/personalInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import arrowLeft from "@/assets/icons/arrow_left_white.svg";
import progressCircle2 from "@/assets/icons/progress_circle_2.svg";

const PersonalInfoPage = () => (
  <div className={styles.personalInfoPage}>
    <div className={styles.onboardingHeader}>
      <Link href="/login/signUp" className={styles.backButton}>
        <Image src={arrowLeft} />
      </Link>
      <Image src={progressCircle2} className={styles.progressCircles} />
    </div>

    <h2>Tell us a little about yourself</h2>

    <div className={styles.labelWrapper}>
      <label>Choose a unique username</label>
      <input
        type="text"
        placeholder="teacher.s_pet123"
        className={styles.inputField}
      />
    </div>

    <p className={styles.infoText}>
      Want to go anonymous? You can change it in the settings.
    </p>

    <div className={styles.labelWrapper}>
      <label>What is your gender?</label>
      <div className={styles.genderButtons}>
        <button className={styles.genderButton}>Female</button>
        <button className={styles.genderButton}>Male</button>
        <button className={styles.genderButton}>Other</button>
        <button className={styles.genderButton}>Don't want to specify</button>
      </div>
    </div>

    <div className={styles.nextWrapper}>
      <p className={styles.infoText}>
        You can customize the visibility of your information in the settings
      </p>
      <Link href="/login/signUp/locationInfo" className={styles.nextButton}>
        Next
      </Link>
    </div>
  </div>
);

export default PersonalInfoPage;
