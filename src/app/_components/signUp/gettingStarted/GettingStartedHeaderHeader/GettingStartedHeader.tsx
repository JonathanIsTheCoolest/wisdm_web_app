import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle1 from "@/assets/icons/progress_circle_1.svg";

const GettingStartedHeader = () => (
  <div className={styles.onboardingHeader}>
    <Link href="/login" className={styles.backButton}>
      <Image src={arrowLeftBrand} alt="Back button" />
    </Link>
    <Image src={progressCircle1} alt="Progress Circle" className={styles.progressCircles} />
  </div>
);

export default GettingStartedHeader;
