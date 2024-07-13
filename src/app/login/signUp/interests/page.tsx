import styles from "@/styles/login/signUp/interests/interests.module.scss";
import Image from "next/image";
import Link from "next/link";
import arrowLeft from "@/assets/icons/arrow_left_white.svg";
import progressCircle5 from "@/assets/icons/progress_circle_5.svg";
import tech from "@/assets/images/tech.png";

const InterestsPage = () => (
  <div className={styles.interestsPage}>
    <div className={styles.onboardingHeader}>
      <Link href="/login/signUp/tagsInfo" className={styles.backButton}>
        <Image src={arrowLeft} />
      </Link>
      <Image src={progressCircle5} className={styles.progressCircles} />
    </div>

    <h2>What are you interested in?</h2>
    <p>Pick 5 to customize your news feed</p>

    <div className={styles.interestsGrid}>
      {[
        { label: "Domestic Politics", image: tech.src },
        { label: "International Relations", image: tech.src },
        { label: "Policy & Legislation", image: tech.src },
        { label: "AI & Technology", image: tech.src },
        { label: "Elections & Campaigns", image: tech.src },
        { label: "Human Rights", image: tech.src },
        { label: "Entertainment Industry", image: tech.src },
        { label: "Social Media", image: tech.src },
        { label: "Environmental Policy", image: tech.src },
        { label: "Economics", image: tech.src },
        { label: "Global Health", image: tech.src },
        { label: "Peace & Justice", image: tech.src },
      ].map((interest) => (
        <div key={interest.label} className={styles.interestItem}>
          <img src={interest.image} alt={interest.label} />
          <p>{interest.label}</p>
        </div>
      ))}
    </div>

    <div className={styles.nextWrapper}>
      <Link href="/dashboard" className={styles.nextButton}>
        Finish
      </Link>
    </div>
  </div>
);

export default InterestsPage;
