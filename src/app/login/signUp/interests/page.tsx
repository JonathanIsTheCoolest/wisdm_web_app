import styles from "@/styles/Onboarding.module.scss";
import tech from "@/assets/images/tech.png";
import Link from "next/link";

const InterestsPage = () => (
  <div className={styles.interestsPage}>
    <Link href='/login/signUp/tagsInfo' className={styles.backButton}>
      ←
    </Link>
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
    <Link href='/dashboard' className={styles.finishButton}>
      Finish
    </Link>
  </div>
);

export default InterestsPage