// System Imports
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/pages/login/signup/location/LocationInfoPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle3 from "@/assets/icons/progress_circle_3.svg";

const LocationInfoPage = () => (
  <div className={styles.locationInfoPage}>
    <div className={styles.onboardingHeader}>
      <Link href="/pages/login/signup/personal" className={styles.backButton}>
        <Image src={arrowLeftBrand} />
      </Link>
      <Image src={progressCircle3} className={styles.progressCircles} />
    </div>

    <div className={styles.onboardingTextBlock}>
      <h1>Where do you live?</h1>
      <p>This helps us personalize your feed with more relevant content.</p>
    </div>

    <div className={styles.labelWrapper}>
      <label>
        <select className={styles.inputField}>
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Other</option>
        </select>
      </label>
    </div>

    <div className={styles.nextWrapper}>
      <p className={styles.infoText}>
        You can customize the visibility of your information in the settings
      </p>
      <Link href="/pages/login/signup/tags" className={styles.nextButton}>
        Next
      </Link>
    </div>
  </div>
);

export default LocationInfoPage;
