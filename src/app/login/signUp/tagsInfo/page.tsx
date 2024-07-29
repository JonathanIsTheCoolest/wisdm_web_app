import styles from "@/styles/login/signUp/tagsInfo/tagsInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle4 from "@/assets/icons/progress_circle_4.svg";

interface NavigationActions {
  [key: string]: () => void;
}

const TagsInfoPage = ({ locationInfo, interestsInfo }: NavigationActions) => (
  <div className={styles.tagsInfoPage}>
    <div className={styles.onboardingHeader}>
      <Link href="/login/signUp/locationInfo" className={styles.backButton}>
        <Image src={arrowLeftBrand} />
      </Link>
      <Image src={progressCircle4} className={styles.progressCircles} />
    </div>

    <div className={styles.onboardingTextBlock}>
      <h1>Where do you stand?</h1>
      <p>Choose the tags below that you think best describes yourself</p>
    </div>

    <div className={styles.tagsButtons}>
      {[
        "Left Liberal",
        "Right Rebel",
        "Middle Man",
        "Eco Warrior",
        "Tech Geek",
        "Fiscal Hawk",
        "Socialist Spark",
        "Diplomacy Devotee",
        "Freedom Fanatic",
        "Capitalist Crusader",
        "Green Guardian",
        "Rural Revolutionary",
        "Planet Preserver",
        "Urban Utopian",
        "Cultural Creative",
        "Justice Juggernaut",
        "Equality Evangelist",
      ].map((tag) => (
        <button key={tag} className={styles.tagButton}>
          {tag}
        </button>
      ))}
    </div>

    <div className={styles.nextWrapper}>
      <Link href="/login/signUp/interests" className={styles.nextButton}>
        Next
      </Link>
    </div>
  </div>
);

export default TagsInfoPage;
