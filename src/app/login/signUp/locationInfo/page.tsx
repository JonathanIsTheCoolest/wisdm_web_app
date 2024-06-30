import styles from "@/styles/Onboarding.module.scss";
import Link from "next/link";

const LocationInfoPage = () => (
  <div className={styles.locationInfoPage}>
    <Link href='/login/signUp/personalInfo' className={styles.backButton}>
      ←
    </Link>
    <h2>Where do you live?</h2>
    <p>This helps us personalize your feed with more relevant content.</p>
    <label>
      <select className={styles.inputField}>
        <option>United States</option>
        <option>Canada</option>
        <option>United Kingdom</option>
        <option>Australia</option>
        <option>Other</option>
      </select>
    </label>
    <p className={styles.infoText}>
      You can customize the visibility of your information in the settings
    </p>
    <Link href='/login/signUp/tagsInfo' className={styles.nextButton}>
      Next
    </Link>
  </div>
);

export default LocationInfoPage